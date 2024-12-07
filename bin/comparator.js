import _ from 'lodash';
import { parseFile } from './parsers.js';
import { getFormatter } from '../formatters/index.js';

const types = {
  ADDED: 'ADDED',
  DELETED: 'DELETED',
  UNCHANGED: 'UNCHANGED',
  CHANGED: 'CHANGED',
  PARENT: 'PARENT',
};

const sortToFlatArrOfObs = (o1, o2) => {
  const keys = _.sortBy(_.union(Object.keys(o1), Object.keys(o2))); // sort -> _.sortBy
  // новый отсортированный массив, не мутируя исходный
  return _.flatMap(keys, (key) => { // _.flatMap вместо цикла for
    if (!_.has(o1, key)) {
      return [{ key, type: types.ADDED, value: o2[key] }]; // hasOwnProperty -> _.has
    }
    if (!_.has(o2, key)) {
      return [{ key, oldValue: o1[key], type: types.DELETED }];
    }
    const value1 = o1[key];
    const value2 = o2[key];

    const comparedValues = compareValues(key, value1, value2);// _.isArray вместо Array.isArray
    return _.isArray(comparedValues) ? comparedValues : [comparedValues];
  }); // плоский массив объектов различий
};

const compareValues = (key, value1, value2) => {
  if (_.isObject(value1) && _.isObject(value2)) {
    return {
      key,
      type: types.PARENT,
      children: sortToFlatArrOfObs(value1, value2),
    };
  }
  if (value1 !== value2) {
    return {
      key,
      type: types.CHANGED,
      oldValue: value1,
      value: value2,
    };
  }
  return { key, oldValue: value1, type: types.UNCHANGED };
};

const gendiff = (file1, file2, formatName = 'stylish') => {
  const o1 = parseFile(file1);
  const o2 = parseFile(file2);
  const diff = sortToFlatArrOfObs(o1, o2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default gendiff;
