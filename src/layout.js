import Enums from './enums';
import Value from './value';
import { MAX_CACHED_RESULT_COUNT } from './constants';

const arrayOf = (value, size) => {
  return new Array(size).fill(null).map(() => {
    if (value instanceof Function) {
      return value();
    }
    return value;
  });
};

const cachedMeasurement = () => ({
  availableWidth: 0,
  availableHeight: 0,
  widthMeasureMode: -1,
  heightMeasureMode: -1,
  computedWidth: -1,
  computedHeight: -1,
});

const defaultLayout = () => ({
  position: arrayOf(0, 4),
  margin: arrayOf(0, 6),
  padding: arrayOf(0, 6),
  border: arrayOf(0, 6),
  dimensions: arrayOf(NaN, 2),
  measuredDimensions: arrayOf(NaN, 2),
  direction: Enums.DIRECTION_INHERIT,
  computedFlexBasisGeneration: 0,
  computedFlexBasis: undefined,
  hadOverflow: false,
  generationCount: 0,
  lastParentDirection: -1,
  nextCachedMeasurementsIndex: 0,
  cachedMeasurements: arrayOf(cachedMeasurement, MAX_CACHED_RESULT_COUNT),
  cachedLayout: cachedMeasurement(),
});

class Layout {
  constructor() {
    this.initDefaultValues();
  }

  initDefaultValues() {
    const values = defaultLayout();
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

export default Layout;
