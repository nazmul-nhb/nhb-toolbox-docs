---
id: normalizeString  
title: Normalize String  
---

## normalizeString

The `normalizeString` function removes diacritics (accent marks) from characters to produce a normalized ASCII version of the string.

### Function Signature

```ts
normalizeString(str: string): string;
```

### Parameters

- **`str`**: The input string that may contain characters with diacritics.

### Return Value

Returns a normalized version of the string with all diacritical marks removed.

### Example Usage

```ts
import { normalizeString } from 'nhb-toolbox';

normalizeString('café'); // 'cafe'
normalizeString('résumé'); // 'resume'
```

### Notes

- Uses [Unicode Normalization Form D (NFD)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) to decompose accented characters into base characters plus diacritical marks.
- Removes Unicode combining diacritical marks using a regular expression.

### Conclusion

Use `normalizeString` to ensure consistent string comparison and searching, especially for user-generated content or multilingual input.
