const Enums = require('./enums');
const Value = require('./value');
const { computedEdgeValue } = require('./edges');
const { flexDirectionIsRow } = require('./flex');
const { leadingBorder, trailingBorder } = require('./borders');
const { leading, trailing } = require('./constants');

// ✅
const leadingPadding = (node, axis, widthSize) => {
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

// ✅
const trailingPadding = (node, axis, widthSize) => {
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

// ✅
const leadingPaddingAndBorder = (node, axis, widthSize) => {
  return leadingPadding(node, axis, widthSize) + leadingBorder(node, axis);
};

// ✅
const trailingPaddingAndBorder = (node, axis, widthSize) => {
  return trailingPadding(node, axis, widthSize) + trailingBorder(node, axis);
};

// ✅
const paddingAndBorderForAxis = (node, axis, widthSize) => {
  return (
    leadingPaddingAndBorder(node, axis, widthSize) +
    trailingPaddingAndBorder(node, axis, widthSize)
  );
};

module.exports = {
  leadingPadding,
  trailingPadding,
  leadingPaddingAndBorder,
  trailingPaddingAndBorder,
  paddingAndBorderForAxis,
};
