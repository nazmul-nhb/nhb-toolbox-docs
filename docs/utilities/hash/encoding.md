---
id: encoding
title: Encoding & Crypto Utilities
---

<!-- markdownlint-disable-file MD024 -->

Low-level encoding, decoding, and cryptographic functions for working with bytes, UTF-8, Base64, and SHA-256.

---

## UTF-8 Utilities

### utf8ToBytes

Converts a UTF-8 string to a byte array.

#### Function Signature

```ts
utf8ToBytes(str: string): Uint8Array
```

| Parameter | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `str`     | `string` | The input string to encode as UTF-8 bytes |

**Returns:** `Uint8Array` containing the UTF-8 encoded bytes

#### Examples

```typescript
const bytes = utf8ToBytes('Hello 🌍');
// Uint8Array(10) [72, 101, 108, 108, 111, 32, 240, 159, 140, 141]
```

#### Features

- Handles all Unicode code points including supplementary characters
- Follows UTF-8 specification (1-4 byte sequences)
- Silent handling of invalid surrogate pairs

---

### bytesToUtf8

Converts UTF-8 encoded bytes back to a string.

#### Function Signature

```ts
bytesToUtf8(bytes: Uint8Array): string
```

| Parameter | Type         | Description         |
| --------- | ------------ | ------------------- |
| `bytes`   | `Uint8Array` | UTF-8 encoded bytes |

**Returns:** Decoded string

#### Examples

```typescript
const bytes = new Uint8Array([72, 101, 108, 108, 111]);
const str = bytesToUtf8(bytes); // 'Hello'
```

---

## Base64 Utilities

### base64ToBytes

Decodes a Base64 string to bytes.

#### Function Signature

```ts
base64ToBytes(str: string): Uint8Array
```

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `str`     | `string` | Base64-encoded string |

**Returns:** `Uint8Array` containing decoded bytes

#### Examples

```typescript
const bytes = base64ToBytes('aGVsbG8=');
// Uint8Array(5) [104, 101, 108, 108, 111]
```

#### Supports

- Standard Base64 alphabet (A-Z, a-z, 0-9, +, /)
- Padding with '=' characters
- No external dependencies (pure JS)

---

### bytesToBase64

Encodes bytes to a Base64 string.

#### Function Signature

```ts
bytesToBase64(bytes: Uint8Array): string
```

| Parameter | Type         | Description     |
| --------- | ------------ | --------------- |
| `bytes`   | `Uint8Array` | Bytes to encode |

**Returns:** Base64-encoded string

#### Examples

```typescript
const bytes = new Uint8Array([104, 101, 108, 108, 111]);
const b64 = bytesToBase64(bytes); // 'aGVsbG8='
```

---

## Hashing & Crypto Utilities

### sha256Bytes

Computes SHA-256 hash of raw bytes (pure JS implementation).

#### Function Signature

```ts
sha256Bytes(message: Uint8Array): Uint8Array
```

| Parameter | Type         | Description   |
| --------- | ------------ | ------------- |
| `message` | `Uint8Array` | Bytes to hash |

**Returns:** `Uint8Array(32)` containing SHA-256 hash

#### Examples

```typescript
const bytes = new Uint8Array([104, 101, 108, 108, 111]); // "hello"
const hash = sha256Bytes(bytes);
// Uint8Array(32) [44, 242, 77, 186, ...]
```

#### Implementation

- Follows FIPS 180-4 specification
- Big-endian byte order
- Processes 512-bit blocks
- No external dependencies

---

### hmacSha256

Computes HMAC-SHA256 for message authentication.

#### Function Signature

```ts
hmacSha256(key: Uint8Array, message: Uint8Array): Uint8Array
```

| Parameter | Type         | Description      |
| --------- | ------------ | ---------------- |
| `key`     | `Uint8Array` | Secret key bytes |
| `message` | `Uint8Array` | Message bytes    |

**Returns:** `Uint8Array(32)` HMAC-SHA256 tag

#### Examples

```typescript
const key = new TextEncoder().encode('secret');
const msg = new TextEncoder().encode('Hello');
const hmac = hmacSha256(key, msg);
```

#### Algorithm

