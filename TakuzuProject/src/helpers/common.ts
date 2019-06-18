/**
 * Declare an empty two-dimensional array
 *
 * @param {number} rows
 * @param {number} cols
 * @param {number} defaultValue
 * @return {boolean}
 */
import {CardModel} from "../models/application/CardModel";

export function createMatrix(rows: number, cols: number, defaultValue: number){

  const arr = new Array(rows);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols)
        .fill({
          error: false,
          fixed: false,
          value: defaultValue,
        });
  }

  const randomNumberCardDefault = getRndInteger(2, 4);

  for (let i = 0; i < randomNumberCardDefault; i++) {
    const randomRows = getRndInteger(0, rows - 1);
    const randomCols = getRndInteger(0, cols - 1);
    const randomValue = getRndInteger(0, 1);
    let item = arr[randomRows][randomCols];
    item = {...item, fixed: true, value: randomValue};
    arr[randomRows][randomCols] = item;
  }

  return arr;
}

export function checkMatrixDone(matrix: CardModel[][]) {
  let isDone: boolean = true;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < matrix.length; i++) {
    for (const item of matrix[i]) {
      if (item.value === 2 || item.error) {
        isDone = false
      }
    }
  }
  return isDone;
}

export function changeMatrix(indexRow: number, indexCol: number, matrix: CardModel[][]) {
  let item = matrix[indexRow][indexCol];
  switch (item.value) {
    case 0: item = {...item, value: 1}; break;
    case 1:item = {...item, value: 2}; break;
    case 2: item = {...item, value: 0}; break;
    default: item = {...item, value: 0};
  }
  matrix[indexRow][indexCol] = item;
  checkMatrix(matrix);
  return matrix;
}

export function checkMatrix(matrix: CardModel[][]) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].map(item =>{
      return {...item, error: false}
    });
  }

  for (let i = 0; i < matrix.length; i++) {
    const arr1 = matrix[i].map(item => item.value);
    let isFull = true;
    for (const item of matrix[i]) {
      if (item.value === 2) {isFull = false}
    }
    if (isFull) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < matrix.length; j++) {
        if (j < matrix.length - 1 && i !== j) {
          const arr2 = matrix[j].map(item => item.value);
          const equal = isEqual(arr1, arr2);
          if (equal) {
            matrix[i] = matrix[i].map(item =>{
              return {...item, error: true}
            });
            matrix[j] = matrix[j].map(item =>{
              return {...item, error: true}
            });
          }
        }
      }
    }
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < matrix.length; i++) {
    let countValue0 = 0;
    let countValue1 = 0;
    let countValueRows0 = 0;
    let countValueRows1 = 0;
    matrix.forEach(value => {
      if (value[i].value === 0) {countValueRows0 ++}
      if (value[i].value === 1) {countValueRows1 ++}
    });
    if (countValueRows0 >= 3) {
      for (let x = 0; x < 4; x++) {
        matrix[x][i] = matrix[x][i].value === 0 ? {...matrix[x][i], error: true} : matrix[x][i];
      }
    }

    if (countValueRows1 >= 3) {
      for (let x = 0; x < 4; x++) {
        matrix[x][i] = matrix[x][i].value === 1 ? {...matrix[x][i], error: true} : matrix[x][i];
      }
    }

    matrix[i].forEach(value => {
      if (value.value === 0) {countValue0 ++}
      if (value.value === 1) {countValue1 ++}
    });
    if (countValue0 >= 3) {
      matrix[i] = matrix[i].map(item =>{
        if (item.value === 0) {
          return {...item, error: true}
        }
        return {...item}
      });
    }
    if (countValue1 >= 3) {
      matrix[i] = matrix[i].map(item =>{
        if (item.value === 1) {
          return {...item, error: true}
        }
        return {...item}
      });
    }
  }

  // tslint:disable-next-line:prefer-for-of
  // for(let i = 0; i < matrix.length; i++){
  //   // tslint:disable-next-line:prefer-for-of
  //   for(let j = 0; j < matrix[i].length; j++){
  //     const array =
  //   }
  //   reactotron.log('i', matrix[i])
  // }
}

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isEqual (value: any, other: any) {

  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) { return false; }

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) { return false; }

  // Compare the length of the length of the two items
  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) { return false; }

  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) { return false; }
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) { return false; }
      }
    }
  }

  // If nothing failed, return true
  return true;

}

// Compare two items
// @ts-ignore
function compare (item1: any, item2: any) {

  // Get the object type
  const itemType = Object.prototype.toString.call(item1);

  // If an object or array, compare recursively
  if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
    if (!isEqual(item1, item2)) { return false; }
  }

  // Otherwise, do a simple comparison
  else {

    // If the two items are not the same type, return false
    if (itemType !== Object.prototype.toString.call(item2)) { return false; }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (itemType === '[object Function]') {
      if (item1.toString() !== item2.toString()) { return false; }
    } else {
      if (item1 !== item2) { return false; }
    }

  }
};

/**
 * Convert string 0:00 to seconds
 *
 * @param {string} timeString
 * @return number
 */
export function convertStringToSeconds(timeString: string): number {
  const time = timeString.split(':');
  let seconds;
  try {
    seconds = (+time[0] * 60) + (+time[1]);
  }
  catch (e) {
    seconds = 0;
  }

  return seconds
}

/**
 * Convert seconds to string 00:00
 *
 * @param {number} seconds
 * @return number
 */
export function convertSecondsToString(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const second= Math.floor(seconds - minutes*60);
  const timeString = `${minutes < 10 ? '0' + minutes.toString() : minutes.toString()}:${second < 10 ? '0' + second.toString() : second.toString()}`;

  return timeString
}

