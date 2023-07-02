const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type> ', 'output format')
  .argument('<filepath1> <filepath2>');
  
  program.parse();
// команды, Обработчики команд, Определение опций, Аргументы и валидация