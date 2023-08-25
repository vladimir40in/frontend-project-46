import { genDiff } from '../compareJsonAndYamlFiles.js';

test('genDiff', () => {
  expect(genDiff('../__fixtures__/file1_test.json', '../__fixtures__/file2_test.json')).toEqual(
`{
  + cinco:true
  - cuatro:false
  - dos:1
  + dos:2
  - tres:3
    uno:he
}`);
});


