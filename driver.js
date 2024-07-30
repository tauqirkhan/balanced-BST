import { Tree } from "./bst.js";

const ramdomNums = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 100)
);

const tree = Tree(ramdomNums);

console.log("Initial random numbers:", ramdomNums);
console.log("Tree is balanced:", tree.isBalanced());

console.log(
  "Level order:",
  tree.levelOrder((data) => data)
);
console.log(
  "Pre-order:",
  tree.preOrder((data) => data)
);
console.log(
  "In-order:",
  tree.inOrder((data) => data)
);
console.log(
  "Post-order:",
  tree.postOrder((data) => data)
);

const unbalancingNumbers = [101, 102, 103, 104, 105];
unbalancingNumbers.forEach((num) => tree.insert(num));

console.log("Tree is balanced after adding numbers > 100:", tree.isBalanced());

tree.rebalance();
console.log("Tree is balanced after adding numbers > 100:", tree.isBalanced());

console.log(
  "Level order:",
  tree.levelOrder((data) => data)
);
console.log(
  "Pre-order:",
  tree.preOrder((data) => data)
);
console.log(
  "In-order:",
  tree.inOrder((data) => data)
);
console.log(
  "Post-order:",
  tree.postOrder((data) => data)
);
