const Enums = require('./enums');
const Value = require('./value');
const { flexDirectionIsRow } = require('./flex');
const { computedEdgeValue } = require('./edges');
const { leading, trailing } = require('./constants');

// ✅
const leadingBorder = (node, axis) => {
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

// ✅
const trailingBorder = (node, axis) => {
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

module.exports = {
  leadingBorder,
  trailingBorder,
};
