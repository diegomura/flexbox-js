const flexbox = require('../src');

describe('Default values', () => {
  test('assert default values', () => {
    const root = flexbox.Node.create();

    expect(root.getChildCount(root)).toBe(0);
    expect(root.getChild(1)).toBe(null);

    expect(root.getDirection()).toBe(flexbox.DIRECTION_INHERIT);
    expect(root.getFlexDirection()).toBe(flexbox.FLEX_DIRECTION_COLUMN);
    expect(root.getJustifyContent()).toBe(flexbox.JUSTIFY_FLEX_START);
    expect(root.getAlignContent()).toBe(flexbox.ALIGN_FLEX_START);
    expect(root.getAlignItems()).toBe(flexbox.ALIGN_STRETCH);
    expect(root.getAlignSelf()).toBe(flexbox.ALIGN_AUTO);
    expect(root.getPositionType()).toBe(flexbox.POSITION_TYPE_RELATIVE);
    expect(root.getFlexWrap()).toBe(flexbox.WRAP_NO_WRAP);
    expect(root.getOverflow()).toBe(flexbox.OVERFLOW_VISIBLE);
    expect(root.getFlexGrow()).toBe(0);
    expect(root.getFlexShrink()).toBe(0);
    expect(root.getFlexBasis().unit).toBe(flexbox.UNIT_AUTO);

    expect(root.getPosition(flexbox.EDGE_LEFT).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPosition(flexbox.EDGE_TOP).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPosition(flexbox.EDGE_RIGHT).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPosition(flexbox.EDGE_BOTTOM).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPosition(flexbox.EDGE_START).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPosition(flexbox.EDGE_END).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );

    expect(root.getMargin(flexbox.EDGE_LEFT).unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getMargin(flexbox.EDGE_TOP).unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getMargin(flexbox.EDGE_RIGHT).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getMargin(flexbox.EDGE_BOTTOM).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getMargin(flexbox.EDGE_START).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getMargin(flexbox.EDGE_END).unit).toBe(flexbox.UNIT_UNDEFINED);

    expect(root.getPadding(flexbox.EDGE_LEFT).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPadding(flexbox.EDGE_TOP).unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getPadding(flexbox.EDGE_RIGHT).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPadding(flexbox.EDGE_BOTTOM).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPadding(flexbox.EDGE_START).unit).toBe(
      flexbox.UNIT_UNDEFINED,
    );
    expect(root.getPadding(flexbox.EDGE_END).unit).toBe(flexbox.UNIT_UNDEFINED);

    expect(root.getBorder(flexbox.EDGE_LEFT)).toBeFalsy();
    expect(root.getBorder(flexbox.EDGE_TOP)).toBeFalsy();
    expect(root.getBorder(flexbox.EDGE_RIGHT)).toBeFalsy();
    expect(root.getBorder(flexbox.EDGE_BOTTOM)).toBeFalsy();
    expect(root.getBorder(flexbox.EDGE_START)).toBeFalsy();
    expect(root.getBorder(flexbox.EDGE_END)).toBeFalsy();

    expect(root.getWidth().unit).toBe(flexbox.UNIT_AUTO);
    expect(root.getHeight().unit).toBe(flexbox.UNIT_AUTO);
    expect(root.getMinWidth().unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getMinHeight().unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getMaxWidth().unit).toBe(flexbox.UNIT_UNDEFINED);
    expect(root.getMaxHeight().unit).toBe(flexbox.UNIT_UNDEFINED);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedRight()).toBe(0);
    expect(root.getComputedBottom()).toBe(0);

    expect(root.getComputedMargin(flexbox.EDGE_LEFT)).toBe(0);
    expect(root.getComputedMargin(flexbox.EDGE_TOP)).toBe(0);
    expect(root.getComputedMargin(flexbox.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedMargin(flexbox.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedPadding(flexbox.EDGE_LEFT)).toBe(0);
    expect(root.getComputedPadding(flexbox.EDGE_TOP)).toBe(0);
    expect(root.getComputedPadding(flexbox.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedPadding(flexbox.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedBorder(flexbox.EDGE_LEFT)).toBe(0);
    expect(root.getComputedBorder(flexbox.EDGE_TOP)).toBe(0);
    expect(root.getComputedBorder(flexbox.EDGE_RIGHT)).toBe(0);
    expect(root.getComputedBorder(flexbox.EDGE_BOTTOM)).toBe(0);

    expect(root.getComputedWidth()).toBeFalsy();
    expect(root.getComputedHeight()).toBeFalsy();
    expect(root.layout.direction).toBe(flexbox.DIRECTION_INHERIT);
  });

  test('assert webdefault values', () => {
    const config = flexbox.Config.create();
    config.setUseWebDefaults(true);

    const root = flexbox.Node.create(config);

    expect(root.getFlexDirection()).toBe(flexbox.FLEX_DIRECTION_ROW);
    expect(root.getAlignContent()).toBe(flexbox.ALIGN_STRETCH);
    expect(root.getFlexShrink()).toBe(1.0);
  });

  test('assert webdefault values reset', () => {
    const config = flexbox.Config.create();
    config.setUseWebDefaults(true);

    const root = flexbox.Node.create(config);

    root.reset();

    expect(root.getFlexDirection()).toBe(flexbox.FLEX_DIRECTION_ROW);
    expect(root.getAlignContent()).toBe(flexbox.ALIGN_STRETCH);
    expect(root.getFlexShrink()).toBe(1.0);
  });

  // test('assert_legacy_stretch_behaviour', () => {
  //   YGConfig *config = YGConfigNew();
  //   YGConfigSetUseLegacyStretchBehaviour(config, true);
  //   const YGNodeRef root = YGNodeNewWithConfig(config);
  //   YGNodeStyleSetWidth(root, 500);
  //   YGNodeStyleSetHeight(root, 500);
  //
  //   const YGNodeRef root_child0 = YGNodeNewWithConfig(config);
  //   YGNodeStyleSetAlignItems(root_child0, flexbox.ALIGN_FLEX_START);
  //   YGNodeInsertChild(root, root_child0, 0);
  //
  //   const YGNodeRef root_child0_child0 = YGNodeNewWithConfig(config);
  //   YGNodeStyleSetFlexGrow(root_child0_child0, 1);
  //   YGNodeStyleSetFlexShrink(root_child0_child0, 1);
  //   YGNodeInsertChild(root_child0, root_child0_child0, 0);
  //
  //   const YGNodeRef root_child0_child0_child0 = YGNodeNewWithConfig(config);
  //   YGNodeStyleSetFlexGrow(root_child0_child0_child0, 1);
  //   YGNodeStyleSetFlexShrink(root_child0_child0_child0, 1);
  //   YGNodeInsertChild(root_child0_child0, root_child0_child0_child0, 0);
  //   YGNodeCalculateLayout(root, YGUndefined, YGUndefined, YGDirectionLTR);
  //
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetWidth(root));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetHeight(root));
  //
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetWidth(root_child0));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetHeight(root_child0));
  //
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0_child0));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0_child0));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetWidth(root_child0_child0));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetHeight(root_child0_child0));
  //
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetLeft(root_child0_child0_child0));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetTop(root_child0_child0_child0));
  //   ASSERT_FLOAT_EQ(0, YGNodeLayoutGetWidth(root_child0_child0_child0));
  //   ASSERT_FLOAT_EQ(500, YGNodeLayoutGetHeight(root_child0_child0_child0));
  // });
});
