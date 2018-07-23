import Enums from './enums';
import Value from './value';

const defaultStyle = () => ({
  direction: Enums.DIRECTION_INHERIT,
  flexDirection: Enums.FLEX_DIRECTION_COLUMN,
  justifyContent: Enums.JUSTIFY_FLEX_START,
  alignContent: Enums.ALIGN_FLEX_START,
  alignItems: Enums.ALIGN_STRETCH,
  alignSelf: Enums.ALIGN_AUTO,
  positionType: Enums.POSITION_TYPE_RELATIVE,
  flexWrap: Enums.WRAP_NO_WRAP,
  overflow: Enums.OVERFLOW_VISIBLE,
  display: Enums.DISPLAY_FLEX,
  flex: null,
  flexGrow: null,
  flexShrink: null,
  aspectRatio: null,
  flexBasis: new Value(Enums.UNIT_AUTO),
  margin: Value.defaultEdgeValues(),
  position: Value.defaultEdgeValues(),
  padding: Value.defaultEdgeValues(),
  border: Value.defaultEdgeValues(),
  dimensions: Value.defaultDimensionValues(Enums.UNIT_AUTO),
  maxDimensions: Value.defaultDimensionValues(),
  minDimensions: Value.defaultDimensionValues(),
});

class Style {
  constructor() {
    this.initDefaultValues();
  }

  initDefaultValues() {
    const values = defaultStyle();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
  }

  reset() {
    this.initDefaultValues();
  }
}

export default Style;
