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
declare function mapSort<T, S>(
	list: ArrayLike<T>,
	mapCallback: (value: T, index: number, array: ArrayLike<T>) => S,
	compareFunction?: (a: S, b: S) => number
): Array<T>;
// The type of the third argument of the map callback could be more specific. The input list is always array-like, but
// it will commonly be an actual array. Therefore, so will the third argument passed to the map callback. That argument
// could be typed as an actual array in those cases, either by creating yet another generic type which
// "extends ArrayLike<T>" or by creating two overloads: one with "T[]" in both places and one with "ArrayLike<T>" in
// both places. But perhaps that is a lot of added complexity for next to no gain.

export default mapSort;