const Enums = require('./enums');
const Value = require('./value');
const { computedEdgeValue } = require('./edges');
const { flexDirectionIsRow } = require('./flex');
const { leading, trailing } = require('./constants');

const resolveValueMargin = (value, parentSize) => {
  return value.unit === Enums.UNIT_AUTO ? 0 : Value.resolve(value, parentSize);
};

const marginForAxis = (node, axis, widthSize) =>
  leadingMargin(node, axis, widthSize) + trailingMargin(node, axis, widthSize);

const leadingMargin = (node, axis, widthSize) => {
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

const trailingMargin = (node, axis, widthSize) => {
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

module.exports = {
  marginForAxis,
  leadingMargin,
  trailingMargin,
};
