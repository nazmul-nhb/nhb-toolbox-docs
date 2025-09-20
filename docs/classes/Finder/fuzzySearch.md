---
id: fuzzySearch
title: Fuzzy Search
---

## fuzzySearch()

Performs a fuzzy search by matching characters in sequence against array elements.

### Signature

```typescript
fuzzySearch(
  array: T[],
  matcher: string,
  keySelector: (item: T) => string | number,
  caseInsensitive: boolean
): T | undefined
```

### Description

The `fuzzySearch` method implements a flexible pattern matching algorithm that:

- Finds items where the search characters appear in order (but not necessarily consecutively)
- Supports both string and numeric property values
- Provides case sensitivity control
- Returns the first matching item found

### Parameters

| Name              | Type                            | Description                                                  |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| `array`           | `T[]`                           | The collection to search                                     |
| `matcher`         | `string`                        | The sequence to search for (e.g. "cmn" matches "California") |
| `keySelector`     | `(item: T) => string \| number` | Value extractor function                                     |
| `caseInsensitive` | `boolean`                       | Whether to ignore character case                             |

### Examples

#### Basic Usage

```typescript
const products = [
  { id: 1, name: "Smartphone" },
  { id: 2, name: "Camera" },
  { id: 3, name: "Laptop" }
];

const finder = new Finder(products);
const result = finder.fuzzySearch(
  products,
  "smph",
  item => item.name,
  true
);
// Returns Smartphone item
```

#### With Numeric Values

```typescript
const inventory = [
  { sku: "A100", stock: 15 },
  { sku: "B200", stock: 8 }
];

const finder = new Finder(inventory);
finder.fuzzySearch(
  inventory,
  "15",
  item => item.stock,
  false
);
// Returns { sku: "A100", stock: 15 }
```

### Performance Characteristics

- **Time Complexity**: O(n) where n is array length
- **Best For**: Small to medium datasets (less than 1000 items)
- **Cache Note**: Results are not cached automatically

### Use Cases

1. Implementing type-ahead search suggestions
2. Finding approximate matches in user-generated content
3. Handling potential typos in search queries
4. Creating flexible filtering interfaces

### See Also

- [binarySearch](binarySearch) - For sorted arrays
- [Finder constructor](../Finder#constructor) - Configuration options
