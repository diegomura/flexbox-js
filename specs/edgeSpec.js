const flexbox = require('../src');

describe('Edge', () => {
  test('start_overrides', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_START, 10);
    child0.setMargin(flexbox.EDGE_LEFT, 20);
    child0.setMargin(flexbox.EDGE_RIGHT, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().right).toBe(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);
    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().right).toBe(10);
  });

  test('end_overrides', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_END, 10);
    child0.setMargin(flexbox.EDGE_LEFT, 20);
    child0.setMargin(flexbox.EDGE_RIGHT, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().right).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);
    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().right).toBe(20);
  });

  test('horizontal_overridden', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_HORIZONTAL, 10);
    child0.setMargin(flexbox.EDGE_LEFT, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().right).toBe(10);
  });

  test('vertical_overridden', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_VERTICAL, 10);
    child0.setMargin(flexbox.EDGE_TOP, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().bottom).toBe(10);
  });

  test('horizontal_overrides_all', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_HORIZONTAL, 10);
    child0.setMargin(flexbox.EDGE_ALL, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().right).toBe(10);
    expect(child0.getComputedLayout().bottom).toBe(20);
  });

  test('vertical_overrides_all', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_VERTICAL, 10);
    child0.setMargin(flexbox.EDGE_ALL, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().right).toBe(20);
    expect(child0.getComputedLayout().bottom).toBe(10);
  });

  test('all_overridden', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(flexbox.EDGE_LEFT, 10);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_RIGHT, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    child0.setMargin(flexbox.EDGE_ALL, 20);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().right).toBe(10);
    expect(child0.getComputedLayout().bottom).toBe(10);
  });
});
