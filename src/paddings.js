import Enums from './enums';
import Value from './value';
import { computedEdgeValue } from './edges';
import { flexDirectionIsRow } from './flex';
import { leadingBorder, trailingBorder } from './borders';
import { leading, trailing } from './constants';

export const leadingPadding = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.padding[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED &&
    Value.resolve(node.style.padding[Enums.EDGE_START], widthSize) >= 0.0
  ) {
    return Value.resolve(node.style.padding[Enums.EDGE_START], widthSize);
  }

  return Math.max(
    Value.resolve(
      computedEdgeValue(node.style.padding, leading[axis], Value.zero()),
      widthSize,
    ),
    0.0,
  );
};

export const trailingPadding = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.padding[Enums.EDGE_END].unit !== Enums.UNIT_UNDEFINED &&
    Value.resolve(node.style.padding[Enums.EDGE_END], widthSize) >= 0.0
  ) {
    return Value.resolve(node.style.padding[Enums.EDGE_END], widthSize);
  }

  return Math.max(
    Value.resolve(
      computedEdgeValue(node.style.padding, trailing[axis], Value.zero()),
      widthSize,
    ),
    0.0,
  );
};

export const leadingPaddingAndBorder = (node, axis, widthSize) => {
  return leadingPadding(node, axis, widthSize) + leadingBorder(node, axis);
};

export const trailingPaddingAndBorder = (node, axis, widthSize) => {
  return trailingPadding(node, axis, widthSize) + trailingBorder(node, axis);
};

export const paddingAndBorderForAxis = (node, axis, widthSize) => {
  return (
    leadingPaddingAndBorder(node, axis, widthSize) +
    trailingPaddingAndBorder(node, axis, widthSize)
  );
};

export default {
  leadingPadding,
  trailingPadding,
  leadingPaddingAndBorder,
  trailingPaddingAndBorder,
  paddingAndBorderForAxis,
};
