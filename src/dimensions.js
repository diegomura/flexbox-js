const Enums = require('./enums');
const { boundAxis } = require('./axis');
const { marginForAxis } = require('./margins');
const { paddingAndBorderForAxis } = require('./paddings');
const { dim } = require('./constants');

const resolveDimensions = node => {
  const { dimensions, maxDimensions, minDimensions } = node.style;

  // Resolve width
  if (
    maxDimensions[Enums.DIMENSION_WIDTH].unit &&
    maxDimensions[Enums.DIMENSION_WIDTH].value ===
      minDimensions[Enums.DIMENSION_WIDTH].value
  ) {
    node.resolvedDimensions[Enums.DIMENSION_WIDTH] =
      maxDimensions[Enums.DIMENSION_WIDTH];
  } else {
    node.resolvedDimensions[Enums.DIMENSION_WIDTH] =
      dimensions[Enums.DIMENSION_WIDTH];
  }

  // Resolve height
  if (
    maxDimensions[Enums.DIMENSION_HEIGHT].unit &&
    maxDimensions[Enums.DIMENSION_HEIGHT].value ===
      minDimensions[Enums.DIMENSION_HEIGHT].value
  ) {
    node.resolvedDimensions[Enums.DIMENSION_HEIGHT] =
      maxDimensions[Enums.DIMENSION_HEIGHT];
  } else {
    node.resolvedDimensions[Enums.DIMENSION_HEIGHT] =
      dimensions[Enums.DIMENSION_HEIGHT];
  }
};

const isStyleDimDefined = (node, axis, parentSize) =>
  !(
    node.resolvedDimensions[dim[axis]].unit == Enums.UNIT_AUTO ||
    node.resolvedDimensions[dim[axis]].unit == Enums.UNIT_UNDEFINED ||
    (node.resolvedDimensions[dim[axis]].unit == Enums.UNIT_POINT &&
      node.resolvedDimensions[dim[axis]].value < 0.0) ||
    (node.resolvedDimensions[dim[axis]].unit == Enums.UNIT_PERCENT &&
      (node.resolvedDimensions[dim[axis]].value < 0.0 ||
        floatIsUndefined(parentSize)))
  );

const emptyContainerSetMeasuredDimensions = (
  node,
  availableWidth,
  availableHeight,
  widthMeasureMode,
  heightMeasureMode,
  parentWidth,
  parentHeight,
) => {
  const paddingAndBorderAxisRow = paddingAndBorderForAxis(
    node,
    Enums.FLEX_DIRECTION_ROW,
    parentWidth,
  );
  const paddingAndBorderAxisColumn = paddingAndBorderForAxis(
    node,
    Enums.FLEX_DIRECTION_COLUMN,
    parentWidth,
  );
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

  node.layout.measuredDimensions[Enums.DIMENSION_WIDTH] = boundAxis(
    node,
    Enums.FLEX_DIRECTION_ROW,
    widthMeasureMode == Enums.MEASURE_MODE_UNDEFINED ||
    widthMeasureMode == Enums.MEASURE_MODE_AT_MOST
      ? paddingAndBorderAxisRow
      : availableWidth - marginAxisRow,
    parentWidth,
    parentWidth,
  );
  node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] = boundAxis(
    node,
    Enums.FLEX_DIRECTION_COLUMN,
    heightMeasureMode == Enums.MEASURE_MODE_UNDEFINED ||
    heightMeasureMode == Enums.MEASURE_MODE_AT_MOST
      ? paddingAndBorderAxisColumn
      : availableHeight - marginAxisColumn,
    parentHeight,
    parentWidth,
  );
};

module.exports = {
  resolveDimensions,
  isStyleDimDefined,
  emptyContainerSetMeasuredDimensions,
};
