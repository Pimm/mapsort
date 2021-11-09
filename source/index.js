import defaultCompareFunction from './defaultCompareFunction';

// Steal the forEach function from this empty array.
const { forEach } = [];
/**
 * Sorts the elements of the passed list and returns a new, sorted array. The elements are first mapped to a version
 * which is ideal for sorting before the original elements are ultimately sorted. Doing this in two steps reduces the
 * overall overhead.
 *
 * The second argument is the map callback: a function which is called for every element in the original list, and
 * returns a version of each element ideal for sorting.
 *
 * The third argument is the compare function: an optional function which defines the correct order of the elements.
 * This function receives the versions ideal for sorting returned by the map callback. If omitted, the versions ideal
 * for sorting returned by the map callback are converted to strings and the elements are sorted according to the
 * Unicode code point values of the characters of those converted "sortable" values.
 *
 * Elements for which the map callback returns `undefined` are sorted to the end of the resulting array (and the
 * compare function is not called for them).
 *
 * #### On the compare function
 *
 * If a compare function is passed, given values a and b are passed to it, it must:
 *
 *   * return a negative number if a comes before b;
 *   * return a positive number if b comes before a; or
 *   * return `0` if they are equal.
 *
 * If the compare function returns `0` for two elements, they will probably appear in the same order in the resulting
 * array as they do in the original list.
 *
 * The compare function must always return the same value when a given pair of arguments is passed. If inconsistent
 * results are returned, then the sort order is undefined.
 *
 * #### On the map callback
 *
 * The map callback is called in the same way as `[].map` would: it is called once for every element and that
 * element is passed as the first argument, the index that element has in the original list is passed as the second,
 * and the original list itself is passed as the third and final argument.
 *
 * For those familiar with Python: the map callback is conceptually similar to the key function you can pass to `sort`
 * or `sorted`.
 */
export default function mapSort(list, mapCallback, compareFunction) {
	// Ensure the map callback is a function. [1]
	if ('function' != typeof mapCallback) {
		// throw new TypeError(`${mapCallback} is not a function`);
		//   ↓ (We are compiling this code with Babel, and our current configuration compiles the above into something
		//     overly complex.)
		throw new TypeError(mapCallback + ' is not a function');
	}
	// Create an array which will contain the indexes (or "indices") of the items in the list.
	const indexes = [];
	// Create an array which will contain the "sortable" values
	const sortables = [];
	// Iterate over the items in the list, filling the two arrays (and filling the tail if any "sortable" value is
	// undefined).
	const tail = [];
	var sortable;
	forEach.call(list, (item, index, listAsObject) => {
		// Call the map callback to obtain the "sortable" value. [2]
		sortable = mapCallback(item, index, listAsObject);
		// If the "sortable" value is undefined, exclude this item from sorting and add it to the tail. undefined items
		// shall appear at the end of the resulting array. [3]
		if (undefined === sortable) {
			tail.push(item);
			return;
		}
		// If the default compare function will be used, ensure the "sortable" value is not a symbol. That function does
		// not accept symbol values. [4] (This would not work if Symbol is polyfilled. However, Symbol is widely supported
		// and trying to sort a symbol is an edge case anyway. This shouldn't cause any real-world issues.)
		if (undefined === compareFunction && 'symbol' == typeof sortable) {
			throw new TypeError(`Can't convert symbol to string`);
		}
		// Push the index to the array of indexes.
		indexes.push(index);
		// Add the "sortable" value to the array.
		sortables[index] = sortable;
	});
	// If no compare function was passed, use this default function. This mimics the behaviour of Array.prototype.sort
	// with no compare function.
	if (undefined === compareFunction) {
		compareFunction = defaultCompareFunction;
	}
	// Sort the indexes by looking up and comparing the "sortable" values associated with those indexes.
	indexes.sort((firstIndex, secondIndex) => compareFunction(sortables[firstIndex], sortables[secondIndex]));
	//   ↓ We could guarantee stability by changing this line:
	// indexes.sort((firstIndex, secondIndex) => compareFunction(sortables[firstIndex], sortables[secondIndex]) || (firstIndex - secondIndex));
	// The indexes in the indexes array are now in the correct order. Create a new array which contains the original
	// values, but in that correct order, followed by the tail.
	// const result = [...indexes.map(index => list[index]), ...tail];
	//   ↓ (The line above is replaced by this line below for engines which don't support the spread syntax.)
	const result = indexes.map(index => list[index]).concat(tail);
	// In case the passed list is sparse ‒ meaning it does not have a value for every index in [0…length) ‒ the result
	// array should include "room" for those missing values.
	if (result.length != list.length) {
		result.length = list.length;
	}
	return result;
}
// This implementation uses two temporary arrays, one which contains the indexes and one which contains "sortable"
// values.
//
// Imagine we have this array as input:
//   [{number: 0xC6}, {number: 0x7B}, {number: 0xD5}]
// and this map callback:
//   object => object.number
// and this compare function:
//   (first, second) => first - second
//
// This implementation sorts that input array in three steps. The first step is to create and fill the two temporary
// arrays.
// The array of indexes will be:
//   [0, 1, 2]
// The array of "sortable" values will be:
//   [0xC6, 0x7B, 0xD5]
//
// As the second step, the array of indexes is sorted (in-place) to represent correct order.
// The array of indexes becomes:
//   [1, 0, 2]
// (because 0x7B < 0xC6 < 0xD5).
//
// Finally, the resulting array is created and filled according to the order defined by the array of indexes:
//   [{number: 0x7B}, {number: 0xC6}, {number: 0xD5}]
//
// This implementation is designed to mimic [].map and [].sort as defined in ECMAScript 2015.
//
// [1] See the spec for Array.prototype.map:
//     4. If IsCallable(callbackfn) is false, throw a TypeError exception.
// [2] See the spec for Array.prototype.map:
//    10. d. iii. Let mappedValue be Call(callbackfn, T, «kValue, k, O»).
// [3] See the spec for SortCompare:
//     2. If x is undefined, return 1.
//     3. If y is undefined, return −1.
// [4] See the spec for SortCompare:
//     5. Let xString be ToString(x).
//     6. ReturnIfAbrupt(xString).
//     7. Let yString be ToString(y).
//     8. ReturnIfAbrupt(yString).