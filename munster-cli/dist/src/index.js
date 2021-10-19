#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var package_json_1 = __importDefault(require("../package.json"));
var generate_command_1 = require("./commands/generate-command");
var new_command_1 = require("./commands/new-command");
commander_1.program.version(package_json_1.default.version).description('Munster JS CLI');
/**
 * Generate Commands
 */
commander_1.program
    .command('generate <type> <filename>')
    .description('Generate munster files.')
    .action(generate_command_1.generateCommand);
/**
 * New Command
 */
commander_1.program
    .command('new <projectName>')
    .description('Generate a new munster project in the current directory.')
    .action(new_command_1.newCommand);
commander_1.program.parse(global.process.argv);
