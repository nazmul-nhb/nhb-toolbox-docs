---
id: slugifyString  
title: Slugify String  
---

## slugifyString

The `slugifyString` function converts a string into a URL-friendly `slug` by lowercasing the string, replacing non-alphanumeric characters with dashes, and trimming excess dashes.

### Function Signature

```typescript
function slugifyString(input: string): Lowercase<string>;
```

### Parameters

- **`input`**: The string to be converted into a URL-friendly slug.

### Return Value

Returns the slugified version of the string, which is:

- Lowercased.
- Non-alphanumeric characters replaced with dashes (`-`).
- Leading and trailing dashes removed.

### Example Usage

```typescript
import { slugifyString } from 'nhb-toolbox';

console.log(slugifyString('Hello World!')); // Output: 'hello-world'
console.log(slugifyString('  Some String With Spaces  ')); // Output: 'some-string-with-spaces'
```

### Notes

- Uses a helper function `trimString` to remove leading and trailing whitespace before processing.
- The function ensures that the output is always lowercase and formatted for URL compatibility.

### Conclusion

`slugifyString` is a useful utility for transforming strings into SEO-friendly and readable slugs, often needed for generating URLs or slugs for content.
