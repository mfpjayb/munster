"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directiveTextGenerator = void 0;
var get_filename_1 = require("../../tools/get-filename");
var kebab_to_camel_1 = require("../../tools/kebab-to-camel");
/**
 *
 * @param string the name of the file generated. ex. format "login-guard"
 * @returns the string to be written to the new generated guard file
 */
function directiveTextGenerator(filepath) {
    var name = (0, get_filename_1.getFilename)(filepath);
    var className = (0, kebab_to_camel_1.kebabToCamel)("-" + name);
    return "import { Directive } from \"@munster/core\";\n\nexport class " + className + "Directive extends Directive {\n\n    public static namespace: string = '" + name + "';\n\n    $init(): void {\n    }\n\n}\n";
}
exports.directiveTextGenerator = directiveTextGenerator;
