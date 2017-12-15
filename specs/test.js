const yoga = require('../src');

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
