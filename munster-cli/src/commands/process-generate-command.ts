import Listr from "listr";
import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { green, red } from "chalk";
import { capitalizeFirstLetter } from "../tools/capitalize-first-letter";
import { writeFile } from "../tools/write-file";

export interface GenerateCommandOptionInterface {
    filepath: string;
    appConfig: any;
    content: string;
    extension: string;
    withParentFolder: boolean;
}

function getFilename(filepath: string): string {
    const pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}

export function processGenerateCommand(type: string, configs: GenerateCommandOptionInterface[]): void {
    const tasks = new Listr([
        {
            title: `Creating new ${type} ...`,
            task: () => {
                configs.forEach(config => {
                    const { appConfig } = config;
                    const parentDirManipulator = config.withParentFolder ? '' : '../';
                    const filename = getFilename(config.filepath);
                    const appFileDestination = join(appConfig.appDir, `${config.filepath}/${parentDirManipulator}${filename}${config.extension}`);
                    const completeFileDestination = resolve(global.process.cwd(), appFileDestination);

                    if (existsSync(completeFileDestination)) {
                        console.log(red(`The file ${appFileDestination} already exists. ${capitalizeFirstLetter(type)} creation failed.`));
                    } else {
                        const errorMessage = red(`Creating ${type} failed.`);
                        const successMessage = `${green('CREATE')} ${appFileDestination}`;
                        writeFile(completeFileDestination, config.content, successMessage, errorMessage);
                    }
                });
            }
        }
    ]);
    tasks.run().catch(error => console.error(error));
}
