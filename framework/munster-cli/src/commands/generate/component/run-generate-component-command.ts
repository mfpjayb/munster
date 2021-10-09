import { red, green } from "chalk";
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, resolve, dirname } from 'path';
import { componentTextGenerator } from "./component-text-generator";
import { getFilename } from "./get-filename";

export function runGenerateComponentCommand(filepath: string, appConfig: any) {
    const currentDir = global.process.cwd();
    const filename = getFilename(filepath);
    const componentText = componentTextGenerator(filename);
    const appFileDistination = join(appConfig.appDir, `${filepath}.component.tsx`);
    const completeFileDistination = resolve(currentDir, appFileDistination);
    const completeFolderDistination = dirname(completeFileDistination);

    /**
     * Check if filename already exists, if yes don't create the file and throw an error
     */
    if (existsSync(completeFileDistination)) {
        console.log(red(`The file ${appFileDistination} already exists. Component creation failed.`));
    } else {
        mkdirSync(completeFolderDistination, { recursive: true });
        writeFile(completeFileDistination, componentText, function(error) {
            if (error) {
                console.log(red(`Creating component failed.`));
            }
            console.log(green('CREATE'), appFileDistination);
        });
    }
}
