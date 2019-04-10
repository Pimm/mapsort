import defaultCompareFunction from './defaultCompareFunction';

const { forEach } = [];

export default function mapSort(list, mapCallback, compareFunction) {
	// Ensure the map callback is a function. [1]
	if ('function' !== typeof mapCallback) {
		throw new TypeError(callback + ' is not a function');
	}
	// Create an array which will contain the indexes of the items in the list.
	const indexes = [];
	// Create an array which will contain the "sortable" values
	const sortables = [];
	// Convert the passed list to an object. [2]
	const listAsObject = Object(list);
	// Iterate over the items in the list, filling the two arrays.
	forEach.call(listAsObject, (item, index) => {
		// Push the index to the array of indexes.
		indexes.push(index);
		// Call the map callback to obtain the "sortable" value, and add it to the array of "sortable" values. [3]
		sortables[index] = mapCallback.call(undefined, item, index, listAsObject);
	});
	// If no compare function was passed, use this default function, which causes Array.prototype.sort to apply its
	// default behaviour.
	if (undefined === compareFunction) {
		compareFunction = defaultCompareFunction;
	}
	// Sort the indexes by looking up and comparing the "sortable" values associated with those indexes.
	indexes.sort((firstIndex, secondIndex) => compareFunction(sortables[firstIndex], sortables[secondIndex]));
	// The indexes in the indexes array are now in the correct order. Create a new array which contains the original values, but
	// in that correct order.
	const result = indexes.map(index => list[index]);
	// In case the passed list is sparse ‒ meaning it does not have a value for every index in [0…length) ‒ the result array
	// should include "room" for those missing values.
	if (result.length != list.length) {
		result.length = list.length;
	}
	return result;
}

// The implementation above is designed to mimic Array.prototype.map as defined in ECMAScript 2015.
//
//  1. The spec defines:
//     4. If IsCallable(callbackfn) is false, throw a TypeError exception.
//  2. The spec defines:
//     1. Let O be ToObject(this value).
//  3. The spec defines:
//    10. d. iii. Let mappedValue be Call(callbackfn, T, «kValue, k, O»).