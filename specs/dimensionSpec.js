const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Dimensions', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();

    // Set inital width
    yogaNode.setWidth(100);
    flexboxNode.setWidth(100);

    // Set inital height
    yogaNode.setHeight(100);
    flexboxNode.setHeight(100);

    // Set inital maxWidth
    yogaNode.setMaxWidth(100);
    flexboxNode.setMaxWidth(100);

    // Set inital maxHeight
    yogaNode.setMaxHeight(100);
    flexboxNode.setMaxHeight(100);

    // Set inital minWidth
    yogaNode.setMinWidth(100);
    flexboxNode.setMinWidth(100);

    // Set inital minHeight
    yogaNode.setMinHeight(100);
    flexboxNode.setMinHeight(100);
  });

  test('should have same width by default', () => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();

    expect(yogaNode.getWidth()).toEqual(flexboxNode.getWidth());
  });

  test('should have same height by default', () => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();

    expect(yogaNode.getHeight()).toEqual(flexboxNode.getHeight());
  });

  test('should have same maxWidth by default', () => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();

    expect(yogaNode.getMaxWidth()).toEqual(flexboxNode.getMaxWidth());
  });

  test('should have same maxHeight by default', () => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();

    expect(yogaNode.getMaxHeight()).toEqual(flexboxNode.getMaxHeight());
  });

  test('should setWidth', () => {
    yogaNode.setWidth(200);
    flexboxNode.setWidth(200);

    expect(yogaNode.getWidth()).toEqual(flexboxNode.getWidth());
  });

  test('should setWidthAuto', () => {
    yogaNode.setWidthAuto();
    flexboxNode.setWidthAuto();

    expect(yogaNode.getWidth()).toEqual(flexboxNode.getWidth());
  });

  test('should setWidthPercent', () => {
    yogaNode.setWidthPercent(50);
    flexboxNode.setWidthPercent(50);

    expect(yogaNode.getWidth()).toEqual(flexboxNode.getWidth());
  });

  test('should setHeight', () => {
    yogaNode.setHeight(200);
    flexboxNode.setHeight(200);

    expect(yogaNode.getHeight()).toEqual(flexboxNode.getHeight());
  });

  test('should setHeightAuto', () => {
    yogaNode.setHeightAuto();
    flexboxNode.setHeightAuto();

    expect(yogaNode.getHeight()).toEqual(flexboxNode.getHeight());
  });

  test('should setHeightPercent', () => {
    yogaNode.setHeightPercent(50);
    flexboxNode.setHeightPercent(50);

    expect(yogaNode.getHeight()).toEqual(flexboxNode.getHeight());
  });

  test('should setMaxWidth', () => {
    yogaNode.setMaxWidth(200);
    flexboxNode.setMaxWidth(200);

    expect(yogaNode.getMaxWidth()).toEqual(flexboxNode.getMaxWidth());
  });

  test('should setMaxWidthPercent', () => {
    yogaNode.setMaxWidthPercent(200);
    flexboxNode.setMaxWidthPercent(200);

    expect(yogaNode.getMaxWidth()).toEqual(flexboxNode.getMaxWidth());
  });

  test('should setMaxHeight', () => {
    yogaNode.setMaxHeight(200);
    flexboxNode.setMaxHeight(200);

    expect(yogaNode.getMaxHeight()).toEqual(flexboxNode.getMaxHeight());
  });

  test('should setMaxHeightPercent', () => {
    yogaNode.setMaxHeightPercent(200);
    flexboxNode.setMaxHeightPercent(200);

    expect(yogaNode.getMaxHeight()).toEqual(flexboxNode.getMaxHeight());
  });

  test('should setMinWidth', () => {
    yogaNode.setMinWidth(200);
    flexboxNode.setMinWidth(200);

    expect(yogaNode.getMinWidth()).toEqual(flexboxNode.getMinWidth());
  });

  test('should setMinWidthPercent', () => {
    yogaNode.setMinWidthPercent(200);
    flexboxNode.setMinWidthPercent(200);

    expect(yogaNode.getMinWidth()).toEqual(flexboxNode.getMinWidth());
  });

  test('should setMinHeight', () => {
    yogaNode.setMinHeight(200);
    flexboxNode.setMinHeight(200);

    expect(yogaNode.getMinHeight()).toEqual(flexboxNode.getMinHeight());
  });

  test('should setMinHeightPercent', () => {
    yogaNode.setMinHeightPercent(200);
    flexboxNode.setMinHeightPercent(200);

    expect(yogaNode.getMinHeight()).toEqual(flexboxNode.getMinHeight());
  });

  test('should setAspectRatio', () => {
    yogaNode.setAspectRatio(200);
    flexboxNode.setAspectRatio(200);

    expect(yogaNode.getAspectRatio()).toEqual(flexboxNode.getAspectRatio());
  });
});
