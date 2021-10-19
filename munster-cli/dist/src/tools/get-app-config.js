"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConfig = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
function getAppConfig(errorMessage) {
    var currentDir = global.process.cwd();
    var appJsonPath = (0, path_1.resolve)(currentDir, 'munster-app.json');
    if (!(0, fs_1.existsSync)(appJsonPath)) {
        console.log((0, chalk_1.red)(errorMessage));
        return;
    }
    return require(appJsonPath);
}
exports.getAppConfig = getAppConfig;
