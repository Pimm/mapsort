const path = require('path');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

const packageConfiguration = require('./package.json');

const input = 'source/index.js';
const plugins = [
	babel(),
	minify({ comments: false })
];
export default [
	{
		input,
		output: {
			format: 'esm',
			file: path.join('compiled', 'esm', `${packageConfiguration.name}.min.js`)
		},
		plugins
	},
	{
		input,
		output: {
			format: 'cjs',
			file: path.join('compiled', 'cjs', `${packageConfiguration.name}.min.js`)
		},
		plugins
	},
	{
		input,
		output: {
			format: 'iife',
			file: path.join('compiled', 'iife', `${packageConfiguration.name}.min.js`),
			name: 'mapSort'
		},
		plugins
	}
];