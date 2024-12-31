const formatValue = (value) => { // значение в строку
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'; // 1
  }
  if (typeof value === 'string') {
    return `'${value}'`; // 2
  } // 3
  return String(value); //  встр объект-конструктор ... (включая обработку null и undefined)
};

const plainForm = (comparison, parent = '') => comparison.map((item) => {
  const propertyName = parent ? `${parent}.${item.key}` : item.key;
  switch (item.type) {
    case 'PARENT': // если Парент, рекурс
      return plainForm(item.children, propertyName);
    case 'CHANGED':
      return `Property '${propertyName}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.value)}`;
    case 'ADDED':
      return `Property '${propertyName}' was added with value: ${formatValue(item.value)}`;
    case 'DELETED': {
      const hasOtherChanges = comparison.some((otherItem) => otherItem.key === item.key && otherItem.type !== 'DELETED');

      if (!hasOtherChanges) {
        return `Property '${propertyName}' was removed`;
      }
      return '';
    }
    default:
      return '';
  }
}).filter(Boolean).join('\n');

export default plainForm;
