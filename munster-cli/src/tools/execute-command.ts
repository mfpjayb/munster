import { exec } from 'child_process';

// const execOptions = {
//   cwd: null,
//   env: null,
//   encoding: 'utf8',
//   timeout: 0,
//   maxBuffer: 200 * 1024,
//   killSignal: 'SIGTERM'
// };

export function executeCommand(command: string, callback = function(stdOut: string) { }) {
//   exec(command, execOptions, (err, stdOut: string, stdErr: string) => {
  exec(command, (err, stdOut: string, stdErr: string) => {
    console.log(err);
    console.log(stdErr);
    callback(stdOut);
  });
}
