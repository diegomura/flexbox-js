const Enums = require('./enums');
const Value = require('./value');
const {
  flexDirectionIsRow,
  flexDirectionCross,
  resolveFlexDirection,
} = require('./flex');
const { computedEdgeValue } = require('./edges');
const { leadingMargin, trailingMargin } = require('./margins');
const { dim, pos, leading, trailing } = require('./constants');

const relativePosition = (node, axis, axisSize) => {
  return isLeadingPosDefined(node, axis)
    ? leadingPosition(node, axis, axisSize)
    : -trailingPosition(node, axis, axisSize);
};

const trailingPosition = (node, axis, axisSize) => {
  if (flexDirectionIsRow(axis)) {
    const trailingPosition = computedEdgeValue(
      node.style.position,
      Enums.EDGE_END,
      Value.undefined(),
    );
    if (trailingPosition.unit !== Enums.UNIT_UNDEFINED) {
      return Value.resolve(trailingPosition, axisSize);
    }
  }

  const trailingPosition = computedEdgeValue(
    node.style.position,
    trailing[axis],
    Value.undefined(),
  );

  return trailingPosition.unit === Enums.UNIT_UNDEFINED
    ? 0.0
    : Value.resolve(trailingPosition, axisSize);
};

const setPosition = (node, direction, mainSize, crossSize, parentWidth) => {
  /* Root nodes should be always layouted as LTR, so we don't return negative values. */
  const directionRespectingRoot =
    node.parent !== null ? direction : Enums.DIRECTION_LTR;
  const mainAxis = resolveFlexDirection(
    node.style.flexDirection,
    directionRespectingRoot,
  );
  const crossAxis = flexDirectionCross(mainAxis, directionRespectingRoot);

  const relativePositionMain = relativePosition(node, mainAxis, mainSize);
  const relativePositionCross = relativePosition(node, crossAxis, crossSize);

  node.layout.position[leading[mainAxis]] =
    leadingMargin(node, mainAxis, parentWidth) + relativePositionMain;
  node.layout.position[trailing[mainAxis]] =
    trailingMargin(node, mainAxis, parentWidth) + relativePositionMain;
  node.layout.position[leading[crossAxis]] =
    leadingMargin(node, crossAxis, parentWidth) + relativePositionCross;
  node.layout.position[trailing[crossAxis]] =
    trailingMargin(node, crossAxis, parentWidth) + relativePositionCross;
};

const leadingPosition = (node, axis, axisSize) => {
  if (flexDirectionIsRow(axis)) {
    const leadingPosition = computedEdgeValue(
      node.style.position,
      Enums.EDGE_START,
      Value.undefined(),
    );
    if (leadingPosition.unit !== Enums.UNIT_UNDEFINED) {
      return Value.resolve(leadingPosition, axisSize);
    }
  }

  const leadingPosition = computedEdgeValue(
    node.style.position,
    leading[axis],
    Value.undefined(),
  );

  return leadingPosition.unit === Enums.UNIT_UNDEFINED
    ? 0.0
    : Value.resolve(leadingPosition, axisSize);
};

const isLeadingPosDefined = (node, axis) => {
  return (
    (flexDirectionIsRow(axis) &&
      computedEdgeValue(
        node.style.position,
        Enums.EDGE_START,
        Value.undefined(),
      ).unit !== Enums.UNIT_UNDEFINED) ||
    computedEdgeValue(node.style.position, leading[axis], Value.undefined())
      .unit !== Enums.UNIT_UNDEFINED
  );
};

const isTrailingPosDefined = (node, axis) => {
  return (
    (flexDirectionIsRow(axis) &&
      computedEdgeValue(node.style.position, Enums.EDGE_END, Value.undefined())
        .unit !== Enums.UNIT_UNDEFINED) ||
    computedEdgeValue(node.style.position, trailing[axis], Value.undefined())
      .unit !== Enums.UNIT_UNDEFINED
  );
};

const setChildTrailingPosition = (node, child, axis) => {
  const size = child.layout.measuredDimensions[dim[axis]];
  child.layout.position[trailing[axis]] =
    node.layout.measuredDimensions[dim[axis]] -
    size -
    child.layout.position[pos[axis]];
};

module.exports = {
  setPosition,
  leadingPosition,
  trailingPosition,
  isLeadingPosDefined,
  isTrailingPosDefined,
  setChildTrailingPosition,
};
