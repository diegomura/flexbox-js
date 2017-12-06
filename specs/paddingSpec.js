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
    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(flexboxNode.getPadding(flexbox.EDGE_TOP));
  });

  test('should have same left padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_LEFT));
  });

  test('should have same bottom padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getPadding(flexbox.EDGE_BOTTOM));
  });

  test('should have same right padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_RIGHT));
  });

  test('should have same vertical padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_VERTICAL));
  });

  test('should have same horizontal padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL));
  });

  test('should have same start padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(flexboxNode.getPadding(flexbox.EDGE_START));
  });

  test('should have same end padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(flexboxNode.getPadding(flexbox.EDGE_END));
  });

  test('should have same all padding by default', () => {
    expect(yogaNode.getPadding(yoga.EDGE_ALL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_ALL));
  });

  test('should set top padding', () => {
    yogaNode.setPadding(yoga.EDGE_TOP, 5);
    flexboxNode.setPadding(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(flexboxNode.getPadding(flexbox.EDGE_TOP));
  });

  test('should set left padding', () => {
    yogaNode.setPadding(yoga.EDGE_LEFT, 5);
    flexboxNode.setPadding(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_LEFT));
  });

  test('should set bottom padding', () => {
    yogaNode.setPadding(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPadding(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getPadding(flexbox.EDGE_BOTTOM));
  });

  test('should set right padding', () => {
    yogaNode.setPadding(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPadding(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_RIGHT));
  });

  test('should set vertical padding', () => {
    yogaNode.setPadding(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPadding(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_VERTICAL));
  });

  test('should set horizontal padding', () => {
    yogaNode.setPadding(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPadding(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL));
  });

  test('should set start padding', () => {
    yogaNode.setPadding(yoga.EDGE_START, 5);
    flexboxNode.setPadding(yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(flexboxNode.getPadding(flexbox.EDGE_START));
  });

  test('should set end padding', () => {
    yogaNode.setPadding(yoga.EDGE_END, 5);
    flexboxNode.setPadding(yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(flexboxNode.getPadding(flexbox.EDGE_END));
  });

  test('should set all padding', () => {
    yogaNode.setPadding(yoga.EDGE_ALL, 5);
    flexboxNode.setPadding(yoga.EDGE_ALL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_ALL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_ALL));
  });

  test('should set top percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_TOP, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(yoga.EDGE_TOP)).toEqual(flexboxNode.getPadding(flexbox.EDGE_TOP));
  });

  test('should set left percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_LEFT, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_LEFT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_LEFT));
  });

  test('should set bottom percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getPadding(flexbox.EDGE_BOTTOM));
  });

  test('should set right percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_RIGHT, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getPadding(flexbox.EDGE_RIGHT));
  });

  test('should set vertical percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_VERTICAL));
  });

  test('should set horizontal percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getPadding(flexbox.EDGE_HORIZONTAL));
  });

  test('should set start percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_START, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(yoga.EDGE_START)).toEqual(flexboxNode.getPadding(flexbox.EDGE_START));
  });

  test('should set end percent padding', () => {
    yogaNode.setPaddingPercent(yoga.EDGE_END, 5);
    flexboxNode.setPaddingPercent(yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(yoga.EDGE_END)).toEqual(flexboxNode.getPadding(flexbox.EDGE_END));
  });
});
