import _ from "lodash";
import { parseFile } from "./parsers.js";
import { getFormatter }  from "./formatters/index.js";

const types = {
  ADDED: 'ADDED',
  DELETED: 'DELETED',
  UNCHANGED: 'UNCHANGED',
  CHANGED: 'CHANGED',
  PARENT: 'PARENT'
};

const compareValues = (key, value1, value2) => {
  if (_.isObject(value1) && _.isObject(value2)) {
    return {
      key,
      type: types.PARENT,
      children: doIt(value1, value2)
  };
 }
  if (value1 !== value2) {
    return {
      key,
      type: types.CHANGED, 
      oldValue: value1,
      value: value2
    };
  }
   return { key, oldValue: value1, type: types.UNCHANGED };
};

const doIt = (o1, o2) => {
  let result = [];
  const keys = _.union(Object.keys(o1), Object.keys(o2)).sort();
  
  for (const key of keys) {
    if (!o1.hasOwnProperty(key)) {
      result.push({ key, type: types.ADDED, value: o2[key] });
    } else if (!o2.hasOwnProperty(key)) {
      result.push({ key, oldValue: o1[key], type: types.DELETED });
    } else {
      const value1 = o1[key];
      const value2 = o2[key];
      const comparedValues = compareValues(key, value1, value2);
      if (Array.isArray(comparedValues)) {
        result.push(...comparedValues);
      } else {
        result.push(comparedValues);
      }
    }
  }
        return result;
  };

export const genDiff = (file1, file2, formatName = 'stylish') => { 
  const o1 = parseFile(file1);
  const o2 = parseFile(file2); 
  const diff = doIt(o1, o2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
 };
