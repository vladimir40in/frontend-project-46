#!/usr/bin/env node

import { program } from 'commander';
import { genDiff } from '../comparator.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
        const diff = genDiff(filepath1, filepath2, options.format);
        console.log(diff);
    });
program.parse(process.argv);
