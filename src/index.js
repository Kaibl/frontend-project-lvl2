import fs from 'fs';
import path from 'path';
import parse from './parses.js';
import buildTree from './buildTree.js';
import formater from './formatters/format.js';

const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (fileOne, fileTwo, format) => {
  const fileOneFormat = extractFormat(fileOne);
  const fileTwoFormat = extractFormat(fileTwo);
  const fileOneContent = readFile(fileOne);
  const fileTwoContent = readFile(fileTwo);
  const data1 = parse(fileOneFormat, fileOneContent);
  const data2 = parse(fileTwoFormat, fileTwoContent);
  const answ = buildTree(data1, data2);
  return formater(answ, format);
};

export default genDiff;
