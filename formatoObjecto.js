
const formatObject = (obj, space = '  ', level = 0) => { 
  const iter = (current, depth) => {
  if (typeof current !== 'object' || current === null) {
return current;
  }

  const lines = Object.entries(current)
    .map(([key, val]) => `${space.repeat(depth + 1)}${key}: ${iter(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${space.repeat(depth)}}`,
  ].join('\n');
};

return iter(obj, level);
};


  const obj = {
    a: {
        b: {
            c: 1,
            d: 2
        },
        e: 3
    },
    f: 4
};
// formatObject(obj);
console.log(formatObject(obj));
// const myStringify = (value, replacer = ' ', spacesCount = 1, nestingLevel = 1) => {
 
//   let result = '';
//   Object.entries(value).forEach(([key, nestiValue]) => {
//     result += `\n${replacer.repeat(spacesCount
//     * nestingLevel)}${key}: ${myStringify(nestiValue, replacer, spacesCount, nestingLevel + 1)}`;
//   });
//   return `{${result}\n${replacer.repeat(spacesCount
//   * (nestingLevel - 1))}}`;
// };