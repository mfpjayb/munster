import { getFilename } from "../../tools/get-filename";
import { kebabToCamel } from "../../tools/kebab-to-camel";

/**
 * 
 * @param string the name of the file generated. ex. format "login-guard"
 * @returns the string to be written to the new generated guard file
 */
export function guardTextGenerator(filepath: string): string {
    const name = getFilename(filepath);
    const className = kebabToCamel(`-${name}`);
    return `import { BaseGuard, Guard } from "@munster/core";

@Guard()
export class ${className}Guard extends BaseGuard {

    canActivate(): Promise<boolean> | boolean {
        return true;
    }

}
`;
}
