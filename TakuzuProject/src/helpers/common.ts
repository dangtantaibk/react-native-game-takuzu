
/**
 * Declare an empty two-dimensional array
 *
 * @param {number} rows
 * @param {number} cols
 * @param {number} defaultValue
 * @return {boolean}
 */
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

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

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

