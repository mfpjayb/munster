"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommand = void 0;
var fs_1 = require("fs");
var listr_1 = __importDefault(require("listr"));
var path_1 = require("path");
var copy_folder_1 = require("../tools/copy-folder");
var execute_command_1 = require("../tools/execute-command");
function newCommand(projectName) {
    var source = (0, path_1.resolve)(__dirname, '../assets/munster-starter-app');
    var destination = (0, path_1.resolve)(global.process.cwd(), projectName);
    var tasks = new listr_1.default([
        {
            title: 'Creating new MunsterJs project ...',
            task: function () {
                (0, copy_folder_1.copyFolder)(source, destination, function () {
                    (0, fs_1.unlinkSync)((0, path_1.resolve)(destination, '.git'));
                });
            }
        },
        {
            title: 'Installing dependencies ...',
            task: function () { return new Promise(function (resolve) {
                (0, execute_command_1.executeCommand)("cd " + projectName + " && yarn install", function () {
                    resolve(true);
                });
            }); }
        }
    ]);
    tasks.run().catch(function (error) { return console.error(error); });
}
exports.newCommand = newCommand;
