import Enums from './enums';
import Value from './value';
import { flexDirectionIsRow } from './flex';
import { computedEdgeValue } from './edges';
import { leading, trailing } from './constants';

export const leadingBorder = (node, axis) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.border[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED &&
    node.style.border[Enums.EDGE_START].value >= 0.0
  ) {
    return node.style.border[Enums.EDGE_START].value;
  }

  return Math.max(
    computedEdgeValue(node.style.border, leading[axis], Value.zero()).value,
    0.0,
  );
};

export const trailingBorder = (node, axis) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.border[Enums.EDGE_END].unit != Enums.UNIT_UNDEFINED &&
    node.style.border[Enums.EDGE_END].value >= 0.0
  ) {
    return node.style.border[Enums.EDGE_END].value;
  }

  return Math.max(
    computedEdgeValue(node.style.border, trailing[axis], Value.zero()).value,
    0.0,
  );
};

export default {
  leadingBorder,
  trailingBorder,
};
