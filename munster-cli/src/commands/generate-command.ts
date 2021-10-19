import { getAppConfig } from "../tools/get-app-config";
import { processGenerateCommand } from "./process-generate-command";
import { componentTextGenerator } from "./text-generators/component-text-generator";
import { directiveTextGenerator } from "./text-generators/directive-text-generator";
import { guardTextGenerator } from "./text-generators/guard-text-generator";
import { moduleTextGenerator } from "./text-generators/module-text-generator";
import { serviceTextGenerator } from "./text-generators/service-text-generator";

export function generateCommand(type: string, filepath: string): void {
    const appConfig = getAppConfig(`Generate command must be run inside a munster project root directory.`);

    switch(type) {
        case 'component': {
            return processGenerateCommand(type, [
                {
                    filepath,
                    appConfig,
                    extension: '.component.tsx',
                    content: componentTextGenerator(filepath),
                    withParentFolder: true
                },
                {
                    filepath,
                    appConfig,
                    extension: '.component.scss',
                    content: '',
                    withParentFolder: true
                }
            ]);
        };
        case 'module': {
            return processGenerateCommand(type, [
                {
                    filepath,
                    appConfig,
                    extension: '.module.ts',
                    content: moduleTextGenerator(filepath),
                    withParentFolder: true
                }
            ]);
        };
        case 'service': {
            return processGenerateCommand(type, [
                {
                    filepath,
                    appConfig,
                    extension: '.service.ts',
                    content: serviceTextGenerator(filepath),
                    withParentFolder: false
                }
            ]);
        };
        case 'guard': {
            return processGenerateCommand(type, [
                {
                    filepath,
                    appConfig,
                    extension: '.guard.ts',
                    content: guardTextGenerator(filepath),
                    withParentFolder: false
                }
            ]);
        };
        case 'directive': {
            return processGenerateCommand(type, [
                {
                    filepath,
                    appConfig,
                    extension: '.directive.ts',
                    content: directiveTextGenerator(filepath),
                    withParentFolder: false
                }
            ]);
        };
    }
}
