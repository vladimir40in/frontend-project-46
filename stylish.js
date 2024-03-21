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

const stylish = (value, replacer = ' ', spacesCount = 1, nestingLevel = 1) => {
  let result = '';

    if (child.type === 'ADDED') {
    stylish[item.key][key]['+'] = child.value;
  } else if (child.type === 'DELETED') {
    stylish[item.key][key]['-'] = child.oldValue;
  } else if (child.type === 'CHANGED') {
    stylish[item.key][key]['-'] = child.oldValue;
    stylish[item.key][key]['+'] = child.value;
  } else if (child.type === 'UNCHANGED') {
    stylish[item.key][key] = child.value;
   
  )}
   
console.log('РЕЗУЛЬТАТ', stylish(data));
