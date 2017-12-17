const flexbox = require('../src');

describe('Had overflow', () => {
  let root;

  beforeEach(() => {
    root = flexbox.Node.create();
    root.setWidth(200);
    root.setHeight(100);
    root.setFlexDirection(flexbox.FLEX_DIRECTION_COLUMN);
    root.setFlexWrap(flexbox.WRAP_NO_WRAP);
  });

  test('children_overflow_no_wrap_and_no_flex_children', () => {
    const child0 = flexbox.Node.create();
    child0.setWidth(80);
    child0.setHeight(40);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 15);
    root.insertChild(child0, 0);
    const child1 = flexbox.Node.create();
    child1.setWidth(80);
    child1.setHeight(40);
    child1.setMargin(flexbox.EDGE_BOTTOM, 5);
    root.insertChild(child1, 1);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeTruthy();
  });

  test('spacing_overflow_no_wrap_and_no_flex_children', () => {
    const child0 = flexbox.Node.create();
    child0.setWidth(80);
    child0.setHeight(40);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    const child1 = flexbox.Node.create();
    child1.setWidth(80);
    child1.setHeight(40);
    child1.setMargin(flexbox.EDGE_BOTTOM, 5);
    root.insertChild(child1, 1);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeTruthy();
  });

  test('no_overflow_no_wrap_and_flex_children', () => {
    const child0 = flexbox.Node.create();
    child0.setWidth(80);
    child0.setHeight(40);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    const child1 = flexbox.Node.create();
    child1.setWidth(80);
    child1.setHeight(40);
    child1.setMargin(flexbox.EDGE_BOTTOM, 5);
    child1.setFlexShrink(1);
    root.insertChild(child1, 1);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeFalsy();
  });

  test.skip('hadOverflow_gets_reset_if_not_logger_valid', () => {
    const child0 = flexbox.Node.create();
    child0.setWidth(80);
    child0.setHeight(40);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    const child1 = flexbox.Node.create();
    child1.setWidth(80);
    child1.setHeight(40);
    child1.setMargin(flexbox.EDGE_BOTTOM, 5);
    root.insertChild(child1, 1);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeTruthy();

    child1.setFlexShrink(1);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeFalsy();
  });

  test('spacing_overflow_in_nested_nodes', () => {
    const child0 = flexbox.Node.create();
    child0.setWidth(80);
    child0.setHeight(40);
    child0.setMargin(flexbox.EDGE_TOP, 10);
    child0.setMargin(flexbox.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    const child1 = flexbox.Node.create();
    child1.setWidth(80);
    child1.setHeight(40);
    root.insertChild(child1, 1);
    const child2 = flexbox.Node.create();
    child2.setWidth(80);
    child2.setHeight(40);
    child2.setMargin(flexbox.EDGE_BOTTOM, 5);
    child1.insertChild(child2, 0);

    root.calculateLayout(200, 100, flexbox.DIRECTION_LTR);

    expect(root.layout.hadOverflow).toBeTruthy();
  });
});
