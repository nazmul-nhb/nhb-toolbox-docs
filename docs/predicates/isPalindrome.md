---
id: isPalindrome  
title: Check Palindrome  
---

## isPalindrome

Checks if a string is a **palindrome** (reads the same backward as forward, ignoring case and non-alphanumeric characters).

### Function Signature

```ts
const isPalindrome: (input: string) => boolean;
```

### Parameters

- **`input`**: The string to check.

### Returns

Returns `true` if the string is a palindrome, otherwise `false`.

### Example

```ts
isPalindrome('Racecar');        // true
isPalindrome('A man, a plan, a canal: Panama'); // true
isPalindrome('hello');          // false
```

---

### Dependencies

- Uses `reverseString` internally to perform the reversal comparison.
