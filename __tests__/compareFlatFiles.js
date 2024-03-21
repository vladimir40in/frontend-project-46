import _ from "lodash";
import { parseFile } from "./parsers.js";

const arrangeList = (list) => {
  const turnList = list.map((item) => `${item}`).join('\n');
return `{\n${turnList}\n}`;
};

export const genDiff = (o1, o2) => {
  o1 = parseFile(o1);
  o2 = parseFile(o2);
 
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



