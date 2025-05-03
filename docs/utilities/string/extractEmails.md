---
id: extractEmails  
title: Extract Emails  
---

## extractEmails

The `extractEmails` function extracts all email addresses from a given input string using a regular expression.

### Function Signature

```typescript
function extractEmails(str: string): string[];
```

### Parameters

- **`str`**: The input string that may contain one or more email addresses.

### Return Value

Returns an array of matched email addresses:

- If email addresses are found, returns an array of strings.
- If no email addresses are found, returns an empty array.

### Example Usage

```typescript
import { extractEmails } from 'nhb-toolbox';

const text = 'Contact us at support@example.com or admin@domain.org';
const emails = extractEmails(text);
console.log(emails); // Output: ['support@example.com', 'admin@domain.org']
```

### Notes

- Uses a regular expression to match common email address patterns.
- It does not validate the authenticity of the email domain, only matches the format.

### Conclusion

The `extractEmails` function is a reliable utility for identifying and extracting email addresses from raw text strings using a simple and effective regular expression.
