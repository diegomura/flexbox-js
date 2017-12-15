// ✅
const floatsEqual = (a, b) => {
  const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;
  return Math.abs(a - b) < EPSILON;
};

// ✅
const floatIsUndefined = float => float === null || float === undefined || isNaN(float);

// ✅
const listCount = list => (list ? list.length : 0);

const max = (a, b) => {
  if (isNaN(a)) return b;
  if (isNaN(b)) return a;

  return Math.max(a, b);
};

const min = (a, b) => {
  if (isNaN(a)) return b;
  if (isNaN(b)) return a;

  return Math.min(a, b);
};

module.exports = {
  floatsEqual,
  floatIsUndefined,
  listCount,
  max,
  min,
};
