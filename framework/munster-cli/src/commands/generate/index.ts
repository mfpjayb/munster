import { getAppConfig } from "../../get-app-config";
import { runGenerateComponentCommand } from "./component/run-generate-component-command";

/**
 * Generate commands
 */

export function generateCommand(type: string, filename: string) {
    const appConfig = getAppConfig(`Generate command must be run in munster project's root directory.`);
    switch(type) {
        case 'component': {
            runGenerateComponentCommand(filename, appConfig);
            break;
        }
    }
}
