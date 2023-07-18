#!/usr/bin/env node
const { program } = require('commander');

program
  
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type> ', 'output format')
  .argument('<filepath1> <filepath2>')
  .parse(process.argv);
  
  