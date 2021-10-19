"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleTextGenerator = void 0;
var get_filename_1 = require("../../tools/get-filename");
var kebab_to_camel_1 = require("../../tools/kebab-to-camel");
/**
 *
 * @param string the name of the file generated. ex. format "login-module"
 * @returns the string to be written to the new generated module file
 */
function moduleTextGenerator(filepath) {
    var name = (0, get_filename_1.getFilename)(filepath);
    var className = (0, kebab_to_camel_1.kebabToCamel)("-" + name);
    return "import { CommonModule, Module } from \"@munster/core\";\n\n@Module({\n    modules: [\n        CommonModule\n    ]\n})\nexport class " + className + "Module { }";
}
exports.moduleTextGenerator = moduleTextGenerator;
