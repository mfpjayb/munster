import { ncp } from 'ncp';

export function copyFolder(source: string, destination: string, callback: Function) {
    ncp(source, destination, function(error) {
        if (error) {
            throw error;
        }
        return callback();
    });
}
