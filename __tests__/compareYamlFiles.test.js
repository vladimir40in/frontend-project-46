import { genDiff } from '../compareJsonAndYamlFiles.js';

test('genDiff', () => {
  expect(genDiff('../__fixtures__/filepath1_test.yml', '../__fixtures__/filepath2_test.yml')).toEqual(
`{
  + cinco:true
  - cuatro:false
  - dos:1
  + dos:2
  - tres:3
    uno:he
}`);
});
