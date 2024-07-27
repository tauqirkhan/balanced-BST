function mergeSort(array) {
  let length = array.length;
  if (length <= 1) return array;

  const mid = Math.floor(length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const sortedArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) sortedArray.push(left.shift());
    else sortedArray.push(right.shift());
  }
  return sortedArray.concat(left, right);
}

export { mergeSort };
