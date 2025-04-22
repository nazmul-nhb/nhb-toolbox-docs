---
id: getDuplicates
title: Get Duplicates
---

## `getDuplicates`

Finds duplicate values in an array and performs a deep comparison for objects and arrays to detect duplicates.

### Function Signature

```typescript
export function getDuplicates<T>(array: T[]): T[]
```

### Parameters

- **array** (`T[]`): The array in which to find duplicates.

### Returns

- **`T[]`**: An array containing all duplicate entries. Each duplicate entry is only returned once.

### Aliases

The following aliases can be used for the `getDuplicates` function. Use any of the following function names, as they all refer to the same implementation:

- `extractDuplicates`
- `extractDuplicatesFromArray`
- `getDuplicatesFromArray`

### Notes

The `getDuplicates` function is useful when you need to identify and extract duplicate values from an array, especially when dealing with objects or nested arrays. This can be applied in scenarios such as:

- **Data Validation**: Check if there are duplicate entries in input data or user selections.
- **Filtering Data**: Use it for eliminating duplicate records in a dataset before processing or displaying them.
- **Data Synchronization**: Useful in cases where you need to ensure that items in an array are unique, particularly in systems where deep equality matters (such as complex objects or arrays).

### See Also

- **`isDeepEqual`**: The function depends on the `isDeepEqual` utility to compare values deeply. You may refer to the implementation of `isDeepEqual` for more details on how the deep comparison is done.
