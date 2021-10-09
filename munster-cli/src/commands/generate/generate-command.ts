import { getAppConfig } from "../../get-app-config";
import { generateComponent } from "./component/generate-component";

/**
 * Generate commands
 */

export function generateCommand(type: string, filename: string): void {
    const appConfig = getAppConfig(`Generate command must be run inside a munster project root directory.`);

    switch(type) {
        case 'component': {
            return generateComponent(filename, appConfig);
        }
    }
}
