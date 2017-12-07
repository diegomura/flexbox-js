const yoga = require('../src');

test('align_content_flex_start', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(130);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  child0.setHeight(10);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  child2.setHeight(10);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  child3.setHeight(10);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  child4.setHeight(10);
  root.insertChild(child4, 4);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(130);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(10);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(10);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(20);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(130);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(80);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(30);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(80);
  expect(child2.getComputedLayout().top).toBe(10);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(30);
  expect(child3.getComputedLayout().top).toBe(10);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(80);
  expect(child4.getComputedLayout().top).toBe(20);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);
});

test('align_content_flex_start_without_height_on_children', () => {
  const root = yoga.Node.create();
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(100);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  child3.setHeight(10);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(0);

  expect(child1.getComputedLayout().left).toBe(0);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(10);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(10);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(20);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(50);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(0);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(10);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(10);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(20);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);
});

test('align_content_flex_start_with_flex', () => {
  const root = yoga.Node.create();
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(100);
  root.setHeight(120);

  const child0 = yoga.Node.create();
  child0.setFlexGrow(1);
  child0.setFlexBasisPercent(0);
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setFlexGrow(1);
  child1.setFlexBasisPercent(0);
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setFlexGrow(1);
  child3.setFlexShrink(1);
  child3.setFlexBasisPercent(0);
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(120);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(40);

  expect(child1.getComputedLayout().left).toBe(0);
  expect(child1.getComputedLayout().top).toBe(40);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(40);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(80);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(80);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(40);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(120);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(120);

  expect(child0.getComputedLayout().left).toBe(50);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(40);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(40);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(40);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(80);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(80);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(40);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(120);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);
});

test('align_content_flex_end', () => {
  const root = yoga.Node.create();
  root.setAlignContent(YGAlignFlexEnd);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(100);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  child0.setHeight(10);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  child2.setHeight(10);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  child3.setHeight(10);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  child4.setHeight(10);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(0);
  expect(child1.getComputedLayout().top).toBe(10);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(20);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(30);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(40);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(50);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(10);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(20);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(30);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(40);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);
});

test('align_content_stretch', () => {
  const root = yoga.Node.create();
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(0);

  expect(child1.getComputedLayout().left).toBe(0);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(0);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(0);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(0);

  expect(child1.getComputedLayout().left).toBe(100);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(0);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(0);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(0);

  expect(child4.getComputedLayout().left).toBe(100);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(0);
});

test('align_content_spacebetween', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_SPACE_BETWEEN);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(130);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  child0.setHeight(10);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  child2.setHeight(10);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  child3.setHeight(10);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  child4.setHeight(10);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(130);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(45);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(45);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(90);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(130);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(80);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(30);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(80);
  expect(child2.getComputedLayout().top).toBe(45);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(30);
  expect(child3.getComputedLayout().top).toBe(45);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(80);
  expect(child4.getComputedLayout().top).toBe(90);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);
});

test('align_content_spacearound', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(YGAlignSpaceAround);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(140);
  root.setHeight(120);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  child0.setHeight(10);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(10);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  child2.setHeight(10);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  child3.setHeight(10);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  child4.setHeight(10);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(140);
  expect(root.getComputedLayout().height).toBe(120);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(15);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(15);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(55);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(55);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(95);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(140);
  expect(root.getComputedLayout().height).toBe(120);

  expect(child0.getComputedLayout().left).toBe(90);
  expect(child0.getComputedLayout().top).toBe(15);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(10);

  expect(child1.getComputedLayout().left).toBe(40);
  expect(child1.getComputedLayout().top).toBe(15);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(10);

  expect(child2.getComputedLayout().left).toBe(90);
  expect(child2.getComputedLayout().top).toBe(55);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(10);

  expect(child3.getComputedLayout().left).toBe(40);
  expect(child3.getComputedLayout().top).toBe(55);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(90);
  expect(child4.getComputedLayout().top).toBe(95);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);
});

test('align_content_stretch_row', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);
});

test('align_content_stretch_row_with_children', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child00 = yoga.Node.create();
  child00.setFlexGrow(1);
  child00.setFlexShrink(1);
  child00.setFlexBasisPercent(0);
  child0.insertChild(child00, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child00.getComputedLayout().left).toBe(0);
  expect(child00.getComputedLayout().top).toBe(0);
  expect(child00.getComputedLayout().width).toBe(50);
  expect(child00.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child00.getComputedLayout().left).toBe(0);
  expect(child00.getComputedLayout().top).toBe(0);
  expect(child00.getComputedLayout().width).toBe(50);
  expect(child00.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);
});

