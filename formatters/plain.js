const formatValue = (value) => { // значение в строку
  if (typeof value === 'object' && value !== null) {
      return '[complex value]'; // 1
  }
  if (typeof value === 'string') {
      return `'${value}'`; // 2
  } // 3
  return String(value); //  встр объект-конструктор ... (включая обработку null и undefined)
}

export const plainForm = (comparison, parent = '') => {

  return comparison.map((item) => {
      const propertyName = parent ? `${parent}.${item.key}` : item.key;
      switch (item.type) {
          case 'PARENT': // если Парент, рекурс
              return plainForm(item.children, propertyName);
          case 'CHANGED':
              return `Property '${propertyName}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.value)}`;
          case 'ADDED':
              return `Property '${propertyName}' was added with value: ${formatValue(item.value)}`;
          case 'DELETED':
              let hasOtherChanges = false; // есть ли OtherChanges для key
              for (let otherItem of comparison) { // наличия др изменений того же ключа
                  if (otherItem.key === item.key && otherItem.type !== 'DELETED') {
                      hasOtherChanges = true;
                      break;
                  }
              }
              if (!hasOtherChanges) {
                  return `Property '${propertyName}' was removed`;
              }
              return '';
          default:
              return '';
      }
  }).filter(Boolean).join('\n'); // удаление пуст стр из масс (Boolean('') возвр-т false)
};
