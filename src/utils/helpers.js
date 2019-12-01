const { getRandomWordSync, getRandomWord } = require('word-maker');
const { vars } = require('../vars');

const isValidTask = (v) => v === vars.SYNC || v === vars.ASYNC || v === vars.WRANGLED;
const isValidOutput = (v) => v === vars.FILE || v === vars.CONSOLE;
const isValidBool = (v) => v === vars.TRUE || v === vars.FALSE;
const hasValue = (v) => v.length > 1;

/**
 * Checks for tuples of 3/5 and returns Fizz, Buzz or FizzBuzz
 * @param {number} index index of the
 * @param {string} word Word created by getRandomWordXxx
 */
function doFizzBuzz(index, word) {
    return index % 15 === 0
        ? vars.FIZZ_BUZZ
        : index % 3 === 0
        ? vars.FIZZ
        : index % 5 === 0
        ? vars.BUZZ
        : word;
}

/**
 * Get random word synchronously.
 * @param {object} options
 */
function getWordSync({ index, withErrors = false, fizzBuzz = false } = {}) {
    let word;
    try {
        word = getRandomWordSync({ withErrors });
        if (fizzBuzz) word = doFizzBuzz(index, word);
    } catch (ex) {
        word = vars.ERROR_WORD;
    }

    return word;
}

/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 */

/**
 * Get random word asynchronously
 * @param {object} options
 */
async function getWord({
    index,
    withErrors = false,
    fizzBuzz = false,
    slow = false,
} = {}) {
    let word;

    try {
        word = await getRandomWord({ withErrors, slow });
        if (fizzBuzz) word = doFizzBuzz(index, word);
    } catch (ex) {
        word = vars.ERROR_WORD;
    }

    return word;
}

module.exports = { getWord, getWordSync, isValidBool, isValidTask, isValidOutput, hasValue };
