const Enums = require('./enums');
const Value = require('./value');

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
    this.margin = Value.defaultEdgeValues();
    this.position = Value.defaultEdgeValues();
    this.padding = Value.defaultEdgeValues();
    this.border = Value.defaultEdgeValues();
    this.dimensions = Value.defaultDimensionValues(Enums.UNIT_AUTO);
    this.maxDimensions = Value.defaultDimensionValues();
    this.minDimensions = Value.defaultDimensionValues();
  }

  fromJS() {}

  toString() {}
}

module.exports = Style;
