/**
 * @jest-environment node
 */

import mapSort from './implementation';

test('map', () => {
	// mapSort is designed to mimic [].map (and [].sort). This tests whether the arguments passed to the map callback are
	// the same as the ones which would have been passed if [].map was used.
	const array = [0x21, 0xCD, 0xF8, 0x95];
	const actualMapArguments = [];
	mapSort(
		array,
		function(number) {
			actualMapArguments.push([this, ...arguments]);
			return number;
		},
		(first, second) => first - second
	);
	const expectedMapArguments = [];
	array.map(function(number) {
		expectedMapArguments.push([this, ...arguments]);
		return number;
	});
	expect(actualMapArguments)
	.toEqual(expectedMapArguments);
});