---
id: getLevenshteinDistance  
title: Get Levenshtein Distance  
---

## getLevenshteinDistance

The `getLevenshteinDistance` function computes the Levenshtein distance between two strings, which is a measure of the difference between them based on the number of insertions, deletions, and substitutions required to transform one string into the other.

### Function Signature

```typescript
export const getLevenshteinDistance = (a: string, b: string): number;
```

### Parameters

- **`a`**: The first string to compare.
- **`b`**: The second string to compare.

### Return Value

Returns the Levenshtein distance between the two strings.

### Example Usage

```typescript
import { getLevenshteinDistance } from 'nhb-toolbox';

console.log(getLevenshteinDistance('kitten', 'sitting')); // 3
```

### Notes

- The Levenshtein distance can be used in various applications such as spell-checking, DNA sequence alignment, and natural language processing.
- The function uses dynamic programming to efficiently calculate the distance.
- Works case-sensitively, so `"kitten"` and `"Kitten"` will have a distance of `1`.

### Aliases

- `levenshteinDistance`: Alias for `getLevenshteinDistance`.

### Conclusion

The `getLevenshteinDistance` function is essential for comparing two strings in a variety of contexts where similarity measurement is needed. It’s an efficient and widely used method for string comparison, offering a quantitative measure of their difference.
