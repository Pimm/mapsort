# Findings

We collected benchmark results for this specific test, running it in the latest versions of Node.js, Firefox, and Chrome as of springtime 2019.

These are the findings:

- The naive concept is several times slower than every other concept.
- The specialised concepts are significantly faster than using lodash' `_.sortBy`.
- On Node.js and in the browser, using objects and using two arrays are fast for short lists (<±100​ 000), but using objects starts to crumble for long lists (>±100 000).
- On Node.js, using a Map becomes relatively fast for long lists (>±100 000).

We decided to implement this library using the two-arrays concept, because it performs well overall.