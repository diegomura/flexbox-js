import Enums from './enums';
import Value from './value';
import { flexDirectionIsColumn, flexDirectionIsRow } from './flex';
import { paddingAndBorderForAxis } from './paddings';
import { floatIsUndefined } from './utils';

export const boundAxisWithinMinAndMax = (node, axis, value, axisSize) => {
  let min = undefined;
  let max = undefined;

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

  if (!floatIsUndefined(max) && max >= 0.0 && boundValue > max) {
    boundValue = max;
  }

  if (!floatIsUndefined(min) && min >= 0.0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
};

export const boundAxis = (node, axis, value, axisSize, widthSize) => {
  return Math.max(
    boundAxisWithinMinAndMax(node, axis, value, axisSize),
    paddingAndBorderForAxis(node, axis, widthSize),
  );
};

export default {
  boundAxisWithinMinAndMax,
  boundAxis,
};