test('align_content_stretch_row_with_flex', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setFlexGrow(1);
  child1.setFlexShrink(1);
  child1.setFlexBasisPercent(0);
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setFlexGrow(1);
  child3.setFlexShrink(1);
  child3.setFlexBasisPercent(0);
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(0);
  expect(child1.getComputedLayout().height).toBe(100);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(100);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(0);
  expect(child3.getComputedLayout().height).toBe(100);

  expect(child4.getComputedLayout().left).toBe(100);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(100);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(100);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(0);
  expect(child1.getComputedLayout().height).toBe(100);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(100);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(0);
  expect(child3.getComputedLayout().height).toBe(100);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(100);
});

test('align_content_stretch_row_with_flex_no_shrink', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setFlexGrow(1);
  child1.setFlexShrink(1);
  child1.setFlexBasisPercent(0);
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setFlexGrow(1);
  child3.setFlexBasisPercent(0);
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(0);
  expect(child1.getComputedLayout().height).toBe(100);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(100);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(0);
  expect(child3.getComputedLayout().height).toBe(100);

  expect(child4.getComputedLayout().left).toBe(100);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(100);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(100);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(0);
  expect(child1.getComputedLayout().height).toBe(100);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(100);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(0);
  expect(child3.getComputedLayout().width).toBe(0);
  expect(child3.getComputedLayout().height).toBe(100);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(100);
});

test('align_content_stretch_row_with_margin', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  YGNodeStyleSetMargin(child1, yoga.EDGE_LEFT, 10);
  YGNodeStyleSetMargin(child1, yoga.EDGE_TOP, 10);
  YGNodeStyleSetMargin(child1, yoga.EDGE_RIGHT, 10);
  YGNodeStyleSetMargin(child1, yoga.EDGE_BOTTOM, 10);
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  YGNodeStyleSetMargin(child3, yoga.EDGE_LEFT, 10);
  YGNodeStyleSetMargin(child3, yoga.EDGE_TOP, 10);
  YGNodeStyleSetMargin(child3, yoga.EDGE_RIGHT, 10);
  YGNodeStyleSetMargin(child3, yoga.EDGE_BOTTOM, 10);
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(40);

  expect(child1.getComputedLayout().left).toBe(60);
  expect(child1.getComputedLayout().top).toBe(10);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(20);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(40);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(40);

  expect(child3.getComputedLayout().left).toBe(60);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(20);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(80);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(20);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(40);

  expect(child1.getComputedLayout().left).toBe(40);
  expect(child1.getComputedLayout().top).toBe(10);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(20);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(40);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(40);

  expect(child3.getComputedLayout().left).toBe(40);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(20);

  expect(child4.getComputedLayout().left).toBe(100);
  expect(child4.getComputedLayout().top).toBe(80);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(20);
});

test('align_content_stretch_row_with_padding', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setPadding(yoga.EDGE_LEFT, 10);
  child1.setPadding(yoga.EDGE_TOP, 10);
  child1.setPadding(yoga.EDGE_RIGHT, 10);
  child1.setPadding(yoga.EDGE_BOTTOM, 10);
  child1.setWidth(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setPadding(yoga.EDGE_LEFT, 10);
  child3.setPadding(yoga.EDGE_TOP, 10);
  child3.setPadding(yoga.EDGE_RIGHT, 10);
  child3.setPadding(yoga.EDGE_BOTTOM, 10);
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(50);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);
});

test('align_content_stretch_row_with_single_row', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  root.insertChild(child1, 1);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(100);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(100);
});

test('align_content_stretch_row_with_fixed_height', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setHeight(60);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(80);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(60);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(80);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(80);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(20);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(80);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(20);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(80);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(60);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(80);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(80);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(20);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(80);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(20);
});

test('align_content_stretch_row_with_max_height', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setMaxHeight(20);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(20);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(20);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(50);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(50);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);
});

