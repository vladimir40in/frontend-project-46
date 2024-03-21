const myStringify = (value, replacer = ' ', spacesCount = 1, nestingLevel = 1) => {
 
  let result = '';
  Object.entries(value).forEach(([key, nestiValue]) => {
    result += `\n${replacer.repeat(spacesCount
    * nestingLevel)}${key}: ${myStringify(nestiValue, replacer, spacesCount, nestingLevel + 1)}`;
  });
  return `{${result}\n${replacer.repeat(spacesCount
  * (nestingLevel - 1))}}`;
};

export default myStringify;
