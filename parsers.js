import fs from 'fs';
import yaml from 'js-yaml';

export const parseFile = (file) => {
  const fileExtension = file.split('.').pop();

  if (fileExtension === 'json') {
    const readJson = fs.readFileSync(file, 'utf8');
      return JSON.parse(readJson);
    };
      const readYaml= fs.readFileSync(file, 'utf8');                                                
        return yaml.load(readYaml);
};

