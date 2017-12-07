const Layout = require('./layout');
const Style = require('./style');
const Value = require('./value');
const Enums = require('./enums');
const { floatsEqual, floatIsUndefined, listCount } = require('./utils');
const { marginForAxis, leadingMargin, trailingMargin } = require('./margins');
const { leadingBorder, trailingBorder } = require('./borders');
const {
  leadingPadding,
  trailingPadding,
  leadingPaddingAndBorder,
  trailingPaddingAndBorder,
  paddingAndBorderForAxis,
} = require('./paddings');
const {
  setPosition,
  isLeadingPosDefined,
  leadingPosition,
  isTrailingPosDefined,
  setChildTrailingPosition,
} = require('./position');
const { boundAxis } = require('./axis');
const { computedEdgeValue } = require('./edges');
const {
  resolveDimensions,
  isStyleDimDefined,
  emptyContainerSetMeasuredDimensions,
} = require('./dimensions');
const {
  flexDirectionIsColumn,
  flexDirectionIsRow,
  resolveFlexGrow,
  resolveFlexDirection,
  flexDirectionCross,
  isFlex,
} = require('./flex');
const { trailing, leading, dim, pos } = require('./constants');

const NODE_TYPE = {
  DEFAULT: 'default',
  TEXT: 'text',
};

let gDepth = 0;
let gCurrentGenerationCount = 0;
const maxCachedResultCount = 16;

const resolveFlexBasisPtr = (node) => {
  if (node.style.flexBasis.unit !== Enums.UNIT_AUTO && node.style.flexBasis.unit !== Enums.UNIT_UNDEFINED) {
    return node.style.flexBasis;
  }
  if (!floatIsUndefined(node.style.flex) && node.style.flex > 0.0) {
    return node.config.useWebDefaults ? new Value(Enums.UNIT_AUTO) : Value.zero();
  }
  return new Value(Enums.UNIT_AUTO);
}

const alignItem = (node, child) => {
  const align = child.style.alignSelf == Enums.ALIGN_AUTO ? node.style.alignItems : child.style.alignSelf;
  if (align === Enums.ALIGN_BASELINE && flexDirectionIsColumn(node.style.flexDirection)) {
    return Enums.ALIGN_FLEX_START;
  }
  return align;
}

const marginLeadingValue = (node, axis) => {
  if (flexDirectionIsRow(axis) && node.style.margin[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED) {
    return node.style.margin[Enums.EDGE_START];
  } else {
    return node.style.margin[leading[axis]];
  }
}

const marginTrailingValue = (node, axis) => {
  if (flexDirectionIsRow(axis) && node.style.margin[Enums.EDGE_END].unit !== Enums.UNIT_UNDEFINED) {
    return node.style.margin[Enums.EDGE_END];
  } else {
    return node.style.margin[trailing[axis]];
  }
}

const constrainMaxSizeForMode = (
  node,
  axis,
  parentAxisSize,
  parentWidth,
  mode,
  size,
) => {
  const maxSize = Value.resolve(node.style.maxDimensions[dim[axis]], parentAxisSize) + marginForAxis(node, axis, parentWidth);
  switch (mode) {
    case Enums.MEASURE_MODE_EXACTLY:
    case Enums.MEASURE_MODE_AT_MOST:
      size = (floatIsUndefined(maxSize) || size < maxSize) ? size : maxSize;
      break;
    case Enums.MEASURE_MODE_UNDEFINED:
      if (!floatIsUndefined(maxSize)) {
        mode = Enums.MEASURE_MODE_AT_MOST;
        size = maxSize;
      }
      break;
  }
}

const computeFlexBasisForChild = (
  node,
  child,
  width,
  widthMode,
  height,
  parentWidth,
  parentHeight,
  heightMode,
  direction,
  config
) => {
  const mainAxis = resolveFlexDirection(node.style.flexDirection, direction);
  const isMainAxisRow = flexDirectionIsRow(mainAxis);
  const mainAxisSize = isMainAxisRow ? width : height;
  const mainAxisParentSize = isMainAxisRow ? parentWidth : parentHeight;

  let childWidth;
  let childHeight;
  let childWidthMeasureMode;
  let childHeightMeasureMode;

  const resolvedFlexBasis = Value.resolve(resolveFlexBasisPtr(child), mainAxisParentSize);
  const isRowStyleDimDefined = isStyleDimDefined(child, Enums.FLEX_DIRECTION_ROW, parentWidth);
  const isColumnStyleDimDefined = isStyleDimDefined(child, Enums.FLEX_DIRECTION_COLUMN, parentHeight);

  if (!floatIsUndefined(resolvedFlexBasis) && !floatIsUndefined(mainAxisSize)) {
    if (floatIsUndefined(child.layout.computedFlexBasis) ||
        (configIsExperimentalFeatureEnabled(child.config, YGExperimentalFeatureWebFlexBasis) &&
         child.layout.computedFlexBasisGeneration !== gCurrentGenerationCount)) {
      child.layout.computedFlexBasis =
          Math.max(resolvedFlexBasis, paddingAndBorderForAxis(child, mainAxis, parentWidth));
    }
  } else if (isMainAxisRow && isRowStyleDimDefined) {
    // The width is definite, so use that as the flex basis.
    child.layout.computedFlexBasis =
        Math.max(Value.resolve(child.resolvedDimensions[Enums.DIMENSION_WIDTH], parentWidth),
              paddingAndBorderForAxis(child, Enums.FLEX_DIRECTION_ROW, parentWidth));
  } else if (!isMainAxisRow && isColumnStyleDimDefined) {
    // The height is definite, so use that as the flex basis.
    child.layout.computedFlexBasis =
        Math.max(Value.resolve(child.resolvedDimensions[Enums.DIMENSION_HEIGHT], parentHeight),
              paddingAndBorderForAxis(child, Enums.FLEX_DIRECTION_COLUMN, parentWidth));
  } else {
    // Compute the flex basis and hypothetical main size (i.e. the clamped
    // flex basis).
    childWidth = undefined;
    childHeight = undefined;
    childWidthMeasureMode = Enums.MEASURE_MODE_UNDEFINED;
    childHeightMeasureMode = Enums.MEASURE_MODE_UNDEFINED;

    const marginRow = marginForAxis(child, Enums.FLEX_DIRECTION_ROW, parentWidth);
    const marginColumn = marginForAxis(child, Enums.FLEX_DIRECTION_COLUMN, parentWidth);

    if (isRowStyleDimDefined) {
      childWidth =
          Value.resolve(child.resolvedDimensions[Enums.DIMENSION_WIDTH], parentWidth) + marginRow;
      childWidthMeasureMode = Enums.MEASURE_MODE_EXACTLY;
    }
    if (isColumnStyleDimDefined) {
      childHeight =
          Value.resolve(child.resolvedDimensions[Enums.DIMENSION_HEIGHT], parentHeight) + marginColumn;
      childHeightMeasureMode = Enums.MEASURE_MODE_EXACTLY;
    }

    // The W3C spec doesn't say anything about the 'overflow' property,
    // but all major browsers appear to implement the following logic.
    if ((!isMainAxisRow && node.style.overflow === Enums.OVERFLOW_SCROLL) ||
        node.style.overflow != Enums.OVERFLOW_SCROLL) {
      if (floatIsUndefined(childWidth) && !floatIsUndefined(width)) {
        childWidth = width;
        childWidthMeasureMode = Enums.MEASURE_MODE_AT_MOST;
      }
    }

    if ((isMainAxisRow && node.style.overflow === Enums.OVERFLOW_SCROLL) ||
        node.style.overflow != Enums.OVERFLOW_SCROLL) {
      if (floatIsUndefined(childHeight) && !floatIsUndefined(height)) {
        childHeight = height;
        childHeightMeasureMode = Enums.MEASURE_MODE_AT_MOST;
      }
    }

    if (!floatIsUndefined(child.style.aspectRatio)) {
      if (!isMainAxisRow && childWidthMeasureMode === Enums.MEASURE_MODE_EXACTLY) {
        childHeight = (childWidth - marginRow) / child.style.aspectRatio;
        childHeightMeasureMode = Enums.MEASURE_MODE_EXACTLY;
      } else if (isMainAxisRow && childHeightMeasureMode === Enums.MEASURE_MODE_EXACTLY) {
        childWidth = (childHeight - marginColumn) * child.style.aspectRatio;
        childWidthMeasureMode = Enums.MEASURE_MODE_EXACTLY;
      }
    }

    // If child has no defined size in the cross axis and is set to stretch,
    // set the cross
    // axis to be measured exactly with the available inner width

    const hasExactWidth = !floatIsUndefined(width) && widthMode === Enums.MEASURE_MODE_EXACTLY;
    const childWidthStretch = alignItem(node, child) === Enums.ALIGN_STRETCH &&
                                   childWidthMeasureMode != Enums.MEASURE_MODE_EXACTLY;
    if (!isMainAxisRow && !isRowStyleDimDefined && hasExactWidth && childWidthStretch) {
      childWidth = width;
      childWidthMeasureMode = Enums.MEASURE_MODE_EXACTLY;
      if (!floatIsUndefined(child.style.aspectRatio)) {
        childHeight = (childWidth - marginRow) / child.style.aspectRatio;
        childHeightMeasureMode = Enums.MEASURE_MODE_EXACTLY;
      }
    }

    const hasExactHeight = !floatIsUndefined(height) && heightMode === Enums.MEASURE_MODE_EXACTLY;
    const childHeightStretch = alignItem(node, child) === Enums.ALIGN_STRETCH &&
                                    childHeightMeasureMode != Enums.MEASURE_MODE_EXACTLY;
    if (isMainAxisRow && !isColumnStyleDimDefined && hasExactHeight && childHeightStretch) {
      childHeight = height;
      childHeightMeasureMode = Enums.MEASURE_MODE_EXACTLY;

      if (!floatIsUndefined(child.style.aspectRatio)) {
        childWidth = (childHeight - marginColumn) * child.style.aspectRatio;
        childWidthMeasureMode = Enums.MEASURE_MODE_EXACTLY;
      }
    }

    constrainMaxSizeForMode(
        child, Enums.FLEX_DIRECTION_ROW, parentWidth, parentWidth, childWidthMeasureMode, childWidth);
    constrainMaxSizeForMode(child,
                              Enums.FLEX_DIRECTION_COLUMN,
                              parentHeight,
                              parentWidth,
                              childHeightMeasureMode,
                              childHeight);

    // Measure the child
    layoutNodeInternal(child,
                         childWidth,
                         childHeight,
                         direction,
                         childWidthMeasureMode,
                         childHeightMeasureMode,
                         parentWidth,
                         parentHeight,
                         false,
                         "measure",
                         config);

    child.layout.computedFlexBasis =
        Math.max(child.layout.measuredDimensions[dim[mainAxis]],
              paddingAndBorderForAxis(child, mainAxis, parentWidth));
  }

  child.layout.computedFlexBasisGeneration = gCurrentGenerationCount;
}

const layoutNodeInternal = (
  node,
  availableWidth,
  availableHeight,
  parentDirection,
  widthMeasureMode,
  heightMeasureMode,
  parentWidth,
  parentHeight,
  performLayout,
  reason,
  config,
) => {
  gDepth++;

  const layout = node.layout;
  const needToVisitNode =
    (node.isDirty && node.layout.generationCount !== gCurrentGenerationCount) ||
    node.layout.lastParentDirection !== parentDirection;

  if (needToVisitNode) {
    // Invalidate the cached results.
    node.layout.nextCachedMeasurementsIndex = 0;
    node.layout.cachedLayout.widthMeasureMode = -1;
    node.layout.cachedLayout.heightMeasureMode = -1;
    node.layout.cachedLayout.computedWidth = -1;
    node.layout.cachedLayout.computedHeight = -1;
  }

  let cachedResults = null;

  if (node.measure) {
    const marginAxisRow = marginForAxis(
      node,
      Enums.FLEX_DIRECTION_ROW,
      parentWidth,
    );
    const marginAxisColumn = marginForAxis(
      node,
      Enums.FLEX_DIRECTION_COLUMN,
      parentWidth,
    );

    // First, try to use the layout cache.
    if (
      node._canUseCachedMeasurement(
        widthMeasureMode,
        availableWidth,
        heightMeasureMode,
        availableHeight,
        node.layout.cachedLayout.widthMeasureMode,
        node.layout.cachedLayout.availableWidth,
        node.layout.cachedLayout.heightMeasureMode,
        node.layout.cachedLayout.availableHeight,
        node.layout.cachedLayout.computedWidth,
        node.layout.cachedLayout.computedHeight,
        marginAxisRow,
        marginAxisColumn,
        config,
      )
    ) {
      cachedResults = node.layout.cachedLayout;
    } else {
      // Try to use the measurement cache.
      for (var i = 0; i < node.layout.nextCachedMeasurementsIndex; i++) {
        if (
          node._canUseCachedMeasurement(
            widthMeasureMode,
            availableWidth,
            heightMeasureMode,
            availableHeight,
            node.layout.cachedMeasurements[i].widthMeasureMode,
            node.layout.cachedMeasurements[i].availableWidth,
            node.layout.cachedMeasurements[i].heightMeasureMode,
            node.layout.cachedMeasurements[i].availableHeight,
            node.layout.cachedMeasurements[i].computedWidth,
            node.layout.cachedMeasurements[i].computedHeight,
            marginAxisRow,
            marginAxisColumn,
            config,
          )
        ) {
          cachedResults = node.layout.cachedMeasurements[i];
          break;
        }
      }
    }
  } else if (performLayout) {
    if (
      floatsEqual(node.layout.cachedLayout.availableWidth, availableWidth) &&
      floatsEqual(node.layout.cachedLayout.availableHeight, availableHeight) &&
      layout.cachedLayout.widthMeasureMode === widthMeasureMode &&
      layout.cachedLayout.heightMeasureMode === heightMeasureMode
    ) {
      cachedResults = node.layout.cachedLayout;
    }
  } else {
    for (var i = 0; i < node.layout.nextCachedMeasurementsIndex; i++) {
      if (
        floatsEqual(
          node.layout.cachedMeasurements[i].availableWidth,
          availableWidth,
        ) &&
        floatsEqual(
          node.layout.cachedMeasurements[i].availableHeight,
          availableHeight,
        ) &&
        node.layout.cachedMeasurements[i].widthMeasureMode ===
          widthMeasureMode &&
        node.layout.cachedMeasurements[i].heightMeasureMode ===
          heightMeasureMode
      ) {
        cachedResults = node.layout.cachedMeasurements[i];
      }
    }
  }

  if (!needToVisitNode && cachedResults !== null) {
    node.layout.measuredDimensions[Enums.DIMENSION_WIDTH] =
      cachedResults.computedWidth;
    node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] =
      cachedResults.computedHeight;
  } else {
    layoutImpl(
      node,
      availableWidth,
      availableHeight,
      parentDirection,
      widthMeasureMode,
      heightMeasureMode,
      parentWidth,
      parentHeight,
      performLayout,
      config,
    );

    node.layout.lastParentDirection = parentDirection;

    if (cachedResults === null) {
      if (node.layout.nextCachedMeasurementsIndex === maxCachedResultCount) {
        node.layout.nextCachedMeasurementsIndex = 0;
      }

      let newCacheEntry = {};

      if (performLayout) {
        newCacheEntry = node.layout.cachedLayout;
      } else {
        newCacheEntry =
          node.layout.cachedMeasurements[
            node.layout.nextCachedMeasurementsIndex
          ] || {};
        node.layout.nextCachedMeasurementsIndex++;
      }

      newCacheEntry.availableWidth = availableWidth;
      newCacheEntry.availableHeight = availableHeight;
      newCacheEntry.widthMeasureMode = widthMeasureMode;
      newCacheEntry.heightMeasureMode = heightMeasureMode;
      newCacheEntry.computedWidth =
        node.layout.measuredDimensions[Enums.DIMENSION_WIDTH];
      newCacheEntry.computedHeight =
        node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT];
    }
  }

  if (performLayout) {
    node.layout.dimensions[Enums.DIMENSION_WIDTH] =
      node.layout.measuredDimensions[Enums.DIMENSION_WIDTH];
    node.layout.dimensions[Enums.DIMENSION_HEIGHT] =
      node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT];
    node.hasNewLayout = true;
    node.isDirty = false;
  }

  gDepth--;
  node.layout.generationCount = gCurrentGenerationCount;

  return needToVisitNode || cachedResults === null;
};

