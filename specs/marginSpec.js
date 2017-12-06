const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Margins', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();
  });

  test('should have same top margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_TOP)).toEqual(flexboxNode.getMargin(flexbox.EDGE_TOP));
  });

  test('should have same left margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_LEFT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_LEFT));
  });

  test('should have same bottom margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getMargin(flexbox.EDGE_BOTTOM));
  });

  test('should have same right margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_RIGHT));
  });

  test('should have same vertical margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_VERTICAL));
  });

  test('should have same horizontal margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_HORIZONTAL));
  });

  test('should have same start margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_START)).toEqual(flexboxNode.getMargin(flexbox.EDGE_START));
  });

  test('should have same end margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_END)).toEqual(flexboxNode.getMargin(flexbox.EDGE_END));
  });

  test('should have same all margin by default', () => {
    expect(yogaNode.getMargin(yoga.EDGE_ALL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_ALL));
  });

  test('should set top margin', () => {
    yogaNode.setMargin(yoga.EDGE_TOP, 5);
    flexboxNode.setMargin(yoga.EDGE_TOP, 5);

    expect(yogaNode.getMargin(yoga.EDGE_TOP)).toEqual(flexboxNode.getMargin(flexbox.EDGE_TOP));
  });

  test('should set left margin', () => {
    yogaNode.setMargin(yoga.EDGE_LEFT, 5);
    flexboxNode.setMargin(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getMargin(yoga.EDGE_LEFT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_LEFT));
  });

  test('should set bottom margin', () => {
    yogaNode.setMargin(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setMargin(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getMargin(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getMargin(flexbox.EDGE_BOTTOM));
  });

  test('should set right margin', () => {
    yogaNode.setMargin(yoga.EDGE_RIGHT, 5);
    flexboxNode.setMargin(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getMargin(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_RIGHT));
  });

  test('should set vertical margin', () => {
    yogaNode.setMargin(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setMargin(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getMargin(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_VERTICAL));
  });

  test('should set horizontal margin', () => {
    yogaNode.setMargin(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setMargin(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getMargin(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_HORIZONTAL));
  });

  test('should set start margin', () => {
    yogaNode.setMargin(yoga.EDGE_START, 5);
    flexboxNode.setMargin(yoga.EDGE_START, 5);

    expect(yogaNode.getMargin(yoga.EDGE_START)).toEqual(flexboxNode.getMargin(flexbox.EDGE_START));
  });

  test('should set end margin', () => {
    yogaNode.setMargin(yoga.EDGE_END, 5);
    flexboxNode.setMargin(yoga.EDGE_END, 5);

    expect(yogaNode.getMargin(yoga.EDGE_END)).toEqual(flexboxNode.getMargin(flexbox.EDGE_END));
  });

  test('should set all margin', () => {
    yogaNode.setMargin(yoga.EDGE_ALL, 5);
    flexboxNode.setMargin(yoga.EDGE_ALL, 5);

    expect(yogaNode.getMargin(yoga.EDGE_ALL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_ALL));
  });

  test('should set margin auto', () => {
    yogaNode.setMarginAuto(yoga.EDGE_ALL);
    flexboxNode.setMarginAuto(yoga.EDGE_ALL);

    expect(yogaNode.getMargin(yoga.EDGE_ALL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_ALL));
  });

  test('should set top percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_TOP, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_TOP, 5);

    expect(yogaNode.getMargin(yoga.EDGE_TOP)).toEqual(flexboxNode.getMargin(flexbox.EDGE_TOP));
  });

  test('should set left percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_LEFT, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getMargin(yoga.EDGE_LEFT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_LEFT));
  });

  test('should set bottom percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getMargin(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getMargin(flexbox.EDGE_BOTTOM));
  });

  test('should set right percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_RIGHT, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getMargin(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getMargin(flexbox.EDGE_RIGHT));
  });

  test('should set vertical percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getMargin(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_VERTICAL));
  });

  test('should set horizontal percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getMargin(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getMargin(flexbox.EDGE_HORIZONTAL));
  });

  test('should set start percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_START, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_START, 5);

    expect(yogaNode.getMargin(yoga.EDGE_START)).toEqual(flexboxNode.getMargin(flexbox.EDGE_START));
  });

  test('should set end percent margin', () => {
    yogaNode.setMarginPercent(yoga.EDGE_END, 5);
    flexboxNode.setMarginPercent(yoga.EDGE_END, 5);

    expect(yogaNode.getMargin(yoga.EDGE_END)).toEqual(flexboxNode.getMargin(flexbox.EDGE_END));
  });
});
