---
id: reverseString  
title: Reverse String  
---

## reverseString

The `reverseString` function reverses the given string, returning a new string with the characters in reverse order.

### Function Signature

```typescript
reverseString(input: string): string;
```

### Parameters

- **`input`**: The string to reverse.

### Return Value

Returns a new string with the characters of the input string reversed.

### Example Usage

```typescript
import { reverseString } from 'nhb-toolbox';

console.log(reverseString('hello')); // Output: 'olleh'
console.log(reverseString('world')); // Output: 'dlrow'
```

### Notes

- Uses a helper function `trimString` to remove any leading or trailing whitespace before reversing.
- The function splits the string into an array of characters, reverses the array, and joins it back into a string.

### Conclusion

The `reverseString` function provides a simple and effective way to reverse strings, useful in various applications like reversing text or implementing certain algorithms.
