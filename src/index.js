import { readFileSync } from 'fs';
import path from 'path';


const readJSON = (file) => {
  const readFile = readFileSync(path.resolve(file), 'utf-8');
  const parseFile = JSON.parse(readFile);
  return parseFile;
};

const genDiff = (firstObj, secondObj) => {
  const file1 = readJSON(firstObj);
  const file2 = readJSON(secondObj);
  const firstObjKeys = Object.keys(file1);
  const secondObjKeys = Object.keys(file2);
  const combinedObj = { ...file1, ...file2 };
  const combinedObjEntries = Object.entries(combinedObj).sort();
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of combinedObjEntries) {
    if (firstObjKeys.includes(key) && secondObjKeys.includes(key) && file1[key] === value) {
      result[` ${key}`] = file1[key];
    } else if (!firstObjKeys.includes(key)) {
      result[`+ ${key}`] = file2[key];
    } else if (firstObjKeys.includes(key) && secondObjKeys.includes(key) && file1[key] !== value) {
      result[`- ${key}`] = file1[key];
      result[`+ ${key}`] = file2[key];
    } else if (firstObjKeys.includes(key) && !secondObjKeys.includes(key)) {
      result[`- ${key}`] = file1[key];
    }
  }
  const toString = JSON.stringify(result, null, '   ');
  return toString.replace(/["']/g, '');
};
export default genDiff;

