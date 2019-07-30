# Stabiel sorteren

[`[].sort`][mdn-sort] is waarschijnlijk stabiel. En omdat `mapsort` gebruik maakt van `[].sort`, is `mapsort` waarschijnlijk stabiel.

"Stabiel" betekent dat twee elementen die gelijk worden beschouwd hun onderlinge volgorde altijd behouden.

"Waarschijnlijk", omdat dit zo is in Firefox 3+, Chrome 70+, en Node.js 12+. "Waarschijnlijk", omdat de [10de editie van ECMAScript][ecmascript-10] (2019) dat specificeert.

## Gegarandeerde stabiliteit

Wanneer "waarschijnlijk" te onzeker is ‒ wanneer een absolute garantie vereist is ‒ kan deze bibliotheek daarbij helpen. Bewaar de index van ieder element en vergelijk indexen indien twee elementen verder gelijk blijken:

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
		// Sorteer op "rating" als dit ongelijk is.
		if (a.rating != b.rating) {
			return a.rating - b.rating;
		// Als "rating" gelijk is, sorteer dan op de originele
		// index.
		} else /* if (a.rating == b.rating) */ {
			return a.originalIndex - b.originalIndex;
		}
	}
);
```


[mdn-sort]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[ecmascript-10]: https://www.ecma-international.org/ecma-262/10.0/#sec-array.prototype.sort