/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 */

const { log } = console;

const toConsole = (index, message) => log(index, '\b:', message);
const toFile = (io) => async (index, message) => {
    try {
        return await io.write(`${index}: ${message}\n`);
    } catch (ex) {
        log(ex);
    }
};

module.exports = { log, toConsole, toFile };
