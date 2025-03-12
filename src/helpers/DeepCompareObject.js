function deepCompareObjects(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    if (!deepCompareObjects(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

function findModifiedObjects(arr1, arr2) {
  const modifiedObjects = [];

  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return "Inputs must be arrays.";
  }
  if (arr1.length !== arr2.length) {
    return "Arrays must have the same length for comparison.";
  }
  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];
    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      if (obj1 !== obj2) {
        modifiedObjects.push(obj2);
      }
      continue;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      modifiedObjects.push(obj2);
      continue;
    }
    let isDifferent = false;
    for (const key of keys1) {
      if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
        isDifferent = true;
        break;
      }
    }
    if (isDifferent) {
      modifiedObjects.push(obj2);
    }
  }

  return modifiedObjects;
}

const DEEP_COMPARE_OBJECTS = {
  findModifiedObjects,
  deepCompareObjects,
};

export default DEEP_COMPARE_OBJECTS;
