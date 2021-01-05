/**
 * This is the function which can be passed to Array.prototype.sort to make it behave as if no function had been
 * passed. It returns the lexicographic order of the passed two elements.
 *
 * This function mimics 5 through 11 of SortCompare as defined in ECMAScript 2015.
 */
export default function defaultCompareFunction(first, second) {
	const firstAsString = String(first);
	const secondAsString = String(second);
	if (firstAsString < secondAsString) {
		return -1;
	} else if (firstAsString == secondAsString) {
		return 0;
	} else /* if (firstAsString > secondAsString) */ {
		return 1;
	}
}