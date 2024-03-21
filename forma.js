import _ from 'lodash';

const data = [
  {
    key: 'common',
    children: [
      { key: 'follow', value: false, type: 'ADDED' },
      { key: 'setting1', value: 'Value 1', type: 'UNCHANGED' },
      { key: 'setting2', oldValue: 200, type: 'DELETED' },
      { key: 'setting3', value: null, oldValue: true, type: 'CHANGED' },
      { key: 'setting4', value: 'blah blah', type: 'ADDED' },
      { key: 'setting5', value: { key5: 'value5' }, type: 'ADDED' },
      {
        key: 'setting6',
        children: [
          {
            key: 'doge',
            children: [
              {
                key: 'wow',
                value: 'so much',
                oldValue: '',
                type: 'CHANGED'
              }
            ],
            type: 'PARENT'
          },
          { key: 'key', value: 'value', type: 'UNCHANGED' },
          { key: 'ops', value: 'vops', type: 'ADDED' }
        ],
        type: 'PARENT'
      }
    ],
    type: 'PARENT'
  },
  {
    key: 'group1',
    children: [
      { key: 'baz', value: 'bars', oldValue: 'bas', type: 'CHANGED' },
      { key: 'foo', value: 'bar', type: 'UNCHANGED' },
      {
        key: 'nest',
        value: 'str',
        oldValue: { key: 'value' },
        type: 'CHANGED'
      }
    ],
    type: 'PARENT'
  },
  {
    key: 'group2',
    oldValue: { abc: 12345, deep: { id: 45 } },
    type: 'DELETED'
  },
  {
    key: 'group3',
    value: { deep: { id: { number: 45 } }, fee: 100500 },
    type: 'ADDED'
  }
];

const signMap = {
  ADDED: '+',
  DELETED: '-',
  UNCHANGED: ' '
};
const formatObject = (obj, replacer = '>', replacerCount = 4, level = 0) => {
  const iter = (current, depth = 0) => { // ...когда объект не сравнивается, т.е. уникальный ключ
  const shift = (depth + level + 1) * replacerCount;
    if (typeof current !== 'object' || current === null) {
      return current;
    }
    const lines = Object.entries(current)
      .map(([key, val]) => `${replacer.repeat(shift)}${key}: ${iter(val, (level + 1) * (depth + 1))}`);

    return [
      '{',
      ...lines,
      `${replacer.repeat(shift - replacerCount)}}`
    ].join('\n');
  }
  return iter(obj, 1);
};

const formatIfValueObject = (piece, replacer, replacerCount, level) => {
  if (typeof piece === 'object') {
    return formatObject(piece, replacer, replacerCount, level);
  }
  return piece;
};

const format = (example, replacer = '.', replacerCount = 4, level = 0) => {
  const result = example.map((item) => {
    const sign = signMap[item.type];
    const shifter = replacer.repeat((level + 1) * replacerCount - 2);

    if (item.type === 'PARENT') {
      return `${shifter}  ${item.key}: ${format(item.children, replacer, replacerCount, level + 1)}`
    }

    if (item.type === 'CHANGED') {
      return [
        `${shifter}- ${item.key}: ${formatIfValueObject(item.oldValue, replacer, replacerCount, level)}`,
        `${shifter}+ ${item.key}: ${formatIfValueObject(item.value, replacer, replacerCount, level)}`,
      ].join('\n');
    }

    if (item.type === 'DELETED') {
      return `${shifter}- ${item.key}: ${formatIfValueObject(item.oldValue, replacer, replacerCount, level)}`;
    }
    return `${shifter}${sign} ${item.key}: ${formatIfValueObject(item.value, replacer, replacerCount, level)}`;
  });

  return [
    '{',
    ...result,
    `${replacer.repeat((level + 0) * replacerCount)}}`
  ].join('\n');
};
console.log(format(data));
// format(data);
