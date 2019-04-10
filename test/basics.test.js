/**
 * @jest-environment node
 */

import mapSort from '../source/index';

test('basics', () => {
	const array = ['40', '186', '2.4', '.47'];
	const actualResult = mapSort(
		array,
		string => parseFloat(string),
		(first, second) => first - second
	);
	expect(actualResult)
	.toEqual(['.47', '2.4', '40', '186']);
});