const resolveDirection = (node, parentDirection) => {
  if (node.style.direction === Enums.DIRECTION_INHERIT) {
    return parentDirection > Enums.DIRECTION_INHERIT
      ? parentDirection
      : Enums.DIRECTION_LTR;
  } else {
    return node.style.direction;
  }
};

const isBaselineLayout = node => {
  if (flexDirectionIsColumn(node.style.flexDirection)) {
    return false;
  }
  if (node.style.alignItems == Enums.ALIGN_BASELINE) {
    return true;
  }
  const childCount = node.getChildCount();
  for (let i = 0; i < childCount; i++) {
    const child = node.getChild(i);
    if (
      child.style.positionType == Enums.POSITION_TYPE_RELATIVE &&
      child.style.alignSelf == Enums.ALIGN_BASELINE
    ) {
      return true;
    }
  }

  return false;
};

const absoluteLayoutChild = (
  node,
  child,
  width,
  widthMode,
  height,
  direction,
  config,
) => {
  const mainAxis = resolveFlexDirection(node.style.flexDirection, direction);
  const crossAxis = flexDirectionCross(mainAxis, direction);
  const isMainAxisRow = flexDirectionIsRow(mainAxis);

  let childWidth = undefined;
  let childHeight = undefined;
  let childWidthMeasureMode = Enums.MEASURE_MODE_UNDEFINED;
  let childHeightMeasureMode = Enums.MEASURE_MODE_UNDEFINED;

  const marginRow = marginForAxis(child, Enums.FLEX_DIRECTION_ROW, width);
  const marginColumn = marginForAxis(child, Enums.FLEX_DIRECTION_COLUMN, width);

  if (isStyleDimDefined(child, Enums.FLEX_DIRECTION_ROW, width)) {
    childWidth =
      Value.resolve(child.resolvedDimensions[Enums.DIMENSION_WIDTH], width) +
      marginRow;
  } else {
    // If the child doesn't have a specified width, compute the width based
    // on the left/right
    // offsets if they're defined.
    if (
      isLeadingPosDefined(child, Enums.FLEX_DIRECTION_ROW) &&
      isTrailingPosDefined(child, Enums.FLEX_DIRECTION_ROW)
    ) {
      childWidth =
        node.layout.measuredDimensions[Enums.DIMENSION_WIDTH] -
        (leadingBorder(node, Enums.FLEX_DIRECTION_ROW) +
          trailingBorder(node, Enums.FLEX_DIRECTION_ROW)) -
        (leadingPosition(child, Enums.FLEX_DIRECTION_ROW, width) +
          trailingPosition(child, Enums.FLEX_DIRECTION_ROW, width));
      childWidth = boundAxis(
        child,
        Enums.FLEX_DIRECTION_ROW,
        childWidth,
        width,
        width,
      );
    }
  }

  if (isStyleDimDefined(child, Enums.FLEX_DIRECTION_COLUMN, height)) {
    childHeight =
      Value.resolve(child.resolvedDimensions[Enums.DIMENSION_HEIGHT], height) +
      marginColumn;
  } else {
    // If the child doesn't have a specified height, compute the height
    // based on the top/bottom
    // offsets if they're defined.
    if (
      isLeadingPosDefined(child, Enums.FLEX_DIRECTION_COLUMN) &&
      isTrailingPosDefined(child, Enums.FLEX_DIRECTION_COLUMN)
    ) {
      childHeight =
        node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] -
        (leadingBorder(node, Enums.FLEX_DIRECTION_COLUMN) +
          trailingBorder(node, Enums.FLEX_DIRECTION_COLUMN)) -
        (leadingPosition(child, Enums.FLEX_DIRECTION_COLUMN, height) +
          trailingPosition(child, Enums.FLEX_DIRECTION_COLUMN, height));
      childHeight = boundAxis(
        child,
        Enums.FLEX_DIRECTION_COLUMN,
        childHeight,
        height,
        width,
      );
    }
  }

  // Exactly one dimension needs to be defined for us to be able to do aspect ratio
  // calculation. One dimension being the anchor and the other being flexible.
  if (floatIsUndefined(childWidth) ^ floatIsUndefined(childHeight)) {
    if (!floatIsUndefined(child.style.aspectRatio)) {
      if (floatIsUndefined(childWidth)) {
        childWidth =
          marginRow + (childHeight - marginColumn) * child.style.aspectRatio;
      } else if (floatIsUndefined(childHeight)) {
        childHeight =
          marginColumn + (childWidth - marginRow) / child.style.aspectRatio;
      }
    }
  }

  // If we're still missing one or the other dimension, measure the content.
  if (floatIsUndefined(childWidth) || floatIsUndefined(childHeight)) {
    childWidthMeasureMode = floatIsUndefined(childWidth)
      ? Enums.MEASURE_MODE_UNDEFINED
      : Enums.MEASURE_MODE_EXACTLY;
    childHeightMeasureMode = floatIsUndefined(childHeight)
      ? Enums.MEASURE_MODE_UNDEFINED
      : Enums.MEASURE_MODE_EXACTLY;

    // If the size of the parent is defined then try to constrain the absolute child to that size
    // as well. This allows text within the absolute child to wrap to the size of its parent.
    // This is the same behavior as many browsers implement.
    if (
      !isMainAxisRow &&
      floatIsUndefined(childWidth) &&
      widthMode !== Enums.MEASURE_MODE_UNDEFINED &&
      width > 0
    ) {
      childWidth = width;
      childWidthMeasureMode = Enums.MEASURE_MODE_AT_MOST;
    }

    layoutNodeInternal(
      child,
      childWidth,
      childHeight,
      direction,
      childWidthMeasureMode,
      childHeightMeasureMode,
      childWidth,
      childHeight,
      false,
      'abs-measure',
      config,
    );
    childWidth =
      child.layout.measuredDimensions[Enums.DIMENSION_WIDTH] +
      marginForAxis(child, Enums.FLEX_DIRECTION_ROW, width);
    childHeight =
      child.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] +
      marginForAxis(child, Enums.FLEX_DIRECTION_COLUMN, width);
  }

  layoutNodeInternal(
    child,
    childWidth,
    childHeight,
    direction,
    Enums.MEASURE_MODE_EXACTLY,
    Enums.MEASURE_MODE_EXACTLY,
    childWidth,
    childHeight,
    true,
    'abs-layout',
    config,
  );

  if (
    isTrailingPosDefined(child, mainAxis) &&
    !isLeadingPosDefined(child, mainAxis)
  ) {
    child.layout.position[leading[mainAxis]] =
      node.layout.measuredDimensions[dim[mainAxis]] -
      child.layout.measuredDimensions[dim[mainAxis]] -
      trailingBorder(node, mainAxis) -
      trailingMargin(child, mainAxis, width) -
      trailingPosition(child, mainAxis, isMainAxisRow ? width : height);
  } else if (
    !isLeadingPosDefined(child, mainAxis) &&
    node.style.justifyContent == Enums.JUSTIFY_CENTER
  ) {
    child.layout.position[leading[mainAxis]] =
      (node.layout.measuredDimensions[dim[mainAxis]] -
        child.layout.measuredDimensions[dim[mainAxis]]) /
      2;
  } else if (
    !isLeadingPosDefined(child, mainAxis) &&
    node.style.justifyContent == Enums.JUSTIFY_FLEX_END
  ) {
    child.layout.position[leading[mainAxis]] =
      node.layout.measuredDimensions[dim[mainAxis]] -
      child.layout.measuredDimensions[dim[mainAxis]];
  }

  if (
    isTrailingPosDefined(child, crossAxis) &&
    !isLeadingPosDefined(child, crossAxis)
  ) {
    child.layout.position[leading[crossAxis]] =
      node.layout.measuredDimensions[dim[crossAxis]] -
      child.layout.measuredDimensions[dim[crossAxis]] -
      trailingBorder(node, crossAxis) -
      trailingMargin(child, crossAxis, width) -
      trailingPosition(child, crossAxis, isMainAxisRow ? height : width);
  } else if (
    !isLeadingPosDefined(child, crossAxis) &&
    alignItem(node, child) == Enums.ALIGN_CENTER
  ) {
    child.layout.position[leading[crossAxis]] =
      (node.layout.measuredDimensions[dim[crossAxis]] -
        child.layout.measuredDimensions[dim[crossAxis]]) /
      2;
  } else if (
    !isLeadingPosDefined(child, crossAxis) &&
    (alignItem(node, child) == Enums.ALIGN_FLEX_END) ^
      (node.style.flexWrap == Enums.WRAP_WRAP_REVERSE)
  ) {
    child.layout.position[leading[crossAxis]] =
      node.layout.measuredDimensions[dim[crossAxis]] -
      child.layout.measuredDimensions[dim[crossAxis]];
  }
};

