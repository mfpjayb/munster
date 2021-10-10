const cp = require('child_process');

const execOptions = {
  cwd: null,
  env: null,
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM'
};

module.exports = function(command, callback = function() { }) {
  cp.exec(command, execOptions, (err, stdOut, stdErr) => {
    console.log(err);
    console.log(stdErr);
    callback(stdOut);
  });
}