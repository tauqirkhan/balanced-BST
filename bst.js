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

    let inorderArray = [];
    let queue = [node];

    while (queue.length !== 0) {
      let current = queue.shift();
      inorderArray.push(callback(current.data));

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return inorderArray;
  }

  function levelOrderWithRec(callback) {
    let node = _root;

    return levelOrderRec(node, callback);
  }

  function levelOrderRec(node, callback) {
    if (!callback) throw new Error("callback is required");

    const length = height(node);
    const result = [];

    for (let level = 0; level <= length; level++) {
      addLevelNodeToResult(node, level, result, callback);
    }

    return result;
  }

  function addLevelNodeToResult(node, level, result, callback) {
    if (!node) return;
    if (level === 0) result.push(callback(node.data));
    else if (level > 0) {
      addLevelNodeToResult(node.left, level - 1, result, callback);
      addLevelNodeToResult(node.right, level - 1, result, callback);
    }
  }

  function inOrder(callback) {
    let node = _root;
    return _inorderRec(node, callback);
  }

  function preOrder(callback) {
    let node = _root;
    return _preOrderRec(node, callback);
  }

  function postOrder(callback) {
    let node = _root;
    return _postOrderRec(node, callback);
  }

  function _postOrderRec(node, callback, postOrderArray = []) {
    if (!node) return;
    if (!callback) throw new Error("callback is required");

    //<left> <right> <root>
    if (node.left) _postOrderRec(node.left, callback, postOrderArray);
    if (node.right) _postOrderRec(node.right, callback, postOrderArray);
    postOrderArray.push(callback(node.data));

    return postOrderArray;
  }

  function _preOrderRec(node, callback, result = []) {
    if (!node) return;
    if (!callback) throw new Error("callback is required");

    //<root> <left> <right>
    result.push(callback(node.data));
    if (node.left) _preOrderRec(node.left, callback, result);
    if (node.right) _preOrderRec(node.right, callback, result);

    return result;
  }

  function _inorderRec(node, callback, inOrderArray = []) {
    let pointer = node;

    if (pointer === null) return;
    if (!callback) throw new Error("callback is required");

    //<left> <root> <right>
    if (pointer.left !== null) {
      _inorderRec(pointer.left, callback, inOrderArray);
    }

    inOrderArray.push(callback(pointer.data));

    if (pointer.right !== null) {
      _inorderRec(pointer.right, callback, inOrderArray);
    }

    return inOrderArray;
  }

  function height(node) {
    // Base case: If the node is null, the height is -1
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
    //Target not found
    if (!node) return -1;

    if (node === target) return depth;

    //Search in left subtree
    let leftDepth = depthHelper(node.left, target, depth + 1);
    //Target found in left subtree
    if (leftDepth !== -1) return leftDepth;

    //Search in right subtree
    let rightDepth = depthHelper(node.right, target, depth + 1);
    //Return depth if target found in right subtree or -1 if not found
    return rightDepth;
  }

  function isBalanced(node = _root) {
    function checkHeight(node) {
      if (node === null) return 0;

      let leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      let rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }
    return checkHeight(node) !== -1;
  }

  function rebalance() {
    //Check if it's unbalanced
    if (isBalanced(_root)) return "Tree is balanced";

    //Convert every node into inorder array
    const newArray = inOrder((data) => data);

    //Call Tree function
    let balancedTree = buildTree(newArray, 0, newArray.length - 1);
    //Assign treeNode with this root
    _root = balancedTree;
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
    inOrder,
    postOrder,
    preOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export { Tree };
