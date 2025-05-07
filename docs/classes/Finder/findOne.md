---
id: findOne
title: Find One
---

## findOne()

Finds the first item matching specified criteria using optimized search strategies.

### Signature

```ts
findOne(
  matcher: string | number,
  keySelector: KeySelector<T>,
  options?: FindOptions<T>
): T | undefined
```

### Type Definitions

#### `FindOptions<T>`

```ts
interface FindOptions<T = unknown> {
  /** Enables fuzzy matching when exact match fails */
  fuzzy?: boolean;
  /** Key for caching the result */
  cacheKey?: string;
  /** Forces binary search regardless of dataset size */
  forceBinary?: boolean;
  /** Enables case-insensitive string matching */
  caseInsensitive?: boolean;
  /** Controls automatic array sorting */
  needSorting?: boolean;
  /** Alternate data source override */
  data?: T[] | (() => T[]);
}
```

#### `KeySelector<T>`

```ts
/**
 * Defines how to extract keys from items
 * Can be:
 * - A string/number property name
 * - A function that extracts key from item
 */
type KeySelector<T> = Extract<OwnKeys<T>, string | number> | ((item: T) => string | number);

type OwnKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K;}[keyof T];
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `matcher` | `string \| number` | Value to match against |
| `keySelector` | `KeySelector<T>` | Property name or value extractor function |
| `options` | `FindOptions<T>` | Search configuration |

### Returns

`T | undefined` - First matching item or undefined if none found

### Use Cases

#### Basic Usage

```typescript
const userFinder = new Finder(users);
const admin = userFinder.findOne('admin@example.com', 'email');
```

#### With Options

```typescript
const productFinder = new Finder(products);
const laptop = productFinder.findOne('laptop', 'category', {
  fuzzy: true,
  caseInsensitive: false
});
```

#### Cached Search

```ts
const result = userFinder.findOne('john', 'name', {
  cacheKey: 'john-search'
});
```

### Behavior Details

1. **Cache First**: Checks cache if `cacheKey` provided
2. **Search Strategies**:
   - Linear search for small datasets (less than 100 items)
   - Binary search for larger sorted datasets
   - Fuzzy search when enabled and no exact match
3. **Result Caching**: Stores successful finds when `cacheKey` specified

### Notes

1. **Performance Considerations**:
   - Uses cache when available (O(1) lookup)
   - Falls back to linear search for small datasets (O(n))
   - Uses binary search for large sorted datasets (O(log n))
   - Fuzzy search is O(n) when enabled

2. **Cache Behavior**:
   - Cache entries expire after 5 minutes by default
   - Cache key can be customized via `cacheKey` option
   - Cache is automatically cleared when data changes

3. **String Matching**:
   - Case insensitive by default
   - Uses exact matching when `fuzzy` is false
   - Supports fuzzy matching when `fuzzy` is true

4. **Sorting**:
   - Sorts data automatically when `needSorting` is true
   - Skips sorting when data is already sorted

5. **Edge Cases**:
   - Returns undefined for empty datasets
   - Handles null/undefined values in data
   - Works with both string and numeric keys

### See Also

- [findAll](findAll) - Retrieve all matching items
- [binarySearch](binarySearch) - Direct sorted array search
- [Finder](../Finder) - Class overview
