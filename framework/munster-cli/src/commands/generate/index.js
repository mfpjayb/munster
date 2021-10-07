const getAppConfig = require('../../get-app-config');
const { red } = require('chalk');
const component = require('./component/component');

/**
 * Generate commands
 */

module.exports = function (type, filename) {
    const appConfig = getAppConfig(`Generate command must be run in munster project's root directory.`);
    switch(type) {
        case 'component': {
            component(filename, appConfig);
            break;
        }
    }
}