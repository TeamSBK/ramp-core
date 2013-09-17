run:
	node index.js

move:
	rm ./public/model-admin.js
	mv ./node_modules/model-admin/model-admin.js ./public/model-admin.js
