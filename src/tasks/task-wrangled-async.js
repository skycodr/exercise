/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 * 
 * ---------------------------------------------------
 * TASK 7 with async programming, promise wrangling
 * ---------------------------------------------------
 */

const { getWord, log } = require('../utils');

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
    if (write) {
        let index = 0;
        const words = [];
        while (index < count) {
            ++index;
            words.push(
                new Promise(async (resolve) => {
                    const word = await getWord({ index, slow, fizzBuzz, withErrors });
                    resolve(word);
                })
            );
        }
        try {
            index = 0; // reset the index
            const results = await Promise.all(words);
            while (index < count) await write(index + 1, results[index++]); // File error handling is done in fileIo
        } catch (ex) {
            log(ex); // If Promise.all fails
        }
    }
};

module.exports.do = task;
