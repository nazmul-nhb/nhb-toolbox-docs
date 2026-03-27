---
id: getLevenshteinDistance  
title: Get Levenshtein Distance  
---

## getLevenshteinDistance

The `getLevenshteinDistance` function computes the Levenshtein distance between two strings, which is a measure of the difference between them based on the number of insertions, deletions, and substitutions required to transform one string into the other.

### Function Signature

```typescript
getLevenshteinDistance (str1: string, str2: string): number;
```

### Parameters

- **`str1`**: First string to compare.
- **`str2`**: Second string to compare.

### Return Value

Returns the Levenshtein distance between the two strings.

### Example Usage

```typescript
import { getLevenshteinDistance } from 'nhb-toolbox';

const distance = getLevenshteinDistance('kitten', 'sitting');
console.log(distance); // Output: 3
```

### Notes

- The Levenshtein distance is the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other.
- This implementation is **space optimized**, using only `O(min(len(str1), len(str2)))` space by keeping only the current and previous rows of the distance matrix.
- Works case-sensitively, so `"kitten"` and `"Kitten"` will have a distance of `1`.

### Aliases

- `levenshteinDistance`: Alias for `getLevenshteinDistance`.

### Conclusion

The `getLevenshteinDistance` function is essential for comparing two strings in a variety of contexts where similarity measurement is needed. It's an efficient and widely used method for string comparison, offering a quantitative measure of their difference.

### See also

- [String Diff](string-diff) for a more comprehensive string comparison utility that utilizes the Levenshtein distance for similarity calculations.
