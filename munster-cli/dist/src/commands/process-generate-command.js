"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGenerateCommand = void 0;
var listr_1 = __importDefault(require("listr"));
var path_1 = require("path");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var capitalize_first_letter_1 = require("../tools/capitalize-first-letter");
var write_file_1 = require("../tools/write-file");
function getFilename(filepath) {
    var pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}
function processGenerateCommand(type, configs) {
    var tasks = new listr_1.default([
        {
            title: "Creating new " + type + " ...",
            task: function () {
                configs.forEach(function (config) {
                    var appConfig = config.appConfig;
                    var parentDirManipulator = config.withParentFolder ? '' : '../';
                    var filename = getFilename(config.filepath);
                    var appFileDestination = (0, path_1.join)(appConfig.appDir, config.filepath + "/" + parentDirManipulator + filename + config.extension);
                    var completeFileDestination = (0, path_1.resolve)(global.process.cwd(), appFileDestination);
                    if ((0, fs_1.existsSync)(completeFileDestination)) {
                        console.log((0, chalk_1.red)("The file " + appFileDestination + " already exists. " + (0, capitalize_first_letter_1.capitalizeFirstLetter)(type) + " creation failed."));
                    }
                    else {
                        var errorMessage = (0, chalk_1.red)("Creating " + type + " failed.");
                        var successMessage = (0, chalk_1.green)('CREATE') + " " + appFileDestination;
                        (0, write_file_1.writeFile)(completeFileDestination, config.content, successMessage, errorMessage);
                    }
                });
            }
        }
    ]);
    tasks.run().catch(function (error) { return console.error(error); });
}
exports.processGenerateCommand = processGenerateCommand;
