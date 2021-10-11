const kebabToCamel = require("../../../utils/kebab-to-camel");

/**
 * 
 * @param string the name of the file generated. ex. format "login-form"
 * @returns the string to be writtedn to the new generated component file
 */
module.exports = function(name) {
    const className = kebabToCamel(`-${name}`);
    return `import { Module } from "@munster/core";

@Module({
    components: [ ],
})
export class ${className}Module { }`;
}

