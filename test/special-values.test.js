/**
 * @jest-environment node
 */

import mapSort from './implementation';

function identity(input) {
	return input;
}
test('special-values-without-compare-function', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether special values are put in the same order as
	// they would be put by [].sort.
	const array = ['a', undefined, null, {}, [], true, false, 'b'];
	const actualResult = mapSort(
		array,
		identity
	);
	expect(actualResult)
	.toEqual([...array].sort());
});
test('special-values-with-compare-function', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether ‒ just like with [].sort ‒ undefined values
	// are not passed to the compare function but placed at the end instead.
	const array = ['40', '186', '2.4', undefined, '.47'];
	const actualResult = mapSort(
		array,
		string => {
			if (undefined === string) {
				return string;
			}
			return parseFloat(string);
		},
		(first, second) => {
			return first - second;
		}
	);
	expect(actualResult)
	.toEqual(['.47', '2.4', '40', '186', undefined]);
});
test('symbols-without-compare-function', () => {
	// mapSort is designed to mimic [].sort (and [].map). This tests whether, if no compare function is passed, symbol
	// values in the array cause an error to be thrown just like with [].sort.
	const array = [Symbol(), Symbol()];
	expect(() => {
		mapSort(
			array,
			identity
		);
	}).toThrow();
});