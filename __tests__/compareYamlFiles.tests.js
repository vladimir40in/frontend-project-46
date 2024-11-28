import  gendiff  from '../bin/index.js';
import { expectedYamlOutput } from '../__fixtures__/expectedForms.js';

test('genDiff(filePath1, filePath2, formatName)', () => {
  const filePath1 = './__fixtures__/file1.yaml';
  const filePath2 = './__fixtures__/file2.yaml';
  
  expect(gendiff(filePath1, filePath2)).toEqual(expectedYamlOutput);
});
