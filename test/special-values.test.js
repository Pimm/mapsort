/**
 * @jest-environment node
 */

import mapSort from '../source/index';

function identity(input) {
	return input;
}
test('special-values-without-compare-function', () => {
	const array = ['a', undefined, null, {}, [], true, false, 'b'];
	const actualResult = mapSort(
		array,
		identity
	);
	expect(actualResult)
	.toEqual([...array].sort());
});
test('special-values-with-compare-function', () => {
	const array = ['40', '186', '2.4', null, undefined, '.47'];
	const actualResult = mapSort(
		array,
		string => {
			if (undefined === string || null === string) {
				return string;
			}
			return parseFloat(string);
		},
		(first, second) => {
			return first - second;
		}
	);
	expect(actualResult)
	.toEqual([null, '.47', '2.4', '40', '186', undefined]);
});
test('symbols-without-compare-function', () => {
	const array = [Symbol(), Symbol()];
	expect(() => {
		mapSort(
			array,
			identity
		);
	}).toThrow();
});