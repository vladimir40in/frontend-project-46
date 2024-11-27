import { gendiff } from '../comparator.js';
import { expectedJsonFormatOutput } from '../__fixtures__/expectedForms.js';

test('genDiff(filePath1, filePath2, formatName)', () => {
  const filePath1 = './__fixtures__/file1.json';
  const filePath2 = './__fixtures__/file2.json';
  
  expect(gendiff(filePath1, filePath2, 'json')).toEqual(expectedJsonFormatOutput);
});

