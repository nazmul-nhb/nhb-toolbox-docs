---
id: findAll
title: Find All
---

## findAll()

Finds all items matching specified criteria using optimized search strategies.

### Signature

```ts
findAll(
  matcher: string | number,
  keySelector: KeySelector<T>,
  options?: FindOptions<T>
): T[]
```

### Type Definitions

#### `FindOptions<T>`

```ts
interface FindOptions<T extends GenericObject = {}> {
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
```

### Parameters

| Parameter     | Type               | Description                               |
| ------------- | ------------------ | ----------------------------------------- |
| `matcher`     | `string \| number` | Value to match against                    |
| `keySelector` | `KeySelector<T>`   | Property name or value extractor function |
| `options`     | `FindOptions<T>`   | Search configuration                      |

### Returns

`T[]` - Array of all matching items (empty array if none found)

### Use Cases

#### Basic Usage

```ts
const userFinder = new Finder(users);
const admins = userFinder.findAll('admin', 'role');
```

#### With Fuzzy Matching

```ts
const productFinder = new Finder(products);
const laptops = productFinder.findAll('lptp', 'name', {
  fuzzy: true
});
```

#### Cached Search

```ts
const results = userFinder.findAll('active', 'status', {
  cacheKey: 'active-users'
});
```

### Behavior Details

1. **Search Flow**:
   - Checks cache first if `cacheKey` provided
   - Uses linear search for small datasets (less than 100 items)
   - Uses binary search for larger sorted datasets
   - Falls back to fuzzy search when enabled

2. **Result Handling**:
   - Returns all matches (not just first)
   - Maintains original item order in results
   - Returns empty array for no matches

3. **Performance**:
   - Cached results: O(1)
   - Linear search: O(n)
   - Binary search: O(log n) + O(m) where m is matches
   - Fuzzy search: O(n)

### Notes

1. **Cache Behavior**:
   - Results cached for 5 minutes by default
   - Cache invalidated when data changes
   - Custom cache keys supported

2. **String Matching**:
   - Case insensitive by default
   - Exact matching unless `fuzzy` enabled
   - Fuzzy matches similar strings ("lptp" → "laptop")

3. **Sorting**:
   - Auto-sorts when `needSorting` true
   - Skips sorting for pre-sorted data
   - Sorting uses natural key order

4. **Edge Cases**:
   - Empty input returns empty array
   - Handles null/undefined in data
   - Works with numeric and string keys

### See Also

- [findOne](findOne) - Find first matching item
- [binarySearch](binarySearch) - Direct sorted array search
- [Finder](../Finder) - Class overview
