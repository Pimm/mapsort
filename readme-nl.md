# mapsort &middot; [![Licentie (X11/MIT)](https://badgen.net/github/license/pimm/mapsort)](https://github.com/Pimm/mapsort/blob/master/copying.txt) [![npm versie](https://badgen.net/npm/v/mapsort)](https://www.npmjs.com/package/mapsort) [![Test status](https://github.com/Pimm/mapsort/actions/workflows/test.yaml/badge.svg)](https://github.com/Pimm/mapsort/actions/workflows/test.yaml) [![Coverage status](https://coveralls.io/repos/github/Pimm/mapsort/badge.svg?branch=master)](https://coveralls.io/github/Pimm/mapsort?branch=master)

Efficiënte sortering van complexe invoer.

## Voorwoord

**Je hebt deze bibliotheek niet nodig tenzij je problemen met prestaties hebt.** `mapsort` voegt geen functionaliteit toe die niet in kale JavaScript aanwezig is. Wel verbetert het je efficiëntie aanzienlijk als:

* sorteren je bottleneck is, en
* je dure verwerkingen moet toepassen op de elementen in je arrays voordat je hun correcte volgorde kunt bepalen.

# Concept

Stel je voor dat we deze array van getallen sorteren, vertegenwoordigd als strings:
```javascript
['12', '1', '3.14']
```
`'12'` zou voor `'3.14'` worden geplaatst als we sorteren zonder vergelijkfunctie, dus zo een functie is vereist:
```javascript
['12', '1', '3.14'].sort((a, b) => parseFloat(a) - parseFloat(b));
```
Dat werkt!

Het nadeel is dat `parseFloat` twee keer wordt aangeroepen iedere keer dat onze vergelijkfunctie wordt gebruikt. Bij het sorteren van drie getallen wordt `parseFloat` 6 (of 4) keer aangeroepen, terwijl het met 3 keer ook kan.

`parseFloat` 3 of 6 keer aanroepen maakt geen verschil. Maar in de toekomst sorteren we misschien namen. _Lucia Ávila_ wilt tussen de andere **A**'s staan, daarvoor moeten we rekening houden met [schrijftekens](https://nl.wikipedia.org/wiki/Diakritisch_teken). _Amelie de Wit_ wilt tussen de andere **W**'s staan, daarvoor moeten we [tussenvoegsels](https://nl.wikipedia.org/wiki/Tussenvoegsel) detecteren. En het aantal keren dat de vergelijkfunctie wordt gebruikt, groeit loglineair met het aantal namen. Als de verwerking die we moeten toepassen duurder wordt en de arrays langer, kan dit voelbare vertraging opleveren.

`mapsort` beperkt het aantal keren dat een element wordt verwerkt tot 1:
```javascript
mapSort(['12', '1', '3.14'], parseFloat, (a, b) => a - b);
```

# Installatie

Installeer `mapsort` met npm of Yarn en importeer de functie:
```javascript
import mapSort from 'mapsort';
```

Als alternatief kan `mapsort` ook worden binnengehaald met unpkg:
```html
<script src="https://unpkg.com/mapsort@^1.0.8"></script>
```
Met deze aanpak wordt de functie beschikbaar als `window.mapSort`.

# Gebruik

``` javascript
const sortedArray = mapSort(
	array,
	element => {
		// Geef de versie van "element" terug die ideaal is
		// om te sorteren. Deze versie wordt doorgegeven aan
		// de vergelijkfunctie hieronder.
	},
	(a, b) => {
		// (Optioneel.) Geef een negatief getal terug als a
		// voor b hoort; een positief getal als b voor a hoort;
		// of 0 als ze gelijk zijn.
	}
);
```

## Opmerkingen

* In tegenstelling tot [`[].sort`][mdn-sort], **sorteert deze bibliotheek niet _in-place_**. Er wordt een nieuwe, gesorteerde array teruggegeven. De originele array wordt niet beïnvloed.
* Deze bibliotheek sorteert [waarschijnlijk][stable-sorting] stabiel.

# Licentie (X11/MIT)
Copyright (c) 2019-2021 Pimm "de Chinchilla" Hogeling, Edo Rivai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The Software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or other dealings in the Software.**


[mdn-sort]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[stable-sorting]: https://github.com/Pimm/mapsort/blob/master/documentation/stable-sorting-nl.md