const Enums = require('./enums');
const Value = require('./value');
const { computedEdgeValue } = require('./edges');
const { flexDirectionIsRow } = require('./flex');
const { leadingBorder, trailingBorder } = require('./borders');
const { leading, trailing } = require('./constants');

const leadingPadding = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.padding[Enums.EDGE_START].unit !== Enums.UNIT_UNDEFINED &&
    Value.resolve(node.style.padding[Enums.EDGE_START], widthSize) >= 0
  ) {
    return Value.resolve(node.style.padding[Enums.EDGE_START], widthSize);
  }

  const valueZero = new Value(Enums.UNIT_POINT, 0);
  return Math.max(
    Value.resolve(
      computedEdgeValue(node.style.padding, leading[axis], valueZero),
      widthSize,
    ),
    0,
  );
};

const trailingPadding = (node, axis, widthSize) => {
  if (
    flexDirectionIsRow(axis) &&
    node.style.padding[Enums.EDGE_END].unit !== Enums.UNIT_UNDEFINED &&
    Value.resolve(node.style.padding[Enums.EDGE_END], widthSize) >= 0
  ) {
    return Value.resolve(node.style.padding[Enums.EDGE_END], widthSize);
  }

  const valueZero = new Value(Enums.UNIT_POINT, 0);
  return Math.max(
    Value.resolve(
      computedEdgeValue(node.style.padding, trailing[axis], valueZero),
      widthSize,
    ),
    0,
  );
};

const leadingPaddingAndBorder = (node, axis, widthSize) =>
  leadingPadding(node, axis, widthSize) + leadingBorder(node, axis);

const trailingPaddingAndBorder = (node, axis, widthSize) =>
  trailingPadding(node, axis, widthSize) + trailingBorder(node, axis);

const paddingAndBorderForAxis = (node, axis, widthSize) =>
  leadingPaddingAndBorder(node, axis, widthSize) +
  trailingPaddingAndBorder(node, axis, widthSize);

module.exports = {
  leadingPadding,
  trailingPadding,
  leadingPaddingAndBorder,
  trailingPaddingAndBorder,
  paddingAndBorderForAxis,
};
