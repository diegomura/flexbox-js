const flexbox = require('../src');

describe('Absloute position', () => {
  test('absolute layout width height start to', () => {
    const root = flexbox.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_START, 10);
    child.setPosition(flexbox.EDGE_TOP, 10);
    child.setWidth(10);
    child.setHeight(10);

    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);
  });

  test('absolute layout width height end bottom', () => {
    const root = flexbox.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_END, 10);
    child.setPosition(flexbox.EDGE_BOTTOM, 10);
    child.setWidth(10);
    child.setHeight(10);

    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(80);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(80);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);
  });

  test('absolute layout start top end bottom', () => {
    const root = flexbox.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_START, 10);
    child.setPosition(flexbox.EDGE_TOP, 10);
    child.setPosition(flexbox.EDGE_END, 10);
    child.setPosition(flexbox.EDGE_BOTTOM, 10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(80);
    expect(child.getComputedLayout().height).toEqual(80);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(80);
    expect(child.getComputedLayout().height).toEqual(80);
  });

  test('absolute layout width height start top end bottom', () => {
    const root = flexbox.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_START, 10);
    child.setPosition(flexbox.EDGE_TOP, 10);
    child.setPosition(flexbox.EDGE_END, 10);
    child.setPosition(flexbox.EDGE_BOTTOM, 10);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);
  });

  test('do not clamp height of absolute node to height of its overflow hidden parent', () => {
    const root = flexbox.Node.create();

    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setOverflow(flexbox.OVERFLOW_HIDDEN);
    root.setWidth(50);
    root.setHeight(50);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_START, 0);
    child.setPosition(flexbox.EDGE_TOP, 0);
    root.insertChild(child, 0);

    const child_child = flexbox.Node.create();
    child_child.setWidth(100);
    child_child.setHeight(100);
    child.insertChild(child_child, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(50);
    expect(root.getComputedLayout().height).toEqual(50);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(100);
    expect(child.getComputedLayout().height).toEqual(100);

    expect(child_child.getComputedLayout().left).toEqual(0);
    expect(child_child.getComputedLayout().top).toEqual(0);
    expect(child_child.getComputedLayout().width).toEqual(100);
    expect(child_child.getComputedLayout().height).toEqual(100);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(50);
    expect(root.getComputedLayout().height).toEqual(50);

    expect(child.getComputedLayout().left).toEqual(-50);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(100);
    expect(child.getComputedLayout().height).toEqual(100);

    expect(child_child.getComputedLayout().left).toEqual(0);
    expect(child_child.getComputedLayout().top).toEqual(0);
    expect(child_child.getComputedLayout().width).toEqual(100);
    expect(child_child.getComputedLayout().height).toEqual(100);
  });

  test('absolute layout within border', () => {
    const root = flexbox.Node.create();

    root.setMargin(flexbox.EDGE_LEFT, 10);
    root.setMargin(flexbox.EDGE_TOP, 10);
    root.setMargin(flexbox.EDGE_RIGHT, 10);
    root.setMargin(flexbox.EDGE_BOTTOM, 10);
    root.setPadding(flexbox.EDGE_LEFT, 10);
    root.setPadding(flexbox.EDGE_TOP, 10);
    root.setPadding(flexbox.EDGE_RIGHT, 10);
    root.setPadding(flexbox.EDGE_BOTTOM, 10);
    root.setBorder(flexbox.EDGE_LEFT, 10);
    root.setBorder(flexbox.EDGE_TOP, 10);
    root.setBorder(flexbox.EDGE_RIGHT, 10);
    root.setBorder(flexbox.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_LEFT, 0);
    child.setPosition(flexbox.EDGE_TOP, 0);
    child.setWidth(50);
    child.setHeight(50);
    root.insertChild(child, 0);

    const child2 = flexbox.Node.create();
    child2.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child2.setPosition(flexbox.EDGE_RIGHT, 0);
    child2.setPosition(flexbox.EDGE_BOTTOM, 0);
    child2.setWidth(50);
    child2.setHeight(50);
    root.insertChild(child2, 1);

    const child3 = flexbox.Node.create();
    child3.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child3.setPosition(flexbox.EDGE_LEFT, 0);
    child3.setPosition(flexbox.EDGE_TOP, 0);
    child3.setMargin(flexbox.EDGE_LEFT, 10);
    child3.setMargin(flexbox.EDGE_TOP, 10);
    child3.setMargin(flexbox.EDGE_RIGHT, 10);
    child3.setMargin(flexbox.EDGE_BOTTOM, 10);
    child3.setWidth(50);
    child3.setHeight(50);
    root.insertChild(child3, 2);

    const child4 = flexbox.Node.create();
    child4.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child4.setPosition(flexbox.EDGE_RIGHT, 0);
    child4.setPosition(flexbox.EDGE_BOTTOM, 0);
    child4.setMargin(flexbox.EDGE_LEFT, 10);
    child4.setMargin(flexbox.EDGE_TOP, 10);
    child4.setMargin(flexbox.EDGE_RIGHT, 10);
    child4.setMargin(flexbox.EDGE_BOTTOM, 10);
    child4.setWidth(50);
    child4.setHeight(50);
    root.insertChild(child4, 3);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(10);
    expect(root.getComputedLayout().top).toEqual(10);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(50);
    expect(child.getComputedLayout().height).toEqual(50);

    expect(child2.getComputedLayout().left).toEqual(40);
    expect(child2.getComputedLayout().top).toEqual(40);
    expect(child2.getComputedLayout().width).toEqual(50);
    expect(child2.getComputedLayout().height).toEqual(50);

    expect(child3.getComputedLayout().left).toEqual(20);
    expect(child3.getComputedLayout().top).toEqual(20);
    expect(child3.getComputedLayout().width).toEqual(50);
    expect(child3.getComputedLayout().height).toEqual(50);

    expect(child4.getComputedLayout().left).toEqual(30);
    expect(child4.getComputedLayout().top).toEqual(30);
    expect(child4.getComputedLayout().width).toEqual(50);
    expect(child4.getComputedLayout().height).toEqual(50);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(10);
    expect(root.getComputedLayout().top).toEqual(10);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(50);
    expect(child.getComputedLayout().height).toEqual(50);

    expect(child2.getComputedLayout().left).toEqual(40);
    expect(child2.getComputedLayout().top).toEqual(40);
    expect(child2.getComputedLayout().width).toEqual(50);
    expect(child2.getComputedLayout().height).toEqual(50);

    expect(child3.getComputedLayout().left).toEqual(20);
    expect(child3.getComputedLayout().top).toEqual(20);
    expect(child3.getComputedLayout().width).toEqual(50);
    expect(child3.getComputedLayout().height).toEqual(50);

    expect(child4.getComputedLayout().left).toEqual(30);
    expect(child4.getComputedLayout().top).toEqual(30);
    expect(child4.getComputedLayout().width).toEqual(50);
    expect(child4.getComputedLayout().height).toEqual(50);
  });

  test('absolute layout align items and justify content center', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items and justify content flex end', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_FLEX_END);
    root.setAlignItems(flexbox.ALIGN_FLEX_END);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(50);
    expect(child.getComputedLayout().top).toEqual(60);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(60);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout justify content center', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(50);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items center', () => {
    const root = flexbox.Node.create();

    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items center on child only', () => {
    const root = flexbox.Node.create();

    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setAlignSelf(flexbox.ALIGN_CENTER);
    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items and justify content center and top position', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_TOP, 10);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items and justify content center and bottom position', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_BOTTOM, 10);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(50);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(25);
    expect(child.getComputedLayout().top).toEqual(50);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items and justify content center and left position', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_LEFT, 5);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(5);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(5);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('absolute layout align items and justify content center and right position', () => {
    const root = flexbox.Node.create();

    root.setJustifyContent(flexbox.JUSTIFY_CENTER);
    root.setAlignItems(flexbox.ALIGN_CENTER);
    root.setFlexGrow(1);
    root.setWidth(110);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPosition(flexbox.EDGE_RIGHT, 5);
    child.setWidth(60);
    child.setHeight(40);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(45);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(110);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(45);
    expect(child.getComputedLayout().top).toEqual(30);
    expect(child.getComputedLayout().width).toEqual(60);
    expect(child.getComputedLayout().height).toEqual(40);
  });

  test('position root with rtl should position withoutdirection', () => {
    const root = flexbox.Node.create();

    root.setPosition(flexbox.EDGE_LEFT, 72);
    root.setWidth(52);
    root.setHeight(52);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(72);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(52);
    expect(root.getComputedLayout().height).toEqual(52);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(72);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(52);
    expect(root.getComputedLayout().height).toEqual(52);
  });

  test('absolute layout percentage bottom based on parent height', () => {
    const root = flexbox.Node.create();

    root.setWidth(100);
    root.setHeight(200);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setPositionPercent(flexbox.EDGE_TOP, 50);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);

    const child2 = flexbox.Node.create();
    child2.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child2.setPositionPercent(flexbox.EDGE_BOTTOM, 50);
    child2.setWidth(10);
    child2.setHeight(10);
    root.insertChild(child2, 1);

    const child3 = flexbox.Node.create();
    child3.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child3.setPositionPercent(flexbox.EDGE_TOP, 10);
    child3.setPositionPercent(flexbox.EDGE_BOTTOM, 10);
    child3.setWidth(10);
    root.insertChild(child3, 2);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(200);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(100);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    expect(child2.getComputedLayout().left).toEqual(0);
    expect(child2.getComputedLayout().top).toEqual(90);
    expect(child2.getComputedLayout().width).toEqual(10);
    expect(child2.getComputedLayout().height).toEqual(10);

    expect(child3.getComputedLayout().left).toEqual(0);
    expect(child3.getComputedLayout().top).toEqual(20);
    expect(child3.getComputedLayout().width).toEqual(10);
    expect(child3.getComputedLayout().height).toEqual(160);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(200);

    expect(child.getComputedLayout().left).toEqual(90);
    expect(child.getComputedLayout().top).toEqual(100);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    expect(child2.getComputedLayout().left).toEqual(90);
    expect(child2.getComputedLayout().top).toEqual(90);
    expect(child2.getComputedLayout().width).toEqual(10);
    expect(child2.getComputedLayout().height).toEqual(10);

    expect(child3.getComputedLayout().left).toEqual(90);
    expect(child3.getComputedLayout().top).toEqual(20);
    expect(child3.getComputedLayout().width).toEqual(10);
    expect(child3.getComputedLayout().height).toEqual(160);
  });

  test('absolute layout in wrap reverse column container', () => {
    const root = flexbox.Node.create();

    root.setFlexWrap(flexbox.WRAP_WRAP_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(20);
    child.setHeight(20);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);
  });

  test('absolute layout in wrap reverse row container', () => {
    const root = flexbox.Node.create();

    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setFlexWrap(flexbox.WRAP_WRAP_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(20);
    child.setHeight(20);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(80);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(80);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);
  });

  test('absolute layout in wrap reverse column container flex end', () => {
    const root = flexbox.Node.create();

    root.setFlexWrap(flexbox.WRAP_WRAP_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setAlignSelf(flexbox.ALIGN_FLEX_END);
    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(20);
    child.setHeight(20);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);
  });

  test('absolute layout in wrap reverse row container flex end', () => {
    const root = flexbox.Node.create();

    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setFlexWrap(flexbox.WRAP_WRAP_REVERSE);
    root.setWidth(100);
    root.setHeight(100);

    const child = flexbox.Node.create();

    child.setAlignSelf(flexbox.ALIGN_FLEX_END);
    child.setPositionType(flexbox.POSITION_TYPE_ABSOLUTE);
    child.setWidth(20);
    child.setHeight(20);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(0);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(0);
    expect(child.getComputedLayout().width).toEqual(20);
    expect(child.getComputedLayout().height).toEqual(20);
  });
});
