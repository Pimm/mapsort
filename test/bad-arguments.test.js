/**
 * @jest-environment node
 */

import mapSort from './implementation';

function identity(input) {
	return input;
}
test('bad-arguments', () => {
	// This tests whether passing something other than a function as map callback throws an error (as [].map would).
	expect(() => {
		mapSort(
			[],
			'not a function'
		);
	}).toThrow();
	// This tests whether passing something other than a function or undefined as compare function throws an error (as
	// [].sort would).
	expect(() => {
		mapSort(
			[],
			identity,
			'not a function'
		);
	}).toThrow();
});