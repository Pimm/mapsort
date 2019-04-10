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
		// Call the map callback to obtain the "sortable" value, and push it to the array of "sortable" values. [3]
		sortables.push(mapCallback.call(undefined, item, index, listAsObject));
	});
	// If no compare function was passed, use this default function, which causes Array.prototype.sort to apply its
	// default behaviour.
	if (undefined === compareFunction) {
		compareFunction = defaultCompareFunction;
	}
	// Sort the indexes by looking up and comparing the "sortable" values associated with those indexes.
	indexes.sort((firstIndex, secondIndex) => compareFunction(sortables[firstIndex], sortables[secondIndex]));
	// The indexes array is now in the correct order. Create a new array which contains the original values, but in that
	// correct order. This array is the result.
	return indexes.map(index => list[index]);
}

// The implementation above is designed to mimic Array.prototype.map as defined in ECMAScript 2015.
//
//  1. The spec defines:
//     4. If IsCallable(callbackfn) is false, throw a TypeError exception.
//  2. The spec defines:
//     1. Let O be ToObject(this value).
//  3. The spec defines:
//    10. d. iii. Let mappedValue be Call(callbackfn, T, «kValue, k, O»).