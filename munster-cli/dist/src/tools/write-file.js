"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
function writeFile(completeFileDestination, content, successMessage, writeErrorMessage) {
    if (successMessage === void 0) { successMessage = null; }
    if (writeErrorMessage === void 0) { writeErrorMessage = null; }
    var completeFolderDestination = (0, path_1.dirname)(completeFileDestination);
    (0, fs_1.mkdirSync)(completeFolderDestination, { recursive: true });
    (0, fs_1.writeFile)(completeFileDestination, content, function (error) {
        if (error && writeErrorMessage) {
            console.log(writeErrorMessage);
        }
        else if (!error && successMessage) {
            console.log(successMessage);
        }
    });
}
exports.writeFile = writeFile;
