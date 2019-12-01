/**
 * Author: SkyCodr (aka: Dulan Sudasinghe)
 * Date: 01.12.2019
 */
const fs = require('fs');
/**
 * Write content to a given file. Promisified writer. Only appends to a file
 * @param {*} qualifiedFileName pathname/filename to write the file to
 */
const fileIo = (qualifiedFileName) => ({
    write: (content) => {
        return new Promise((resolve, reject) => {
            fs.appendFile(qualifiedFileName, content, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    },
});

module.exports = { fileIo };
