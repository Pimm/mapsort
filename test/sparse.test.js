/**
 * @jest-environment node
 */

import mapSort from './implementation';

function identity(input) {
	return input;
}
test('sparse-array', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether sparse arrays are handled properly. [].sort
	// puts the undefined values at the end, and therefore so should mapSort.
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
test('sparse-array-after-map', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether arrays which are sparse after the map
	// operation are handled properly as well.
	const array = [
		{ value: 0x6A },
		{}, {},
		{}, {},
		{}, {},
		{},
		{ value: 0xEF },
		{},
		{ value: 0x8E },
		{},
		{ value: 0x78 }
	];
	const actualResult = mapSort(
		array,
		object => object.value,
		(first, second) => first - second
	);
	const expectedResult = [
		{ value: 0x6A },
		{ value: 0x78 },
		{ value: 0x8E },
		{ value: 0xEF },
		{}, {},
		{}, {},
		{}, {},
		{}, {},
		{}
	];
	expect(actualResult).toEqual(expectedResult);
});
test('sparse-array-before-and-after-map', () => {
	// This tests whether mapSort also obeys both rules mentioned above simultaneously.
	const array = [];
	array[0] = { value: 0x6A };
	array[6] = {};
	array[14] = { value: 0x78 };
	array[19] = {};
	const actualResult = mapSort(
		array,
		object => object.value,
		(first, second) => first - second
	);
	const expectedResult = [
		{ value: 0x6A },
		{ value: 0x78 },
		{}, {}
	];
	expectedResult.length = 20;
	expect(actualResult).toEqual(expectedResult);
});