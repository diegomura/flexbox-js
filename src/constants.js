const Enums = require('./enums');

const leading = {
  [Enums.FLEX_DIRECTION_COLUMN]: Enums.EDGE_TOP,
  [Enums.FLEX_DIRECTION_COLUMN_REVERSE]: Enums.EDGE_BOTTOM,
  [Enums.FLEX_DIRECTION_ROW]: Enums.EDGE_LEFT,
  [Enums.FLEX_DIRECTION_ROW_REVERSE]: Enums.EDGE_RIGHT,
};

const trailing = {
  [Enums.FLEX_DIRECTION_COLUMN]: Enums.EDGE_BOTTOM,
  [Enums.FLEX_DIRECTION_COLUMN_REVERSE]: Enums.EDGE_TOP,
  [Enums.FLEX_DIRECTION_ROW]: Enums.EDGE_RIGHT,
  [Enums.FLEX_DIRECTION_ROW_REVERSE]: Enums.EDGE_LEFT,
};

const dim = {
  [Enums.FLEX_DIRECTION_COLUMN]: Enums.DIMENSION_HEIGHT,
  [Enums.FLEX_DIRECTION_COLUMN_REVERSE]: Enums.DIMENSION_HEIGHT,
  [Enums.FLEX_DIRECTION_ROW]: Enums.DIMENSION_WIDTH,
  [Enums.FLEX_DIRECTION_ROW_REVERSE]: Enums.DIMENSION_WIDTH,
};

const pos = {
  [Enums.FLEX_DIRECTION_COLUMN]: Enums.EDGE_TOP,
  [Enums.FLEX_DIRECTION_COLUMN_REVERSE]: Enums.EDGE_BOTTOM,
  [Enums.FLEX_DIRECTION_ROW]: Enums.EDGE_LEFT,
  [Enums.FLEX_DIRECTION_ROW_REVERSE]: Enums.EDGE_RIGHT,
};

module.exports = {
  leading,
  trailing,
  dim,
  pos,
};