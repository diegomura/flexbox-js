const Enums = require('./enums');
const Value = require('./value');

// TODO: Urgent refactor!!
class Style {
  constructor() {
    this.direction = Enums.DIRECTION_INHERIT;
    this.flexDirection = Enums.FLEX_DIRECTION_COLUMN;
    this.justifyContent = Enums.JUSTIFY_FLEX_START;
    this.alignContent = Enums.ALIGN_FLEX_START;
    this.alignItems = Enums.ALIGN_STRETCH;
    this.alignSelf = Enums.ALIGN_AUTO;
    this.positionType = Enums.POSITION_TYPE_RELATIVE;
    this.flexWrap = Enums.WRAP_NO_WRAP;
    this.overflow = Enums.OVERFLOW_VISIBLE;
    this.display = Enums.DISPLAY_FLEX;
    this.flex = null;
    this.flexGrow = null;
    this.flexShrink = null;
    this.aspectRatio = null;
    this.flexBasis = new Value(Enums.UNIT_AUTO);
    this.margin = {
      [Enums.EDGE_LEFT]: new Value(),
      [Enums.EDGE_TOP]: new Value(),
      [Enums.EDGE_RIGHT]: new Value(),
      [Enums.EDGE_BOTTOM]: new Value(),
      [Enums.EDGE_START]: new Value(),
      [Enums.EDGE_END]: new Value(),
      [Enums.EDGE_HORIZONTAL]: new Value(),
      [Enums.EDGE_VERTICAL]: new Value(),
      [Enums.EDGE_ALL]: new Value(),
    };
    this.position = {
      [Enums.EDGE_LEFT]: new Value(),
      [Enums.EDGE_TOP]: new Value(),
      [Enums.EDGE_RIGHT]: new Value(),
      [Enums.EDGE_BOTTOM]: new Value(),
      [Enums.EDGE_START]: new Value(),
      [Enums.EDGE_END]: new Value(),
      [Enums.EDGE_HORIZONTAL]: new Value(),
      [Enums.EDGE_VERTICAL]: new Value(),
      [Enums.EDGE_ALL]: new Value(),
    };
    this.padding = {
      [Enums.EDGE_LEFT]: new Value(),
      [Enums.EDGE_TOP]: new Value(),
      [Enums.EDGE_RIGHT]: new Value(),
      [Enums.EDGE_BOTTOM]: new Value(),
      [Enums.EDGE_START]: new Value(),
      [Enums.EDGE_END]: new Value(),
      [Enums.EDGE_HORIZONTAL]: new Value(),
      [Enums.EDGE_VERTICAL]: new Value(),
      [Enums.EDGE_ALL]: new Value(),
    };
    this.border = {
      [Enums.EDGE_LEFT]: new Value(),
      [Enums.EDGE_TOP]: new Value(),
      [Enums.EDGE_RIGHT]: new Value(),
      [Enums.EDGE_BOTTOM]: new Value(),
      [Enums.EDGE_START]: new Value(),
      [Enums.EDGE_END]: new Value(),
      [Enums.EDGE_HORIZONTAL]: new Value(),
      [Enums.EDGE_VERTICAL]: new Value(),
      [Enums.EDGE_ALL]: new Value(),
    };
    this.dimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(Enums.UNIT_AUTO),
      [Enums.DIMENSION_HEIGHT]: new Value(Enums.UNIT_AUTO),
    },
    this.maxDimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(),
      [Enums.DIMENSION_HEIGHT]: new Value(),
    },
    this.minDimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(),
      [Enums.DIMENSION_HEIGHT]: new Value(),
    }
  }

  fromJS() {

  }

  toString() {

  }
}

module.exports = Style;
