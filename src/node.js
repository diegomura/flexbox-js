const Layout = require('./layout');
const Style = require('./style');
const Value = require('./value');
const Enums = require('./enums');

const NODE_TYPE = {
  'DEFAULT': 'default',
  'TEXT': 'text'
};

class Node {
  static createDefault() {
    return new Node();
  }

  constructor(config) {
    this.config = config;
    this.style = new Style();
    this.layout = new Layout();
    this.parent = null;
    this.measure = null;
    this.baseline = null;
    this.children = [];
    this.isDirty = false;
    this.hasNewLayout = false;
    this.nodeType = NODE_TYPE.DEFAULT;
    this.resolvedDimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(),
      [Enums.DIMENSION_HEIGHT]: new Value(),
    };
  }

  calculateLayout(parentWidth, parentHeight, parentDirection) {
    this.resolveDimensions();

    let width;
    let height;
    let widthMeasureMode;
    let heightMeasureMode;

    if (isStyleDimDefined(Enums.FLEX_DIRECTION_ROW, parentWidth)) {
      width = resolveValue(this.resolvedDimensions[Enums.FLEX_DIRECTION_ROW], parentWidth) +
        this.nodeMarginForAxis(Enums.FLEX_DIRECTION_ROW, parentWidth);
      widthMeasureMode = Enums.MEASURE_MODE_UNDEFINED;
    } else if (resolveValue(this.style.maxDimensions[DIMENSION_WIDTH], parentWidth) >= 0) {
      width = resolveValue(this.style.maxDimensions[DIMENSION_WIDTH], parentWidth);
      widthMeasureMode = Enums.MEASURE_MODE_AT_MOST;
    } else {
      width = parentWidth;
      widthMeasureMode = !width ? Enums.MEASURE_MODE_UNDEFINED : Enums.MEASURE_MODE_EXACTLY; // TODO: isNil
    }

    if (isStyleDimDefined(Enums.FLEX_DIRECTION_COLUMN, parentHeight)) {
      height = resolveValue(this.resolvedDimensions[Enums.FLEX_DIRECTION_COLUMN], parentHeight) +
        this.nodeMarginForAxis(Enums.FLEX_DIRECTION_COLUMN, parentWidth);
      heightMeasureMode = Enums.MEASURE_MODE_EXACTLY;
    } else if (resolveValue(this.style.maxDimensions[DIMENSION_HEIGHT], parentHeight) >= 0) {
      height = resolveValue(this.style.maxDimensions[DIMENSION_HEIGHT], parentHeight);
      heightMeasureMode = Enums.MEASURE_MODE_AT_MOST;
    } else {
      height = parentHeight;
      heightMeasureMode = !height ? Enums.MEASURE_MODE_UNDEFINED : Enums.MEASURE_MODE_EXACTLY; // TODO: isNil
    }

    if (this.layoutNodeInternal(
      width,
      height,
      parentDirection,
      widthMeasureMode,
      heightMeasureMode,
      parentWidth,
      parentHeight,
      true,
      'initial',
      this.config
    )) {
      //   YGNodeSetPosition(node, node->layout.direction, parentWidth, parentHeight, parentWidth);
      // YGRoundToPixelGrid(node, node->config->pointScaleFactor, 0.0f, 0.0f);
    }
  }

  resolveDimensions() {
    const { width, height, maxDimensions, minDimensions } = this.style;

    // Resolve width
    if (
      maxDimensions[Enums.DIMENSION_WIDTH].unit &&
      maxDimensions[Enums.DIMENSION_WIDTH] === minDimensions[Enums.DIMENSION_WIDTH]
    ) {
      this.resolvedDimensions[Enums.DIMENSION_WIDTH] = maxDimensions[Enums.DIMENSION_WIDTH];
    } else {
      this.resolvedDimensions[Enums.DIMENSION_WIDTH] = width;
    }

    // Resolve width
    if (
      maxDimensions[Enums.DIMENSION_HEIGHT].unit &&
      maxDimensions[Enums.DIMENSION_HEIGHT] === minDimensions[Enums.DIMENSION_HEIGHT]
    ) {
      this.resolvedDimensions[Enums.DIMENSION_HEIGHT] = maxDimensions[Enums.DIMENSION_HEIGHT];
    } else {
      this.resolvedDimensions[Enums.DIMENSION_HEIGHT] = height;
    }
  }

  isStyleDimDefined(axis, parentSize) {
    return !(node->resolvedDimensions[dim[axis]]->unit == YGUnitAuto ||
           node->resolvedDimensions[dim[axis]]->unit == YGUnitUndefined ||
           (node->resolvedDimensions[dim[axis]]->unit == YGUnitPoint &&
            node->resolvedDimensions[dim[axis]]->value < 0.0f) ||
           (node->resolvedDimensions[dim[axis]]->unit == YGUnitPercent &&
            (node->resolvedDimensions[dim[axis]]->value < 0.0f || YGFloatIsUndefined(parentSize))));
  }

  copyStyle(node) {

  }

  free() {

  }

  freeRecursive() {

  }

  getChild(index) {
    return this.children[index];
  }

  getChildCount() {
    return this.children.length;
  }

  getComputedBorder(edge) {
    return this.layout.border[edge];
  }

  getComputedBottom() {
    return this.layout.bottom;
  }

  getComputedHeight() {
    return this.layout.height;
  }

  getComputedLayout() {
    return {
      left: this.getComputedLeft(),
      right: this.getComputedRight(),
      top: this.getComputedTop(),
      bottom: this.getComputedBottom(),
      height: this.getComputedHeight(),
      width: this.getComputedWidth()
    };
  }

  getComputedLeft() {
    return this.layout.left;
  }

  getComputedMargin(edge) {
    return this.layout.margin[edge];
  }

  getComputedPadding(edge) {
    return this.layout.padding[edge];
  }

  getComputedRight() {
    return this.layout.right;
  }

  getComputedTop() {
    return this.layout.top;
  }

  getComputedWidth() {
    return this.layout.width;
  }

  getParent() {
    return this.parent;
  }

  // TODO: index insertion
  insertChild(child, index) {
    if (child.getParent()) {
      console.log('Child already has a parent, it must be removed first.');
      return;
    }

    if (child.measure) {
      console.log('Cannot add child: Nodes with measure functions cannot have children.');
      return;
    }

    this.children.push(child);
  }

  isDirty() {
    return this.isDirty;
  }

  markDirty() {
    if (!this.measure) {
      console.log("Only leaf nodes with custom measure functions should manually mark themselves as dirty");
      return;
    }

    this.markDirtyInternal();
  }

  // TODO: this function should be private
  markDirtyInternal() {
    if (!this.isDirty) {
      this.isDirty = true;
      this.layout.computedFlexBasis = null;

      if (this.parent) {
        this.parent.markDirtyInternal();
      }
    }
  }

  removeChild(child) {
    this.children = this.children.filter(c => (
      c !== child
    ));
  }

  // TODO: implement the YGNodeListFree
  reset() {
    if (this.getChildCount() === 0) {
      console.log("Cannot reset a node which still has children attached");
      return;
    }

    if (!!this.getParent()) {
      console.log("Cannot reset a node still attached to a parent");
      return;
    }
  }

  setMeasureFunc(func) {
    if (!func) {
      this.measure = null;
      this.nodeType = NODE_TYPE.DEFAULT;
    } else {
      if (this.getChildCount() === 0) {
        console.log("Cannot set measure function: Nodes with measure functions cannot have children.");
        return;
      }

      this.measure = func;
      this.nodeType = NODE_TYPE.TEXT;
    }
  }

  unsetMeasureFunc() {
    this.setMeasureFunc(null);
  }

  // Style getters

  getAlignContent() {
    return this.style.alignContent;
  }

  getAlignItems() {
    return this.style.alignItems;
  }

  getAlignSelf() {
    return this.style.alignSelf;
  }

  getAspectRatio() {
    return this.style.alignSelf;
  }

  getBorder(edge) {
    return this.style.border[edge];
  }

  getDisplay() {
    return this.style.display;
  }

  getFlexBasis() {
    return this.style.flexBasis;
  }

  getFlexDirection() {
    return this.style.flexDirection;
  }

  getFlexGrow() {
    return this.style.flexGrow;
  }

  //TODO: Check for config.useWebDefaults as real code
  getFlexShrink() {
    return this.style.flexShrink;
  }

  getFlexWrap() {
    return this.style.flexWrap;
  }

  getHeight() {
    return this.style.height;
  }

  getJustifyContent() {
    return this.style.justifyContent;
  }

  // TODO: return Value
  getMargin(edge) {
    return this.style.margin[edge];
  }

  getMaxHeight() {
    return this.style.maxHeight;
  }

  getMaxWidth() {
    return this.style.maxWidth;
  }

  getMinHeight() {
    return this.style.minHeight;
  }

  getMinWidth() {
    return this.style.minWidth;
  }

  getOverflow() {
    return this.style.overflow;
  }

  getPadding(edge) {
    return this.style.padding[edge];
  }


  getPosition(edge) {
    return this.style.position[edge];
  }

  getPositionType() {
    return this.style.positionType;
  }

  getWidth() {
    return this.style.width;
  }

  // Style setter

  setAlignContent(alignContent) {
    this.style.alignContent = alignContent;
  }

  setAlignItems(alignItems) {
    this.style.alignItems = alignItems;
  }

  setAlignSelf(alignSelf) {
    this.style.alignSelf = alignSelf;
  }

  setAspectRatio(aspectRatio) {
    this.style.aspectRatio = aspectRatio;
  }

  setBorder(edge, border) {
    this.style.border[edge] = border;
  }

  setDisplay(display) {
    this.style.display = display;
  }

  setFlex(flex) {
    this.style.flex = flex;
  }

  setFlexBasis(flexBasis) {
    this.style.flexBasis = flexBasis;
  }

  setFlexBasisPercent(flexBasis) {
    this.style.flexBasis = flexBasis;
  }

  setFlexDirection(flexDirection) {
    this.style.flexDirection = flexDirection;
  }

  setFlexGrow(flexGrow) {
    this.style.flexGrow = flexGrow;
  }

  setFlexShrink(flexShrink) {
    this.style.flexShrink = flexShrink;
  }

  setFlexWrap(flexWrap) {
    this.style.flexWrap = flexWrap;
  }

  setHeight(height) {
    this.style.height = height;
  }

  setHeightAuto() {

  }

  setHeightPercent(height) {

  }

  setJustifyContent(justifyContent) {
    this.style.justifyContent = justifyContent;
  }

  setMargin(edge, margin) {
    this.style.margin[edge] = margin;
  }

  setMarginAuto(edge) {

  }

  setMarginPercent(edge, margin) {

  }

  setMaxHeight(maxHeight) {
    this.style.maxHeight = maxHeight;
  }

  setMaxHeightPercent(maxHeight) {

  }

  setMaxWidth(maxWidth) {
    this.style.maxWidth = maxWidth;
  }

  setMaxWidthPercent(maxWidth) {

  }

  setMinHeight(minHeight) {
    this.style.minHeight = minHeight;
  }

  setMinHeightPercent(minHeight) {

  }

  setMinWidth(minWidth) {
    this.style.minWidth = minWidth;
  }

  setMinWidthPercent(minWidth) {

  }

  setOverflow(overflow) {
    this.style.overflow = overflow;
  }

  setPadding(edge, padding) {
    this.style.padding[edge] = padding;
  }

  setPaddingPercent(edge, padding) {

  }

  setPosition(edge, position) {
    this.style.position[edge] = position;
  }

  setPositionPercent(edge, position) {

  }

  setPositionType(positionType) {
    this.style.positionType = positionType;
  }

  setWidth(width) {
    this.style.width = width;
  }

  setWidthAuto() {

  }

  setWidthPercent(width) {

  }
}

module.exports = Node;
