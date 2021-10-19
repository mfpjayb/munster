"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabToCamel = void 0;
function kebabToCamel(str) {
    return str.replace(/-./g, function (x) { return x.toUpperCase()[1]; });
}
exports.kebabToCamel = kebabToCamel;
