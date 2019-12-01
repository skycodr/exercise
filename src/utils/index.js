/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 */

const { log, toConsole, toFile } = require('./common');
const { getWord, getWordSync, hasValue, isValidBool, isValidTask, isValidOutput } = require('./helpers');
const { fileIo } = require('./io');

module.exports = {
    log,
    toConsole,
    toFile,
    getWord,
    getWordSync,
    fileIo,
    hasValue,
    isValidBool,
    isValidTask,
    isValidOutput
};
