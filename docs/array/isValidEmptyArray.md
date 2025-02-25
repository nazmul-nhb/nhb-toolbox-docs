---
id: isValidEmptyArray
title: isValidEmptyArray
---

## isValidEmptyArray

Checks if a value is an empty array or an array with only empty values.

### Parameters

- `value` (`T | T[]`): The value to check.

### Returns

- `boolean`: `true` if the value is not an array, an empty array, or an array containing only `null`, `undefined`, empty objects, or empty arrays.

### Example

```typescript
import { isValidEmptyArray } from 'nhb-toolbox';

console.log(isValidEmptyArray([])); // Output: true
console.log(isValidEmptyArray([null, undefined, {}, []])); // Output: true
console.log(isValidEmptyArray([1, 2, 3])); // Output: false
console.log(isValidEmptyArray('string')); // Output: true
