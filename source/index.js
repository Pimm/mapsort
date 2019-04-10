import defaultCompareFunction from './defaultCompareFunction';

// Steal the forEach function from this empty array.
const { forEach } = [];
/**
 * Sorts the passed list based on mapped values.
 *
 * Note that contrary to how sorting usually works in JavaScript, the passed array is not sorted in-place. A new,
 * sorted, array is returned and the list which is passed remains unaltered.
 */
export default function mapSort(list, mapCallback, compareFunction) {
	// Ensure the map callback is a function. [1]
	if ('function' !== typeof mapCallback) {
		throw new TypeError(`${mapCallback} is not a function`);
	}
	// Create an array which will contain the indexes of the items in the list.
	const indexes = [];
	// Create an array which will contain the "sortable" values
	const sortables = [];
	// Convert the passed list to an object. [2]
	const listAsObject = Object(list);
	// Iterate over the items in the list, filling the two arrays.
	const tail = [];
	var sortable;
	forEach.call(listAsObject, (item, index) => {
		// Call the map callback to obtain the "sortable" value. [3]
		sortable = mapCallback.call(undefined, item, index, listAsObject);
		// If the "sortable" value is undefined, exclude this item from sorting and add it to the tail. undefined items shall
		// appear at the end of the resulting array. [4]
		if (undefined === sortable) {
			tail.push(item);
			return;
		}
		// If the default compare function will be used, ensure the "sortable" value is not a symbol. That function does
		// not accept symbol values. [5]
		if (undefined === compareFunction && 'symbol' === typeof sortable) {
			throw new TypeError(`Can't convert symbol to string`);
		}
		// Push the index to the array of indexes.
		indexes.push(index);
		// Add the "sortable" value to the array.
		sortables[index] = sortable;
	});
	// If no compare function was passed, use this default function, which causes Array.prototype.sort to apply its
	// default behaviour.
	if (undefined === compareFunction) {
		compareFunction = defaultCompareFunction;
	}
	// Sort the indexes by looking up and comparing the "sortable" values associated with those indexes.
	indexes.sort((firstIndex, secondIndex) => compareFunction(sortables[firstIndex], sortables[secondIndex]));
	// The indexes in the indexes array are now in the correct order. Create a new array which contains the original values, but
	// in that correct order, followed by the tail.
	const result = [...indexes.map(index => list[index]), ...tail];
	// In case the passed list is sparse ‒ meaning it does not have a value for every index in [0…length) ‒ the result array
	// should include "room" for those missing values.
	if (result.length != list.length) {
		result.length = list.length;
	}
	return result;
}

// The implementation above is designed to mimic Array.prototype.map and Array.prototype.sort as defined in ECMAScript 2015.
//
// [1] See the spec for Array.prototype.map:
//     4. If IsCallable(callbackfn) is false, throw a TypeError exception.
// [2] See the spec for Array.prototype.map:
//     1. Let O be ToObject(this value).
// [3] See the spec for Array.prototype.map:
//    10. d. iii. Let mappedValue be Call(callbackfn, T, «kValue, k, O»).
// [4] See the spec for SortCompare:
//     2. If x is undefined, return 1.
//     3. If y is undefined, return −1.
// [5] See the spec for SortCompare:
//     5. Let xString be ToString(x).
//     6. ReturnIfAbrupt(xString).
//     7. Let yString be ToString(y).
//     8. ReturnIfAbrupt(yString).