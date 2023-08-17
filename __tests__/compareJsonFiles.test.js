import { genDiff } from '../compareJsonFiles.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

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
console.log("final line check");

