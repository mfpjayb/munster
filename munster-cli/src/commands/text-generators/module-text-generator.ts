import { getFilename } from "../../tools/get-filename";
import { kebabToCamel } from "../../tools/kebab-to-camel";

/**
 * 
 * @param string the name of the file generated. ex. format "login-module"
 * @returns the string to be written to the new generated module file
 */
export function moduleTextGenerator(filepath: string): string {
    const name = getFilename(filepath);
    const className = kebabToCamel(`-${name}`);
    return `import { CommonModule, Module } from "@munster/core";

@Module({
    modules: [
        CommonModule
    ]
})
export class ${className}Module { }`;
}

