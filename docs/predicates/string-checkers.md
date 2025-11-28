---
id: string-checkers  
title: String Checkers  
---

<!-- markdownlint-disable-file MD024 -->
## isCamelCase

Checks if a string follows the **camelCase** format.

### Function Signature

```ts
isCamelCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in camelCase, otherwise `false`.

### Example

```ts
isCamelCase('camelCase'); // true
isCamelCase('CamelCase'); // false
```

---

## isPascalCase

Checks if a string follows the **PascalCase** format.

### Function Signature

```ts
isPascalCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in PascalCase, otherwise `false`.

### Example

```ts
isPascalCase('PascalCase'); // true
isPascalCase('pascalCase'); // false
```

---

## isSnakeCase

Checks if a string follows the **snake_case** format.

### Function Signature

```ts
isSnakeCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in snake_case, otherwise `false`.

### Example

```ts
isSnakeCase('snake_case'); // true
isSnakeCase('Snake_Case'); // false
```

---

## isKebabCase

Checks if a string follows the **kebab-case** format.

### Function Signature

```ts
isKebabCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in kebab-case, otherwise `false`.

### Example

```ts
isKebabCase('kebab-case'); // true
isKebabCase('Kebab-Case'); // false
```

---

## isPalindrome

Checks if a string is a **palindrome** (reads the same backward as forward, ignoring case and non-alphanumeric characters).

### Function Signature

```ts
isPalindrome: (input: string): boolean;
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

---

## isEmojiOnly

Checks if a string contains **only emojis**.

### Function Signature

```ts
isEmojiOnly(str: string): boolean;
```

### Parameters

- **`str`**: The input string to check.

### Returns

Returns `true` if the string contains only emojis, otherwise `false`.

### Example

```ts
isEmojiOnly('🎉🔥');     // true
isEmojiOnly('🎉 text');  // false
isEmojiOnly('');         // false
```

### Notes

- This uses the Unicode `\p{Emoji}` property from RegExp Unicode property escapes.
- The `u` flag is required for proper Unicode handling.
