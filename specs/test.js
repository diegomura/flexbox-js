const yoga = require('../src');

const root = yoga.Node.create();

root.setWidth(100);
root.setHeight(100);

const child = yoga.Node.create();

child.setPositionType(yoga.POSITION_TYPE_ABSOLUTE);
child.setPosition(yoga.EDGE_START, 10);
child.setPosition(yoga.EDGE_TOP, 10);
child.setWidth(10);
child.setHeight(10);

root.insertChild(child, 0)
root.calculateLayout(undefined, undefined, yoga.DIRECTION_LTR);
