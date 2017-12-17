const flexbox = require('../src');

describe.skip('Display', () => {
  test('display_none', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setFlexGrow(1);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);
  });

  test('display_none_fixed_size', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(20);
    child1.setHeight(20);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);
  });

  test('display_none_with_margin', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setMargin(flexbox.EDGE_LEFT, 10);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_RIGHT, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    child0.setWidth(20);
    child0.setHeight(20);
    child0.setDisplay(flexbox.DISPLAY_NONE);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setFlexGrow(1);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('display_none_with_child', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setFlexShrink(1);
    child0.setFlexBasisPercent(0);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexShrink(1);
    child1.setFlexBasisPercent(0);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.insertChild(child1, 1);

    const child2 = flexbox.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child2.setFlexBasisPercent(0);
    child2.setWidth(20);
    child2.setMinWidth(0);
    child2.setMinHeight(0);
    child1.insertChild(child2, 0);

    const child3 = flexbox.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child3.setFlexBasisPercent(0);
    root.insertChild(child3, 2);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(100);
  });

  test('display_none_with_position', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setFlexGrow(1);
    child1.setPosition(flexbox.EDGE_TOP, 10);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(0);
  });
});
