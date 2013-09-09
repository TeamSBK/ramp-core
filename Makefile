test:
	browserify -r ./public/model-admin/ModelObject ./public/entry.js -o ./public/model-admin.js
	open ./public/sample.html
