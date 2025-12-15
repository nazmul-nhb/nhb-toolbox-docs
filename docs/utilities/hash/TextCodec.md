---
id: TextCodec
title: Encode & Decode Text
---

<!-- markdownlint-disable-file MD024 -->

## TextCodec

Provides **UTF-8–safe** conversions between text, hex, binary, and Base64 representations using byte-level transformations.

### Overview

`TextCodec` is a static utility class for encoding and decoding text across different binary representations. All conversions go through UTF-8 bytes as an intermediate format, ensuring proper handling of Unicode characters across all formats, using engine agnostic `Uint8Array` operations.

:::info
Does not rely on `Node.js` or `Web APIs`. **Works on any JS engine**
:::

### Key Features

- **Unicode-safe**: Full support for emoji, non-Latin scripts, and extended characters
- **Engine-agnostic**: Uses `Uint8Array` for consistent behavior across browsers and Node.js
- **Automatic validation**: Built-in input validation with safe fallbacks
- **Flexible formatting**: Spaced or unspaced output options
- **Type-safe**: Written in TypeScript with proper type guards
- **Zero dependencies**: Pure JavaScript implementation

### Import

```typescript
import { TextCodec } from 'nhb-toolbox/hash';
```

### Quick Start

```typescript
// Basic text encoding/decoding
TextCodec.utf8ToHex('Hello'); // '48 65 6c 6c 6f'
TextCodec.hexToUtf8('48 65 6c 6c 6f'); // 'Hello'

// Unicode support
TextCodec.utf8ToHex('ভাষা'); // 'e0 a6 ad e0 a6 be e0 a6 b7 e0 a6 be'
TextCodec.hexToUtf8('e0 a6 ad e0 a6 be'); // 'ভা'

// Format conversions
TextCodec.hexToBinary('ff 0a'); // '11111111 00001010'
TextCodec.binaryToBase64('01001000 01101001'); // 'SGk='
```

---

### Validation Methods

#### `isValidHex`

Validates whether a string represents a valid hexadecimal byte sequence.

```typescript
static isValidHex(hex: string): boolean
```

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `hex`     | `string` | Hex string (spaced or unspaced) |

**Returns:** `true` if valid hex byte string

