---
id: naturalSort
title: Natural Sort
---

## naturalSort

The `naturalSort` function compares two strings using a natural sorting order (e.g., `"file2" < "file10"`). It optionally supports `case-insensitive` and `locale-aware string chunk comparisons`.

- *Though it compares strings, it was mainly developed for array sorting.*

### Function Signature

```typescript
function naturalSort(a: string, b: string, options?: SortNature): number;
```

### Parameters

- **`a`**: The first string to compare.
- **`b`**: The second string to compare.
- **`options`**: Optional settings to configure comparison behavior:
  - `caseInsensitive` (default: `true`): If `true`, compares string chunks without case sensitivity.
  - `localeAware` (default: `false`): If `true`, uses `localeCompare` for string chunk comparisons.

### Return Value

- A negative number if `a` comes before `b`.
- A positive number if `a` comes after `b`.
- 0 if the strings are equal.

### Aliases

- `compareNaturally`, `naturalSortForString`, `compareSorter`

### Example Usage

```typescript
import { naturalSort } from 'nhb-toolbox';

const result = naturalSort("file2", "file10");
console.log(result); // Output: -1
```

### Notes

- The function uses chunking to break strings into numeric and non-numeric parts and compares those parts.
- Supports case-insensitive and locale-aware comparison based on the provided options.

### Types

#### `SortNature`

```typescript
interface SortNature {
  caseInsensitive?: boolean;
  localeAware?: boolean;
}
```
