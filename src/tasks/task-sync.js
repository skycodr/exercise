/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 * 
 * ------------------------------------------------------------
 * TASK 1, 2 - Get random words, and Fizz Buzz synchronously
 * ------------------------------------------------------------
 */

const { getWordSync } = require('../utils');

/**
 * Get random words with Fizz Buzz
 *
 * Options:
 *
 *  -- count(Number) no of records to get
 *
 *  -- withError(Boolean) print with errors
 *
 *  -- fizzBuzz(Boolean) enable FizzBuzz
 *
 *  -- write(toConsole || toFile) in order to print to console or file
 *     respectively.
 *
 * @param {object} options
 */
const task = async ({ count = 100, withErrors = false, fizzBuzz = false, write } = {}) => {
    let index = 0;
    if (write) {
        while (index < count) {
            ++index;
            const word = getWordSync({ index, withErrors, fizzBuzz });
            await write(index, word); // File error handling is done in fileIo
        }
    }
};

module.exports.do = task;
