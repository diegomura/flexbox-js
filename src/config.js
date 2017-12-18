const Enums = require('./enums');

class Config {
  static create() {
    return new Config();
  }

  constructor() {
    this.pointScaleFactor = 1;
    this.experimentalFeatures = {
      [Enums.EXPERIMENTAL_FEATURE_COUNT]: false,
      [Enums.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS]: false,
    };
    this.useWebDefaults = false;
    this.useLegacyStretchBehaviour = false;
  }

  setUseWebDefaults(value) {
    this.useWebDefaults = value;
  }

  setExperimentalFeatureEnabled(feature, value) {
    this.experimentalFeatures[feature] = value;
  }
}

module.exports = Config;
