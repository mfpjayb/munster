"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentTextGenerator = void 0;
var get_filename_1 = require("../../tools/get-filename");
var kebab_to_camel_1 = require("../../tools/kebab-to-camel");
/**
 *
 * @param string the name of the file generated. ex. format "login-form"
 * @returns the string to be written to the new generated component file
 */
function componentTextGenerator(filepath) {
    var name = (0, get_filename_1.getFilename)(filepath);
    var className = (0, kebab_to_camel_1.kebabToCamel)("-" + name);
    return "import { Component } from \"@munster/core\";\nimport './" + name + ".component.scss';\n\n@Component({\n    selector: 'app-" + name + "'\n})\nexport class " + className + "Component {\n\n    $render(): any {\n        return <h1>" + className + "Component Works!</h1>\n    }\n\n}";
}
exports.componentTextGenerator = componentTextGenerator;
