// import _ from 'lodash';

const signMap = {
  ADDED: '+',
  DELETED: '-',
  UNCHANGED: ' ',
};
const reformObject = (obj, replacer = '>', replacerCount = 4, level = 0) => {
  const iter = (current, depth = 0) => { // .. когда объект не сравнивается, т.е. уникальный ключ
    const shift = (depth + level + 1) * replacerCount;
    if (typeof current !== 'object' || current === null) {
      return current;
    }
    const lines = Object.entries(current)
      .map(([key, val]) => `${replacer.repeat(shift)}${key}: ${iter(val, (level + 1) * (depth + 1))}`);

    return [
      '{',
      ...lines,
      `${replacer.repeat(shift - replacerCount)}}`,
    ].join('\n');
  };
  return iter(obj, 1);
};

const makeIfValueObject = (piece, replacer, replacerCount, level) => {
  if (typeof piece === 'object' && piece !== null) {
    return reformObject(piece, replacer, replacerCount, level);
  }
  return piece;
};

const stylishForm = (example, replacer = ' ', replacerCount = 4, level = 0) => {
  const result = example.map((item) => {
    const sign = signMap[item.type];
    const shifter = replacer.repeat((level + 1) * replacerCount - 2);

    if (item.type === 'PARENT') {
      return `${shifter}  ${item.key}: ${stylishForm(item.children, replacer, replacerCount, level + 1)}`;
    }

    if (item.type === 'CHANGED') {
      return [
        `${shifter}- ${item.key}: ${makeIfValueObject(item.oldValue, replacer, replacerCount, level)}`,
        `${shifter}+ ${item.key}: ${makeIfValueObject(item.value, replacer, replacerCount, level)}`,
      ].join('\n');
    }

    if (item.type === 'DELETED') {
      return `${shifter}- ${item.key}: ${makeIfValueObject(item.oldValue, replacer, replacerCount, level)}`;
    }
    if (item.type === 'UNCHANGED') {
      return `${shifter}  ${item.key}: ${makeIfValueObject(item.oldValue, replacer, replacerCount, level)}`;
    }
    if (item.type === 'ADDED') {
      return `${shifter}+ ${item.key}: ${makeIfValueObject(item.value, replacer, replacerCount, level)}`;
    }

    return `${shifter}${sign} ${item.key}: ${makeIfValueObject(item.value, replacer, replacerCount, level)}`;
  });

  return [
    '{',
    ...result,
    `${replacer.repeat((level + 0) * replacerCount)}}`,
  ].join('\n');
};
export default stylishForm;
