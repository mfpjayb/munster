import { resolve } from 'path';
import { existsSync } from 'fs';
import { red } from 'chalk';

export function getAppConfig(errorMessage: string) {
    const currentDir = global.process.cwd();
    const appJsonPath = resolve(currentDir, 'munster-app.json');
    if (!existsSync(appJsonPath)) {
        return console.log(red(errorMessage));
    }
    return require(appJsonPath);
}
