import { program } from 'commander';
import json from '../package.json';
import { generateCommand } from './commands/generate/generate-command';

program.version(json.version).description('Munster JS CLI');

program
    .command('generate <type> <filename>')
    .description('Generate munster files.')
    .action(generateCommand);

program.parse(global.process.argv);

// generate component

// generate service