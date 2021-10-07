#!/usr/bin/env node

const { program } = require('commander');
const json = require('./package.json');
const generate = require('./src/commands/generate');

program.version(json.version).description('Munster JS CLI');

program
    .command('generate <type> <filename>')
    .description('Generate a munster files.')
    .action(generate);

program.parse(process.argv);

// generate component

// generate service