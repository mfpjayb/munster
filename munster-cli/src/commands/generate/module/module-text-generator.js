const kebabToCamel = require("../../../utils/kebab-to-camel");

/**
 * 
 * @param string the name of the file generated. ex. format "login-service"
 * @returns the string to be written to the new generated module file
 */
module.exports = function(name) {
    const className = kebabToCamel(`-${name}`);
    return `import { CommonModule, Module } from "@munster/core";

@Module({
    modules: [
        CommonModule
    ]
})
export class ${className}Module { }`;
}