const layoutImpl = (
  node,
  availableWidth,
  availableHeight,
  parentDirection,
  widthMeasureMode,
  heightMeasureMode,
  parentWidth,
  parentHeight,
  performLayout,
  config,
) => {
  const direction = resolveDirection(node, parentDirection);
  node.layout.direction = direction;

  const flexRowDirection = resolveFlexDirection(
    Enums.FLEX_DIRECTION_ROW,
    direction,
  );
  const flexColumnDirection = resolveFlexDirection(
    Enums.FLEX_DIRECTION_COLUMN,
    direction,
  );

  node.layout.margin[Enums.EDGE_START] = leadingMargin(
    node,
    flexRowDirection,
    parentWidth,
  );
  node.layout.margin[Enums.EDGE_END] = trailingMargin(
    node,
    flexRowDirection,
    parentWidth,
  );
  node.layout.margin[Enums.EDGE_TOP] = leadingMargin(
    node,
    flexColumnDirection,
    parentWidth,
  );
  node.layout.margin[Enums.EDGE_BOTTOM] = trailingMargin(
    node,
    flexColumnDirection,
    parentWidth,
  );

  node.layout.border[Enums.EDGE_START] = leadingBorder(node, flexRowDirection);
  node.layout.border[Enums.EDGE_END] = trailingBorder(node, flexRowDirection);
  node.layout.border[Enums.EDGE_TOP] = leadingBorder(node, flexColumnDirection);
  node.layout.border[Enums.EDGE_BOTTOM] = trailingBorder(
    node,
    flexColumnDirection,
  );

  node.layout.padding[Enums.EDGE_START] = leadingPadding(
    node,
    flexRowDirection,
    parentWidth,
  );
  node.layout.padding[Enums.EDGE_END] = trailingPadding(
    node,
    flexRowDirection,
    parentWidth,
  );
  node.layout.padding[Enums.EDGE_TOP] = leadingPadding(
    node,
    flexColumnDirection,
    parentWidth,
  );
  node.layout.padding[Enums.EDGE_BOTTOM] = trailingPadding(
    node,
    flexColumnDirection,
    parentWidth,
  );

  if (node.measure) {
    node._withMeasureFuncSetMeasureDimensions(
      availableWidth,
      availableHeight,
      widthMeasureMode,
      heightMeasureMode,
      parentWidth,
      parentHeight,
    );

    return;
  }

  const childCount = listCount(node.children);
  if (childCount === 0) {
    emptyContainerSetMeasuredDimensions(
      node,
      availableWidth,
      availableHeight,
      widthMeasureMode,
      heightMeasureMode,
      parentWidth,
      parentHeight,
    );

    return;
  }

  if (
    !performLayout &&
    fixedSizeSetMeasuredDimensions(
      node,
      availableWidth,
      availableHeight,
      widthMeasureMode,
      heightMeasureMode,
      parentWidth,
      parentHeight,
    )
  ) {
    return;
  }

  // cloneChildrenIfNeeded(node);

  node.layout.hasOverflow = false;

  // STEP 1: CALCULATE VALUES FOR REMAINDER OF ALGORITHM
  const mainAxis = resolveFlexDirection(node.style.flexDirection, direction);
  const crossAxis = flexDirectionCross(mainAxis, direction);
  const isMainAxisRow = flexDirectionIsRow(mainAxis);
  const justifyContent = node.style.justifyContent;
  const isNodeFlexWrap = node.style.flexWrap !== Enums.WRAP_NO_WRAP;

  const mainAxisParentSize = isMainAxisRow ? parentWidth : parentHeight;
  const crossAxisParentSize = isMainAxisRow ? parentHeight : parentWidth;

  let firstAbsoluteChild = null;
  let currentAbsoluteChild = null;

  const leadingPaddingAndBorderMain = leadingPaddingAndBorder(
    node,
    mainAxis,
    parentWidth,
  );
  const trailingPaddingAndBorderMain = trailingPaddingAndBorder(
    node,
    mainAxis,
    parentWidth,
  );
  const leadingPaddingAndBorderCross = leadingPaddingAndBorder(
    node,
    crossAxis,
    parentWidth,
  );
  const paddingAndBorderAxisMain = paddingAndBorderForAxis(
    node,
    mainAxis,
    parentWidth,
  );
  const paddingAndBorderAxisCross = paddingAndBorderForAxis(
    node,
    crossAxis,
    parentWidth,
  );

  const measureModeMainDim = isMainAxisRow
    ? widthMeasureMode
    : heightMeasureMode;
  const measureModeCrossDim = isMainAxisRow
    ? heightMeasureMode
    : widthMeasureMode;

  const paddingAndBorderAxisRow = isMainAxisRow
    ? paddingAndBorderAxisMain
    : paddingAndBorderAxisCross;
  const paddingAndBorderAxisColumn = isMainAxisRow
    ? paddingAndBorderAxisCross
    : paddingAndBorderAxisMain;

  const marginAxisRow = marginForAxis(
    node,
    Enums.FLEX_DIRECTION_ROW,
    parentWidth,
  );
  const marginAxisColumn = marginForAxis(
    node,
    Enums.FLEX_DIRECTION_COLUMN,
    parentWidth,
  );

  // STEP 2: DETERMINE AVAILABLE SIZE IN MAIN AND CROSS DIRECTIONS

  const minInnerWidth =
    Value.resolve(
      node.style.minDimensions[Enums.DIMENSION_WIDTH],
      parentWidth,
    ) - paddingAndBorderAxisRow;
  const maxInnerWidth =
    Value.resolve(
      node.style.maxDimensions[Enums.DIMENSION_WIDTH],
      parentWidth,
    ) - paddingAndBorderAxisRow;
  const minInnerHeight =
    Value.resolve(
      node.style.minDimensions[Enums.DIMENSION_HEIGHT],
      parentHeight,
    ) - paddingAndBorderAxisColumn;
  const maxInnerHeight =
    Value.resolve(
      node.style.maxDimensions[Enums.DIMENSION_HEIGHT],
      parentHeight,
    ) - paddingAndBorderAxisColumn;
  const minInnerMainDim = isMainAxisRow ? minInnerWidth : minInnerHeight;
  const maxInnerMainDim = isMainAxisRow ? maxInnerWidth : maxInnerHeight;

  let availableInnerWidth =
    availableWidth - marginAxisRow - paddingAndBorderAxisRow;
  if (!floatIsUndefined(availableInnerWidth)) {
    availableInnerWidth = Math.max(
      Math.min(availableInnerWidth, maxInnerWidth),
      minInnerWidth,
    );
  }

  let availableInnerHeight =
    availableHeight - marginAxisColumn - paddingAndBorderAxisColumn;
  if (!floatIsUndefined(availableInnerHeight)) {
    availableInnerHeight = Math.max(
      Math.min(availableInnerHeight, maxInnerHeight),
      minInnerHeight,
    );
  }

  let availableInnerMainDim = isMainAxisRow
    ? availableInnerWidth
    : availableInnerHeight;
  const availableInnerCrossDim = isMainAxisRow
    ? availableInnerHeight
    : availableInnerWidth;

  const singleFlexChild = null;
  if (measureModeMainDim === Enums.MEASURE_MODE_EXACTLY) {
    for (var i = 0; i < childCount; i++) {
      const child = node.getChild(i);
      if (singleFlexChild) {
        if (node._isFlex(child)) {
          // There is already a flexible child, abort.
          singleFlexChild = null;
          break;
        }
      } else if (resolveFlexGrow(child) > 0 && resolveFlexShrink(child) > 0) {
        singleFlexChild = child;
      }
    }
  }

  let totalOuterFlexBasis = 0;

  // STEP 3: DETERMINE FLEX BASIS FOR EACH ITEM
  for (var i = 0; i < childCount; i++) {
    const child = node.getChild(i);
    if (child.style.display === Enums.DISPLAY_NONE) {
      node._zeroOutLayoutRecursivly(child);
      child.hasNewLayout = true;
      child.isDirty = false;
      continue;
    }

    resolveDimensions(child);

    if (performLayout) {
      const childDirection = resolveDirection(child, direction);
      setPosition(
        child,
        childDirection,
        availableInnerMainDim,
        availableInnerCrossDim,
        availableInnerWidth,
      );
    }

    // Absolute-positioned children don't participate in flex layout. Add them
    // to a list that we can process later.
    if (child.style.positionType === Enums.POSITION_TYPE_ABSOLUTE) {
      // Store a private linked list of absolutely positioned children
      // so that we can efficiently traverse them later.
      if (firstAbsoluteChild === null) {
        firstAbsoluteChild = child;
      }
      if (currentAbsoluteChild !== null) {
        currentAbsoluteChild.nextChild = child;
      }
      currentAbsoluteChild = child;
      child.nextChild = null;
    } else {
      if (child === singleFlexChild) {
        child.layout.computedFlexBasisGeneration = gCurrentGenerationCount;
        child.layout.computedFlexBasis = 0;
      } else {
        computeFlexBasisForChild(
          node,
          child,
          availableInnerWidth,
          widthMeasureMode,
          availableInnerHeight,
          availableInnerWidth,
          availableInnerHeight,
          heightMeasureMode,
          direction,
          config,
        );
      }
    }

    totalOuterFlexBasis +=
      child.layout.computedFlexBasis +
      marginForAxis(child, mainAxis, availableInnerWidth);
  }

  const flexBasisOverflows =
    measureModeMainDim === Enums.MEASURE_MODE_UNDEFINED
      ? false
      : totalOuterFlexBasis > availableInnerMainDim;

  if (
    isNodeFlexWrap &&
    flexBasisOverflows &&
    measureModeMainDim === Enums.MEASURE_MODE_AT_MOST
  ) {
    measureModeMainDim = Enums.MEASURE_MODE_EXACTLY;
  }

  // STEP 4: COLLECT FLEX ITEMS INTO FLEX LINES

  // Indexes of children that represent the first and last items in the line.
  let startOfLineIndex = 0;
  let endOfLineIndex = 0;

  // Number of lines.
  let lineCount = 0;

  // Accumulated cross dimensions of all lines so far.
  let totalLineCrossDim = 0;

  // Max main dimension of all the lines.
  let maxLineMainDim = 0;

  for (
    var _ = 0;
    endOfLineIndex < childCount;
    lineCount++, startOfLineIndex = endOfLineIndex
  ) {
    let itemsOnLine = 0;
    let sizeConsumedOnCurrentLine = 0;
    let sizeConsumedOnCurrentLineIncludingMinConstraint = 0;
    let totalFlexGrowFactors = 0;
    let totalFlexShrinkScaledFactors = 0;

    // Maintain a linked list of the child nodes that can shrink and/or grow.
    let firstRelativeChild = null;
    let currentRelativeChild = null;

    // Add items to the current line until it's full or we run out of items.
    for (var i = startOfLineIndex; i < childCount; i++, endOfLineIndex++) {
      const child = node.getChild(i);

      if (child.style.display === Enums.DISPLAY_NONE) {
        continue;
      }
      child.lineIndex = lineCount;

      if (child.style.positionType !== Enums.POSITION_TYPE_ABSOLUTE) {
        const childMarginMainAxis = marginForAxis(
          child,
          mainAxis,
          availableInnerWidth,
        );
        const flexBasisWithMaxConstraints = Math.min(
          Value.resolve(
            child.style.maxDimensions[dim[mainAxis]],
            mainAxisParentSize,
          ),
          child.layout.computedFlexBasis,
        );
        const flexBasisWithMinAndMaxConstraints = Math.max(
          Value.resolve(
            child.style.minDimensions[dim[mainAxis]],
            mainAxisParentSize,
          ),
          flexBasisWithMaxConstraints,
        );

        if (
          sizeConsumedOnCurrentLineIncludingMinConstraint +
            flexBasisWithMinAndMaxConstraints +
            childMarginMainAxis >
            availableInnerMainDim &&
          isNodeFlexWrap &&
          itemsOnLine > 0
        ) {
          break;
        }

        sizeConsumedOnCurrentLineIncludingMinConstraint +=
          flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
        sizeConsumedOnCurrentLine +=
          flexBasisWithMinAndMaxConstraints + childMarginMainAxis;
        itemsOnLine++;

        if (isFlex(child)) {
          totalFlexGrowFactors += resolveFlexGrow(child);
          totalFlexShrinkScaledFactors +=
            -resolveFlexShrink(child) * child.layout.computedFlexBasis;
        }

        if (firstRelativeChild === null) {
          firstRelativeChild = child;
        }
        if (currentRelativeChild !== null) {
          currentRelativeChild.nextChild = child;
        }
        currentRelativeChild = child;
        child.nextChild = null;
      }
    }

    // The total flex factor needs to be floored to 1.
    if (totalFlexGrowFactors > 0 && totalFlexGrowFactors < 1) {
      totalFlexGrowFactors = 1;
    }

    // The total flex shrink factor needs to be floored to 1.
    if (totalFlexShrinkScaledFactors > 0 && totalFlexShrinkScaledFactors < 1) {
      totalFlexShrinkScaledFactors = 1;
    }

    // If we don't need to measure the cross axis, we can skip the entire flex step.
    const canSkipFlex =
      !performLayout && measureModeCrossDim === Enums.MEASURE_MODE_EXACTLY;

    // In order to position the elements in the main axis, we have two
    // controls. The space between the beginning and the first element
    // and the space between each two elements.
    let leadingMainDim = 0;
    let betweenMainDim = 0;

    // STEP 5: RESOLVING FLEXIBLE LENGTHS ON MAIN AXIS

    let sizeBasedOnContent = false;

    if (measureModeMainDim !== Enums.MEASURE_MODE_EXACTLY) {
      if (
        !floatIsUndefined(minInnerMainDim) &&
        sizeConsumedOnCurrentLine < minInnerMainDim
      ) {
        availableInnerMainDim = minInnerMainDim;
      } else if (
        !floatIsUndefined(maxInnerMainDim) &&
        sizeConsumedOnCurrentLine > maxInnerMainDim
      ) {
        availableInnerMainDim = maxInnerMainDim;
      } else {
        if (
          !node.config.useLegacyStretchBehaviour &&
          (totalFlexGrowFactors === 0 || resolveFlexGrow(node) === 0)
        ) {
          availableInnerMainDim = sizeConsumedOnCurrentLine;
        }
        sizeBasedOnContent = !node.config.useLegacyStretchBehaviour;
      }
    }

    let remainingFreeSpace = 0;
    if (!sizeBasedOnContent && !floatIsUndefined(availableInnerMainDim)) {
      remainingFreeSpace = availableInnerMainDim - sizeConsumedOnCurrentLine;
    } else if (sizeConsumedOnCurrentLine < 0) {
      remainingFreeSpace = -sizeConsumedOnCurrentLine;
    }

    const originalRemainingFreeSpace = remainingFreeSpace;
    let deltaFreeSpace = 0;

    if (!canSkipFlex) {
      let childFlexBasis;
      let flexShrinkScaledFactor;
      let flexGrowFactor;
      let baseMainSize;
      let boundMainSize;
      let deltaFlexShrinkScaledFactors = 0;
      let deltaFlexGrowFactors = 0;

      currentRelativeChild = firstRelativeChild;

      while (currentRelativeChild !== null) {
        childFlexBasis = Math.min(
          Value.resolve(
            currentRelativeChild.style.maxDimensions[dim[mainAxis]],
            mainAxisParentSize,
          ),
          Math.max(
            Value.resolve(
              currentRelativeChild.style.minDimensions[dim[mainAxis]],
              mainAxisParentSize,
            ),
            currentRelativeChild.layout.computedFlexBasis,
          ),
        );

        if (remainingFreeSpace < 0) {
          flexShrinkScaledFactor =
            -resolveFlexShrink(currentRelativeChild) * childFlexBasis;

          // Is node child able to shrink?
          if (flexShrinkScaledFactor !== 0) {
            baseMainSize =
              childFlexBasis +
              remainingFreeSpace /
                totalFlexShrinkScaledFactors *
                flexShrinkScaledFactor;
            boundMainSize = boundAxis(
              currentRelativeChild,
              mainAxis,
              baseMainSize,
              availableInnerMainDim,
              availableInnerWidth,
            );

            if (baseMainSize !== boundMainSize) {
              deltaFreeSpace -= boundMainSize - childFlexBasis;
              deltaFlexShrinkScaledFactors -= flexShrinkScaledFactor;
            }
          }
        } else if (remainingFreeSpace > 0) {
          flexGrowFactor = resolveFlexGrow(currentRelativeChild);

          // Is node child able to grow?
          if (flexGrowFactor != 0) {
            baseMainSize =
              childFlexBasis +
              remainingFreeSpace / totalFlexGrowFactors * flexGrowFactor;
            boundMainSize = boundAxis(
              currentRelativeChild,
              mainAxis,
              baseMainSize,
              availableInnerMainDim,
              availableInnerWidth,
            );

            if (baseMainSize != boundMainSize) {
              deltaFreeSpace -= boundMainSize - childFlexBasis;
              deltaFlexGrowFactors -= flexGrowFactor;
            }
          }
        }

        currentRelativeChild = currentRelativeChild.nextChild;
      }

      totalFlexShrinkScaledFactors += deltaFlexShrinkScaledFactors;
      totalFlexGrowFactors += deltaFlexGrowFactors;
      remainingFreeSpace += deltaFreeSpace;

      // Second pass: resolve the sizes of the flexible items
      deltaFreeSpace = 0;
      currentRelativeChild = firstRelativeChild;

      while (currentRelativeChild !== null) {
        childFlexBasis = Math.min(
          Value.resolve(
            currentRelativeChild.style.maxDimensions[dim[mainAxis]],
            mainAxisParentSize,
          ),
          Math.max(
            Value.resolve(
              currentRelativeChild.style.minDimensions[dim[mainAxis]],
              mainAxisParentSize,
            ),
            currentRelativeChild.layout.computedFlexBasis,
          ),
        );
        let updatedMainSize = childFlexBasis;

        if (remainingFreeSpace < 0) {
          flexShrinkScaledFactor =
            -resolveFlexShrink(currentRelativeChild) * childFlexBasis;
          // Is node child able to shrink?
          if (flexShrinkScaledFactor !== 0) {
            let childSize;

            if (totalFlexShrinkScaledFactors === 0) {
              childSize = childFlexBasis + flexShrinkScaledFactor;
            } else {
              childSize =
                childFlexBasis +
                remainingFreeSpace /
                  totalFlexShrinkScaledFactors *
                  flexShrinkScaledFactor;
            }

            updatedMainSize = boundAxis(
              currentRelativeChild,
              mainAxis,
              childSize,
              availableInnerMainDim,
              availableInnerWidth,
            );
          }
        } else if (remainingFreeSpace > 0) {
          flexGrowFactor = resolveFlexGrow(currentRelativeChild);

          // Is node child able to grow?
          if (flexGrowFactor !== 0) {
            updatedMainSize = boundAxis(
              currentRelativeChild,
              mainAxis,
              childFlexBasis +
                remainingFreeSpace / totalFlexGrowFactors * flexGrowFactor,
              availableInnerMainDim,
              availableInnerWidth,
            );
          }
        }

        deltaFreeSpace -= updatedMainSize - childFlexBasis;

        const marginMain = marginForAxis(
          currentRelativeChild,
          mainAxis,
          availableInnerWidth,
        );
        const marginCross = marginForAxis(
          currentRelativeChild,
          crossAxis,
          availableInnerWidth,
        );

        let childCrossSize;
        let childMainSize = updatedMainSize + marginMain;
        let childCrossMeasureMode;
        let childMainMeasureMode = Enums.MEASURE_MODE_EXACTLY;

        if (!floatIsUndefined(currentRelativeChild.style.aspectRatio)) {
          childCrossSize = isMainAxisRow
            ? (childMainSize - marginMain) /
              currentRelativeChild.style.aspectRatio
            : (childMainSize - marginMain) *
              currentRelativeChild.style.aspectRatio;
          childCrossMeasureMode = Enums.MEASURE_MODE_EXACTLY;
          childCrossSize += marginCross;
        } else if (
          !floatIsUndefined(availableInnerCrossDim) &&
          !isStyleDimDefined(
            currentRelativeChild,
            crossAxis,
            availableInnerCrossDim,
          ) &&
          measureModeCrossDim == Enums.MEASURE_MODE_EXACTLY &&
          !(isNodeFlexWrap && flexBasisOverflows) &&
          alignItem(node, currentRelativeChild) == Enums.ALIGN_STRETCH &&
          marginLeadingValue(currentRelativeChild, crossAxis).unit !==
            Enums.UNIT_AUTO &&
          marginTrailingValue(currentRelativeChild, crossAxis).unit !==
            Enums.UNIT_AUTO
        ) {
          childCrossSize = availableInnerCrossDim;
          childCrossMeasureMode = Enums.MEASURE_MODE_EXACTLY;
        } else if (
          !isStyleDimDefined(
            currentRelativeChild,
            crossAxis,
            availableInnerCrossDim,
          )
        ) {
          childCrossSize = availableInnerCrossDim;
          childCrossMeasureMode = floatIsUndefined(childCrossSize)
            ? Enums.MEASURE_MODE_UNDEFINED
            : Enums.MEASURE_MODE_AT_MOST;
        } else {
          childCrossSize =
            Value.resolve(
              currentRelativeChild.resolvedDimensions[dim[crossAxis]],
              availableInnerCrossDim,
            ) + marginCross;
          const isLoosePercentageMeasurement =
            currentRelativeChild.resolvedDimensions[dim[crossAxis]].unit ===
              Enums.UNIT_PERCENT &&
            measureModeCrossDim !== Enums.MEASURE_MODE_EXACTLY;
          childCrossMeasureMode =
            floatIsUndefined(childCrossSize) || isLoosePercentageMeasurement
              ? Enums.MEASURE_MODE_UNDEFINED
              : Enums.MEASURE_MODE_EXACTLY;
        }

        constrainMaxSizeForMode(
          currentRelativeChild,
          mainAxis,
          availableInnerMainDim,
          availableInnerWidth,
          childMainMeasureMode,
          childMainSize,
        );
        constrainMaxSizeForMode(
          currentRelativeChild,
          crossAxis,
          availableInnerCrossDim,
          availableInnerWidth,
          childCrossMeasureMode,
          childCrossSize,
        );

        const requiresStretchLayout =
          !isStyleDimDefined(
            currentRelativeChild,
            crossAxis,
            availableInnerCrossDim,
          ) &&
          alignItem(node, currentRelativeChild) === Enums.ALIGN_STRETCH &&
          marginLeadingValue(currentRelativeChild, crossAxis).unit !==
            Enums.UNIT_AUTO &&
          marginTrailingValue(currentRelativeChild, crossAxis).unit !==
            Enums.UNIT_AUTO;

        const childWidth = isMainAxisRow ? childMainSize : childCrossSize;
        const childHeight = !isMainAxisRow ? childMainSize : childCrossSize;

        const childWidthMeasureMode = isMainAxisRow
          ? childMainMeasureMode
          : childCrossMeasureMode;
        const childHeightMeasureMode = !isMainAxisRow
          ? childMainMeasureMode
          : childCrossMeasureMode;

        // Recursively call the layout algorithm for node child with the updated main size.
        layoutNodeInternal(
          currentRelativeChild,
          childWidth,
          childHeight,
          direction,
          childWidthMeasureMode,
          childHeightMeasureMode,
          availableInnerWidth,
          availableInnerHeight,
          performLayout && !requiresStretchLayout,
          'flex',
          config,
        );

        node.layout.hadOverflow =
          node.layout.hadOverflow | currentRelativeChild.layout.hadOverflow;

        currentRelativeChild = currentRelativeChild.nextChild;
      }

      remainingFreeSpace = originalRemainingFreeSpace + deltaFreeSpace;
      node.layout.hadOverflow =
        node.layout.hadOverflow | (remainingFreeSpace < 0);

      // STEP 6: MAIN-AXIS JUSTIFICATION & CROSS-AXIS SIZE DETERMINATION

      if (
        measureModeMainDim === Enums.MEASURE_MODE_AT_MOST &&
        remainingFreeSpace > 0
      ) {
        if (
          node.style.minDimensions[dim[mainAxis]].unit !==
            Enums.UNIT_UNDEFINED &&
          Value.resolve(
            node.style.minDimensions[dim[mainAxis]],
            mainAxisParentSize,
          ) >= 0
        ) {
          remainingFreeSpace = Math.max(
            0,
            Value.resolve(
              node.style.minDimensions[dim[mainAxis]],
              mainAxisParentSize,
            ) -
              (availableInnerMainDim - remainingFreeSpace),
          );
        } else {
          remainingFreeSpace = 0;
        }
      }

      let numberOfAutoMarginsOnCurrentLine = 0;

      for (var i = startOfLineIndex; i < endOfLineIndex; i++) {
        const child = node.getChild(i);
        if (child.style.positionType === Enums.POSITION_TYPE_RELATIVE) {
          if (marginLeadingValue(child, mainAxis).unit === Enums.UNIT_AUTO) {
            numberOfAutoMarginsOnCurrentLine++;
          }
          if (marginTrailingValue(child, mainAxis).unit === Enums.UNIT_AUTO) {
            numberOfAutoMarginsOnCurrentLine++;
          }
        }
      }

      if (numberOfAutoMarginsOnCurrentLine === 0) {
        switch (justifyContent) {
          case Enums.JUSTIFY_CENTER:
            leadingMainDim = remainingFreeSpace / 2;
            break;
          case Enums.JUSTIFY_FLEX_END:
            leadingMainDim = remainingFreeSpace;
            break;
          case Enums.JUSTIFY_SPACE_BETWEEN:
            if (itemsOnLine > 1) {
              betweenMainDim =
                Math.max(remainingFreeSpace, 0) / (itemsOnLine - 1);
            } else {
              betweenMainDim = 0;
            }
            break;
          case Enums.JUSTIFY_SPACE_EVENLY:
            // Space is distributed evenly across all elements
            betweenMainDim = remainingFreeSpace / (itemsOnLine + 1);
            leadingMainDim = betweenMainDim;
            break;
          case Enums.JUSTIFY_SPACE_AROUND:
            // Space on the edges is half of the space between elements
            betweenMainDim = remainingFreeSpace / itemsOnLine;
            leadingMainDim = betweenMainDim / 2;
            break;
          case Enums.JUSTIFY_FLEX_START:
            break;
        }
      }

      let mainDim = leadingPaddingAndBorderMain + leadingMainDim;
      let crossDim = 0;

      for (var i = startOfLineIndex; i < endOfLineIndex; i++) {
        const child = node.getChild(i);
        if (child.style.display === Enums.DISPLAY_NONE) {
          continue;
        }
        if (
          child.style.positionType == Enums.POSITION_TYPE_ABSOLUTE &&
          isLeadingPosDefined(child, mainAxis)
        ) {
          if (performLayout) {
            child.layout.position[pos[mainAxis]] =
              leadingPosition(child, mainAxis, availableInnerMainDim) +
              leadingBorder(node, mainAxis) +
              leadingMargin(child, mainAxis, availableInnerWidth);
          }
        } else {
          if (child.style.positionType === Enums.POSITION_TYPE_RELATIVE) {
            if (marginLeadingValue(child, mainAxis).unit === Enums.UNIT_AUTO) {
              mainDim += remainingFreeSpace / numberOfAutoMarginsOnCurrentLine;
            }

            if (performLayout) {
              child.layout.position[pos[mainAxis]] += mainDim;
            }

            if (marginTrailingValue(child, mainAxis).unit === Enums.UNIT_AUTO) {
              mainDim += remainingFreeSpace / numberOfAutoMarginsOnCurrentLine;
            }

            if (canSkipFlex) {
              mainDim +=
                betweenMainDim +
                marginForAxis(child, mainAxis, availableInnerWidth) +
                child.layout.computedFlexBasis;
              crossDim = availableInnerCrossDim;
            } else {
              mainDim +=
                betweenMainDim +
                dimWithMargin(child, mainAxis, availableInnerWidth);
              crossDim = Math.max(
                crossDim,
                dimWithMargin(child, crossAxis, availableInnerWidth),
              );
            }
          } else if (performLayout) {
            child.layout.position[pos[mainAxis]] +=
              leadingBorder(node, mainAxis) + leadingMainDim;
          }
        }
      }

      mainDim += trailingPaddingAndBorderMain;

      let containerCrossAxis = availableInnerCrossDim;
      if (
        measureModeCrossDim === Enums.MEASURE_MODE_UNDEFINED ||
        measureModeCrossDim === Enums.MEASURE_MODE_AT_MOST
      ) {
        containerCrossAxis =
          boundAxis(
            node,
            crossAxis,
            crossDim + paddingAndBorderAxisCross,
            crossAxisParentSize,
            parentWidth,
          ) - paddingAndBorderAxisCross;
      }

      if (
        !isNodeFlexWrap &&
        measureModeCrossDim == Enums.MEASURE_MODE_EXACTLY
      ) {
        crossDim = availableInnerCrossDim;
      }

      crossDim =
        boundAxis(
          node,
          crossAxis,
          crossDim + paddingAndBorderAxisCross,
          crossAxisParentSize,
          parentWidth,
        ) - paddingAndBorderAxisCross;

      // STEP 7: CROSS-AXIS ALIGNMENT
      // We can skip child alignment if we're just measuring the container.
      if (performLayout) {
        for (var i = startOfLineIndex; i < endOfLineIndex; i++) {
          const child = node.getChild(i);
          if (child.style.display === Enums.DISPLAY_NONE) {
            continue;
          }
          if (child.style.positionType === Enums.POSITION_TYPE_ABSOLUTE) {
            // If the child is absolutely positioned and has a
            // top/left/bottom/right
            // set, override all the previously computed positions to set it
            // correctly.
            const isChildLeadingPosDefined = isLeadingPosDefined(
              child,
              crossAxis,
            );
            if (isChildLeadingPosDefined) {
              child.layout.position[pos[crossAxis]] =
                leadingPosition(child, crossAxis, availableInnerCrossDim) +
                leadingBorder(node, crossAxis) +
                leadingMargin(child, crossAxis, availableInnerWidth);
            }
            // If leading position is not defined or calculations result in Nan, default to border + margin
            if (
              !isChildLeadingPosDefined ||
              floatIsUndefined(child.layout.position[pos[crossAxis]])
            ) {
              child.layout.position[pos[crossAxis]] =
                leadingBorder(node, crossAxis) +
                leadingMargin(child, crossAxis, availableInnerWidth);
            }
          } else {
            let leadingCrossDim = leadingPaddingAndBorderCross;
            const alignItemValue = alignItem(node, child);

            if (
              alignItemValue == YGAlignStretch &&
              marginLeadingValue(child, crossAxis).unit !== Enums.UNIT_AUTO &&
              marginTrailingValue(child, crossAxis).unit !== Enums.UNIT_AUTO
            ) {
              // If the child defines a definite size for its cross axis, there's
              // no need to stretch.
              if (
                !isStyleDimDefined(child, crossAxis, availableInnerCrossDim)
              ) {
                let childMainSize =
                  child.layout.measuredDimensions[dim[mainAxis]];
                let childCrossSize = !floatIsUndefined(child.style.aspectRatio)
                  ? marginForAxis(child, crossAxis, availableInnerWidth) +
                    (isMainAxisRow
                      ? childMainSize / child.style.aspectRatio
                      : childMainSize * child.style.aspectRatio)
                  : crossDim;

                childMainSize += marginForAxis(
                  child,
                  mainAxis,
                  availableInnerWidth,
                );

                let childMainMeasureMode = Enums.MEASURE_MODE_EXACTLY;
                let childCrossMeasureMode = Enums.MEASURE_MODE_EXACTLY;

                constrainMaxSizeForMode(
                  child,
                  mainAxis,
                  availableInnerMainDim,
                  availableInnerWidth,
                  childMainMeasureMode,
                  childMainSize,
                );
                constrainMaxSizeForMode(
                  child,
                  crossAxis,
                  availableInnerCrossDim,
                  availableInnerWidth,
                  childCrossMeasureMode,
                  childCrossSize,
                );

                const childWidth = isMainAxisRow
                  ? childMainSize
                  : childCrossSize;
                const childHeight = !isMainAxisRow
                  ? childMainSize
                  : childCrossSize;

                const childWidthMeasureMode = floatIsUndefined(childWidth)
                  ? Enums.MEASURE_MODE_UNDEFINED
                  : Enums.MEASURE_MODE_EXACTLY;
                const childHeightMeasureMode = floatIsUndefined(childHeight)
                  ? Enums.MEASURE_MODE_UNDEFINED
                  : Enums.MEASURE_MODE_EXACTLY;

                layoutNodeInternal(
                  child,
                  childWidth,
                  childHeight,
                  direction,
                  childWidthMeasureMode,
                  childHeightMeasureMode,
                  availableInnerWidth,
                  availableInnerHeight,
                  true,
                  'stretch',
                  config,
                );
              }
            } else {
              const remainingCrossDim =
                containerCrossAxis -
                dimWithMargin(child, crossAxis, availableInnerWidth);

              if (
                marginLeadingValue(child, crossAxis).unit == Enums.UNIT_AUTO &&
                marginTrailingValue(child, crossAxis).unit == Enums.UNIT_AUTO
              ) {
                leadingCrossDim += Math.max(0, remainingCrossDim / 2);
              } else if (
                marginTrailingValue(child, crossAxis).unit == Enums.UNIT_AUTO
              ) {
                // No-Op
              } else if (
                marginLeadingValue(child, crossAxis).unit == Enums.UNIT_AUTO
              ) {
                leadingCrossDim += Math.max(0, remainingCrossDim);
              } else if (alignItemValue == Enums.ALIGN_FLEX_START) {
                // No-Op
              } else if (alignItemValue == Enums.ALIGN_CENTER) {
                leadingCrossDim += remainingCrossDim / 2;
              } else {
                leadingCrossDim += remainingCrossDim;
              }
            }

            // And we apply the position
            child.layout.position[pos[crossAxis]] +=
              totalLineCrossDim + leadingCrossDim;
          }
        }
      }

      totalLineCrossDim += crossDim;
      maxLineMainDim = Math.max(maxLineMainDim, mainDim);
    }

    // STEP 8: MULTI-LINE CONTENT ALIGNMENT
    if (
      performLayout &&
      (lineCount > 1 || isBaselineLayout(node)) &&
      !floatIsUndefined(availableInnerCrossDim)
    ) {
      const remainingAlignContentDim =
        availableInnerCrossDim - totalLineCrossDim;
      let crossDimLead = 0;
      let currentLead = leadingPaddingAndBorderCross;

      switch (node.style.alignContent) {
        case Enums.ALIGN_FLEX_END:
          currentLead += remainingAlignContentDim;
          break;
        case Enums.ALIGN_CENTER:
          currentLead += remainingAlignContentDim / 2;
          break;
        case Enums.ALIGN_STRETCH:
          if (availableInnerCrossDim > totalLineCrossDim) {
            crossDimLead = remainingAlignContentDim / lineCount;
          }
          break;
        case Enums.ALIGN_SPACE_AROUND:
          if (availableInnerCrossDim > totalLineCrossDim) {
            currentLead += remainingAlignContentDim / (2 * lineCount);
            if (lineCount > 1) {
              crossDimLead = remainingAlignContentDim / lineCount;
            }
          } else {
            currentLead += remainingAlignContentDim / 2;
          }
          break;
        case Enums.ALIGN_SPACE_BETWEEN:
          if (availableInnerCrossDim > totalLineCrossDim && lineCount > 1) {
            crossDimLead = remainingAlignContentDim / (lineCount - 1);
          }
          break;
        case Enums.ALIGN_AUTO:
        case Enums.ALIGN_FLEX_START:
        case Enums.ALIGN_BASELINE:
          break;
      }

      let endIndex = 0;
      for (var i = 0; i < lineCount; i++) {
        const startIndex = endIndex;
        let ii;

        // compute the line's height and find the endIndex
        let lineHeight = 0;
        let maxAscentForCurrentLine = 0;
        let maxDescentForCurrentLine = 0;

        for (ii = startIndex; ii < childCount; ii++) {
          const child = node.getChild(ii);
          if (child.style.display == Enums.DISPLAY_NONE) {
            continue;
          }
          if (child.style.positionType == Enums.POSITION_TYPE_RELATIVE) {
            if (child.lineIndex !== i) {
              break;
            }
            if (isLayoutDimDefined(child, crossAxis)) {
              lineHeight = Math.max(
                lineHeight,
                child.layout.measuredDimensions[dim[crossAxis]] +
                  marginForAxis(child, crossAxis, availableInnerWidth),
              );
            }
            if (alignItem(node, child) === Enums.ALIGN_BASELINE) {
              const ascent =
                baseline(child) +
                leadingMargin(
                  child,
                  Enums.FLEX_DIRECTION_COLUMN,
                  availableInnerWidth,
                );
              const descent =
                child.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] +
                marginForAxis(
                  child,
                  Enums.FLEX_DIRECTION_COLUMN,
                  availableInnerWidth,
                ) -
                ascent;
              maxAscentForCurrentLine = Math.max(
                maxAscentForCurrentLine,
                ascent,
              );
              maxDescentForCurrentLine = Math.max(
                maxDescentForCurrentLine,
                descent,
              );
              lineHeight = Math.max(
                lineHeight,
                maxAscentForCurrentLine + maxDescentForCurrentLine,
              );
            }
          }
        }

        endIndex = ii;
        lineHeight += crossDimLead;

        if (performLayout) {
          for (ii = startIndex; ii < endIndex; ii++) {
            const child = node.getChild(ii);
            if (child.style.display === YGDisplayNone) {
              continue;
            }
            if (child.style.positionType === Enums.POSITION_TYPE_RELATIVE) {
              switch (alignItem(node, child)) {
                case Enums.ALIGN_FLEX_START: {
                  child.layout.position[pos[crossAxis]] =
                    currentLead +
                    leadingMargin(child, crossAxis, availableInnerWidth);
                  break;
                }
                case Enums.ALIGN_FLEX_END: {
                  child.layout.position[pos[crossAxis]] =
                    currentLead +
                    lineHeight -
                    trailingMargin(child, crossAxis, availableInnerWidth) -
                    child.layout.measuredDimensions[dim[crossAxis]];
                  break;
                }
                case Enums.ALIGN_CENTER: {
                  let childHeight =
                    child.layout.measuredDimensions[dim[crossAxis]];
                  child.layout.position[pos[crossAxis]] =
                    currentLead + (lineHeight - childHeight) / 2;
                  break;
                }
                case Enums.ALIGN_STRETCH: {
                  child.layout.position[pos[crossAxis]] =
                    currentLead +
                    leadingMargin(child, crossAxis, availableInnerWidth);

                  if (
                    !isStyleDimDefined(child, crossAxis, availableInnerCrossDim)
                  ) {
                    const childWidth = isMainAxisRow
                      ? child.layout.measuredDimensions[Enums.DIMENSION_WIDTH] +
                        marginForAxis(child, mainAxis, availableInnerWidth)
                      : lineHeight;

                    const childHeight = !isMainAxisRow
                      ? child.layout.measuredDimensions[
                          Enums.DIMENSION_HEIGHT
                        ] + marginForAxis(child, crossAxis, availableInnerWidth)
                      : lineHeight;

                    if (
                      !(
                        floatsEqual(
                          childWidth,
                          child.layout.measuredDimensions[
                            Enums.DIMENSION_WIDTH
                          ],
                        ) &&
                        floatsEqual(
                          childHeight,
                          child.layout.measuredDimensions[
                            Enums.DIMENSION_HEIGHT
                          ],
                        )
                      )
                    ) {
                      layoutNodeInternal(
                        child,
                        childWidth,
                        childHeight,
                        direction,
                        YGMeasureModeExactly,
                        YGMeasureModeExactly,
                        availableInnerWidth,
                        availableInnerHeight,
                        true,
                        'multiline-stretch',
                        config,
                      );
                    }
                  }
                  break;
                }
                case Enums.ALIGN_BASELINE: {
                  child.layout.position[YGEdgeTop] =
                    currentLead +
                    maxAscentForCurrentLine -
                    baseline(child) +
                    leadingPosition(
                      child,
                      Enums.FLEX_DIRECTION_COLUMN,
                      availableInnerCrossDim,
                    );
                  break;
                }
                case Enums.ALIGN_AUTO:
                case Enums.ALIGN_SPACE_BETWEEN:
                case Enums.ALIGN_SPACE_AROUND:
                  break;
              }
            }
          }
        }

        currentLead += lineHeight;
      }
    }

    // STEP 9: COMPUTING FINAL DIMENSIONS
    node.layout.measuredDimensions[Enums.DIMENSION_WIDTH] = boundAxis(
      node,
      Enums.FLEX_DIRECTION_ROW,
      availableWidth - marginAxisRow,
      parentWidth,
      parentWidth,
    );
    node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] = boundAxis(
      node,
      Enums.FLEX_DIRECTION_COLUMN,
      availableHeight - marginAxisColumn,
      parentHeight,
      parentWidth,
    );

    // If the user didn't specify a width or height for the node, set the
    // dimensions based on the children.
    if (
      measureModeMainDim === Enums.MEASURE_MODE_UNDEFINED ||
      (node.style.overflow !== Enums.OVERFLOW_SCROLL &&
        measureModeMainDim === Enums.MEASURE_MODE_AT_MOST)
    ) {
      // Clamp the size to the min/max size, if specified, and make sure it
      // doesn't go below the padding and border amount.
      node.layout.measuredDimensions[dim[mainAxis]] = boundAxis(
        node,
        mainAxis,
        maxLineMainDim,
        mainAxisParentSize,
        parentWidth,
      );
    } else if (
      measureModeMainDim === Enums.MEASURE_MODE_AT_MOST &&
      node.style.overflow === Enums.OVERFLOW_SCROLL
    ) {
      node.layout.measuredDimensions[dim[mainAxis]] = Math.max(
        Math.min(
          availableInnerMainDim + paddingAndBorderAxisMain,
          boundAxisWithinMinAndMax(
            node,
            mainAxis,
            maxLineMainDim,
            mainAxisParentSize,
          ),
        ),
        paddingAndBorderAxisMain,
      );
    }

    if (
      measureModeCrossDim === Enums.MEASURE_MODE_UNDEFINED ||
      (node.style.overflow !== Enums.OVERFLOW_SCROLL &&
        measureModeCrossDim == Enums.MEASURE_MODE_AT_MOST)
    ) {
      // Clamp the size to the min/max size, if specified, and make sure it
      // doesn't go below the padding and border amount.
      node.layout.measuredDimensions[dim[crossAxis]] = boundAxis(
        node,
        crossAxis,
        totalLineCrossDim + paddingAndBorderAxisCross,
        crossAxisParentSize,
        parentWidth,
      );
    } else if (
      measureModeCrossDim === Enums.MEASURE_MODE_AT_MOST &&
      node.style.overflow === Enums.OVERFLOW_SCROLL
    ) {
      node.layout.measuredDimensions[dim[crossAxis]] = Math.max(
        Math.min(
          availableInnerCrossDim + paddingAndBorderAxisCross,
          boundAxisWithinMinAndMax(
            node,
            crossAxis,
            totalLineCrossDim + paddingAndBorderAxisCross,
            crossAxisParentSize,
          ),
        ),
        paddingAndBorderAxisCross,
      );
    }

    // As we only wrapped in normal direction yet, we need to reverse the positions on wrap-reverse.
    if (performLayout && node.style.flexWrap === Enums.WRAP_WRAP_REVERSE) {
      for (let i = 0; i < childCount; i++) {
        const child = node.getChild(i);
        if (child.style.positionType === Enums.POSITION_TYPE_RELATIVE) {
          child.layout.position[pos[crossAxis]] =
            node.layout.measuredDimensions[dim[crossAxis]] -
            child.layout.position[pos[crossAxis]] -
            child.layout.measuredDimensions[dim[crossAxis]];
        }
      }
    }

    if (performLayout) {
      // STEP 10: SIZING AND POSITIONING ABSOLUTE CHILDREN
      for (
        currentAbsoluteChild = firstAbsoluteChild;
        currentAbsoluteChild != null;
        currentAbsoluteChild = currentAbsoluteChild.nextChild
      ) {
        absoluteLayoutChild(
          node,
          currentAbsoluteChild,
          availableInnerWidth,
          isMainAxisRow ? measureModeMainDim : measureModeCrossDim,
          availableInnerHeight,
          direction,
          config,
        );
      }

      // STEP 11: SETTING TRAILING POSITIONS FOR CHILDREN
      const needsMainTrailingPos =
        mainAxis == Enums.FLEX_DIRECTION_ROW_REVERSE ||
        mainAxis == Enums.FLEX_DIRECTION_COLUMN_REVERSE;
      const needsCrossTrailingPos =
        crossAxis == Enums.FLEX_DIRECTION_ROW_REVERSE ||
        crossAxis == Enums.FLEX_DIRECTION_COLUMN_REVERSE;

      // Set trailing position if necessary.
      if (needsMainTrailingPos || needsCrossTrailingPos) {
        for (let i = 0; i < childCount; i++) {
          const child = node.getChild(i);
          if (child.style.display == Enums.DISPLAY_NONE) {
            continue;
          }
          if (needsMainTrailingPos) {
            setChildTrailingPosition(node, child, mainAxis);
          }

          if (needsCrossTrailingPos) {
            setChildTrailingPosition(node, child, crossAxis);
          }
        }
      }
    }
  }
};

