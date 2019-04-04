const names = require("./names.json");
const Benchmark = require("benchmark");
const _ = require("lodash");

const manyNames = [];
for (let iteration = 0; 1000 != iteration; iteration++) {
  manyNames.push(...names);
}

function naive(input, mapper, sorter) {
  input.sort((a, b) => sorter(mapper(a), mapper(b)));
}

function mapSort(input, mapper, sorter) {
  const sortables = new Map();
  input.forEach(item => {
    sortables.set(item, map(item));
  });
  input.sort((a, b) => sorter(sortables.get(a), sortables.get(b)));
}

function mapSortDirect(input, mapper, sorter) {
  const sortables = new Map(
    input.map(item => [item, map(item)])
  );
  input.sort((a, b) => sorter(sortables.get(a), sortables.get(b)));
}

function mapSortDoubleArray(input, mapper, sorter) {
  const sortables = [];
  const indexes = [];
  input.forEach((item, i) => {
    indexes.push(i);
    sortables.push(map(item));
  });
  indexes.sort((aIndex, bIndex) => sorter(sortables[aIndex], sortables[bIndex]));
  return indexes.map(index => input[index]);
}

function mapSortShortLivedObjects(input, mapper, sorter) {
  const sortables = [];
  input.forEach(item => {
    sortables.push({ sortable: map(item), item: item });
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

const suite = new Benchmark.Suite();

// add tests
suite
  .add("naive", () => {
    naive(manyNames.slice(), map, sort);
  })

  .add("mapSort", () => {
    mapSort(manyNames.slice(), map, sort);
  })

  .add("mapSortDirect", () => {
    mapSortDirect(manyNames.slice(), map, sort);
  })

  .add("mapSortDoubleArray", () => {
    mapSortDoubleArray(manyNames.slice(), map, sort);
  })

  .add("mapSortShortLivedObjects", () => {
    mapSortShortLivedObjects(manyNames.slice(), map, sort);
  })

  .add("lodash.sortBy", () => {
    _.sortBy(manyNames, [map]);
  })

  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
  })

  .run({ async: true });
