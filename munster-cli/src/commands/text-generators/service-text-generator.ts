import { getFilename } from "../../tools/get-filename";
import { kebabToCamel } from "../../tools/kebab-to-camel";

/**
 * 
 * @param string the name of the file generated. ex. format "login-service"
 * @returns the string to be written to the new generated module file
 */
export function serviceTextGenerator(filepath: string): string {
    const name = getFilename(filepath);
    const className = kebabToCamel(`-${name}`);
    return `import { Service } from "@munster/di";

@Service()
export class ${className}Service {

}
`;
}


