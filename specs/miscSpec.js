const yoga = require('yoga-layout');
const flexbox = require('../src');

describe('Misc', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = yoga.Node.createDefault();
    flexboxNode = flexbox.Node.createDefault();
  });

  test('should have same display by default', () => {
    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should have same overflow by default', () => {
    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set display flex', () => {
    yogaNode.setDisplay(yoga.DISPLAY_FLEX);
    flexboxNode.setDisplay(yoga.DISPLAY_FLEX);

    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should set display none', () => {
    yogaNode.setDisplay(yoga.DISPLAY_NONE);
    flexboxNode.setDisplay(yoga.DISPLAY_NONE);

    expect(yogaNode.getDisplay()).toEqual(flexboxNode.getDisplay());
  });

  test('should set overflow visible', () => {
    yogaNode.setOverflow(yoga.OVERFLOW_VISIBLE);
    flexboxNode.setOverflow(yoga.OVERFLOW_VISIBLE);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set overflow hidden', () => {
    yogaNode.setOverflow(yoga.OVERFLOW_HIDDEN);
    flexboxNode.setOverflow(yoga.OVERFLOW_HIDDEN);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });

  test('should set overflow scroll', () => {
    yogaNode.setOverflow(yoga.OVERFLOW_SCROLL);
    flexboxNode.setOverflow(yoga.OVERFLOW_SCROLL);

    expect(yogaNode.getOverflow()).toEqual(flexboxNode.getOverflow());
  });
});
