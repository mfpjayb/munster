"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommand = void 0;
var get_app_config_1 = require("../tools/get-app-config");
var process_generate_command_1 = require("./process-generate-command");
var component_text_generator_1 = require("./text-generators/component-text-generator");
var directive_text_generator_1 = require("./text-generators/directive-text-generator");
var guard_text_generator_1 = require("./text-generators/guard-text-generator");
var module_text_generator_1 = require("./text-generators/module-text-generator");
var service_text_generator_1 = require("./text-generators/service-text-generator");
function generateCommand(type, filepath) {
    var appConfig = (0, get_app_config_1.getAppConfig)("Generate command must be run inside a munster project root directory.");
    switch (type) {
        case 'component':
            {
                return (0, process_generate_command_1.processGenerateCommand)(type, [
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.component.tsx',
                        content: (0, component_text_generator_1.componentTextGenerator)(filepath),
                        withParentFolder: true
                    },
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.component.scss',
                        content: '',
                        withParentFolder: true
                    }
                ]);
            }
            ;
        case 'module':
            {
                return (0, process_generate_command_1.processGenerateCommand)(type, [
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.module.ts',
                        content: (0, module_text_generator_1.moduleTextGenerator)(filepath),
                        withParentFolder: true
                    }
                ]);
            }
            ;
        case 'service':
            {
                return (0, process_generate_command_1.processGenerateCommand)(type, [
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.service.ts',
                        content: (0, service_text_generator_1.serviceTextGenerator)(filepath),
                        withParentFolder: false
                    }
                ]);
            }
            ;
        case 'guard':
            {
                return (0, process_generate_command_1.processGenerateCommand)(type, [
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.guard.ts',
                        content: (0, guard_text_generator_1.guardTextGenerator)(filepath),
                        withParentFolder: false
                    }
                ]);
            }
            ;
        case 'directive':
            {
                return (0, process_generate_command_1.processGenerateCommand)(type, [
                    {
                        filepath: filepath,
                        appConfig: appConfig,
                        extension: '.directive.ts',
                        content: (0, directive_text_generator_1.directiveTextGenerator)(filepath),
                        withParentFolder: false
                    }
                ]);
            }
            ;
    }
}
exports.generateCommand = generateCommand;
