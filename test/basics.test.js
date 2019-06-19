/**
 * @jest-environment node
 */

import mapSort from './implementation';

test('basics-parse-float', () => {
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
test('basics-to-lower-case', () => {
	// This tests another basic use case: an array of mixed-case strings and one duplicate.
	const array = ['Jamaica', 'AUSTRALIA', 'italy', 'bRaZiL', 'AUSTRALIA'];
	const actualResult = mapSort(
		array,
		string => string.toLowerCase(),
	);
	expect(actualResult)
	.toEqual(['AUSTRALIA', 'AUSTRALIA', 'bRaZiL', 'italy', 'Jamaica']);
});