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
                                                                            
  //const formatObject = (obj, space, level = 0) => { // фрагмент создания кастомной строки, 
    const formatObject = (obj, space, level = 0) => {
    const iter = (current, depth) => { // ...когда объект не сравнивается, т.е. уникальный ключ
      if (typeof current !== 'object' || current === null) {
    return current;
      } 
    
    const lines = Object.entries(current)  // depth + 1 для создания отступов по уровню вложенности
        .map(([key, val]) => `${space.repeat((depth + 1) * (level + 1) * 4 - 2)}${key}: ${iter(val, (depth + 1) * (level + 1))}`);
    
      return [ // сборщик строки из решения учителя, испытание js_stringify_trees
        '{',
        ...lines,
        `${space.repeat(- 2 + (level + 1) * (depth + 1) * 3)}}`  // это '}' больших типа common
        // `${space.repeat(4)}`,
      ].join('\n');
         }
    
    return iter(obj, level);
  };
       
     const format = (example, replacer = '.', replacerCount = 4, level = 0) => {
      const formatIfValueObject = (obj) => { // checking 'value is obj' ? Yes : No
        if (typeof obj === 'object') {
          return formatObject(obj, replacer, level); // аргументы? добавил 4
        }
        return obj;
      }

       const result = example.map((item) => {
        const sign = signMap[item.type];
        const shifter = replacer.repeat((level + 1) * replacerCount - 0); // по идее должно быть -2

    if (item.type === 'PARENT') {
        return `${shifter}${replacer.repeat((level + 1) * replacerCount)}${item.key}: ${format(item.children, replacer, replacerCount, level + 1)}`;
    }

    if (item.type === 'CHANGED') {
      return [
        `${shifter}- ${item.key}: ${formatIfValueObject(item.oldValue, replacer, replacerCount, level)}`,
        `${shifter}+ ${item.key}: ${formatIfValueObject(item.value, replacer, replacerCount, level)}`,
      ].join('\n');
    }
    
    if (item.type === 'DELETED') {
      return [
        `${shifter}- ${item.key}: ${formatIfValueObject(item.oldValue, replacer, replacerCount, level)}`,
      ].join('\n');
    }

   return `${shifter}${sign} ${item.key}: ${formatIfValueObject(item.value, replacer, replacerCount, level)}`;
  });

  return [
    '{',
    ...result,
    `${replacer.repeat((level + 1) * replacerCount - 2)}}`

    ].join('\n');
  };

console.log(format(data));
// format(data);
