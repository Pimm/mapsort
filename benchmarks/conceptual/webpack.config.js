const path = require('path');
module.exports = {
	"mode": "production",
	"entry": "./benchmarks/conceptual/source/index.js",
	"output": {
		"path": path.join(__dirname, 'compiled'),
		"filename": "index.js"
	}
};