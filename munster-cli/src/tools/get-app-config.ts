import { resolve } from 'path';
import { existsSync } from 'fs';
import { red } from 'chalk';

export function getAppConfig(errorMessage: string): object {
    const currentDir = global.process.cwd();
    const appJsonPath = resolve(currentDir, 'munster-app.json');
    if (!existsSync(appJsonPath)) {
        console.log(red(errorMessage));
        return;
    }
    return require(appJsonPath);
}
