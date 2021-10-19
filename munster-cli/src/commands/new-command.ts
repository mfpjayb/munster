import { unlinkSync } from 'fs';
import Listr from "listr";
import { resolve } from 'path';
import { copyFolder } from '../tools/copy-folder';
import { executeCommand } from '../tools/execute-command';

export function newCommand(projectName) {
    const source = resolve(__dirname, '../assets/munster-starter-app');
    const destination = resolve(global.process.cwd(), projectName);
    const tasks = new Listr([
        {
            title: 'Creating new MunsterJs project ...',
            task: () => {
                copyFolder(source, destination, () => {
                    unlinkSync(resolve(destination, '.git'));
                });
            }
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

