const yoga = require('../src');

describe('Absloute position', () => {
  test('test 1', () => {
    const root = yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = yoga.Node.create();

    child.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    child.setPosition(yoga.EDGE_START, 10);
    child.setPosition(yoga.EDGE_TOP, 10);
    child.setWidth(10);
    child.setHeight(10);

    root.insertChild(child, 0)
    root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(10);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);

    root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toEqual(0);
    expect(root.getComputedLayout().top).toEqual(0);
    expect(root.getComputedLayout().width).toEqual(100);
    expect(root.getComputedLayout().height).toEqual(100);

    expect(child.getComputedLayout().left).toEqual(80);
    expect(child.getComputedLayout().top).toEqual(10);
    expect(child.getComputedLayout().width).toEqual(10);
    expect(child.getComputedLayout().height).toEqual(10);
  });
});
