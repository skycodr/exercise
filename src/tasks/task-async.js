/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 * 
 * ----------------------------------------------
 * TASK 3, 4 with async programming, writing to file
 * ----------------------------------------------
 */

const { getWord } = require('../utils');


/**
 * Get random words with Fizz Buzz with asynchronously.
 * 
 * Options:
 * 
 *  -- count(Number) no of records to get
 * 
 *  -- withError(Boolean) print with errors
 * 
 *  -- fizzBuzz(Boolean) enable FizzBuzz
 * 
 *  -- slow(Boolean) enable throttling
 * 
 *  -- write(toConsole || toFile) in order to print to console or file
 *     respectively.
 * 
 * @param {object} options
 */
const task = async ({ count = 100, fizzBuzz = false, withErrors = false, slow = false, write } = {}) => {
    let index = 0;

    if (write) {
        while (index < count) {
            ++index;
            const word = await getWord({ index, withErrors, fizzBuzz, slow });
            await write(index, word); // File error handling is done in fileIo
        }
    }
};

module.exports.do = task;
