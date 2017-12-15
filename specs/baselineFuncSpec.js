const flexbox = require('../src');

const baseline = (node, width, height) => {
  return node.getContext();
}

describe.skip('Baseline function', () => {
  test('align_baseline_customer_func', () => {
    const root = flexbox.Node.create();

    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setAlignItems(flexbox.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = flexbox.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = flexbox.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = flexbox.Node.create();
    child3.setContext(10);
    child3.setWidth(50);
    child3.setBaselineFunc(baseline);
    child3.setHeight(20);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);
  });
});
