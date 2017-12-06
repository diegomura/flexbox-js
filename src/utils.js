const floatsEqual = (a, b) => {
  const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;
  return Math.abs(a - b) < EPSILON;
};

const floatIsUndefined = float => float === null || float === undefined;

const listCount = list => (list ? list.length : 0);

module.exports = {
  floatsEqual,
  floatIsUndefined,
  listCount,
};
