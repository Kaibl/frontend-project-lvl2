const makeSpace = (depth) => ' '.repeat(4 * depth - 2);

const stringify = (data, depth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) { return null; }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${makeSpace(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${makeSpace(depth)}  }`,
  ].join('\n');
};

const stylish = (tree) => {
  const mutTree = (data, depth) => data.map((val) => {
    const makeString = (value, sign) => `${makeSpace(depth)}${sign} ${val.key}: ${stringify(value, depth)}\n`;

    switch (val.type) {
      case 'plus':
        return makeString(val.val, '+');
      case 'minus':
        return makeString(val.val, '-');
      case 'both':
        return `${makeString(val.val1, '-')}${makeString(val.val2, '+')}`;
      case 'same':
        return makeString(val.val, ' ');
      case 'recursion':
        return `${makeSpace(depth)}  ${val.key}: {\n${mutTree(val.children, depth + 1).join('')}${makeSpace(depth)}  }\n`;
      default:
        throw new Error(`type not supported: ${val.type}`);
    }
  });
  return `{\n${mutTree(tree, 1).join('')}}`;
};

export default stylish;