const markDirtyInternal = node => {
  if (!node.isDirty) {
    node.isDirty = true;
    node.layout.computedFlexBasis = null;

    if (node.parent) {
      markDirtyInternal(node.parent);
    }
  }
};

const roundToPixelGrid = (
  node,
  pointScaleFactor,
  absoluteLeft,
  absoluteTop,
) => {
  if (pointScaleFactor === 0) return;

  const nodeLeft = node.layout.position[Enums.EDGE_LEFT];
  const nodeTop = node.layout.position[Enums.EDGE_TOP];

  const nodeWidth = node.layout.dimensions[Enums.DIMENSION_WIDTH];
  const nodeHeight = node.layout.dimensions[Enums.DIMENSION_HEIGHT];

  const absoluteNodeLeft = absoluteLeft + nodeLeft;
  const absoluteNodeTop = absoluteTop + nodeTop;

  const absoluteNodeRight = absoluteNodeLeft + nodeWidth;
  const absoluteNodeBottom = absoluteNodeTop + nodeHeight;

  const textRounding = node.nodeType == NODE_TYPE.TEXT;
};

class Node {
  static create() {
    return new Node();
  }

  static createDefault() {
    return new Node();
  }

  constructor(config = {}) {
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
    this.resolvedDimensions = Value.defaultDimensionValues();
  }

