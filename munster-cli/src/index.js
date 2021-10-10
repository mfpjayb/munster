#!/usr/bin/env node

const { program } = require('commander');
const json = require('../package.json');
const generateCommand = require('./commands/generate/generate-command');
const newCommand = require('./commands/new/new-command');

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