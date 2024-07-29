import { Node } from "./node.js";
import { mergeSort } from "./mergeSort.js";

function Tree(array) {
  //Remove duplicate of array
  const nonDuplicateArr = getNonDuplicateArr(array);
  //Sort array
  const sortedArray = mergeSort(nonDuplicateArr);
  let _root = buildTree(sortedArray, 0, sortedArray.length - 1);

  function buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }

  function insert(value) {
    _root = insertRec(_root, value);
  }

  function insertRec(root, value) {
    if (root === null) {
      return Node(value);
    }

    if (value < root.data) {
      root.left = insertRec(root.left, value);
    } else if (value > root.data) {
      root.right = insertRec(root.right, value);
    }
    return root;
  }

  function deleteValue(value) {
    _root = deleteRec(_root, value);
  }

  function deleteRec(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = deleteRec(root.right, value);
    } else {
      //Root with only one child or no child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      //root with two children : get the inorder successor
      root.data = minValue(root.right);
      //Delete the inorder successor
      root.right = deleteRec(root.right, root.data);
    }
    return root;
  }

  function find(value) {
    let node = _root;
    while (node) {
      if (node.data === value) {
        return node;
      }

      if (value > node.data) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return "Not found";
  }

  function levelOrder(callback) {
    let node = _root;

    if (!node) return;
    if (!callback) throw new Error("Callback is required");

    let queue = [node];

    while (queue.length !== 0) {
      let current = queue.shift();
      current.data = callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    prettyPrint(node);
  }

  function levelOrderWithRec(callback) {
    let node = _root;
    levelOrderRec(node, callback);
    prettyPrint(_root);
  }

  function levelOrderRec(node, callback) {
    let pointer = node;

    if (!callback) throw new Error("callback is required");
    if (pointer === null) return;

    pointer.data = callback(pointer.data);

    if (node.left !== null) {
      levelOrderRec(node.left, callback);
    }
    if (node.right !== null) {
      levelOrderRec(node.right, callback);
    }
  }

  function inorder(callback) {
    let node = _root;
    _inorderRec(node, callback, arr);
  }

  function preOrder(callback) {
    let node = _root;
    _preOrderRec(node, callback);
  }

  function postOrder(callback) {
    let node = _root;
    _postOrderRec(node, callback);
  }

  function _postOrderRec(node, callback) {
    if (!node) return;
    if (!callback) throw new Error("callback is required");

    //<left> <right> <root>
    if (node.left) _postOrderRec(node.left, callback);
    if (node.right) _postOrderRec(node.right, callback);
    node.data = callback(node.data);
  }

  function _preOrderRec(node, callback) {
    if (!node) return;
    if (!callback) throw new Error("callback is required");

    //<root> <left> <right>
    node.data = callback(node.data);
    if (node.left) _preOrderRec(node.left, callback);
    if (node.right) _preOrderRec(node.right, callback);
  }

  function _inorderRec(node, callback) {
    let pointer = node;

    if (pointer === null) return;
    if (!callback) throw new Error("callback is required");

    //<left> <root> <right>
    if (pointer.left !== null) {
      _inorderRec(pointer.left, callback);
    }

    pointer.data = callback(pointer.data);

    if (pointer.right !== null) {
      _inorderRec(pointer.right, callback);
    }
  }

  function height(node) {
    //   // Base case: If the node is null, the height is -1
    if (!node) return -1;

    // Recursively get the height of the left subtree
    let leftHeight = height(node.left);

    // Recursively get the height of the right subtree
    let rightHeight = height(node.right);

    // The height of the node is the maximum of the heights of the subtrees, plus 1
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(target) {
    let node = _root;
    return depthHelper(node, target, 0);
  }

  function depthHelper(node, target, depth) {
    if (!node) return -1;

    if (node === target) return depth;

    let leftDepth = depthHelper(node.left, target, depth + 1);
    if (leftDepth !== -1) return leftDepth;

    let rightDepth = depthHelper(node.right, target, depth + 1);
    return rightDepth;
  }

  function prettyPrint(node = _root, prefix = "", isLeft = true) {
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

  function minValue(node) {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      node = node.left;
    }
    return minV;
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

  return {
    prettyPrint,
    insert,
    deleteValue,
    find,
    levelOrder,
    levelOrderWithRec,
    inorder,
    postOrder,
    preOrder,
    height,
    depth,
  };
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);
tree.prettyPrint();
let node = tree.find(9);
console.log(tree.depth(node));
// let node = tree.find(6345);
// console.log(tree.height(node));

/* let obj = {
  data: 8,
  left: {
    data: 4,
    left: { data: 1, left: null, right: 3 },
    right: { data: 5, left: null, right: 7 },
  },
  right: {
    data: 67,
    left: { data: 9, left: null, right: 23 },
    right: { data: 324, left: null, right: 6245 },
  },
};
*/
