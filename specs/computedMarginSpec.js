const flexbox = require('../src');

describe('Computed margin', () => {
  test.skip('computed layout margin', () => {
    const root = flexbox.Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setMarginPercent(flexbox.EDGE_START, 10);

    root.calculateLayout(100, 100, flexbox.DIRECTION_LTR);

    expect(root.getComputedMargin(flexbox.EDGE_LEFT)).toBe(10);
    expect(root.getComputedMargin(flexbox.EDGE_RIGHT)).toBe(0);

    root.calculateLayout(100, 100, flexbox.DIRECTION_RTL);

    expect(root.YGNodeLayoutGetMargin(flexbox.EDGE_LEFT)).toBe(0);
    expect(root.YGNodeLayoutGetMargin(flexbox.EDGE_RIGHT)).toBe(10);
  });
});
