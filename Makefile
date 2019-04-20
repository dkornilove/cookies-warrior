start:
	npm run babel-node -- src/bin/game.js
lint:
	npx eslint .
fix:
	npx eslint . --fix
publish:
	npm publish
install: 
	npm install		