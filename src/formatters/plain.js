const comVal = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return null;
  }
  return String(value);
};

const getAdd = (way, data) => `Property '${way}' was added with value: ${comVal(data.val)}`;
const getRemove = (way) => `Property '${way}' was removed`;
const getUpdate = (way, data) => `Property '${way}' was updated. From ${comVal(data.val1)} to ${comVal(data.val2)}`;

const plain = (tree) => {
  const makePlain = (data, parent = '') => data
    .filter((val) => val.type !== 'same')
    .map((val) => {
      const way = parent ? `${parent}.${val.key}` : val.key;

      const typeArr = {
        plus: getAdd(way, val),
        minus: getRemove(way),
        both: getUpdate(way, val),
      };

      if (val.type === 'recursion') {
        return makePlain(val.children, way);
      }
      return typeArr[val.type];
    }).join('\n');

  return makePlain(tree);
};

export default plain;
