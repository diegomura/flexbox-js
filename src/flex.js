const Enums = require('./enums');
const { floatIsUndefined } = require('./utils');

const kDefaultFlexGrow = 0.0;
const kDefaultFlexShrink = 0.0;
const kWebDefaultFlexShrink = 1.0;

// ✅
const flexDirectionIsRow = flexDirection => {
  return (
    flexDirection === Enums.FLEX_DIRECTION_ROW ||
    flexDirection === Enums.FLEX_DIRECTION_ROW_REVERSE
  );
};

// ✅
const flexDirectionIsColumn = flexDirection => {
  return (
    flexDirection === Enums.FLEX_DIRECTION_COLUMN ||
    flexDirection === Enums.FLEX_DIRECTION_COLUMN_REVERSE
  );
};

// ✅
const flexDirectionCross = (flexDirection, direction) => {
  return flexDirectionIsColumn(flexDirection)
    ? resolveFlexDirection(Enums.FLEX_DIRECTION_ROW, direction)
    : Enums.FLEX_DIRECTION_COLUMN;
};

// ✅
const resolveFlexDirection = (flexDirection, direction) => {
  if (direction === Enums.DIRECTION_RTL) {
    if (flexDirection === Enums.FLEX_DIRECTION_ROW) {
      return Enums.FLEX_DIRECTION_ROW_REVERSE;
    } else if (flexDirection === Enums.FLEX_DIRECTION_ROW_REVERSE) {
      return Enums.FLEX_DIRECTION_ROW;
    }
  }

  return flexDirection;
};

// ✅
const resolveFlexGrow = node => {
  // Root nodes flexGrow should always be 0
  if (node.parent === null) {
    return 0.0;
  }
  if (!floatIsUndefined(node.style.flexGrow)) {
    return node.style.flexGrow;
  }
  if (!floatIsUndefined(node.style.flex) && node.style.flex > 0.0) {
    return node.style.flex;
  }
  return kDefaultFlexGrow;
};

// ✅
const styleGetFlexGrow = node => {
  return floatIsUndefined(node.style.flexGrow)
    ? kDefaultFlexGrow
    : node.style.flexGrow;
};

// ✅
const resolveFlexShrink = node => {
  // Root nodes flexShrink should always be 0
  if (node.parent === null) {
    return 0.0;
  }
  if (!floatIsUndefined(node.style.flexShrink)) {
    return node.style.flexShrink;
  }
  if (
    !node.config.useWebDefaults &&
    !floatIsUndefined(node.style.flex) &&
    node.style.flex < 0.0
  ) {
    return -node.style.flex;
  }
  return node.config.useWebDefaults
    ? kWebDefaultFlexShrink
    : kDefaultFlexShrink;
};

// ✅
const isFlex = node => {
  return (
    node.style.positionType === Enums.POSITION_TYPE_RELATIVE &&
    (resolveFlexGrow(node) !== 0 || resolveFlexShrink(node) !== 0)
  );
};

module.exports = {
  flexDirectionIsRow,
  flexDirectionIsColumn,
  flexDirectionCross,
  resolveFlexDirection,
  resolveFlexGrow,
  resolveFlexShrink,
  isFlex,
  kDefaultFlexGrow,
  kDefaultFlexShrink,
  kWebDefaultFlexShrink
};
