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
Sorting them with no compare function would place `'3.35'` after `'12.4'`, so we need a such a function:
```javascript
['12.4', '1.62', '3.35'].sort((a, b) => parseFloat(a) - parseFloat(b));
```
This works!

The only drawback is that `parseFloat` is called twice every time our compare function is used, resulting in 6 `parseFloat` calls in this example (4 if the original order were optimal).

A dozen of `parseFloat` calls is fine. However, next time we might be sorting names. _Lucia Ávila_ would like to appear amidst the other **A**s, and we have to strip [diacritics](https://en.wikipedia.org/wiki/Diacritic). _Amelie de Wit_ would like to appear amidst the other **W**s, and we have to detect [tussenvoegsels](https://en.wikipedia.org/wiki/Tussenvoegsel). As our preprocessing becomes more expensive and our arrays become longer, this could produce perceivable hiccups.

`mapsort` reduces the number of times an element has to be preprocessed to 1:
```javascript
mapSort(
	['12.4', '1.62', '3.35'],
	parseFloat,
	(a, b) => a - b
);
```

# Installation

Install `mapsort` using npm or Yarn and import it:
```javascript
import mapSort from 'mapsort';
```

Alternatively, include `mapsort` through unpkg:
```html
<script src="https://unpkg.com/mapsort@^1.0.0"></script>
```

# Usage

``` javascript
const sortedArray = mapSort(
	array,
	element => {
		// Return the version of "element" which is ideal for sorting. This version is passed to the compare function below.
	},
	(a, b) => {
		// Return a negative number if a comes before b; a positive number if b comes before a; or 0 if they are equal.
	}
);
```