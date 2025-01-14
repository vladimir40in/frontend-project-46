import plainForm from './plain.js';
import stylishForm from './stylish.js';

const formatters = {
  plain: plainForm,
  stylish: stylishForm,
  json: (data) => JSON.stringify(data, null, 2),
};

const getFormatter = (formatName = 'stylish') => formatters[formatName]
|| formatters.stylish;

export default getFormatter;
