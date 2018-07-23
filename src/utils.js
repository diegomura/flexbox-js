export const floatsEqual = (a, b) => {
  const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;
  return Math.abs(a - b) < EPSILON;
};

export const floatIsUndefined = float =>
  float === null || float === undefined || isNaN(float);

export const listCount = list => (list ? list.length : 0);

export const max = (a, b) => {
  if (isNaN(a)) return b;
  if (isNaN(b)) return a;

  return Math.max(a, b);
};

export const min = (a, b) => {
  if (isNaN(a)) return b;
  if (isNaN(b)) return a;

  return Math.min(a, b);
};

export default {
  floatsEqual,
  floatIsUndefined,
  listCount,
  max,
  min,
};
