---
id: truncateString
title: Truncate a String
---

## truncateString

The `truncateString` function shortens a string to a specified maximum length and appends an ellipsis (`...`) if truncation occurs.

### Function Signature

```typescript
export const truncateString = (string: string, maxLength: number) => string;
```

### Parameters

- **`string`**: The string to truncate.
- **`maxLength`**: The maximum allowed length before truncation.

### Return Value

Returns the truncated string with an appended ellipsis (`...`) if it exceeds the `maxLength`.

### Example Usage

#### Truncate a Long String

```typescript
truncateString('Hello, this is a long sentence.', 10);
// Output: 'Hello, thi...'
```

#### String Within Limit (No Truncation)

```typescript
truncateString('Short', 10);
// Output: 'Short'
```

#### Handling Empty Strings

```typescript
truncateString('', 5);
// Output: ''
```
