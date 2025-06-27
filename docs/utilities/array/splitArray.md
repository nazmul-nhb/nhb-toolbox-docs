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

The `splitArrayByProperty` function groups an array of objects by a specified property value, returning an array of grouped sub-arrays. It supports **dot notation** for nested properties, making it useful for deeply structured object collections.

### Function Signature

```ts
function splitArrayByProperty<T extends GenericObject, P extends NestedPrimitiveKey<T>>(
  source: T[] | undefined,
  property: P
): T[][]
```

### Parameters

- `source` (`T[] | undefined`): The array of objects to group (handles `undefined` input gracefully)
- `property` (`P`): The property to group by — supports nested paths in dot notation (e.g., `'user.city'`)

### Returns

- `T[][]`: An array of grouped sub-arrays where objects share the same resolved property value

### Examples

#### Basic Grouping

```ts
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

#### Grouping by Nested Property

```ts
const users = [
  { profile: { city: 'Dhaka' }, name: 'Alice' },
  { profile: { city: 'Dhaka' }, name: 'Bob' },
  { profile: { city: 'Chittagong' }, name: 'Carol' }
];

splitArrayByProperty(users, 'profile.city');
// → [
//     [{ profile: { city: 'Dhaka' }, name: 'Alice' }, { profile: { city: 'Dhaka' }, name: 'Bob' }],
//     [{ profile: { city: 'Chittagong' }, name: 'Carol' }]
//   ]
```

#### Handling Special Values

```ts
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

1. **Dot Notation Support**: Supports nested object paths like `'user.profile.city'`
2. **Null/Undefined Handling**: Groups null and undefined values under a reserved key
3. **Type Safe**: Maintains TypeScript type information for grouped items
4. **Empty Input Handling**: Returns empty array for invalid/empty input
5. **String Conversion**: Converts grouping keys to strings to ensure consistent object indexing

### Comparison with [splitArray](#splitarray)

| Feature        | splitArray          | splitArrayByProperty       |
| -------------- | ------------------- | -------------------------- |
| Input Type     | Any array           | Array of objects           |
| Grouping Logic | Fixed chunk size    | By (nested) property value |
| Null/undefined | Preserved in chunks | Grouped under special key  |
| Return Order   | Original order      | Grouped by resolved key    |

### Use Cases

- Organizing API response data by categories or nested metadata
- Preparing deeply nested data for grouped UI components
- Aggregating data for reporting and analytics
- Transforming structures for grouped charts or tables
- Grouping objects by region, status, or user-defined tags

\:::info Note

- For optimal TypeScript usage, ensure your objects properly type the property you're grouping by
- Dot-notation support allows grouping by deeply nested properties like `'meta.stats.region'`
- This function works best when grouping by primitive fields (string, number, boolean, null, undefined)
- Object order within each group is preserved; order of group entries may vary

\:::

### Aliases

- `groupArrayByProperty`
