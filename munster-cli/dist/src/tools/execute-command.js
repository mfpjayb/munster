"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = void 0;
var child_process_1 = require("child_process");
// const execOptions = {
//   cwd: null,
//   env: null,
//   encoding: 'utf8',
//   timeout: 0,
//   maxBuffer: 200 * 1024,
//   killSignal: 'SIGTERM'
// };
function executeCommand(command, callback) {
    if (callback === void 0) { callback = function (stdOut) { }; }
    //   exec(command, execOptions, (err, stdOut: string, stdErr: string) => {
    (0, child_process_1.exec)(command, function (err, stdOut, stdErr) {
        console.log(err);
        console.log(stdErr);
        callback(stdOut);
    });
}
exports.executeCommand = executeCommand;
