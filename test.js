const flexbox = require('./src');

const root = flexbox.Node.createDefault();
const left = flexbox.Node.createDefault();
const right = flexbox.Node.createDefault();

root.setWidth(500);
root.setHeight(200);

left.setFlex(1);
right.setFlex(1);

root.insertChild(left);
root.insertChild(right);
root.calculateLayout();

console.log(left.getComputedLayout());
