/**
 * @jest-environment node
 */

import mapSort from './implementation';

test('bad-arguments', () => {
	// This tests whether passing something other than a function as map callback throws an error (as [].map would).
	expect(() => {
		mapSort(
			[],
			'not a function'
		);
	}).toThrow();
});