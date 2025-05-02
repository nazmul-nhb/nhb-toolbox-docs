---
id: findMissingElements  
title: Find Missing Elements  
---

## findMissingElements

Performs a deep comparison between two arrays and returns elements missing from one array relative to the other. It allows you to specify the direction of comparison to extract missing values from either array.

### Function Signature

```typescript
function findMissingElements<T, U>(
  array1: T[],
  array2: U[],
  missingFrom: 'from-first' | 'from-second'
): (T | U)[];
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `array1` | `T[]` | First array to compare |
| `array2` | `U[]` | Second array to compare |
| `missingFrom` | `'from-first' \| 'from-second'` | Direction of comparison: <br></br> - `'from-first'`: Finds elements in `array1` missing from `array2` <br></br> - `'from-second'`: Finds elements in `array2` missing from `array1` |

### Returns

- `(T | U)[]`: An array containing elements present in the source array but missing in the target array (based on deep equality comparison).

### Example Usage

```typescript
import { findMissingElements } from 'nhb-toolbox';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 1 }, { id: 3 }, { id: 4 }];

// Find elements in array1 missing from array2
console.log(findMissingElements(array1, array2, 'from-first'));
// Output: [{ id: 2 }]

// Find elements in array2 missing from array1
console.log(findMissingElements(array1, array2, 'from-second'));
// Output: [{ id: 4 }]
```

### Notes

- Performs deep equality comparison (handles objects and nested structures)
- Preserves original element references
- Returns empty array if no differences found
- Works with arrays of different types (`T` and `U`)

### Comparison Logic

1. **'from-first' mode**:

   ```typescript
   array1.filter(item => !array2.some(item2 => isDeepEqual(item, item2)))
   ```

2. **'from-second' mode**:

   ```typescript
   array2.filter(item => !array1.some(item1 => isDeepEqual(item, item1)))
   ```

### Use Cases

- Detecting changes between datasets
- Finding deleted/added items in collections
- Data synchronization
- Array difference operations
- State comparison in applications

### Conclusion

The `findMissingElements` function provides:

1. **Flexible comparison** direction
2. **Deep equality** checking
3. **Type-safe** operations
4. **Clear results** for array differences

Ideal for applications requiring:

- Data synchronization
- Change detection
- State management
- Collection comparisons
