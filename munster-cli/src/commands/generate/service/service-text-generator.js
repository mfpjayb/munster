const kebabToCamel = require("../../../utils/kebab-to-camel");

/**
 * 
 * @param string the name of the file generated. ex. format "login-service"
 * @returns the string to be written to the new generated service file
 */
module.exports = function(name) {
    const className = kebabToCamel(`-${name}`);
    return `import { Service } from "@munster/core";

@Service()
export class ${className}Service {

}
`;
}
