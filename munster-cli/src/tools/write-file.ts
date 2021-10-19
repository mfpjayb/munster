import { dirname } from 'path';
import { mkdirSync, writeFile as wF } from 'fs';

export function writeFile(
    completeFileDestination: string,
    content: string,
    successMessage: string = null,
    writeErrorMessage: string = null
) {
    const completeFolderDestination = dirname(completeFileDestination);

    mkdirSync(completeFolderDestination, { recursive: true });
    wF(completeFileDestination, content, function(error) {
        if (error && writeErrorMessage) {
            console.log(writeErrorMessage);
        } else if (!error && successMessage) {
            console.log(successMessage);
        }
    });
}