const Enums = require('./enums');
const Value = require('./value');
const { flexDirectionIsRow } = require('./flex');
const { computedEdgeValue } = require('./edges');
const { leading, trailing } = require('./constants');

const leadingBorder = (node, axis) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.border[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED &&
    node.style.border[Enums.EDGE_START].value >= 0
  ) {
    return node.style.border[EDGE_START].value;
  }

  const valueZero = new Value(Enums.UNIT_POINT, 0);
  return Math.max(
    computedEdgeValue(node.style.border, leading[axis], valueZero).value,
    0,
  );
};

const trailingBorder = (node, axis) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.border[Enums.EDGE_END].unit !== Enums.UNIT_UNDEFINED &&
    node.style.border[Enums.EDGE_END].value >= 0
  ) {
    return node.style.border[EDGE_END].value;
  }

  const valueZero = new Value(Enums.UNIT_POINT, 0);
  return Math.max(
    computedEdgeValue(node.style.border, trailing[axis], valueZero).value,
    0,
  );
};

module.exports = {
  leadingBorder,
  trailingBorder,
};
