import stylish from './stylish.js';
import plain from './plain.js';

const formater = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`format not supported: ${format}`);
  }
};

export default formater;
