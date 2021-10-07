const kebabToCamel = require("../../../utils/kebab-to-camel");

/**
 * 
 * @param string the name of the file generated. ex. format "login-form"
 * @returns the string to be writtedn to the new generated component file
 */
module.exports = function componentTextGenerator(name) {
    const className = kebabToCamel(`-${name}`);
    return `import { Component } from "munster-core";

@Component({
    selector: 'app-${name}'
})
export class ${className}Component {

    $render(): any {
        return <h1>${className}Component Works!</h1>
    }

}
    `;
}
