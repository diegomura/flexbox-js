import Enums from './enums';
import Value from './value';
import { computedEdgeValue } from './edges';
import { flexDirectionIsRow } from './flex';
import { leading, trailing } from './constants';

const resolveValueMargin = (value, parentSize) => {
  return value.unit === Enums.UNIT_AUTO ? 0 : Value.resolve(value, parentSize);
};

export const marginForAxis = (node, axis, widthSize) => {
  return (
    leadingMargin(node, axis, widthSize) + trailingMargin(node, axis, widthSize)
  );
};

export const leadingMargin = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.margin[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED
  ) {
    return resolveValueMargin(node.style.margin[Enums.EDGE_START], widthSize);
  }

  return resolveValueMargin(
    computedEdgeValue(node.style.margin, leading[axis], Value.zero()),
    widthSize,
  );
};

export const trailingMargin = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.margin[Enums.EDGE_END].unit !== Enums.UNIT_UNDEFINED
  ) {
    return resolveValueMargin(node.style.margin[Enums.EDGE_END], widthSize);
  }

  return resolveValueMargin(
    computedEdgeValue(node.style.margin, trailing[axis], Value.zero()),
    widthSize,
  );
};

export default {
  marginForAxis,
  leadingMargin,
  trailingMargin,
};
