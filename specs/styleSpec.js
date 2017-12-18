const flexbox = require('../src');

describe.skip('Style', () => {
  test('copy_style_same', () => {
    const node0 = flexbox.Node.create();
    const node1 = flexbox.Node.create();
    expect(node0.isDirty).toBeFalsy();

    node0.copyStyle(node1);
    expect(node0.isDirty).toBeFalsy();
  });

  test('copy_style_modified', () => {
    const node0 = flexbox.Node.create();
    expect(node0.isDirty).toBeFalsy();
    expect(node0.getFlexDirection()).toBe(flexbox.FLEX_DIRECTION_COLUMN);
    expect(node0.getMaxHeight().unit).toBe(flexbox.UNIT_UNDEFINED);

    const node1 = flexbox.Node.create();
    node1.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    node1.setMaxHeight(10);

    node0.copyStyle(node1);
    expect(node0.isDirty).toBeTruthy();
    expect(node0.getFlexDirection()).toBe(flexbox.FLEX_DIRECTION_ROW);
    expect(node0.getMaxHeight().value).toBe(10);
  });

  test('copy_style_modified_same', () => {
    const node0 = flexbox.Node.create();
    node0.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    node0.setMaxHeight(10);
    node0.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(node0.isDirty).toBeFalsy();

    const node1 = flexbox.Node.create();
    node1.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    node1.setMaxHeight(10);

    node0.copyStyle(node1);
    expect(node0.isDirty).toBeFalsy();
  });
});
