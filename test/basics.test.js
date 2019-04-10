/**
 * @jest-environment node
 */

import mapSort from '../source/index';

test('basics', () => {
	const array = ['40', '186', '2.4', '.47'];
	const result = mapSort(
		array,
		string => parseFloat(string),
		(first, second) => first - second
	);
	expect(result)
	.toEqual(['.47', '2.4', '40', '186']);
});