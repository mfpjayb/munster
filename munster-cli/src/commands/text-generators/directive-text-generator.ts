import { getFilename } from "../../tools/get-filename";
import { kebabToCamel } from "../../tools/kebab-to-camel";

/**
 * 
 * @param string the name of the file generated. ex. format "login-guard"
 * @returns the string to be written to the new generated guard file
 */
export function directiveTextGenerator(filepath: string): string {
    const name = getFilename(filepath);
    const className = kebabToCamel(`-${name}`);
    return `import { Directive } from "@munster/core";

export class ${className}Directive extends Directive {

    public static namespace: string = '${name}';

    $init(): void {
    }

}
`;
}

