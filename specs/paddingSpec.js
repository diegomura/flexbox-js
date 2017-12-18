const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Paddings', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();
  });

  test('should have same top padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_TOP),
    );
  });

  test('should have same left padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_LEFT),
    );
  });

  test('should have same bottom padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_BOTTOM),
    );
  });

  test('should have same right padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_RIGHT),
    );
  });

  test('should have same vertical padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should have same start padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_START),
    );
  });

  test('should have same end padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_END),
    );
  });

  test('should have same all padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_ALL),
    );
  });

  test('should set top padding', () => {
    yogaNode.setPadding(yoga.EDGE_TOP, 5);
    flexboxNode.setPadding(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_TOP),
    );
  });

  test('should set left padding', () => {
    yogaNode.setPadding(yoga.EDGE_LEFT, 5);
    flexboxNode.setPadding(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_LEFT),
    );
  });

  test('should set bottom padding', () => {
    yogaNode.setPadding(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPadding(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_BOTTOM),
    );
  });

  test('should set right padding', () => {
    yogaNode.setPadding(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPadding(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_RIGHT),
    );
  });

  test('should set vertical padding', () => {
    yogaNode.setPadding(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPadding(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_VERTICAL),
    );
  });

  test('should set horizontal padding', () => {
    yogaNode.setPadding(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPadding(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should set start padding', () => {
    yogaNode.setPadding(yoga.EDGE_START, 5);
    flexboxNode.setPadding(yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_START),
    );
  });

  test('should set end padding', () => {
    yogaNode.setPadding(yoga.EDGE_END, 5);
    flexboxNode.setPadding(yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_END),
    );
  });

  test('should set all padding', () => {
    yogaNode.setPadding(yoga.EDGE_ALL, 5);
    flexboxNode.setPadding(yoga.EDGE_ALL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_ALL),
    );
  });

  test('should set top percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_TOP, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_TOP),
    );
  });

  test('should set left percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_LEFT, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_LEFT),
    );
  });

  test('should set bottom percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_BOTTOM),
    );
  });

  test('should set right percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_RIGHT),
    );
  });

  test('should set vertical percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_VERTICAL),
    );
  });

  test('should set horizontal percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should set start percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_START, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_START),
    );
  });

  test('should set end percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_END, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(flexbox.EDGE_END),
    );
  });

  test('padding_no_size', () => {
    const root = flexbox.Node.create()
    root.setPadding(flexbox.EDGE_LEFT, 10);
    root.setPadding(flexbox.EDGE_TOP, 10);
    root.setPadding(flexbox.EDGE_RIGHT, 10);
    root.setPadding(flexbox.EDGE_BOTTOM, 10);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(20);
  });

  test('padding_container_match_child', () => {
    const root = flexbox.Node.create()
    root.setPadding(flexbox.EDGE_LEFT, 10);
    root.setPadding(flexbox.EDGE_TOP, 10);
    root.setPadding(flexbox.EDGE_RIGHT, 10);
    root.setPadding(flexbox.EDGE_BOTTOM, 10);

    const root_child0 = flexbox.Node.create()
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(root_child0.getComputedLayout().left).toBe(10);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(root_child0.getComputedLayout().left).toBe(10);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);
  });

  test('padding_flex_child', () => {
    const root = flexbox.Node.create()
    root.setPadding(flexbox.EDGE_LEFT, 10);
    root.setPadding(flexbox.EDGE_TOP, 10);
    root.setPadding(flexbox.EDGE_RIGHT, 10);
    root.setPadding(flexbox.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = flexbox.Node.create()
    root_child0.setFlexGrow(1);
    root_child0.setWidth(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(10);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(80);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(80);
  });

  test('padding_stretch_child', () => {
    const root = flexbox.Node.create()
    root.setPadding(flexbox.EDGE_LEFT, 10);
    root.setPadding(flexbox.EDGE_TOP, 10);
    root.setPadding(flexbox.EDGE_RIGHT, 10);
    root.setPadding(flexbox.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = flexbox.Node.create()
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(10);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(80);
    expect(root_child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(10);
    expect(root_child0.getComputedLayout().top).toBe(10);
    expect(root_child0.getComputedLayout().width).toBe(80);
    expect(root_child0.getComputedLayout().height).toBe(10);
  });

  test('padding_center_child', () => {
    const root = flexbox.Node.create()
    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setPadding(flexbox.EDGE_START, 10);
    root.setPadding(flexbox.EDGE_END, 20);
    root.setPadding(flexbox.EDGE_BOTTOM, 20);
    root.setWidth(100);
    root.setHeight(100);

    const root_child0 = flexbox.Node.create()
    root_child0.setWidth(10);
    root_child0.setHeight(10);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(40);
    expect(root_child0.getComputedLayout().top).toBe(35);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(root_child0.getComputedLayout().left).toBe(50);
    expect(root_child0.getComputedLayout().top).toBe(35);
    expect(root_child0.getComputedLayout().width).toBe(10);
    expect(root_child0.getComputedLayout().height).toBe(10);
  });

  test('child_with_padding_align_end', () => {
    const root = flexbox.Node.create()
    root.setJustifyContent(flexbox.JUSTIFY_FLEX_END);
    root.setAlignItems(flexbox.ALIGN_FLEX_END);
    root.setWidth(200);
    root.setHeight(200);

    const root_child0 = flexbox.Node.create()
    root_child0.setPadding(flexbox.EDGE_LEFT, 20);
    root_child0.setPadding(flexbox.EDGE_TOP, 20);
    root_child0.setPadding(flexbox.EDGE_RIGHT, 20);
    root_child0.setPadding(flexbox.EDGE_BOTTOM, 20);
    root_child0.setWidth(100);
    root_child0.setHeight(100);
    root.insertChild(root_child0, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(root_child0.getComputedLayout().left).toBe(100);
    expect(root_child0.getComputedLayout().top).toBe(100);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(root_child0.getComputedLayout().left).toBe(0);
    expect(root_child0.getComputedLayout().top).toBe(100);
    expect(root_child0.getComputedLayout().width).toBe(100);
    expect(root_child0.getComputedLayout().height).toBe(100);
  });
});
