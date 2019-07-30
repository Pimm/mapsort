# Sort stability

[`[].sort`][mdn-sort] is probably stable. And as `mapsort` leans on `[].sort`, `mapsort` is probably stable.

"Stable" means that two elements which compare equal will always remain in their original order.

"Probably", because it is in Firefox 3+, Chrome 70+, and Node.js 12+. "Probably", because the [10th edition of ECMAScript][ecmascript-10] (2019) specifies that it is.

## Guaranteed stability

If "probably" is not certain enough ‒ if your use-case requires a 100% guarantee ‒ this library can help. Store the index of each element and compare indexes in case two elements are otherwise equal:

```javascript
const sortedArray = mapSort(
	[
		{ name: 'Choco', rating: 14 },
		{ name: 'Daisy', rating: 12 },
		{ name: 'Ghost', rating: 14 }
	],
	(dog, index) => ({
		rating: dog.rating,
		originalIndex: index
	}),
	(a, b) => {
		// If the ratings are not equal, sort by rating.
		if (a.rating != b.rating) {
			return a.rating - b.rating;
		// If the ratings are equal, sort by the index at which
		// they originally appear.
		} else /* if (a.rating == b.rating) */ {
			return a.originalIndex - b.originalIndex;
		}
	}
);
```


[mdn-sort]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[ecmascript-10]: https://www.ecma-international.org/ecma-262/10.0/#sec-array.prototype.sort