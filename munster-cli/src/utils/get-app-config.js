const { resolve } = require('path');
const { existsSync } = require('fs');
const { red } = require('chalk');

module.exports = function(errorMessage) {
    const currentDir = global.process.cwd();
    const appJsonPath = resolve(currentDir, 'munster-app.json');
    if (!existsSync(appJsonPath)) {
        return console.log(red(errorMessage));
    }
    return require(appJsonPath);
}
