const Enums = require('./enums');
const Value = require('./value');
const { boundAxis } = require('./axis');
const { marginForAxis } = require('./margins');
const { paddingAndBorderForAxis } = require('./paddings');
const { dim } = require('./constants');
const { floatIsUndefined } = require('./utils');

const resolveDimensions = node => {
  for (let dim = Enums.DIMENSION_WIDTH; dim < Enums.DIMENSION_COUNT; dim++) {
    if (
      node.style.maxDimensions[dim].unit !== Enums.UNIT_UNDEFINED &&
      Value.equal(node.style.maxDimensions[dim], node.style.minDimensions[dim])
    ) {
      node.resolvedDimensions[dim] = node.style.maxDimensions[dim];
    } else {
      node.resolvedDimensions[dim] = node.style.dimensions[dim];
    }
  }
};

const isStyleDimDefined = (node, axis, parentSize) => {
  return !(
    node.resolvedDimensions[dim[axis]].unit === Enums.UNIT_AUTO ||
    node.resolvedDimensions[dim[axis]].unit === Enums.UNIT_UNDEFINED ||
    (node.resolvedDimensions[dim[axis]].unit === Enums.UNIT_POINT &&
      node.resolvedDimensions[dim[axis]].value < 0.0) ||
    (node.resolvedDimensions[dim[axis]].unit === Enums.UNIT_PERCENT &&
      (node.resolvedDimensions[dim[axis]].value < 0.0 ||
        floatIsUndefined(parentSize)))
  );
};

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
    widthMeasureMode === Enums.MEASURE_MODE_UNDEFINED ||
    widthMeasureMode === Enums.MEASURE_MODE_AT_MOST
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

const fixedSizeSetMeasuredDimensions = (
  node,
  availableWidth,
  availableHeight,
  widthMeasureMode,
  heightMeasureMode,
  parentWidth,
  parentHeight,
) => {
  if (
    (widthMeasureMode === Enums.MEASURE_MODE_AT_MOST &&
      availableWidth <= 0.0) ||
    (heightMeasureMode === Enums.MEASURE_MODE_AT_MOST &&
      availableHeight <= 0.0) ||
    (widthMeasureMode === Enums.MEASURE_MODE_EXACTLY &&
      heightMeasureMode === Enums.MEASURE_MODE_EXACTLY)
  ) {
    const marginAxisColumn = marginForAxis(
      node,
      Enums.FLEX_DIRECTION_COLUMN,
      parentWidth,
    );
    const marginAxisRow = marginForAxis(
      node,
      Enums.FLEX_DIRECTION_ROW,
      parentWidth,
    );

    node.layout.measuredDimensions[Enums.DIMENSION_WIDTH] = boundAxis(
      node,
      Enums.FLEX_DIRECTION_ROW,
      floatIsUndefined(availableWidth) ||
      (widthMeasureMode === Enums.MEASURE_MODE_AT_MOST && availableWidth < 0.0)
        ? 0.0
        : availableWidth - marginAxisRow,
      parentWidth,
      parentWidth,
    );

    node.layout.measuredDimensions[Enums.DIMENSION_HEIGHT] = boundAxis(
      node,
      Enums.FLEX_DIRECTION_COLUMN,
      floatIsUndefined(availableHeight) ||
      (heightMeasureMode === Enums.MEASURE_MODE_AT_MOST &&
        availableHeight < 0.0)
        ? 0.0
        : availableHeight - marginAxisColumn,
      parentHeight,
      parentWidth,
    );

    return true;
  }

  return false;
};

module.exports = {
  resolveDimensions,
  isStyleDimDefined,
  emptyContainerSetMeasuredDimensions,
  fixedSizeSetMeasuredDimensions,
};
