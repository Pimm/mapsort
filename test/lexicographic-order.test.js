/**
 * @jest-environment node
 */

import mapSort from './implementation';

function identity(input) {
	return input;
}
test('lexicographic-order', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether strings are put in the same order as they
	// would be put by [].sort.
	const array = ['', 'a', '0', '♥', 'A', '💜', 'x', '🐻‍❄️', '1', 'X', '🧩', ' ', 'Aa', 'Aar'];
	const actualResult = mapSort(
		array,
		identity
	);
	expect(actualResult)
	.toEqual([...array].sort());
});