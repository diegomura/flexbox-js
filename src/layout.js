const Enums = require('./enums');
const Value = require('./value');

class Layout {
  constructor() {
    this.position = {
      [0]: 0,
      [1]: 0,
      [2]: 0,
      [3]: 0,
    };
    this.margin = {
      [0]: 0,
      [1]: 0,
      [2]: 0,
      [3]: 0,
      [4]: 0,
      [5]: 0,
    };
    this.padding = {
      [0]: 0,
      [1]: 0,
      [2]: 0,
      [3]: 0,
      [4]: 0,
      [5]: 0,
    };
    this.border = {
      [0]: 0,
      [1]: 0,
      [2]: 0,
      [3]: 0,
      [4]: 0,
      [5]: 0,
    };
    this.dimensions = {
      [0]: NaN,
      [1]: NaN,
    };
    this.measuredDimensions = {
      [0]: NaN,
      [1]: NaN,
    };
    this.direction = Enums.DIRECTION_INHERIT;
    this.computedFlexBasisGeneration = 0;
    this.computedFlexBasis;
    this.hadOverflow = false;
    this.generationCount = 0;
    this.lastParentDirection = this.direction - 1;
    this.nextCachedMeasurementsIndex = 0;
    this.cachedMeasurements = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];
    this.cachedLayout = {
      availableWidth: 0,
      availableHeight: 0,
      widthMeasureMode: -1,
      heightMeasureMode: -1,
      computedWidth: -1,
      computedHeight: -1,
    };
    this.width = null;
    this.height = null;
  }

  fromJS() {}

  toString() {}
}

module.exports = Layout;
