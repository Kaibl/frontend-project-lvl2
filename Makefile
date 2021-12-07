lint:
	npx eslint .

install:
	npm ci

gen: 
	gendiff __fixtures__/file1.json __fixtures__/file2.json