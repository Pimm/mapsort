/**
 * @jest-environment node
 */

import mapSort from '..';

test('basics', () => {
	// This tests a basic use case: an array of numbers which are represented as strings.
	const array = ['40', '186', '2.4', '.47'];
	const actualResult = mapSort(
		array,
		string => parseFloat(string),
		(first, second) => first - second
	);
	expect(actualResult)
	.toEqual(['.47', '2.4', '40', '186']);
});