---
id: binarySearch
title: Binary Search
---

## binarySearch()

Performs a binary search on a sorted array using a custom key selector function.

### Signature

```typescript
binarySearch(
  sorted: T[],
  matcher: string | number,
  keySelector: (item: T) => string | number,
  caseInsensitive: boolean
): T | undefined
```

### Parameters

| Parameter         | Type                            | Description                                   |
| ----------------- | ------------------------------- | --------------------------------------------- |
| `sorted`          | `T[]`                           | Pre-sorted array to search                    |
| `matcher`         | `string \| number`              | Value to search for                           |
| `keySelector`     | `(item: T) => string \| number` | Function to extract comparison key from items |
| `caseInsensitive` | `boolean`                       | Whether to ignore case for string comparisons |

### Returns

`T | undefined` - First matching item found, or undefined if not found

### Description

This method implements a binary search algorithm with the following characteristics:

- Works on pre-sorted arrays
- Supports both string and numeric keys
- Optional case-insensitive string comparison
- Returns first match found
- O(log n) time complexity

### Example

```typescript
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Tablet" }
];

const finder = new Finder(products);
const result = finder.binarySearch(
  products, 
  "phone",
  (p) => p.name,
  true
);
// Returns { id: 2, name: "Phone" }
```

### Performance

| Metric           | Value    |
| ---------------- | -------- |
| Time Complexity  | O(log n) |
| Space Complexity | O(1)     |
| Best Case        | O(1)     |
| Worst Case       | O(log n) |

### Use Cases

- Searching large sorted datasets
- Implementing fast lookup for static data
- Optimizing search performance for read-heavy applications
