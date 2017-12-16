const flexbox = require('../src');

describe('Computed padding', () => {
  test.skip('computed layout padding', () => {
    const root = flexbox.Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPaddingPercent(flexbox.EDGE_START, 10);

    root.calculateLayout(100, 100, flexbox.DIRECTION_LTR);

    expect(root.getComputedPadding(flexbox.EDGE_LEFT)).toBe(10);
    expect(root.getComputedPadding(flexbox.EDGE_RIGHT)).toBe(0);

    root.calculateLayout(100, 100, flexbox.DIRECTION_RTL);

    expect(root.YGNodeLayoutGetPadding(flexbox.EDGE_LEFT)).toBe(0);
    expect(root.YGNodeLayoutGetPadding(flexbox.EDGE_RIGHT)).toBe(10);
  });
});
