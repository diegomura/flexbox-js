const Enums = require('./enums');
const Value = require('./value');

class Layout {
  constructor() {
    this.position = {};
    this.margin = {};
    this.border = {};
    this.dimensions = {};
    this.measuredDimensions = {};
    this.padding = {};
    this.direction = Enums.DIRECTION_INHERIT;
    this.computedFlexBasisGeneration = 0;
    this.computedFlexBasis;
    this.hadOverflow = false;
    this.generationCount = 0;
    this.lastParentDirection = this.direction - 1;
    this.nextCachedMeasurementsIndex = 0;
    this.cachedMeasurements = {};
    this.cachedLayout = {};
    this.width = null;
    this.height = null;
  }

  fromJS() {}

  toString() {}
}

module.exports = Layout;
