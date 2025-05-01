---
id: isEmojiOnly
title: Emoji Checker  
---

## isEmojiOnly

Checks if a string contains **only emojis**.

### Function Signature

```ts
function isEmojiOnly(str: string): boolean;
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

Would you like to proceed with more emoji-related utilities or move to a different category?
