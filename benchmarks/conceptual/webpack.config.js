const path = require('path');
module.exports = {
	"mode": "development",
	"entry": "./benchmarks/conceptual/source/index.js",
	"output": {
		"path": path.join(__dirname, 'compiled'),
		"filename": "index.js"
	}
};