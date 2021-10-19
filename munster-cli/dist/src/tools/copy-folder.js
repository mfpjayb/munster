"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFolder = void 0;
var ncp_1 = require("ncp");
function copyFolder(source, destination, callback) {
    console.log(source, destination);
    (0, ncp_1.ncp)(source, destination, function (error) {
        if (error) {
            throw error;
        }
        return callback();
    });
}
exports.copyFolder = copyFolder;
