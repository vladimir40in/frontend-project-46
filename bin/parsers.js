import fs from 'fs';
import yaml from 'js-yaml';

const parseFile = (fileName) => {
  const fileExtension = fileName.split('.').slice(-1)[0]; // slice не мутирует исходный массив
  if (fileExtension === 'json') {
    const readJson = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(readJson);
  }
  const readYaml = fs.readFileSync(fileName, 'utf8');
  return yaml.load(readYaml);
};

export default parseFile;
