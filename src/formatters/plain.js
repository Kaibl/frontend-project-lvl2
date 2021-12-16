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
const typeArr = {
  plus: function getAdd(way, data) { return `Property '${way}' was added with value: ${comVal(data.val)}`; },
  minus: function getRemove(way) { return `Property '${way}' was removed`; },
  both: function getUpdate(way, data) { return `Property '${way}' was updated. From ${comVal(data.val1)} to ${comVal(data.val2)}`; },
};

const plain = (tree) => {
  const makePlain = (data, parent = '') => data
    .filter((val) => val.type !== 'same')
    .map((val) => {
      const way = parent ? `${parent}.${val.key}` : val.key;

      if (val.type === 'recursion') {
        return makePlain(val.children, way);
      }

      return typeArr[val.type](way, val);
    }).join('\n');

  return makePlain(tree);
};

export default plain;
