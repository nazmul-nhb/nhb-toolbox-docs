---
id: extractURLs  
title: Extract URLs  
---

## extractURLs

The `extractURLs` function extracts all web URLs from a given input string using a regular expression.

### Function Signature

```typescript
extractURLs(str: string): string[];
```

### Parameters

- **`str`**: The input string from which to extract URLs.

### Return Value

Returns an array of matched URLs:

- If URLs are found, returns an array of strings.
- If no URLs are found, returns an empty array.

### Example Usage

```typescript
import { extractURLs } from 'nhb-toolbox';

const text = 'Check out https://example.com and http://another.com/page';
const urls = extractURLs(text);
console.log(urls); // Output: ['https://example.com', 'http://another.com/page']
```

### Notes

- Uses a regular expression that matches HTTP and HTTPS URLs.
- Designed for general use; may not capture edge-case URLs like those with uncommon schemes or embedded punctuation.

### Conclusion

The `extractURLs` function is a lightweight utility to identify and extract web URLs from plain text, making it ideal for text analysis, content parsing, or link harvesting scenarios.
