"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMatrix(rows, cols, defaultValue) {
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
        item = Object.assign({}, item, { fixed: true, value: randomValue });
        arr[randomRows][randomCols] = item;
    }
    return arr;
}
exports.createMatrix = createMatrix;
function checkMatrixDone(matrix) {
    let isDone = true;
    for (let i = 0; i < matrix.length; i++) {
        for (const item of matrix[i]) {
            if (item.value === 2 || item.error) {
                isDone = false;
            }
        }
    }
    return isDone;
}
exports.checkMatrixDone = checkMatrixDone;
function changeMatrix(indexRow, indexCol, matrix) {
    let item = matrix[indexRow][indexCol];
    switch (item.value) {
        case 0:
            item = Object.assign({}, item, { value: 1 });
            break;
        case 1:
            item = Object.assign({}, item, { value: 2 });
            break;
        case 2:
            item = Object.assign({}, item, { value: 0 });
            break;
        default: item = Object.assign({}, item, { value: 0 });
    }
    matrix[indexRow][indexCol] = item;
    checkMatrix(matrix);
    return matrix;
}
exports.changeMatrix = changeMatrix;
function checkMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = matrix[i].map(item => {
            return Object.assign({}, item, { error: false });
        });
    }
    for (let i = 0; i < matrix.length; i++) {
        const arr1 = matrix[i].map(item => item.value);
        let isFull = true;
        for (const item of matrix[i]) {
            if (item.value === 2) {
                isFull = false;
            }
        }
        if (isFull) {
            for (let j = 0; j < matrix.length; j++) {
                if (j < matrix.length - 1 && i !== j) {
                    const arr2 = matrix[j].map(item => item.value);
                    const equal = isEqual(arr1, arr2);
                    if (equal) {
                        matrix[i] = matrix[i].map(item => {
                            return Object.assign({}, item, { error: true });
                        });
                        matrix[j] = matrix[j].map(item => {
                            return Object.assign({}, item, { error: true });
                        });
                    }
                }
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        let countValue0 = 0;
        let countValue1 = 0;
        let countValueRows0 = 0;
        let countValueRows1 = 0;
        matrix.forEach(value => {
            if (value[i].value === 0) {
                countValueRows0++;
            }
            if (value[i].value === 1) {
                countValueRows1++;
            }
        });
        if (countValueRows0 >= 3) {
            for (let x = 0; x < 4; x++) {
                matrix[x][i] = matrix[x][i].value === 0 ? Object.assign({}, matrix[x][i], { error: true }) : matrix[x][i];
            }
        }
        if (countValueRows1 >= 3) {
            for (let x = 0; x < 4; x++) {
                matrix[x][i] = matrix[x][i].value === 1 ? Object.assign({}, matrix[x][i], { error: true }) : matrix[x][i];
            }
        }
        matrix[i].forEach(value => {
            if (value.value === 0) {
                countValue0++;
            }
            if (value.value === 1) {
                countValue1++;
            }
        });
        if (countValue0 >= 3) {
            matrix[i] = matrix[i].map(item => {
                if (item.value === 0) {
                    return Object.assign({}, item, { error: true });
                }
                return Object.assign({}, item);
            });
        }
        if (countValue1 >= 3) {
            matrix[i] = matrix[i].map(item => {
                if (item.value === 1) {
                    return Object.assign({}, item, { error: true });
                }
                return Object.assign({}, item);
            });
        }
    }
}
exports.checkMatrix = checkMatrix;
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRndInteger = getRndInteger;
function isEqual(value, other) {
    const type = Object.prototype.toString.call(value);
    if (type !== Object.prototype.toString.call(other)) {
        return false;
    }
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
        return false;
    }
    const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
        return false;
    }
    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) {
                return false;
            }
        }
    }
    else {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) {
                    return false;
                }
            }
        }
    }
    return true;
}
function compare(item1, item2) {
    const itemType = Object.prototype.toString.call(item1);
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!isEqual(item1, item2)) {
            return false;
        }
    }
    else {
        if (itemType !== Object.prototype.toString.call(item2)) {
            return false;
        }
        if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) {
                return false;
            }
        }
        else {
            if (item1 !== item2) {
                return false;
            }
        }
    }
}
;
function convertStringToSeconds(timeString) {
    const time = timeString.split(':');
    let seconds;
    try {
        seconds = (+time[0] * 60) + (+time[1]);
    }
    catch (e) {
        seconds = 0;
    }
    return seconds;
}
exports.convertStringToSeconds = convertStringToSeconds;
function convertSecondsToString(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds - minutes * 60);
    const timeString = `${minutes < 10 ? '0' + minutes.toString() : minutes.toString()}:${second < 10 ? '0' + second.toString() : second.toString()}`;
    return timeString;
}
exports.convertSecondsToString = convertSecondsToString;
