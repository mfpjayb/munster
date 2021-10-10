const getAppConfig = require("../../utils/get-app-config");
const generateComponent = require("./component/generate-component");

/**
 * Generate commands
 */

module.exports = function(type, filename) {
    const appConfig = getAppConfig(`Generate command must be run inside a munster project root directory.`);

    switch(type) {
        case 'component': {
            return generateComponent(filename, appConfig);
        }
    }
}
