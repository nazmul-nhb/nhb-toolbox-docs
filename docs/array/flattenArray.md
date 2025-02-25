---
id: flattenArray
title: flattenArray
---

## flattenArray

Flattens a nested array recursively or wraps any non-array data type in an array.

### Type Parameters

- `T`: The type of the input, which can be a nested array or a non-array value.

### Parameters

- `input` (`T | T[]`): The input value, which can be a nested array or a non-array value.

### Returns

- `Flattened<T>[]`: A fully flattened array. If the input is not an array, it wraps it in a single-element array.

### Example

```typescript
import { flattenArray } from 'nhb-toolbox';

const nestedArray = [1, [2, [3, 4]], 5];
const flatArray = flattenArray(nestedArray);
console.log(flatArray); // Output: [1, 2, 3, 4, 5]

const singleValue = 42;
const wrappedValue = flattenArray(singleValue);
console.log(wrappedValue); // Output: [42]
