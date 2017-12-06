const Enums = require('./enums');

class Value {
  static zero() {
    return new Value(Enums.UNIT_POINT, 0);
  }

  static defaultDimensionValues(unit) {
    return [new Value(unit), new Value(unit)];
  }

  static undefined() {
    return new Value(Enums.UNIT_UNDEFINED, undefined);
  }

  static resolve(value, parentSize) {
    switch (value.unit) {
      case Enums.UNIT_UNDEFINED:
      case Enums.UNIT_AUTO:
        return undefined;
      case Enums.UNIT_POINT:
        return value.value;
      case Enums.UNIT_PERCENT:
        return value.value * parentSize / 100;
      default:
        return undefined;
    }
  }

  static defaultEdgeValues() {
    return [
      new Value(),
      new Value(),
      new Value(),
      new Value(),
      new Value(),
      new Value(),
      new Value(),
      new Value(),
      new Value(),
    ];
  }

  constructor(unit = Enums.UNIT_UNDEFINED, value = NaN) {
    this.unit = unit;
    this.value = value;
  }

  fromJS() {}

  toString() {}
}

module.exports = Value;
