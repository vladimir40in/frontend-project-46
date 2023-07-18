import fs from 'fs';
import _ from "lodash";

const jsonToObject = (file) => {
  const readFile = fs.readFileSync(file, 'utf8');
  return JSON.parse(readFile);
};

const arrangeList = (list) => {
  const turnList = list.map((item) => `${item}`).join('\n');
return `{\n${turnList}\n}`;
};

const genDiff = (o1, o2) => {
  o1 = jsonToObject(o1);
  o2 = jsonToObject(o2);
    let result = [];
     const insertKeys = _.union(Object.keys(o1), Object.keys(o2));
     const sortInsertedKeys =_.sortBy(insertKeys);
  
  for (const key of sortInsertedKeys) {
      
    if (!o1.hasOwnProperty(key)) {
       result.push(`  + ${key}:${o2[key]}`);
      }
    if (!o2.hasOwnProperty(key)) {
        result.push(`  - ${key}:${o1[key]}`);
      }
    if (o2.hasOwnProperty(key) && o1.hasOwnProperty(key)) {
      if (o1[key] !== o2[key]) {
          result.push(`  - ${key}:${o1[key]}`);
          result.push(`  + ${key}:${o2[key]}`);
      }
    if (o1[key] === o2[key]) {
      result.push(`    ${key}:${o1[key]}`);
      } 
    }   
  }
     return arrangeList(result);
 };
  // console.log(genDiff('file1.json', 'file2.json'));
