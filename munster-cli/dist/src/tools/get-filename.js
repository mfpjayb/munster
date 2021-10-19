"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilename = void 0;
function getFilename(filepath) {
    var pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}
exports.getFilename = getFilename;
