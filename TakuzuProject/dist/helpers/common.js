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
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRndInteger = getRndInteger;
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
