class Node {
  constructor(config) {
    this.config = config;

    this.parent = null;
    this.measure = null;
    this.children = [];

    this.style = {
      alignContent: null,
      alignItems: null,
      alignSelf: null,
      aspectRatio: null,
      border: {},
      display: null,
      flexBasis: null,
      flexDirection: null,
    };
  }

  calculateLayout(width, height, direction) {

  }

  copyStyle(node) {

  }

  free() {

  }

  freeRecursive() {

  }

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

  getChild(index) {
    return this.children[index];
  }

  getChildCount() {
    return this.children.length;
  }

  getComputedBorder(edge) {

  }

  getComputedBottom() {

  }

  getComputedHeight() {

  }

  getComputedLayout() {

  }

  getComputedLeft() {

  }

  getComputedMargin(edge) {

  }

  getComputedPadding(edge) {

  }

  getComputedRight() {

  }

  getComputedTop() {

  }

  getComputedWidth() {

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

  }

  getFlexShrink() {

  }

  getFlexWrap() {

  }

  getHeight() {

  }

  getJustifyContent() {

  }

  getMargin(edge) {

  }

  getMaxHeight() {

  }

  getMaxWidth() {

  }

  getMinHeight() {

  }

  getMinWidth() {

  }

  getOverflow() {

  }

  getPadding(edge) {

  }

  getParent() {

  }

  getPosition(edge) {

  }

  getPositionType() {

  }

  getWidth() {

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

  }

  markDirty() {

  }

  removeChild(child) {

  }

  reset() {

  }

  setAlignContent(alignContent) {

  }

  setAlignItems(alignItems) {

  }

  setAlignSelf(alignSelf) {

  }

  setAspectRatio(aspectRatio) {

  }

  setBorder(edge, border) {

  }

  setDisplay(display) {

  }

  setFlex(flex) {

  }

  setFlexBasis(flexBasis) {

  }

  setFlexBasisPercent(flexBasis) {

  }

  setFlexDirection(flexDirection) {

  }

  setFlexGrow(flexGrow) {

  }

  setFlexShrink(flexShrink) {

  }

  setFlexWrap(flexWrap) {

  }

  setHeight(height) {

  }

  setHeightAuto() {

  }

  setHeightPercent(height) {

  }

  setJustifyContent(justifyContent) {

  }

  setMargin(edge, margin) {

  }

  setMarginAuto(edge) {

  }

  setMarginPercent(edge, margin) {

  }

  setMaxHeight(maxHeight) {

  }

  setMaxHeightPercent(maxHeight) {

  }

  setMaxWidth(maxWidth) {

  }

  setMaxWidthPercent(maxWidth) {

  }

  setMeasureFunc(func) {

  }

  setMinHeight(minHeight) {

  }

  setMinHeightPercent(minHeight) {

  }

  setMinWidth(minWidth) {

  }

  setMinWidthPercent(minWidth) {

  }

  setOverflow(overflow) {

  }

  setPadding(edge, padding) {

  }

  setPaddingPercent(edge, padding) {

  }

  setPosition(edge, position) {

  }

  setPositionPercent(edge, position) {

  }

  setPositionType(positionType) {

  }

  setWidth(width) {

  }

  setWidthAuto() {

  }

  setWidthPercent(width) {

  }

  unsetMeasureFunc() {

  }
}

module.exports = Node;