  calculateLayout(parentWidth, parentHeight, parentDirection) {
    gCurrentGenerationCount++;

    resolveDimensions(this);

    let width;
    let height;
    let widthMeasureMode;
    let heightMeasureMode;

    if (isStyleDimDefined(this, Enums.FLEX_DIRECTION_ROW, parentWidth)) {
      width =
        Value.resolve(
          this.resolvedDimensions[dim[Enums.FLEX_DIRECTION_ROW]],
          parentWidth,
        ) + marginForAxis(this, Enums.FLEX_DIRECTION_ROW, parentWidth);
      widthMeasureMode = Enums.MEASURE_MODE_EXACTLY;
    } else if (
      Value.resolve(
        this.style.maxDimensions[Enums.DIMENSION_WIDTH],
        parentWidth,
      ) >= 0
    ) {
      width = Value.resolve(
        this.style.maxDimensions[Enums.DIMENSION_WIDTH],
        parentWidth,
      );
      widthMeasureMode = Enums.MEASURE_MODE_AT_MOST;
    } else {
      width = parentWidth;
      widthMeasureMode = !width
        ? Enums.MEASURE_MODE_UNDEFINED
        : Enums.MEASURE_MODE_EXACTLY; // TODO: isNil
    }

    if (isStyleDimDefined(this, Enums.FLEX_DIRECTION_COLUMN, parentHeight)) {
      height =
        Value.resolve(
          this.resolvedDimensions[dim[Enums.FLEX_DIRECTION_COLUMN]],
          parentHeight,
        ) + marginForAxis(this, Enums.FLEX_DIRECTION_COLUMN, parentWidth);
      heightMeasureMode = Enums.MEASURE_MODE_EXACTLY;
    } else if (
      Value.resolve(
        this.style.maxDimensions[Enums.DIMENSION_HEIGHT],
        parentHeight,
      ) >= 0
    ) {
      height = Value.resolve(
        this.style.maxDimensions[Enums.DIMENSION_HEIGHT],
        parentHeight,
      );
      heightMeasureMode = Enums.MEASURE_MODE_AT_MOST;
    } else {
      height = parentHeight;
      heightMeasureMode = !height
        ? Enums.MEASURE_MODE_UNDEFINED
        : Enums.MEASURE_MODE_EXACTLY; // TODO: isNil
    }

    if (
      layoutNodeInternal(
        this,
        width,
        height,
        parentDirection,
        widthMeasureMode,
        heightMeasureMode,
        parentWidth,
        parentHeight,
        true,
        'initial',
        this.config,
      )
    ) {
      setPosition(
        this,
        this.layout.direction,
        parentWidth,
        parentWidth,
        parentWidth,
      );
      roundToPixelGrid(this, this.config.pointScaleFactor, 0, 0);
    }
  }

