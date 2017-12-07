const Enums = require('./enums');
const Value = require('./value');

// ✅
const computedEdgeValue = (edges, edge, defaultValue) => {
  if (edges[edge].unit !== Enums.UNIT_UNDEFINED) {
    return edges[edge];
  }

  if ((edge === Enums.EDGE_TOP || edge === Enums.EDGE_BOTTOM) &&
      edges[Enums.EDGE_VERTICAL].unit !== Enums.UNIT_UNDEFINED) {
    return edges[Enums.EDGE_VERTICAL];
  }

  if ((edge === Enums.EDGE_LEFT || edge === Enums.EDGE_RIGHT || edge === Enums.EDGE_START || edge === Enums.EDGE_END) &&
      edges[Enums.EDGE_HORIZONTAL].unit !== Enums.UNIT_UNDEFINED) {
    return edges[Enums.EDGE_HORIZONTAL];
  }

  if (edges[Enums.EDGE_ALL].unit !== Enums.UNIT_UNDEFINED) {
    return edges[Enums.EDGE_ALL];
  }

  if (edge === Enums.EDGE_START || edge === Enums.EDGE_END) {
    return Value.undefined();
  }

  return defaultValue;
}

module.exports = {
  computedEdgeValue,
};
