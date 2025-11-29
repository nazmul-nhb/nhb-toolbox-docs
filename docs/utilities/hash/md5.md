---
id: md5
title: MD5 Generator
---

## md5

The `md5` function computes an `MD5` digest of the given string using a pure JavaScript implementation.

### Function Signature

```ts
md5(str: string): string
```

### Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `str`     | `string` | Input text to hash. |

### Return Value

Returns the `MD5` hash as a 32-character hexadecimal string.

### Example Usage

```ts
import { md5 } from 'nhb-toolbox/hash';

const hash = md5("hello");
// → "5d41402abc4b2a76b9719d911017c592"

const emptyHash = md5("");
// → "d41d8cd98f00b204e9800998ecf8427e"

const fileHash = md5("file content");
// → "d10b4c3ff123b26dc068d43a8bef2d23"
```

### Characteristics

- **Pure JavaScript implementation** - runs on any JavaScript engine
- **Deterministic output** - same input always produces same output
- **32-character hex output** - fixed length regardless of input size
- **One-way function** - cannot be reversed to obtain original input

### Common Uses

- Checksum verification
- Data integrity checking
- Non-cryptographic hashing
- File fingerprinting
- UUID `v3` generation (combined with namespaces)

### Security Note

`MD5` is considered cryptographically broken and unsuitable for security-sensitive applications. Use stronger hashes like `SHA-256` for security purposes.

### Internal Usage

This function is used internally for [UUID](uuid) `v3` generation:

```ts
// Used inside UUID v3
const digest = md5(namespace + name);
```
