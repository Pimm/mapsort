var mapSort;
// For regular tests, using the compiled version makes the most sense as it is the most realistic version…
/* istanbul ignore if */
if ('coverage' != process.env.TEST_TYPE) {
	mapSort = require('..');
// …however, when testing coverage, the compiled version gives skewed results.
} else /* if ('coverage' == process.env.TEST_TYPE) */ {
	mapSort = require('../source');
}

module.exports = mapSort;