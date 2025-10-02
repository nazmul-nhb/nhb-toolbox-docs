---
id: removeDuplicates
title: Remove Duplicates from Array
---

## removeDuplicatesFromArray

The `removeDuplicatesFromArray` function removes duplicate values from an array using deep equality checks, ensuring that complex objects and nested arrays are properly compared.

### Function Signature

```typescript
removeDuplicatesFromArray<T>(array: T[]): T[];
```

### Usage

This function is available under the following aliases:

- `removeDuplicatesFromArray`
- `removeDuplicates`

### Parameters

- **`array`**: The array from which duplicates will be removed. The array can contain primitive values (strings, numbers, booleans) or objects/arrays that will be compared deeply.

### Return Value

Returns a new array with all duplicates removed, ensuring that each element in the array is unique.

### Example Usage

#### Example 1: Removing Duplicates from an Array of Numbers

```typescript
const numbers = [1, 2, 3, 2, 1];
const uniqueNumbers = removeDuplicatesFromArray(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3]
```

#### Example 2: Removing Duplicates from an Array of Objects

```typescript
import { removeDuplicatesFromArray } from 'nhb-toolbox';

const objects = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 1, name: 'Item A' },
];

const uniqueObjects = removeDuplicatesFromArray(objects);
console.log(uniqueObjects);
// Output: [
//   { id: 1, name: 'Item A' },
//   { id: 2, name: 'Item B' }
// ]
```

### Notes

- The function uses deep equality checks (`isDeepEqual`) to compare objects and arrays, ensuring that duplicate objects or arrays with identical contents are removed.
- The order of elements in the original array is preserved, and only unique items remain in the returned array.
- Does **not mutate** the original array.

### Dependencies

- **`isDeepEqual`**: A utility function for deep comparison of objects and arrays.
