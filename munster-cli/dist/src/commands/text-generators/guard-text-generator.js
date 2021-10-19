"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardTextGenerator = void 0;
var get_filename_1 = require("../../tools/get-filename");
var kebab_to_camel_1 = require("../../tools/kebab-to-camel");
/**
 *
 * @param string the name of the file generated. ex. format "login-guard"
 * @returns the string to be written to the new generated guard file
 */
function guardTextGenerator(filepath) {
    var name = (0, get_filename_1.getFilename)(filepath);
    var className = (0, kebab_to_camel_1.kebabToCamel)("-" + name);
    return "import { BaseGuard, Guard } from \"@munster/core\";\n\n@Guard()\nexport class " + className + "Guard extends BaseGuard {\n\n    canActivate(): Promise<boolean> | boolean {\n        return true;\n    }\n\n}\n";
}
exports.guardTextGenerator = guardTextGenerator;
