import _ from "lodash";
import { parseFile } from "./parsers.js";
import myStringify from "./straightenObject.js";
import util from "util";
                                                            console.log('START');

 const genDiff = (o1, o2) => {
                                 
  let result = [];
  const insertKeys = _.union(Object.keys(o1), Object.keys(o2));
  const sortInsertedKeys =_.sortBy(insertKeys);
  
   for (const key of sortInsertedKeys) {
    if (_.isObject(o1[key]) &&  _.isObject(o2[key])) {
     result.push({ key: key, children: genDiff(o1[key], o2[key]), type: 'PARENT'}); // это здесь
       continue;
    }  
    if (!o1.hasOwnProperty(key)) {
      result.push({ key: key, value: o2[key], type: 'ADDED'});
    }
    if (!o2.hasOwnProperty(key)) {
      result.push({ key: key, oldValue: o1[key], type: 'DELETED'});
    }
    if (o2.hasOwnProperty(key) && o1.hasOwnProperty(key)) {
      if (o1[key] !== o2[key]) {
        result.push({ key: key, value: o2[key], oldValue: o1[key], type: 'CHANGED'});   
      }
      if (o1[key] === o2[key]) {
        result.push({ key: key, value: o2[key], type: 'UNCHANGED'});
      } 
    }   
  }
  return result;
};

const genFilesDiff = (file1, file2) => {
  const o1 = parseFile(file1);
  const o2 = parseFile(file2); // результат - объект
  //  return stylish(genDiff(o1, o2));
   return genDiff(o1, o2);
 };
 
  // const f1 = './__fixtures__/file1_testFlatFiles.json';
  // const f2 = './__fixtures__/file2_testFlatFiles.json';
const f1 = './filepath1.yml';
const f2 = './filepath2.yml';

//  console.log(util.inspect(genFilesDiff(f1, f2), { depth: null }));

