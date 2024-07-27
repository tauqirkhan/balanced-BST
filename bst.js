import { Node } from "./node.js";
import { mergeSort } from "./mergeSort.js";

function Tree(array) {
  //Remove duplicate of array
  const nonDuplicateArr = getNonDuplicateArr(array);
  //Sort array
  const sortedArray = mergeSort(nonDuplicateArr);
  const root = buildTree(sortedArray, 0, sortedArray.length - 1);

  function buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }

  function getNonDuplicateArr(array) {
    let uniqueArr = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqueArr.indexOf(array[i]) === -1) {
        uniqueArr.push(array[i]);
      }
    }
    return uniqueArr;
  }

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  return { root, prettyPrint };
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);
console.log(tree.root);
tree.prettyPrint(tree.root);
