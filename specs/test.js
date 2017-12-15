const yoga = require('../src');

const root = yoga.Node.create();

root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
root.setOverflow(yoga.OVERFLOW_HIDDEN);
root.setWidth(50);
root.setHeight(50);

const child = yoga.Node.create();

child.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
child.setPosition(yoga.EDGE_START, 0);
child.setPosition(yoga.EDGE_TOP, 0);
root.insertChild(child, 0)

const child_child = yoga.Node.create();
child_child.setWidth(100);
child_child.setHeight(100);
child.insertChild(child_child, 0);
root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);
