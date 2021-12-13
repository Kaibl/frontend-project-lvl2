lint:
	npx eslint .

install:
	npm ci

gen: 
	gendiff __fixtures__/file1.json __fixtures__/file2.json

gen2: 
	gendiff __fixtures__/file21.json __fixtures__/file22.json stylish
test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8