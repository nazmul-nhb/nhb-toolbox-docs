---
id: split-array
title: Split Array
---

<!-- markdownlint-disable-file MD024 -->

## splitArray

The `splitArray` function divides an array into smaller sub-arrays (chunks) of a specified size. It's useful when you need to batch process or paginate data.

### Function Signature

```typescript
function splitArray<T>(arr: T[], chunkSize: number): T[][]
```

### Parameters

- `arr` (`T[]`): The array to split into chunks.
- `chunkSize` (`number`): The maximum size of each chunk.

### Returns

- `T[][]`: A new array where each item is a chunked sub-array of the original.

### Example

```ts
import { splitArray } from 'nhb-toolbox';

splitArray([1, 2, 3, 4, 5, 6, 7], 3);
// → [[1, 2, 3], [4, 5, 6], [7]]
```

:::info Note
This function is ideal for handling pagination, batching API calls, or distributing data evenly in UI components like grid layouts.
:::

---

## splitArrayByProperty

The `splitArrayByProperty` function groups an array of objects by a specified property value, returning an array of grouped sub-arrays. This is particularly useful for organizing and categorizing object collections.

### Function Signature

```typescript
function splitArrayByProperty<T extends GenericObject, P extends NormalPrimitiveKey<T>>(
  source: T[] | undefined,
  property: P
): T[][]
```

### Parameters

- `source` (`T[] | undefined`): The array of objects to group (handles undefined input gracefully)
- `property` (`P`): The object property to group by (can be string, number, boolean, null, or undefined)

### Returns

- `T[][]`: An array of grouped sub-arrays where objects share the same property value

### Examples

#### Basic Grouping

```typescript
const inventory = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];

splitArrayByProperty(inventory, 'type');
// → [
//     [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//     [{ type: 'vegetable', name: 'carrot' }]
//   ]
```

#### Handling Special Values

```typescript
const data = [
  { category: 'A', value: 1 },
  { category: null, value: 2 },
  { category: 'A', value: 3 },
  { category: undefined, value: 4 }
];

splitArrayByProperty(data, 'category');
// → [
//     [{ category: 'A', value: 1 }, { category: 'A', value: 3 }],
//     [{ category: null, value: 2 }, { category: undefined, value: 4 }]
//   ]
```

### Key Features

1. **Null/Undefined Handling**: Groups null and undefined values together
2. **Type Safe**: Maintains TypeScript type information
3. **Empty Input Handling**: Returns empty array for invalid/empty input
4. **String Conversion**: Converts all non-null/undefined values to strings for grouping

### Comparison with splitArray

| Feature               | splitArray          | splitArrayByProperty         |
|-----------------------|---------------------|------------------------------|
| Input Type            | Any array           | Array of objects             |
| Grouping Logic        | Fixed chunk size    | By property value            |
| Null/undefined        | Preserved in chunks | Grouped together             |
| Return Order          | Original order      | Grouped by property value    |

### Use Cases

- Organizing API response data by categories
- Preparing data for grouped UI components
- Analyzing datasets by common attributes
- Transforming data for visualization libraries
- Batch processing objects with common traits

:::info Note

- For optimal TypeScript usage, ensure your objects properly type the property you're grouping by
- The function performs a deep equality check for grouping, making it suitable for primitive values but not for complex objects as keys
- The original object order within each group is preserved

:::
