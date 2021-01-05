import mapSort from '..';

// This file is used to test the type definitions in `index.d.ts`.

export function basics(): Array<string> {
	return mapSort(
		['40', '186', '2.4', '.47'],
		(string: string, index: number, array: ArrayLike<string>) => parseFloat(string),
		(first, second) => first - second
	);
}
export function arrayLike(): Array<string> {
	const list = {
		length: 0
	};
	return mapSort(
		list,
		(string: string, index: number, array: ArrayLike<string>) => parseFloat(string),
		(first, second) => first - second
	);
}