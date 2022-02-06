// Merges an array of objects with a new one to avoid duplicate objects with the same key values
const mergeObjArrays = (_array1, _array2, key, preserve = true) => {
  const array1 = _array1 ? _array1 : [];
  const array2 = _array2 ? _array2 : [];
  const mergedArray = [];
  const hashTable1 = {};
  const hashTable2 = {};
  const keySet = new Set();
  array1.forEach(item => {
    hashTable1[item[key]] = item;
    keySet.add(item[key]);
  });
  array2.forEach(item => {
    hashTable2[item[key]] = item;
    keySet.add(item[key]);
  });
  keySet.forEach(keyValue => {
    if (preserve) {
      mergedArray.push(
        (hashTable1[keyValue] && hashTable2[keyValue]) || !hashTable2[keyValue]
          ? hashTable1[keyValue]
          : hashTable2[keyValue]
      );
    } else {
      mergedArray.push(
        (hashTable1[keyValue] && hashTable2[keyValue]) || !hashTable1[keyValue]
          ? hashTable2[keyValue]
          : hashTable1[keyValue]
      );
    }
  });
  return mergedArray;
};

export { mergeObjArrays };
