---
id: isInvalidOrEmptyArray
title: Check Invalid or Empty Array
---

## isInvalidOrEmptyArray

Checks if a value is an empty array or an array with only empty values.

### Parameters

- `value` (`T`): The value to check.

### Return Value

- `boolean`: `true` if the value is not an array, an empty array, or an array containing only `null`, `undefined`, empty objects, or empty arrays.

### Aliases

- `isValidEmptyArray`: Alias for `isInvalidOrEmptyArray`.

### Example

```typescript
import { isInvalidOrEmptyArray } from 'nhb-toolbox';

const array1 = [null, {}, [], undefined];
console.log(isInvalidOrEmptyArray(array1));
// Output: true

const array2 = [1, 2, 3];
console.log(isInvalidOrEmptyArray(array2));
// Output: false

const emptyArray: any[] = [];
console.log(isInvalidOrEmptyArray(emptyArray));
// Output: true
