const flexbox = require('../src');

describe.skip('Measure', () => {
  const measure = (node, width, widthMode, height, heightMode) => {
    let measureCount = node.getContext();
    if (measureCount) {
      measureCount++;
    }

    return { width: 10, height: 10 };
  }

  const simulateWrappingText = (node, width, widthMode, height, heightMode) => {
    if (widthMode === flexbox.MEASURE_MODE_UNDEFINED || width >= 68) {
      return { width: 68, height: 16 };
    }

    return { width: 50, height: 32 };
  }

  // const measureAssertNegative = (node, width, widthMode, height, heightMode) => {
  //   EXPECT_GE(width, 0);
  //   EXPECT_GE(height, 0);
  //
  //   return YGSize{
  //     .width = 0, .height = 0,
  //   };
  // }

  test('dont_measure_single_grow_shrink_child', () => {
    const root = flexbox.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);
    child0.setFlexGrow(1);
    child0.setFlexShrink(1);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(0);
  });

  test('measure_absolute_child_with_no_constraints', () => {
    const root = flexbox.Node.create();

    const child0 = flexbox.Node.create();
    root.insertChild(child0, 0);

    let measureCount = 0;

    const child1 = flexbox.Node.create();
    child1.setPositionType(YGPositionTypeAbsolute);
    child1.setContext(measureCount);
    child1.setMeasureFunc(measure);
    child0.insertChild(child1, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(1);
  });

  test('dont_measure_when_min_equals_max', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);
    child0.setMinWidth(10);
    child0.setMaxWidth(10);
    child0.setMinHeight(10);
    child0.setMaxHeight(10);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(0);
    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('dont_measure_when_min_equals_max_percentages', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);
    child0.setMinWidthPercent(10);
    child0.setMaxWidthPercent(10);
    child0.setMinHeightPercent(10);
    child0.setMaxHeightPercent(10);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(0);
    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);
  });


  test('measure_nodes_with_margin_auto_and_stretch', () => {
    const root = flexbox.Node.create();
    root.setWidth(500);
    root.setHeight(500);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(measure);
    child0.setMarginAuto(flexbox.EDGE_LEFT);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(child0.getComputedLayout().left).toBe(490);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('dont_measure_when_min_equals_max_mixed_width_percent', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);
    child0.setMinWidthPercent(10);
    child0.setMaxWidthPercent(10);
    child0.setMinHeight(10);
    child0.setMaxHeight(10);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(0);
    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('dont_measure_when_min_equals_max_mixed_height_percent', () => {
    const root = flexbox.Node.create();
    root.setAlignItems(flexbox.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);
    child0.setMinWidth(10);
    child0.setMaxWidth(10);
    child0.setMinHeightPercent(10);
    child0.setMaxHeightPercent(10);
    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(measureCount).toBe(0);
    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('measure_enough_size_should_be_in_single_line', () => {
    const root = flexbox.Node.create();
    root.setWidth(100);

    const child0 = flexbox.Node.create();
    child0.setAlignSelf(flexbox.ALIGN_FLEX_START);
    child0.setMeasureFunc(simulateWrappingText);

    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(child0.getComputedLayout().width).toBe(68);
    expect(child0.getComputedLayout().height).toBe(16);
  });

  test('measure_not_enough_size_should_wrap', () => {
    const root = flexbox.Node.create();
    root.setWidth(55);

    const child0 = flexbox.Node.create();
    child0.setAlignSelf(flexbox.ALIGN_FLEX_START);
    child0.setMeasureFunc(simulateWrappingText);

    root.insertChild(child0, 0);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(32);
  });

  test('measure_zero_space_should_grow', () => {
    const root = flexbox.Node.create();
    root.setHeight(200);
    root.setFlexDirection(flexbox.FLEX_DIRECTION_COLUMN);
    root.setFlexGrow(0);

    let measureCount = 0;

    const child0 = flexbox.Node.create();
    child0.setFlexDirection(flexbox.FLEX_DIRECTION_COLUMN);
    child0.setPadding(flexbox.EDGE_ALL, 100);
    child0.setContext(measureCount);
    child0.setMeasureFunc(measure);

    root.insertChild(child0, 0);

    root.calculateLayout(282, undefined, flexbox.DIRECTION_LTR);

    expect(child0.getComputedLayout().width).toBe(282);
    expect(child0.getComputedLayout().top).toBe(0);
  });

  test('measure_flex_direction_row_and_padding', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setPadding(flexbox.EDGE_LEFT, 25);
    root.setPadding(flexbox.EDGE_TOP, 25);
    root.setPadding(flexbox.EDGE_RIGHT, 25);
    root.setPadding(flexbox.EDGE_BOTTOM, 25);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(25);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(25);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_flex_direction_column_and_padding', () => {
    const root = flexbox.Node.create();
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setPadding(flexbox.EDGE_ALL, 25);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(25);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(32);

    expect(child1.getComputedLayout().left).toBe(25);
    expect(child1.getComputedLayout().top).toBe(57);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_flex_direction_row_no_padding', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_flex_direction_row_no_padding_align_items_flexstart', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setWidth(50);
    root.setHeight(50);
    root.setAlignItems(flexbox.ALIGN_FLEX_START);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(32);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_with_fixed_size', () => {
    const root = flexbox.Node.create();
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setPadding(flexbox.EDGE_ALL, 25);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    child0.setWidth(10);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(25);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(25);
    expect(child1.getComputedLayout().top).toBe(35);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_with_flex_shrink', () => {
    const root = flexbox.Node.create();
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setPadding(flexbox.EDGE_ALL, 25);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    child0.setFlexShrink(1);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(25);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(25);
    expect(child1.getComputedLayout().top).toBe(25);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  test('measure_no_padding', () => {
    const root = flexbox.Node.create();
    root.setMargin(flexbox.EDGE_TOP, 20);
    root.setWidth(50);
    root.setHeight(50);

    const child0 = flexbox.Node.create();
    child0.setMeasureFunc(simulateWrappingText);
    child0.setFlexShrink(1);
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();
    child1.setWidth(5);
    child1.setHeight(5);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(32);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(32);
    expect(child1.getComputedLayout().width).toBe(5);
    expect(child1.getComputedLayout().height).toBe(5);
  });

  // test('can_nullify_measure_func_on_any_node', () => {
  //   const root = flexbox.Node.create();
  //   root.insertChild(YGNodeNew(), 0);
  //
  //   root.setMeasureFunc(NULL);
  //
  // });
  //
  // test('cant_call_negative_measure', () => {
  //   const root = flexbox.Node.create();
  //   root.setFlexDirection(flexbox.FLEX_DIRECTION_COLUMN);
  //   root.setWidth(50);
  //   root.setHeight(10);
  //
  //   const child0 = flexbox.Node.create();
  //   child0.setMeasureFunc(_measure_assert_negative);
  //   child0.setMargin(flexbox.EDGE_TOP, 20);
  //   root.insertChild(child0, 0);
  //
  //   root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
  //
  //
  // }
  //
  // test('cant_call_negative_measure_horizontal', () => {
  //   const root = flexbox.Node.create();
  //   root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
  //   root.setWidth(10);
  //   root.setHeight(20);
  //
  //   const child0 = flexbox.Node.create();
  //   child0.setMeasureFunc(_measure_assert_negative);
  //   child0.setMargin(YGEdgeStart, 20);
  //   root.insertChild(child0, 0);
  //
  //   root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);
  //
  //
  // }
  //
  // static YGSize _measure_90_10(YGNodeRef node,
  //   float width,
  //   YGMeasureMode widthMode,
  //   float height,
  //   YGMeasureMode heightMode) {
  //
  //   return YGSize{
  //     .width = 90, .height = 10,
  //   };
  // }

  test('percent_with_text_node', () => {
    const root = flexbox.Node.create();
    root.setFlexDirection(flexbox.FLEX_DIRECTION_ROW);
    root.setJustifyContent(YGJustifySpaceBetween);
    root.setAlignItems(YGAlignCenter);
    root.setWidth(100);
    root.setHeight(80);

    const child0 = flexbox.Node.create();
    root.insertChild(child0, 0);

    const child1 = flexbox.Node.create();

    child1.setMeasureFunc(_measure_90_10);
    child1.setMaxWidthPercent(50);
    child1.setPaddingPercent(flexbox.EDGE_TOP, 50);
    root.insertChild(child1, 1);

    root.calculateLayout(undefined, undefined, flexbox.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(40);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(15);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });
});
