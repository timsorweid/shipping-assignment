'use strict'
const fs = require('fs')

const getInputArrays = () => {// Make sure we get two filenames on the command line.
    if (process.argv.length < 4) {
        console.log('Usage: node ' + process.argv[1] + ' ADDRESSES_FILENAME DRIVERS_FILENAME');
        process.exit(1);
    }
    // Read the file and print its contents.
    const addresses = fs.readFileSync(process.argv[2], 'utf8').split("\n");
    const drivers = fs.readFileSync(process.argv[3], 'utf8').split("\n");
    return [addresses, drivers];
};

module.exports.getInputArrays = getInputArrays;
