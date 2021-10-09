import { dirname } from 'path';
import { mkdirSync, writeFile as wf } from 'fs';

export function writeFile(
    completeFileDistination: string,
    content: string,
    successMessage: string = null,
    writeErrorMessage: string = null
) {
    const completeFolderDistination = dirname(completeFileDistination);

    mkdirSync(completeFolderDistination, { recursive: true });
    wf(completeFileDistination, content, function(error) {
        if (error && writeErrorMessage) {
            console.log(writeErrorMessage);
        } else if (!error && successMessage) {
            console.log(successMessage);
        }
    });
}