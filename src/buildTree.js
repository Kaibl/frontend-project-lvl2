import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  const answer = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return `   + ${key}: ${value2}`;
    }
    if (!_.has(data2, key)) {
      return `   - ${key}: ${value1}`;
    }
    if (_.has(data1, key) && _.has(data2, key) && value1 !== value2) {
      return `   - ${key}: ${value1}${'\n'}   + ${key}: ${value2}`;
    }
    return `     ${key}: ${value1}`;
  }).join('\n');
  return `{${'\n'}${answer}${'\n'}}`;
};

export default buildTree;
