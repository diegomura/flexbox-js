const flexbox = require('../src');

describe.skip('Zero out layout recursivly', () => {
  test('zero_out_layout', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const child = flexbox.Node.create();
    root.insertChild(child, 0);
    child.setWidth(100);
    child.setHeight(100);
    child.setMargin(flexbox.EDGE_TOP, 10);
    child.setPadding(flexbox.EDGE_TOP, 10);

    root.calculateLayout(100, 100, flexbox.DIRECTION_LTR);

    expect(child.getComputedMargin(flexbox.EDGE_TOP)).toBe(10);
    expect(child.getComputedPadding(flexbox.EDGE_TOP)).toBe(10);

    child.setDisplay(flexbox.DISPLAY_NONE);

    root.calculateLayout(100, 100, flexbox.DIRECTION_LTR);

    expect(child.getComputedMargin(flexbox.EDGE_TOP)).toBe(0);
    expect(child.getComputedPadding(flexbox.EDGE_TOP)).toBe(0);
  });
});
