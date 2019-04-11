/**
 * @jest-environment node
 */

import mapSort from '../source/index';

test('map', () => {
	const array = [0x21, 0xCD, 0xF8, 0x95];
	const actualMapArguments = [];
	mapSort(
		array,
		function(number) {
			actualMapArguments.push([...arguments]);
			return number;
		},
		(first, second) => first - second
	);
	const expectedMapArguments = [];
	[...array].map(function(number) {
		expectedMapArguments.push([...arguments]);
		return number;
	});
	expect(actualMapArguments)
	.toEqual(expectedMapArguments);
});