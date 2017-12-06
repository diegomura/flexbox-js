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
    expect(yogaNode.getBorder(yoga.EDGE_TOP)).toEqual(flexboxNode.getBorder(flexbox.EDGE_TOP));
  });

  test('should have same left border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_LEFT)).toEqual(flexboxNode.getBorder(flexbox.EDGE_LEFT));
  });

  test('should have same bottom border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getBorder(flexbox.EDGE_BOTTOM));
  });

  test('should have same right border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getBorder(flexbox.EDGE_RIGHT));
  });

  test('should have same vertical border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_VERTICAL));
  });

  test('should have same horizontal border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_HORIZONTAL));
  });

  test('should have same start border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_START)).toEqual(flexboxNode.getBorder(flexbox.EDGE_START));
  });

  test('should have same end border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_END)).toEqual(flexboxNode.getBorder(flexbox.EDGE_END));
  });

  test('should have same all border by default', () => {
    expect(yogaNode.getBorder(yoga.EDGE_ALL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_ALL));
  });

  test('should set top border', () => {
    yogaNode.setBorder(yoga.EDGE_TOP, 5);
    flexboxNode.setBorder(yoga.EDGE_TOP, 5);

    expect(yogaNode.getBorder(yoga.EDGE_TOP)).toEqual(flexboxNode.getBorder(flexbox.EDGE_TOP));
  });

  test('should set left border', () => {
    yogaNode.setBorder(yoga.EDGE_LEFT, 5);
    flexboxNode.setBorder(yoga.EDGE_LEFT, 5);

    expect(yogaNode.getBorder(yoga.EDGE_LEFT)).toEqual(flexboxNode.getBorder(flexbox.EDGE_LEFT));
  });

  test('should set bottom border', () => {
    yogaNode.setBorder(yoga.EDGE_BOTTOM, 5);
    flexboxNode.setBorder(yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getBorder(yoga.EDGE_BOTTOM)).toEqual(flexboxNode.getBorder(flexbox.EDGE_BOTTOM));
  });

  test('should set right border', () => {
    yogaNode.setBorder(yoga.EDGE_RIGHT, 5);
    flexboxNode.setBorder(yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getBorder(yoga.EDGE_RIGHT)).toEqual(flexboxNode.getBorder(flexbox.EDGE_RIGHT));
  });

  test('should set vertical border', () => {
    yogaNode.setBorder(yoga.EDGE_VERTICAL, 5);
    flexboxNode.setBorder(yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_VERTICAL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_VERTICAL));
  });

  test('should set horizontal border', () => {
    yogaNode.setBorder(yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setBorder(yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_HORIZONTAL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_HORIZONTAL));
  });

  test('should set start border', () => {
    yogaNode.setBorder(yoga.EDGE_START, 5);
    flexboxNode.setBorder(yoga.EDGE_START, 5);

    expect(yogaNode.getBorder(yoga.EDGE_START)).toEqual(flexboxNode.getBorder(flexbox.EDGE_START));
  });

  test('should set end border', () => {
    yogaNode.setBorder(yoga.EDGE_END, 5);
    flexboxNode.setBorder(yoga.EDGE_END, 5);

    expect(yogaNode.getBorder(yoga.EDGE_END)).toEqual(flexboxNode.getBorder(flexbox.EDGE_END));
  });

  test('should set all border', () => {
    yogaNode.setBorder(yoga.EDGE_ALL, 5);
    flexboxNode.setBorder(yoga.EDGE_ALL, 5);

    expect(yogaNode.getBorder(yoga.EDGE_ALL)).toEqual(flexboxNode.getBorder(flexbox.EDGE_ALL));
  });
});
