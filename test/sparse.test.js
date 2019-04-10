/**
 * @jest-environment node
 */

import mapSort from '../source/index';

function identity(input) {
	return input;
}
test('sparse-array', () => {
	const array = [];
	array[0] = 0x6A;
	array[8] = 0xEF;
	array[10] = 0x8E;
	array[12] = 0x78;
	const actualResult = mapSort(
		array,
		identity,
		(first, second) => first - second
	);
	const expectedResult = [0x6A, 0x78, 0x8E, 0xEF];
	expectedResult.length = 13;
	expect(actualResult).toEqual(expectedResult);
});