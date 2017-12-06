const Enums = require('./enums');
const Value = require('./value');
const { flexDirectionIsColumn, flexDirectionIsRow } = require('./flex');
const { paddingAndBorderForAxis } = require('./paddings');
const { floatIsUndefined } = require('./utils');

const boundAxisWithinMinAndMax = (node, axis, value, axisSize) => {
  let min;
  let max;

  if (flexDirectionIsColumn(axis)) {
    min = Value.resolve(
      node.style.minDimensions[Enums.DIMENSION_HEIGHT],
      axisSize,
    );
    max = Value.resolve(
      node.style.maxDimensions[Enums.DIMENSION_HEIGHT],
      axisSize,
    );
  } else if (flexDirectionIsRow(axis)) {
    min = Value.resolve(
      node.style.minDimensions[Enums.DIMENSION_WIDTH],
      axisSize,
    );
    max = Value.resolve(
      node.style.maxDimensions[Enums.DIMENSION_WIDTH],
      axisSize,
    );
  }

  let boundValue = value;

  if (!floatIsUndefined(max) && max >= 0 && boundValue > max) {
    boundValue = max;
  }

  if (!floatIsUndefined(min) && min >= 0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
};

const boundAxis = (node, axis, value, axisSize, widthSize) =>
  Math.max(
    boundAxisWithinMinAndMax(node, axis, value, axisSize),
    paddingAndBorderForAxis(node, axis, widthSize),
  );

module.exports = {
  boundAxisWithinMinAndMax,
  boundAxis,
};
