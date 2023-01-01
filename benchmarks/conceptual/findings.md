# Findings

We collected benchmark results for this specific test, running it in the latest versions of Node.js, Firefox, and Chrome as of January 2023.

These are the findings:

 * The naive implementation (map callback inside the compare function) is several times slower than every other implementation.
 * The specialised implementations are significantly faster than lodash' `_.sortBy`.
 * On Node.js and in the browser, both the implementation with objects and the implementation with two arrays are very fast.

We decided to implement this library using the two-arrays implementation, because it performs well overall ‒ including on older software.