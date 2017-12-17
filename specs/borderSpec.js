const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Borders', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();
  });

  test('should have same top border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_TOP),
    );
  });

  test('should have same left border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_LEFT),
    );
  });

  test('should have same bottom border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_BOTTOM),
    );
  });

  test('should have same right border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_RIGHT),
    );
  });

  test('should have same vertical border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should have same start border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_START)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_START),
    );
  });

  test('should have same end border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_END)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_END),
    );
  });

  test('should have same all border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_ALL),
    );
  });

  test('should set top border', () => {
    yogaNode.setBorder(yoga.EDGE_TOP, 5);
    flexboxNode.setBorder(yoga.EDGE_TOP, 5);

    expect(yogaNode.getBorder(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_TOP),
    );
  });

  test('should set left border', () => {
    yogaNode.setBorder(yoga.EDGE_LEFT, 5);
    flexboxNode.setBorder(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getBorder(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_LEFT),
    );
  });

  test('should set bottom border', () => {
    yogaNode.setBorder(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setBorder(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getBorder(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_BOTTOM),
    );
  });

  test('should set right border', () => {
    yogaNode.setBorder(yoga.EDGE_RIGHT, 5);
    flexboxNode.setBorder(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getBorder(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_RIGHT),
    );
  });

  test('should set vertical border', () => {
    yogaNode.setBorder(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setBorder(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_VERTICAL),
    );
  });

  test('should set horizontal border', () => {
    yogaNode.setBorder(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setBorder(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should set start border', () => {
    yogaNode.setBorder(yoga.EDGE_START, 5);
    flexboxNode.setBorder(yoga.EDGE_START, 5);

    expect(yogaNode.getBorder(yoga.EDGE_START)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_START),
    );
  });

  test('should set end border', () => {
    yogaNode.setBorder(yoga.EDGE_END, 5);
    flexboxNode.setBorder(yoga.EDGE_END, 5);

    expect(yogaNode.getBorder(yoga.EDGE_END)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_END),
    );
  });

  test('should set all border', () => {
    yogaNode.setBorder(yoga.EDGE_ALL, 5);
    flexboxNode.setBorder(yoga.EDGE_ALL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getBorder(flexbox.EDGE_ALL),
    );
  });

  test('border_no_size', () => {
    const root = flexbox.Node.create();
    root.setBorder(flexbox.EDGE_LEFT, 10);
    root.setBorder(flexbox.EDGE_TOP, 10);
    root.setBorder(flexbox.EDGE_RIGHT, 10);
    root.setBorder(flexbox.EDGE_BOTTOM, 10);
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

  test('border_container_match_child', () => {
    const root = flexbox.Node.create();
    root.setBorder(flexbox.EDGE_LEFT, 10);
    root.setBorder(flexbox.EDGE_TOP, 10);
    root.setBorder(flexbox.EDGE_RIGHT, 10);
    root.setBorder(flexbox.EDGE_BOTTOM, 10);

    const child = flexbox.Node.create();
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(child.getComputedLayout().left).toBe(10);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(child.getComputedLayout().left).toBe(10);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('border_flex_child', () => {
    const root = flexbox.Node.create();
    root.setBorder(flexbox.EDGE_LEFT, 10);
    root.setBorder(flexbox.EDGE_TOP, 10);
    root.setBorder(flexbox.EDGE_RIGHT, 10);
    root.setBorder(flexbox.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();
    child.setFlexGrow(1);
    child.setWidth(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(10);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(80);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(80);
  });

  test('border_stretch_child', () => {
    const root = flexbox.Node.create();
    root.setBorder(flexbox.EDGE_LEFT, 10);
    root.setBorder(flexbox.EDGE_TOP, 10);
    root.setBorder(flexbox.EDGE_RIGHT, 10);
    root.setBorder(flexbox.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(10);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(80);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(10);
    expect(child.getComputedLayout().top).toBe(10);
    expect(child.getComputedLayout().width).toBe(80);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('border_center_child', () => {
    const root = flexbox.Node.create();
    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setBorder(flexbox.EDGE_START, 10);
    root.setBorder(flexbox.EDGE_END, 20);
    root.setBorder(flexbox.EDGE_BOTTOM, 20);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(40);
    expect(child.getComputedLayout().top).toBe(35);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(50);
    expect(child.getComputedLayout().top).toBe(35);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });
});
