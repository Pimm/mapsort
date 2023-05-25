# mapsort &middot; [![License (X11/MIT)](https://badgen.net/github/license/pimm/mapsort)](https://github.com/Pimm/mapsort/blob/master/copying.txt) [![npm version](https://badgen.net/npm/v/mapsort)](https://www.npmjs.com/package/mapsort) [![Test status](https://github.com/Pimm/mapsort/actions/workflows/test.yaml/badge.svg)](https://github.com/Pimm/mapsort/actions/workflows/test.yaml) [![Coverage status](https://coveralls.io/repos/github/Pimm/mapsort/badge.svg?branch=master)](https://coveralls.io/github/Pimm/mapsort?branch=master)

Performant sorting for complex input.

## Preface

**You do not need this library unless you are having performance issues.** `mapsort` does not add any functionality not present in plain JavaScript. Rather, it greatly improves your performance in case:

* sorting is your bottleneck, and
* the elements in your arrays require expensive preprocessing before their correct order can be determined.

# Concept

Imagine we are sorting this array of numbers, represented as strings:
```javascript
['12.4', '1.62', '3.35']
```
Sorting them with no compare function would place `'12.4'` before `'3.35'`, so we need such a function:
```javascript
['12.4', '1.62', '3.35'].sort((a, b) => parseFloat(a) - parseFloat(b));
```
This works!

The only drawback is that `parseFloat` is called twice every time our compare function is used, resulting in 6 `parseFloat` calls in this example (4 if the original order were optimal).

A dozen `parseFloat` calls is fine. However, next time we might be sorting names. _Lucia Ávila_ would like to appear amidst the other **A**s, and we have to correctly handle [diacritics](https://en.wikipedia.org/wiki/Diacritic). _Amelie de Wit_ would like to appear amidst the other **W**s, and we have to detect [tussenvoegsels](https://en.wikipedia.org/wiki/Tussenvoegsel). And the number of calls to the compare function grows loglinearly with the number of names. As our preprocessing becomes more expensive and our arrays become longer, this could produce perceivable hiccups.

`mapsort` reduces the number of times an element is preprocessed to 1:
```javascript
mapSort(
	['12.4', '1.62', '3.35'],
	parseFloat,
	(a, b) => a - b
);
```

# Installation

Install `mapsort` using npm or Yarn and import the function:
```javascript
import mapSort from 'mapsort';
```

Alternatively, include `mapsort` through unpkg:
```html
<script src="https://unpkg.com/mapsort@^1.0.8"></script>
```
This alternative makes the function available at `window.mapSort`.

# Usage

``` javascript
const sortedArray = mapSort(
	array,
	element => {
		// Return the version of "element" which is ideal for
		// sorting. This version is passed to the compare
		// function below.
	},
	(a, b) => {
		// (Optional.) Return a negative number if a comes
		// before b; a positive number if b comes before a; or
		// 0 if they are equal.
	}
);
```

## Notes

* Contrary to [`[].sort`][mdn-sort], this library **does not sort in-place**. It returns a new, sorted array. The original array is left untouched.
* This library maps each element of your array to a "sortable" version but returns a sorted array containing the originals. I.e. in the example above `['1.62', '3.35', '12.4']` is returned; not `[1.62, 3.35, 12.4]`.
* This library [probably][stable-sorting] performs stable sorting.

# License (X11/MIT)
Copyright (c) 2019-2021 Pimm "de Chinchilla" Hogeling, Edo Rivai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software.**


[mdn-sort]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[stable-sorting]: https://github.com/Pimm/mapsort/blob/master/documentation/stable-sorting.md