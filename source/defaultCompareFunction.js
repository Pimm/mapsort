/**
 * This is the function which can be passed to Array.prototype.sort to make it behave as if no function had been
 * passed.
 *
 * SortCompare (as used by Array.prototype.sort) is defined in ECMAScript 2015 as follows:
 *    1. If x and y are both undefined, return +0.
 *    2. If x is undefined, return 1.
 *    3. If y is undefined, return −1.
 *    4. If the argument comparefn is not undefined, then
 *       a. Let v be ToNumber(Call(comparefn, undefined, «x, y»)).
 *       b. ReturnIfAbrupt(v).
 *       c. If v is NaN, return +0.
 *       b. Return v.
 *    5. Let xString be ToString(x).
 *    6. ReturnIfAbrupt(xString).
 *    7. Let yString be ToString(y).
 *    8. ReturnIfAbrupt(yString).
 *    9. If xString < yString, return −1.
 *   10. If xString > yString, return 1.
 *   11. Return +0.
 *
 * This function will be used as the "comparefn" above, so it essentially mimics 5 through 11.
 */
export default function defaultCompareFunction(first, second) {
	// 5. Let xString be ToString(x).
	const firstAsString = String(first);
	// 7. Let yString be ToString(y).
	const secondAsString = String(second);
	// 9. If xString < yString, return −1.
	if (firstAsString < secondAsString) {
		return -1;
	// 10. If xString > yString, return 1.
	} else if (firstAsString > secondAsString) {
		return 1;
	// 11. Return +0.
	} else /* if (firstAsString == secondAsString) */ {
		return 0;
	}
}