import gendiff from '../bin/index.js';
import { expectedPlainOutput } from '../__fixtures__/expectedForms.js';

test('genDiff(filePath1, filePath2, formatName)', () => {
  const filePath1 = './__fixtures__/file1ForPlain.yaml';
  const filePath2 = './__fixtures__/file2ForPlain.yaml';

  expect(gendiff(filePath1, filePath2, 'plain')).toEqual(expectedPlainOutput);
});
