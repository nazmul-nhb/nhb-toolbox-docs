---
id: findMissingElements
title: Find Missing Elements
---

## `findMissingElements`

The `findMissingElements` function identifies elements that are missing from one array compared to another using deep equality checks. It allows you to specify the direction of comparison to extract missing values from either array.

### Function Signature

```typescript
export function findMissingElements<T, U>(
 array1: T[],
 array2: U[],
 missingFrom: 'from-first' | 'from-second',
): (T | U)[]
```

### Usage

This function is available under the following aliases:

- `extractMissingElements`
- `getMissingElements`
- `findMissingElements`

### Parameters

- `array1` (`T[]`): The first array to compare.
- `array2` (`U[]`): The second array to compare.
- `missingFrom` (`'from-first' | 'from-second'`):
  - `'from-first'`: Returns values present in `array1` but missing from `array2`.
  - `'from-second'`: Returns values present in `array2` but missing from `array1`.

### Returns

- `(T | U)[]`: An array of missing elements based on the specified direction of comparison.

### Example

```ts
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];

findMissingElements(arr1, arr2, 'from-first');
// → [ { id: 1 } ]

findMissingElements(arr1, arr2, 'from-second');
// → [ { id: 4 } ]
```

### Notes

Performs **deep comparisons** to find elements that are not structurally present in the other array. This is useful when comparing complex objects or nested arrays.

You can use any of the provided aliases based on your naming preference:

- `findMissingElements`
- `extractMissingElements`
- `getMissingElements`
