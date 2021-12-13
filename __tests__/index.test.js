import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = readFile('result.txt');

  expect(genDiff(file1, file2)).toBe(result);
});

test('YML', () => {
  const file1Y = getFixturePath('file1.yml');
  const file2Y = getFixturePath('file2.yml');
  const result = readFile('result.txt');

  expect(genDiff(file1Y, file2Y)).toBe(result);
});

test('stylish', () => {
  const file1X = getFixturePath('file21.json');
  const file2X = getFixturePath('file22.json');
  const result = readFile('result2.txt');

  expect(genDiff(file1X, file2X)).toBe(result);
});
