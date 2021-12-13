import stylish from './stylish.js';

const formater = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};

export default formater;
