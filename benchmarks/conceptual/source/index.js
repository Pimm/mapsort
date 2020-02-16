import names from '../../names.json';
import Benchmark from 'benchmark';
import _ from 'lodash';
/**
 * A naive implementation, which calls the map callback (twice) every time the compare callback is called.
 */
function naive(input, mapper, sorter) {
	return input.sort((a, b) => sorter(mapper(a), mapper(b)));
}
/**
 * This implementation creates a Map object, which maps the input item to the "sortable" value.
 */
function mapSortWithMap(input, mapper, sorter) {
	const sortables = new Map();
	input.forEach(item => {
		sortables.set(item, mapper(item));
	});
	return input.sort((a, b) => sorter(sortables.get(a), sortables.get(b)));
}
/**
 * This implementation creates an array with indexes and one with "sortable" values, and then sorts the former array.
 */
function mapSortWithTwoArrays(input, mapper, sorter) {
	const indexes = [];
	const sortables = [];
	input.forEach((item, index) => {
		indexes.push(index);
		sortables.push(mapper(item));
	});
	indexes.sort((aIndex, bIndex) => sorter(sortables[aIndex], sortables[bIndex]));
	return indexes.map(index => input[index]);
}
/**
 * This implementation creates a typed array with indexes and a regular array with "sortable" values, and then sorts
 * the former array.
 */
function mapSortWithTwoArraysOneTyped(input, mapper, sorter) {
	const indexes = new Uint32Array(input.length);
	const sortables = [];
	input.forEach((item, index) => {
		indexes[index] = index;
		sortables.push(mapper(item));
	});
	indexes.sort((aIndex, bIndex) => sorter(sortables[aIndex], sortables[bIndex]));
	return indexes.map(index => input[index]);
}
/**
 * This implementation upgrades items to a objects containing the original item and the associated "sortable" value.
 */
function mapSortWithShortLivedObjects(input, mapper, sorter) {
	const sortables = [];
	input.forEach(item => {
		sortables.push({ sortable: mapper(item), item: item });
	});
	sortables.sort((a, b) => sorter(a.sortable, b.sortable));
	return sortables.map(({ item }) => item);
}

function map(person) {
	var index = 0;
	["de ", "van de ", "van den ", "van der ", "van het ", "van "].some(
		tussenvoegsel => {
			if (person.familyName.startsWith(tussenvoegsel)) {
				index = tussenvoegsel.length;
				return true;
			}
		}
	);
	return person.familyName.substring(index);
}

function sort(a, b) {
	if (a === b) return 0;
	return a < b ? -1 : 1;
}

function runSuite(list) {
	return new Promise(resolve => {
		const suite = new Benchmark.Suite();
		suite
		.add('naive                   ', () => {
			naive([...list], map, sort);
		})
		.add('lodash.sortBy           ', () => {
			_.sortBy([...list], [map]);
		})
		.add('using Map               ', () => {
			mapSortWithMap([...list], map, sort);
		})
		.add('using two arrays        ', () => {
			mapSortWithTwoArrays([...list], map, sort);
		})
		.add('using two arrays (typed)', () => {
			mapSortWithTwoArraysOneTyped([...list], map, sort);
		})
		.add('using objects           ', () => {
			mapSortWithShortLivedObjects([...list], map, sort);
		})
		.on('cycle', event => {
			console.log(String(event.target));
		})
		.on('complete', () => {
			console.log(['Fastest method for a list of ', list.length, ' items is ', suite.filter('fastest').map('name')].join(''));
			resolve();
		})
		.run({ async: true });
	});
}

Promise.resolve()
.then(() => {
	const fewNames = names.slice(0, 10);
	return runSuite(fewNames);
})
.then(() => {
	return runSuite(names);
})
.then(() => {
	const manyNames = [];
	for (let iteration = 0; 100 != iteration; iteration++) {
		manyNames.push(...names);
	}
	return runSuite(manyNames);
})
.then(() => {
	const tonOfNames = [];
	for (let iteration = 0; 1000 != iteration; iteration++) {
		tonOfNames.push(...names);
	}
	return runSuite(tonOfNames);
});