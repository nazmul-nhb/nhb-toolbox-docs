---
id: replaceAllInString
title: Replace All in String
---

## replaceAllInString

The `replaceAllInString` function replaces all occurrences of a specified substring or pattern in a given input string. It ensures that the search pattern is treated as a global regular expression and performs replacements efficiently.

### Function Signature

```ts
replaceAllInString (input: string, find: string | RegExp, replace: string): string;
```

### Parameters

- **input** (`string`):  
  The input string in which replacements should be performed.

- **find** (`string | RegExp`):  
  The substring or regular expression pattern to search for in the `input` string.  
  - If `find` is a string, it is automatically converted into a global regular expression (`/find/g`).
  - If `find` is already a `RegExp`, it ensures the global (`g`) flag is present.

- **replace** (`string`):  
  The string to replace all occurrences of `find` with.

### Returns

- **string**:  
  The modified string with all occurrences of the `find` pattern replaced by the `replace` string.

### Behavior

- **Trimming**:  
  The function trims the `input` string before performing replacements, ensuring no unwanted spaces affect the operation.
  
- **Regular Expression Handling**:  
  If `find` is a string, it is converted to a global regular expression. If it is already a `RegExp`, the global flag is ensured.

### Example Usage

#### Import

```ts
import { replaceAllInString } from 'nhb-toolbox';
```

#### Replace a Word in a String

```ts
const input = '  Hello world, hello again!  ';
const output = replaceAllInString(input, 'hello', 'hi');
console.log(output); 
// Output: 'Hello world, hi again!'
```

#### Replace with Regular Expression

```ts
const input = ' 123, 456, 789, 123 ';
const output = replaceAllInString(input, /\d+/g, 'X');
console.log(output); 
// Output: 'X, X, X, X'
```

#### Edge Case: Empty Input

```ts
const output = replaceAllInString('', 'hello', 'hi');
console.log(output); 
// Output: ''
```

### Notes

- If the input string is empty or contains only whitespace, the function returns an empty string.
- It guarantees that the `find` pattern is applied globally, ensuring all occurrences are replaced.