test('align_content_stretch_row_with_min_height', () => {
  const root = yoga.Node.create();

  root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(150);
  root.setHeight(100);

  const child0 = yoga.Node.create();
  child0.setWidth(50);
  root.insertChild(child0, 0);

  const child1 = yoga.Node.create();
  child1.setWidth(50);
  child1.setMinHeight(80);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setWidth(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setWidth(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setWidth(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(90);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(90);

  expect(child2.getComputedLayout().left).toBe(100);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(90);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(90);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(90);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(150);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(100);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(90);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(0);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(90);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(0);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(90);

  expect(child3.getComputedLayout().left).toBe(100);
  expect(child3.getComputedLayout().top).toBe(90);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(10);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(90);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(10);
});

test('align_content_stretch_column', () => {
  const root = yoga.Node.create();
  root.setAlignContent(yoga.ALIGN_STRETCH);
  root.setFlexWrap(yoga.WRAP_WRAP);
  root.setWidth(100);
  root.setHeight(150);

  const child0 = yoga.Node.create();
  child0.setHeight(50);
  root.insertChild(child0, 0);

  const child00 = yoga.Node.create();
  child00.setFlexGrow(1);
  child00.setFlexShrink(1);
  child00.setFlexBasisPercent(0);
  child0.insertChild(child00, 0);

  const child1 = yoga.Node.create();
  child1.setFlexGrow(1);
  child1.setFlexShrink(1);
  child1.setFlexBasisPercent(0);
  child1.setHeight(50);
  root.insertChild(child1, 1);

  const child2 = yoga.Node.create();
  child2.setHeight(50);
  root.insertChild(child2, 2);

  const child3 = yoga.Node.create();
  child3.setHeight(50);
  root.insertChild(child3, 3);

  const child4 = yoga.Node.create();
  child4.setHeight(50);
  root.insertChild(child4, 4);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(150);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child00.getComputedLayout().left).toBe(0);
  expect(child00.getComputedLayout().top).toBe(0);
  expect(child00.getComputedLayout().width).toBe(50);
  expect(child00.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(0);
  expect(child1.getComputedLayout().top).toBe(50);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(0);

  expect(child2.getComputedLayout().left).toBe(0);
  expect(child2.getComputedLayout().top).toBe(50);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(0);
  expect(child3.getComputedLayout().top).toBe(100);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(50);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(150);

  expect(child0.getComputedLayout().left).toBe(50);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(50);
  expect(child0.getComputedLayout().height).toBe(50);

  expect(child00.getComputedLayout().left).toBe(0);
  expect(child00.getComputedLayout().top).toBe(0);
  expect(child00.getComputedLayout().width).toBe(50);
  expect(child00.getComputedLayout().height).toBe(50);

  expect(child1.getComputedLayout().left).toBe(50);
  expect(child1.getComputedLayout().top).toBe(50);
  expect(child1.getComputedLayout().width).toBe(50);
  expect(child1.getComputedLayout().height).toBe(0);

  expect(child2.getComputedLayout().left).toBe(50);
  expect(child2.getComputedLayout().top).toBe(50);
  expect(child2.getComputedLayout().width).toBe(50);
  expect(child2.getComputedLayout().height).toBe(50);

  expect(child3.getComputedLayout().left).toBe(50);
  expect(child3.getComputedLayout().top).toBe(100);
  expect(child3.getComputedLayout().width).toBe(50);
  expect(child3.getComputedLayout().height).toBe(50);

  expect(child4.getComputedLayout().left).toBe(0);
  expect(child4.getComputedLayout().top).toBe(0);
  expect(child4.getComputedLayout().width).toBe(50);
  expect(child4.getComputedLayout().height).toBe(50);
});

test('align_content_stretch_is_not_overriding_align_items', () => {
  const root = yoga.Node.create();
  root.setAlignContent(yoga.ALIGN_STRETCH);

  const child0 = yoga.Node.create();
  child0.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  child0.setAlignContent(yoga.ALIGN_STRETCH);
  child0.setAlignItems(yoga.ALIGN_CENTER);
  child0.setWidth(100);
  child0.setHeight(100);
  root.insertChild(child0, 0);

  const child00 = yoga.Node.create();
  child00.setAlignContent(yoga.ALIGN_STRETCH);
  child00.setWidth(10);
  child00.setHeight(10);
  child0.insertChild(child00, 0);
  root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(100);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child00.getComputedLayout().left).toBe(0);
  expect(child00.getComputedLayout().top).toBe(45);
  expect(child00.getComputedLayout().width).toBe(10);
  expect(child00.getComputedLayout().height).toBe(10);

  root.calculateLayout(undefined, undefined, yoga.DIRECTION_RTL);

  expect(root.getComputedLayout().left).toBe(0);
  expect(root.getComputedLayout().top).toBe(0);
  expect(root.getComputedLayout().width).toBe(100);
  expect(root.getComputedLayout().height).toBe(100);

  expect(child0.getComputedLayout().left).toBe(0);
  expect(child0.getComputedLayout().top).toBe(0);
  expect(child0.getComputedLayout().width).toBe(100);
  expect(child0.getComputedLayout().height).toBe(100);

  expect(child00.getComputedLayout().left).toBe(90);
  expect(child00.getComputedLayout().top).toBe(45);
  expect(child00.getComputedLayout().width).toBe(10);
  expect(child00.getComputedLayout().height).toBe(10);
});