  copyStyle(node) {}

  free() {}

  freeRecursive() {}

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
    return this.layout.position[Enums.EDGE_BOTTOM];
  }

  getComputedHeight() {
    return this.layout.dimensions[Enums.DIMENSION_HEIGHT];
  }

  getComputedLayout() {
    return {
      left: this.getComputedLeft(),
      right: this.getComputedRight(),
      top: this.getComputedTop(),
      bottom: this.getComputedBottom(),
      height: this.getComputedHeight(),
      width: this.getComputedWidth(),
    };
  }

  getComputedLeft() {
    return this.layout.position[Enums.EDGE_LEFT];
  }

  getComputedMargin(edge) {
    return this.layout.margin[edge];
  }

  getComputedPadding(edge) {
    return this.layout.padding[edge];
  }

  getComputedRight() {
    return this.layout.position[Enums.EDGE_RIGHT];
  }

  getComputedTop() {
    return this.layout.position[Enums.EDGE_TOP];
  }

  getComputedWidth() {
    return this.layout.dimensions[Enums.DIMENSION_WIDTH];
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
      console.log(
        'Cannot add child: Nodes with measure functions cannot have children.',
      );
      return;
    }

    this.children.push(child);
  }

  isDirty() {
    return this.isDirty;
  }

  markDirty() {
    if (!this.measure) {
      console.log(
        'Only leaf nodes with custom measure functions should manually mark themselves as dirty',
      );
      return;
    }

    markDirtyInternal(this);
  }

  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
  }

  reset() {
    if (this.getChildCount() === 0) {
      console.log('Cannot reset a node which still has children attached');
      return;
    }

    if (!!this.getParent()) {
      console.log('Cannot reset a node still attached to a parent');
      return;
    }

    // TODO: implement the YGNodeListFree
  }

  setMeasureFunc(func) {
    if (!func) {
      this.measure = null;
      this.nodeType = NODE_TYPE.DEFAULT;
    } else {
      if (this.getChildCount() === 0) {
        console.log(
          'Cannot set measure function: Nodes with measure functions cannot have children.',
        );
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
    return this.style.aspectRatio;
  }

  getBorder(edge) {
    return this.style.border[edge].value;
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

  getFlexShrink() {
    //TODO: Check for config.useWebDefaults as real code
    return this.style.flexShrink;
  }

  getFlexWrap() {
    return this.style.flexWrap;
  }

  getHeight() {
    return this.style.dimensions[Enums.DIMENSION_HEIGHT];
  }

  getJustifyContent() {
    return this.style.justifyContent;
  }

  getMargin(edge) {
    return this.style.margin[edge];
  }

  getMaxHeight() {
    return this.style.maxDimensions[Enums.DIMENSION_HEIGHT];
  }

  getMaxWidth() {
    return this.style.maxDimensions[Enums.DIMENSION_WIDTH];
  }

  getMinHeight() {
    return this.style.minDimensions[Enums.DIMENSION_HEIGHT];
  }

  getMinWidth() {
    return this.style.minDimensions[Enums.DIMENSION_WIDTH];
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
    return this.style.dimensions[Enums.DIMENSION_WIDTH];
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
    this.style.border[edge].value = border;
  }

  setDisplay(display) {
    this.style.display = display;
  }

  setFlex(flex) {
    this.style.flex = flex;
  }

  setFlexBasis(flexBasis) {
    this.style.flexBasis.value = flexBasis;
    this.style.flexBasis.unit = Enums.UNIT_POINT;
  }

  setFlexBasisPercent(flexBasis) {
    this.style.flexBasis.value = flexBasis;
    this.style.flexBasis.unit = Enums.UNIT_PERCENT;
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
    this.style.dimensions[Enums.DIMENSION_HEIGHT].value = height;
    this.style.dimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_POINT;
  }

  setHeightAuto() {
    this.style.dimensions[Enums.DIMENSION_HEIGHT].value = NaN;
    this.style.dimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_AUTO;
  }

  setHeightPercent(height) {
    this.style.dimensions[Enums.DIMENSION_HEIGHT].value = height;
    this.style.dimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_PERCENT;
  }

  setJustifyContent(justifyContent) {
    this.style.justifyContent = justifyContent;
  }

  setMargin(edge, margin) {
    this.style.margin[edge].value = margin;
    this.style.margin[edge].unit = Enums.UNIT_POINT;
  }

  setMarginAuto(edge) {
    this.style.margin[edge].unit = Enums.UNIT_AUTO;
  }

  setMarginPercent(edge, margin) {
    this.style.margin[edge].value = margin;
    this.style.margin[edge].unit = Enums.UNIT_PERCENT;
  }

  setMaxHeight(maxHeight) {
    this.style.maxDimensions[Enums.DIMENSION_HEIGHT].value = maxHeight;
    this.style.maxDimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_POINT;
  }

  setMaxHeightPercent(maxHeight) {
    this.style.maxDimensions[Enums.DIMENSION_HEIGHT].value = maxHeight;
    this.style.maxDimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_PERCENT;
  }

  setMaxWidth(maxWidth) {
    this.style.maxDimensions[Enums.DIMENSION_WIDTH].value = maxWidth;
    this.style.maxDimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_POINT;
  }

  setMaxWidthPercent(maxWidth) {
    this.style.maxDimensions[Enums.DIMENSION_WIDTH].value = maxWidth;
    this.style.maxDimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_PERCENT;
  }

  setMinHeight(minHeight) {
    this.style.minDimensions[Enums.DIMENSION_HEIGHT].value = minHeight;
    this.style.minDimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_POINT;
  }

  setMinHeightPercent(minHeight) {
    this.style.minDimensions[Enums.DIMENSION_HEIGHT].value = minHeight;
    this.style.minDimensions[Enums.DIMENSION_HEIGHT].unit = Enums.UNIT_PERCENT;
  }

  setMinWidth(minWidth) {
    this.style.minDimensions[Enums.DIMENSION_WIDTH].value = minWidth;
    this.style.minDimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_POINT;
  }

  setMinWidthPercent(minWidth) {
    this.style.minDimensions[Enums.DIMENSION_WIDTH].value = minWidth;
    this.style.minDimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_PERCENT;
  }

  setOverflow(overflow) {
    this.style.overflow = overflow;
  }

  setPadding(edge, padding) {
    this.style.padding[edge].value = padding;
    this.style.padding[edge].unit = Enums.UNIT_POINT;
  }

  setPaddingPercent(edge, padding) {
    this.style.padding[edge].value = padding;
    this.style.padding[edge].unit = Enums.UNIT_PERCENT;
  }

  setPosition(edge, position) {
    this.style.position[edge].value = position;
    this.style.position[edge].unit = Enums.UNIT_POINT;
  }

  setPositionPercent(edge, position) {
    this.style.position[edge].value = position;
    this.style.position[edge].unit = Enums.UNIT_PERCENT;
  }

  setPositionType(positionType) {
    this.style.positionType = positionType;
  }

  setWidth(width) {
    this.style.dimensions[Enums.DIMENSION_WIDTH].value = width;
    this.style.dimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_POINT;
  }

  setWidthAuto() {
    this.style.dimensions[Enums.DIMENSION_WIDTH].value = NaN;
    this.style.dimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_AUTO;
  }

  setWidthPercent(width) {
    this.style.dimensions[Enums.DIMENSION_WIDTH].value = width;
    this.style.dimensions[Enums.DIMENSION_WIDTH].unit = Enums.UNIT_PERCENT;
  }
}

module.exports = Node;
