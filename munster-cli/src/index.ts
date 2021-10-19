#!/usr/bin/env node

import { program } from 'commander';
import json from '../package.json';
import { generateCommand } from './commands/generate-command';
import { newCommand } from './commands/new-command';

program.version(json.version).description('Munster JS CLI');

/**
 * Generate Commands
 */
program
    .command('generate <type> <filename>')
    .description('Generate munster files.')
    .action(generateCommand);

/**
 * New Command
 */
program
    .command('new <projectName>')
    .description('Generate a new munster project in the current directory.')
    .action(newCommand)

program.parse(global.process.argv);
