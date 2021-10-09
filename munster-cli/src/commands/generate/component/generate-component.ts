import { red, green } from "chalk";
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { writeFile } from "../../../utils/write-file";
import { componentTextGenerator } from "./component-text-generator";
import { getFilename } from "./get-filename";

export function generateComponent(filepath: string, appConfig: any) {
    const filename = getFilename(filepath);
    const componentText = componentTextGenerator(filename);
    const appFileDistination = join(appConfig.appDir, `${filepath}.component.tsx`);
    const completeFileDistination = resolve(global.process.cwd(), appFileDistination);

    if (existsSync(completeFileDistination)) {
        console.log(red(`The file ${appFileDistination} already exists. Component creation failed.`));
    } else {
        const successMessage = `${green('CREATE')} ${appFileDistination}`;
        const errorMessage = `${red('Creating component failed.')}`;
        writeFile(completeFileDistination, componentText, successMessage, errorMessage);
    }
}
