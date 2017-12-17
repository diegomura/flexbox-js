const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Position', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();
  });

  test('should have same top position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_TOP),
    );
  });

  test('should have same left position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_LEFT),
    );
  });

  test('should have same bottom position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_BOTTOM),
    );
  });

  test('should have same right position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_RIGHT),
    );
  });

  test('should have same vertical position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should have same start position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_START),
    );
  });

  test('should have same end position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_END),
    );
  });

  test('should have same all position by default', () => {
    expect(yogaNode.getPosition(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_ALL),
    );
  });

  test('should set top position', () => {
    yogaNode.setPosition(yoga.EDGE_TOP, 5);
    flexboxNode.setPosition(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPosition(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_TOP),
    );
  });

  test('should set left position', () => {
    yogaNode.setPosition(yoga.EDGE_LEFT, 5);
    flexboxNode.setPosition(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPosition(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_LEFT),
    );
  });

  test('should set bottom position', () => {
    yogaNode.setPosition(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPosition(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPosition(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_BOTTOM),
    );
  });

  test('should set right position', () => {
    yogaNode.setPosition(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPosition(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPosition(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_RIGHT),
    );
  });

  test('should set vertical position', () => {
    yogaNode.setPosition(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPosition(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPosition(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_VERTICAL),
    );
  });

  test('should set horizontal position', () => {
    yogaNode.setPosition(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPosition(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPosition(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should set start position', () => {
    yogaNode.setPosition(yoga.EDGE_START, 5);
    flexboxNode.setPosition(yoga.EDGE_START, 5);

    expect(yogaNode.getPosition(yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_START),
    );
  });

  test('should set end position', () => {
    yogaNode.setPosition(yoga.EDGE_END, 5);
    flexboxNode.setPosition(yoga.EDGE_END, 5);

    expect(yogaNode.getPosition(yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_END),
    );
  });

  test('should set all position', () => {
    yogaNode.setPosition(yoga.EDGE_ALL, 5);
    flexboxNode.setPosition(yoga.EDGE_ALL, 5);

    expect(yogaNode.getPosition(yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_ALL),
    );
  });

  test('should set top percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_TOP, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPosition(yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_TOP),
    );
  });

  test('should set left percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_LEFT, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPosition(yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_LEFT),
    );
  });

  test('should set bottom percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPosition(yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_BOTTOM),
    );
  });

  test('should set right percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPosition(yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_RIGHT),
    );
  });

  test('should set vertical percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPosition(yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_VERTICAL),
    );
  });

  test('should set horizontal percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPosition(yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_HORIZONTAL),
    );
  });

  test('should set start percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_START, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_START, 5);

    expect(yogaNode.getPosition(yoga.EDGE_START)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_START),
    );
  });

  test('should set end percent position', () => {
    yogaNode.setPositionPercent(yoga.EDGE_END, 5);
    flexboxNode.setPositionPercent(yoga.EDGE_END, 5);

    expect(yogaNode.getPosition(yoga.EDGE_END)).toEqual(
      flexboxNode.getPosition(flexbox.EDGE_END),
    );
  });

  test('should set position type relative', () => {
    yogaNode.setPositionType(yoga.POSITION_TYPE_RELATIVE);
    flexboxNode.setPositionType(yoga.POSITION_TYPE_RELATIVE);

    expect(yogaNode.getPositionType()).toEqual(flexboxNode.getPositionType());
  });

  test('should set position type absolute', () => {
    yogaNode.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
    flexboxNode.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);

    expect(yogaNode.getPositionType()).toEqual(flexboxNode.getPositionType());
  });
});
