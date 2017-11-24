const Enums = require('./enums');
const Value = require('./value');

class Layout {
  constructor() {
    this.position = {};
    this.dimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(),
      [Enums.DIMENSION_HEIGHT]: new Value(),
    },
    this.margin = {};
    this.border = {};
    this.padding = {};
    this.direction = Enums.DIRECTION_INHERIT;
    this.computedFlexBasisGeneration = 0;
    this.computedFlexBasis;
    this.hadOverflow = false;
    this.generationCount = 0;
    this.lastParentDirection = this.direction - 1;
    this.nextCachedMeasurementsIndex = 0;
    this.cachedMeasurements = {};
    this.measuredDimensions = {
      [Enums.DIMENSION_WIDTH]: new Value(),
      [Enums.DIMENSION_HEIGHT]: new Value(),
    };
    this.cachedLayout = null;
    this.left = null;
    this.right = null;
    this.top = null;
    this.bottom = null;
    this.width = null;
    this.height = null;
  }

  fromJS() {

  }

  toString() {

  }
}

module.exports = Layout;
