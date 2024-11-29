import fs from 'fs';
import yaml from 'js-yaml';

export const parseFile = (fileName) => {
  const fileExtension = fileName.split('.').pop();
  if (fileExtension === 'json') {
    const readJson = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(readJson);
  }
  const readYaml = fs.readFileSync(fileName, 'utf8');
  return yaml.load(readYaml);
};
