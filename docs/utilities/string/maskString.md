---
id: maskString  
title: Mask String  
---

## maskString

The `maskString` function masks a portion of a string for privacy while allowing specified characters at the beginning and/or end to remain visible.

### Function Signature

```typescript
function maskString(input: string, options?: MaskOptions): string;
```

### Parameters

- **`input`**: The string to be masked.
- **`options`** _(optional)_: An object specifying how the string should be masked:
  - `start` _(optional)_: Number of characters to keep visible at the start. Defaults to `1`.
  - `end` _(optional)_: Number of characters to keep visible at the end. Defaults to `1`.
  - `maskCharacter` _(optional)_: Character used to mask the string. Defaults to `'*'`.

### Return Value

Returns the masked string, maintaining the original start and end characters if the string is long enough. If the string is too short, it will be fully masked with the given mask character.

### Example Usage

```typescript
import { maskString } from 'nhb-toolbox';

const email = 'hello@example.com';
const masked = maskString(email, { start: 2, end: 4 });
console.log(masked); // Output: 'he***********.com'
```

### Notes

- Uses a helper function `trimString` to remove leading and trailing whitespace before masking.
- If the input string is too short to apply the start and end retention, the entire string is masked.
- Useful for data obfuscation such as hiding parts of email addresses, phone numbers, or tokens.

### Types

#### `MaskOptions`

```typescript
interface MaskOptions {
  /** Number of characters to keep at the start. Defaults to `1`. */
  start?: number;
  /** Number of characters to keep at the end. Defaults to `1`. */
  end?: number;
  /** Character to use for masking. Defaults to `*`. */
  maskCharacter?: string;
}
```

### Conclusion

The `maskString` utility provides a flexible and configurable way to anonymize sensitive parts of strings while optionally preserving certain visible segments.
