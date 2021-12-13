const space = (depth = 1, count = 4) => ' '.repeat(count * depth - 2);

const stringify = (data, depth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) { return null; }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${space(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${space(depth)}  }`,
  ].join('\n');
};

const stylish = (tree) => {
  const mutTree = (data, depth) => data.map((val) => {
    const getValue = (value, sign) => `${space(depth)} ${sign} ${val.key}: ${stringify(value, depth)}\n`;
    const mas = {
      plus: getValue(val.val, '+'),
      minus: getValue(val.val, '-'),
      both: `${getValue(val.val1, '-')}${getValue(val.val2, '+')}`,
      same: getValue(val.val, ' '),
    };
    if (val.type === 'recursion') {
      console.log(val);
      return `${space(depth)}  ${val.key}: {\n${mutTree(val.children, depth + 1).join('')}${space(depth)}  }\n`;
    }
    return mas[val.type];
  });
  return `{\n${mutTree(tree, 1).join('')}}`;
};

export default stylish;
