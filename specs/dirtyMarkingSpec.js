const flexbox = require('../src');

describe.skip('Dirty marking', () => {
  test('dirty_propagation', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = flexbox.Node.create();
    child1.setWidth(50);
    child1.setHeight(20);
    root.insertChild(child1, 0);

    const child2 = flexbox.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    child1.setWidth(20);

    expect(child1.isDirty).toBeTruthy();
    expect(child2.isDirty).toBeFalsy();
    expect(root.isDirty).toBeTruthy();

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(child1.isDirty).toBeFalsy();
    expect(child2.isDirty).toBeFalsy();
    expect(root.isDirty).toBeFalsy();
  });

  test('dirty_propagation_only_if_prop_changed', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = flexbox.Node.create();
    child1.setWidth(50);
    child1.setHeight(20);
    root.insertChild(child1, 0);

    const child2 = flexbox.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    child1.setWidth(50);

    expect(child1.isDirty).toBeFalsy();
    expect(child2.isDirty).toBeFalsy();
    expect(root.isDirty).toBeFalsy();
  });

  test('dirty_mark_all_children_as_dirty_when_display_changes', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setHeight(100);

    const child0 = flexbox.Node.create();
    child0.setFlexGrow(1);
    const child1 = flexbox.Node.create();
    child1.setFlexGrow(1);

    const child3 = flexbox.Node.create();
    const child4 = flexbox.Node.create();
    child4.setWidth(8);
    child4.setHeight(16);

    child3.insertChild(child4, 0);

    child1.insertChild(child3, 0);
    root.insertChild(child0, 0);
    root.insertChild(child1, 0);

    child0.setDisplay(flexbox.DISPLAY_FLEX);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(YGNodeLayoutGetWidth(child4)).toBe(0);
    expect(YGNodeLayoutGetHeight(child4)).toBe(0);

    child0.setDisplay(flexbox.DISPLAY_NONE);
    child1.setDisplay(flexbox.DISPLAY_FLEX);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(YGNodeLayoutGetWidth(child4)).toBe(8);
    expect(YGNodeLayoutGetHeight(child4)).toBe(16);

    child0.setDisplay(flexbox.DISPLAY_FLEX);
    child1.setDisplay(flexbox.DISPLAY_NONE);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(YGNodeLayoutGetWidth(child4)).toBe(0);
    expect(YGNodeLayoutGetHeight(child4)).toBe(0);

    child0.setDisplay(flexbox.DISPLAY_NONE);
    child1.setDisplay(flexbox.DISPLAY_FLEX);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
    expect(YGNodeLayoutGetWidth(child4)).toBe(8);
    expect(YGNodeLayoutGetHeight(child4)).toBe(16);
  });

  test('dirty_node_only_if_children_are_actually_removed', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setWidth(50);
    child0.setHeight(25);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    const child1 = flexbox.Node.create();
    root.removeChild(child1);
    expect(root.isDirty).toBeFalsy();
    // YGNodeFree(child1);

    root.removeChild(child0);
    expect(root.isDirty).toBeTruthy();
    // YGNodeFree(child0);
  });

  test('dirty_node_only_if_undefined_values_gets_set_to_undefined', () => {
    const root = flexbox.Node.create();
    root.setWidth(50);
    root.setHeight(50);
    root.setMinWidth(undefined);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.isDirty).toBeFalsy();

    root.setMinWidth(undefined);

    expect(root.isDirty).toBeFalsy();
  });
});
