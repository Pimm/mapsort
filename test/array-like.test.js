/**
 * @jest-environment node
 */

import mapSort from './implementation';

function identity(input) {
	return input;
}
test('array-like', () => {
	// This tests whether the implementation handles array-like objects well.
	const list = {
		length: 0
	};
	[].push.call(list, 'd', 'c', 'f');
	const actualResult = mapSort(
		list,
		identity
	);
	expect(actualResult)
	.toEqual(['c', 'd', 'f']);
});