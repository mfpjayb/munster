const path = require('path');
const fs = require("fs");
const { red } = require('chalk');

module.exports = function(errorMessage) {
    const currentDir = process.cwd();
    const appJsonPath = path.resolve(currentDir, 'munster-app.json');
    if (!fs.existsSync(appJsonPath)) {
        return console.log(red(errorMessage));
    }
    return require(appJsonPath);
}