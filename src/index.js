import fs from 'fs';
import path from 'path';
import parse from './parses.js';
import buildTree from './buildTree.js';

const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (fileOne, fileTwo) => {
  const fileOneFormat = extractFormat(fileOne);
  const fileTwoFormat = extractFormat(fileTwo);
  const fileOneContent = readFile(fileOne);
  const fileTwoContent = readFile(fileTwo);
  const data1 = parse(fileOneFormat, fileOneContent);
  const data2 = parse(fileTwoFormat, fileTwoContent);
  const answ = buildTree(data1, data2);
  return answ;
};

export default genDiff;