1. Keys >64 bytes: hashed with SHA-256
2. Keys \<64 bytes: padded with zeros
3. Inner hash: `SHA-256((key ⊕ 0x36) || message)`
4. Outer hash: `SHA-256((key ⊕ 0x5C) || inner_hash)`

#### Use Cases

- API authentication tokens
- Message integrity verification
- Key derivation (HKDF)

---

## Binary Conversion Utilities

### concatBytes

Concatenates multiple `Uint8Array`s into one.

#### Function Signature

```ts
concatBytes(...parts: Uint8Array[]): Uint8Array
```

| Parameter | Type           | Description           |
| --------- | -------------- | --------------------- |
| `parts`   | `Uint8Array[]` | Arrays to concatenate |

**Returns:** New `Uint8Array` with all bytes combined

#### Examples

```typescript
const a = new Uint8Array([1, 2]);
const b = new Uint8Array([3, 4]);
const result = concatBytes(a, b);
// Uint8Array(4) [1, 2, 3, 4]
```

**Performance:** Allocates once and uses `set()` for optimal copying.

---

### uint8To32ArrayBE

Converts bytes to 32-bit integers (big-endian).

#### Function Signature

```ts
uint8To32ArrayBE(bytes: Uint8Array): Uint32Array
```

| Parameter | Type         | Description      |
| --------- | ------------ | ---------------- |
| `bytes`   | `Uint8Array` | Bytes to convert |

**Returns:** `Uint32Array` of 32-bit words

#### Examples

```typescript
const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9A]);
const words = uint8To32ArrayBE(bytes);
// Uint32Array(2) [0x12345678, 0x9A000000]
```

#### Notes

- Length doesn't need to be multiple of 4
- Missing bytes padded with zeros

---

### intTo4BytesBE

Converts 32-bit integer to 4 bytes (big-endian).

#### Function Signature

```ts
intTo4BytesBE(n: number): Uint8Array
```

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `n`       | `number` | 32-bit integer |

**Returns:** `Uint8Array(4)` big-endian bytes

#### Examples

```typescript
const bytes = intTo4BytesBE(0x12345678);
// Uint8Array(4) [0x12, 0x34, 0x56, 0x78]
```

#### Use Cases

- Network protocol headers
- Cryptographic operations
- Integer serialization

---

### bytesToHex

Converts bytes to lowercase hexadecimal string.

#### Function Signature

```ts
bytesToHex(bytes: Uint8Array): string
```

| Parameter | Type         | Description      |
| --------- | ------------ | ---------------- |
| `bytes`   | `Uint8Array` | Bytes to convert |

**Returns:** Lowercase hex string

#### Examples

```typescript
const bytes = new Uint8Array([0x12, 0xAB, 0xFF]);
const hex = bytesToHex(bytes); // '12abff'
```

#### Features

- Always lowercase
- Zero-pads single digits (0x0F → "0f")
- No "0x" prefix

#### Use Cases

- Displaying cryptographic hashes
- Binary data debugging
- JSON serialization of binary data

---

## Common Workflows

### String → SHA-256 Hex

```typescript
const text = 'Hello, world!';
const bytes = utf8ToBytes(text);
const hash = sha256Bytes(bytes);
const hexHash = bytesToHex(hash);
// '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3'
```

### Base64 → UTF-8 String

```typescript
const b64 = 'SGVsbG8g8J+MjQ=='; // "Hello 🌍"
const bytes = base64ToBytes(b64);
const text = bytesToUtf8(bytes);
// 'Hello 🌍'
```

### HMAC-SHA256 with String Inputs

```typescript
const encoder = new TextEncoder();
const key = encoder.encode('my-secret-key');
const message = encoder.encode('data-to-sign');
const hmac = hmacSha256(key, message);
const signature = bytesToHex(hmac);
```

### Concatenating Hashes

```typescript
const hash1 = sha256Bytes(utf8ToBytes('part1'));
const hash2 = sha256Bytes(utf8ToBytes('part2'));
const combinedHash = sha256Bytes(concatBytes(hash1, hash2));
```

---

## Performance Notes

- **Pure JavaScript**: No Node.js `crypto` or Web APIs or other dependencies
- **Optimized**: Byte operations use `Uint8Array.set()` and `DataView` for performance
- **Memory Efficient**: Minimal allocations, reuse of buffers where possible
- **Tree-shakeable**: Individual functions can be imported separately
