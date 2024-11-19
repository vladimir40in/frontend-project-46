import { genDiff } from '../comparator.js';
import { expectedJsonOutput } from '../__fixtures__/expectedForms.js';

test('genDiff(filePath1, filePath2, formatName)', () => {
  const filePath1 = './__fixtures__/file1.json';
  const filePath2 = './__fixtures__/file2.json';
  
  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expectedJsonOutput);
});

