"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceTextGenerator = void 0;
var get_filename_1 = require("../../tools/get-filename");
var kebab_to_camel_1 = require("../../tools/kebab-to-camel");
/**
 *
 * @param string the name of the file generated. ex. format "login-service"
 * @returns the string to be written to the new generated module file
 */
function serviceTextGenerator(filepath) {
    var name = (0, get_filename_1.getFilename)(filepath);
    var className = (0, kebab_to_camel_1.kebabToCamel)("-" + name);
    return "import { Service } from \"@munster/core\";\n\n@Service()\nexport class " + className + "Service {\n\n}\n";
}
exports.serviceTextGenerator = serviceTextGenerator;