:::tip[Equivalent]
Equivalent standalone type guard: [**isHexString**](/docs/guards/mixed-guards#ishexstring)
:::

##### Examples

```typescript
TextCodec.isValidHex('ff 0a');      // true
TextCodec.isValidHex('ff0a');       // true
TextCodec.isValidHex('FFAA');       // true (uppercase)
TextCodec.isValidHex('invalid');    // false
TextCodec.isValidHex('123');        // false (odd length)
TextCodec.isValidHex('12 34 g5');   // false (contains 'g')
```

---

#### `isValidBinary`

Validates whether a string represents a valid binary byte sequence.

```typescript
static isValidBinary(binary: string): boolean
```

| Parameter | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| `binary`  | `string` | Binary string (spaced or unspaced) |

**Returns:** `true` if valid binary byte string

:::tip[Equivalent]
Equivalent standalone type guard: [**isBinaryString**](/docs/guards/mixed-guards#isbinarystring)
:::

##### Examples

```typescript
TextCodec.isValidBinary('01000001');           // true
TextCodec.isValidBinary('01000001 01100010');  // true
TextCodec.isValidBinary('0100001');            // false (7 bits)
TextCodec.isValidBinary('010000010');          // false (9 bits)
TextCodec.isValidBinary('01200001');           // false (contains '2')
```

---

#### `isValidBase64`

Validates whether a string represents a valid Base64-encoded string.

```typescript
static isValidBase64(b64: string): boolean
```

| Parameter | Type     | Description            |
| --------- | -------- | ---------------------- |
| `b64`     | `string` | Base64 string to check |

**Returns:** `true` if valid Base64-encoded string

:::tip[Equivalent]
Equivalent standalone type guard: [**isBase64**](/docs/guards/mixed-guards#isbase64)
:::

##### Examples

```typescript
TextCodec.isValidBase64('SGVsbG8=');   // true
TextCodec.isValidBase64('YWJj');       // true
TextCodec.isValidBase64('NotBase64!'); // false
TextCodec.isValidBase64('SGVsbG8');    // false (missing padding)
```

---

### UTF-8 ↔ Text Conversions

#### `utf8ToHex`

Converts UTF-8 text into hexadecimal byte representation.

```typescript
static utf8ToHex(text: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `text`    | `string`  | UTF-8 text to convert                                   |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Hexadecimal byte string

##### Examples

```typescript
TextCodec.utf8ToHex('Hi');              // '48 69'
TextCodec.utf8ToHex('Hi', false);       // '4869'
TextCodec.utf8ToHex('Hello World');     // '48 65 6c 6c 6f 20 57 6f 72 6c 64'
TextCodec.utf8ToHex('🎉');              // 'f0 9f 8e 89' (Unicode emoji)
```

---

#### `utf8ToBinary`

Converts UTF-8 text into binary byte representation.

```typescript
static utf8ToBinary(text: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `text`    | `string`  | UTF-8 text to convert                                   |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Binary byte string

##### Examples

```typescript
TextCodec.utf8ToBinary('A');            // '01000001'
TextCodec.utf8ToBinary('AB', false);    // '0100000101000010'
TextCodec.utf8ToBinary('Hi');           // '01001000 01101001'
```

---

#### `hexToUtf8`

Converts hexadecimal byte string into UTF-8 text.

```typescript
static hexToUtf8(hex: string): string
```

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `hex`     | `string` | Hexadecimal byte string |

**Returns:** Decoded UTF-8 text (empty string for invalid input)

##### Examples

```typescript
TextCodec.hexToUtf8('48 69');                 // 'Hi'
TextCodec.hexToUtf8('4869');                  // 'Hi'
TextCodec.hexToUtf8('e0 a6 ad e0 a6 be');    // 'ভা' (Bengali)
TextCodec.hexToUtf8('invalid');               // '' (empty string)
```

---

#### `binaryToUtf8`

Converts binary byte string into UTF-8 text.

```typescript
static binaryToUtf8(binary: string): string
```

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `binary`  | `string` | Binary byte string |

**Returns:** Decoded UTF-8 text (empty string for invalid input)

##### Examples

```typescript
TextCodec.binaryToUtf8('01001000 01101001');      // 'Hi'
TextCodec.binaryToUtf8('0100100001101001');       // 'Hi'
TextCodec.binaryToUtf8('01000001');               // 'A'
TextCodec.binaryToUtf8('010');                    // '' (invalid input)
```

---

### Hexadecimal ↔ Binary Conversions

#### `hexToBinary`

Converts hexadecimal byte string into binary byte string.

```typescript
static hexToBinary(hex: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `hex`     | `string`  | Hexadecimal byte string                                 |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Binary byte string (empty string for invalid input)

##### Examples

```typescript
TextCodec.hexToBinary('ff');              // '11111111'
TextCodec.hexToBinary('ff 0a');           // '11111111 00001010'
TextCodec.hexToBinary('ff0a', false);     // '1111111100001010'
TextCodec.hexToBinary('invalid');         // '' (empty string)
```

---

#### `binaryToHex`

Converts binary byte string into hexadecimal byte string.

```typescript
static binaryToHex(binary: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `binary`  | `string`  | Binary byte string                                      |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Hexadecimal byte string (empty string for invalid input)

##### Examples

```typescript
TextCodec.binaryToHex('11111111');              // 'ff'
TextCodec.binaryToHex('11111111 00001010');     // 'ff 0a'
TextCodec.binaryToHex('1111111100001010', false); // 'ff0a'
TextCodec.binaryToHex('1111111');               // '' (7 bits, invalid)
```

---

### Base64 Conversions

#### `utf8ToBase64`

Converts UTF-8 text into a Base64-encoded string.

```typescript
static utf8ToBase64(text: string): string
```

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `text`    | `string` | UTF-8 text to encode |

**Returns:** Base64 encoded string (empty string for empty input)

##### Examples

```typescript
TextCodec.utf8ToBase64('Hello');        // 'SGVsbG8='
TextCodec.utf8ToBase64('Hi');           // 'SGk='
TextCodec.utf8ToBase64('🎉');           // '8J+OiQ==' (Unicode emoji)
TextCodec.utf8ToBase64('');             // ''
```

---

#### `base64ToUtf8`

Converts a Base64-encoded string into UTF-8 text.

```typescript
static base64ToUtf8(b64: string): string
```

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `b64`     | `string` | Base64 encoded string |

**Returns:** Decoded UTF-8 text (empty string for invalid input)

##### Examples

```typescript
TextCodec.base64ToUtf8('SGVsbG8=');     // 'Hello'
TextCodec.base64ToUtf8('SGk=');         // 'Hi'
TextCodec.base64ToUtf8('NotBase64!');   // '' (invalid input)
```

---

### Cross-Format Conversions

#### `base64ToHex`

Converts Base64 directly into hexadecimal byte string.

```typescript
static base64ToHex(b64: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `b64`     | `string`  | Base64 encoded string                                   |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Hexadecimal byte string

##### Examples

```typescript
TextCodec.base64ToHex('SGVsbG8=');      // '48 65 6c 6c 6f'
TextCodec.base64ToHex('SGk=', false);   // '4869'
```

---

#### `base64ToBinary`

Converts Base64 directly into binary byte string.

```typescript
static base64ToBinary(b64: string, spaced = true): string
```

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `b64`     | `string`  | Base64 encoded string                                   |
| `spaced`  | `boolean` | Whether to separate bytes with spaces (default: `true`) |

**Returns:** Binary byte string

##### Examples

```typescript
TextCodec.base64ToBinary('SGVsbG8=');   // '01001000 01100101 01101100 01101100 01101111'
```

---

#### `hexToBase64`

Converts hexadecimal byte string into a Base64 string.

```typescript
static hexToBase64(hex: string): string
```

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `hex`     | `string` | Hexadecimal byte string |

**Returns:** Base64 encoded string

##### Examples

```typescript
TextCodec.hexToBase64('48 69');         // 'SGk='
TextCodec.hexToBase64('4869');          // 'SGk='
```

---

#### `binaryToBase64`

Converts binary byte string into a Base64 string.

```typescript
static binaryToBase64(binary: string): string
```

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `binary`  | `string` | Binary byte string |

**Returns:** Base64 encoded string

##### Examples

```typescript
TextCodec.binaryToBase64('01001000 01101001');  // 'SGk='
```

---

### Usage Patterns

#### Working with Cryptographic Data

```typescript
// Hash verification
const storedHash = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';
const userInput = 'hello';

if (TextCodec.isValidHex(storedHash)) {
  const hashBytes = TextCodec.hexToUtf8(storedHash);
  // Compare with computed hash...
}
```

#### Data Serialization

```typescript
// Encode data for storage
const data = { message: 'Hello World', timestamp: Date.now() };
const jsonString = JSON.stringify(data);
const encoded = TextCodec.utf8ToBase64(jsonString);
// Store encoded...

// Decode when reading
const decoded = TextCodec.base64ToUtf8(encoded);
const restoredData = JSON.parse(decoded);
```

#### Network Protocols

```typescript
// Parse binary protocol messages
const rawHex = '01 02 ff 00 0a';
if (TextCodec.isValidHex(rawHex)) {
  const binaryView = TextCodec.hexToBinary(rawHex);
  const asciiText = TextCodec.hexToUtf8(rawHex);
  // Process according to protocol...
}
```

#### Debugging Binary Data

```typescript
// Convert text to different binary representations for inspection
const text = 'Hello';
const hex = TextCodec.utf8ToHex(text);        // '48 65 6c 6c 6f'
const binary = TextCodec.utf8ToBinary(text);  // '01001000 01100101 01101100 01101100 01101111'
const base64 = TextCodec.utf8ToBase64(text);  // 'SGVsbG8='

// Debug unknown binary data by converting to readable formats
const unknownHex = 'ff a1 00 3e';
if (TextCodec.isValidHex(unknownHex)) {
  const asText = TextCodec.hexToUtf8(unknownHex);    // Try to decode as UTF-8
  const asBinary = TextCodec.hexToBinary(unknownHex); // View as binary
  const asBase64 = TextCodec.hexToBase64(unknownHex); // Convert to Base64
  // All three representations help understand the data
}
```

---

### Error Handling

All methods safely handle invalid input:

```typescript
// Invalid hex returns empty string
TextCodec.hexToUtf8('invalid!');     // ''
TextCodec.hexToBinary('123');        // '' (odd length)

// Invalid binary returns empty string
TextCodec.binaryToUtf8('010');       // ''
TextCodec.binaryToHex('0100000');    // '' (7 bits)

// Invalid Base64 returns empty string
TextCodec.base64ToUtf8('NotBase64'); // ''

// Empty input returns empty string
TextCodec.utf8ToHex('');             // ''
TextCodec.utf8ToBase64('');          // ''
```

---

### Performance Notes

- All methods are `static` - no instance creation needed
- UTF-8 conversion is handled by engine agnostic algorithm, **works on any JS engine**
- Byte operations are optimized for minimal memory allocation
- Validation happens automatically in conversion methods
- O(n) time complexity for all conversions

---

### Unicode Support

All methods fully support Unicode characters:

```typescript
// Emoji
TextCodec.utf8ToHex('🎉');      // 'f0 9f 8e 89'
TextCodec.utf8ToBase64('🎉');   // '8J+OiQ=='

// Non-Latin scripts
TextCodec.utf8ToHex('日本語');  // 'e6 97 a5 e6 9c ac e8 aa 9e'
TextCodec.utf8ToHex('العربية'); // 'd8 a7 d9 84 d8 b9 d8 b1 d8 a8 d9 8a d8 a9'
```

---

### Related Utilities

For lower-level operations, see:

- [**utf8ToBytes**](encoding#utf8tobytes) - Convert text to raw bytes
- [**bytesToUtf8**](encoding#bytestoutf8) - Convert bytes to text
- [**hexToBytes**](encoding#hextobytes) - Convert hex to raw bytes
- [**bytesToHex**](encoding#bytestohex) - Convert bytes to hex
- [**base64ToBytes**](encoding#base64tobytes) - Convert Base64 to bytes
- [**bytesToBase64**](encoding#bytestobase64) - Convert bytes to Base64
