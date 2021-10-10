const Listr = require('listr');
const { resolve } = require('path');
const copyFolder = require('../../utils/copy-folder');
const executeCommand = require('../../utils/execute-command');

module.exports = function(projectName) {
    const source = resolve(__dirname, '../../assets/munster-starter-app');
    const distination = resolve(global.process.cwd(), projectName);
    const tasks = new Listr([
        {
            title: 'Creating new MunsterJs project ...',
            task: () => copyFolder(source, distination, () => {})
        },
        {
            title: 'Installing dependencies ...',
            task: () => new Promise(resolve => {
                executeCommand(`cd ${projectName} && yarn install`, function() {
                    resolve(true);
                });
            })
        }
    ]);

    tasks.run().catch(error => console.error(error));
}
