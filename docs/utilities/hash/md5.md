---
id: md5
title: MD5 Generator
---

## md5

The `md5` function computes an MD5 digest of the given string using a pure JavaScript implementation.

### Function Signature

```ts
md5(str: string): string
```

### Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `str`     | `string` | Input text to hash. |

### Return Value

Returns the MD5 hash as a 32-character hexadecimal string.

### Example Usage

```ts
import { md5 } from 'nhb-toolbox/hash';

const hash = md5("hello");
// → "2a40415d762a4bbc919d71b992c51710"

const emptyHash = md5("");
// → "d98c1dd404b2008f980980e97e42f8ec"

const fileHash = md5("file content");
// → "3f4c0bd16db223f13ad468c0232def8b"
```

### Characteristics

- **Pure JavaScript implementation** - runs on any JavaScript engine
- **Deterministic output** - same input always produces same output
- **32-character hex output** - fixed length regardless of input size
- **One-way function** - cannot be reversed to obtain original input

:::caution[Compatibility Note]
The output may differ from other MD5 implementations due to algorithmic or encoding variations, but is consistent within this implementation.
:::

### Common Uses

- Checksum verification
- Data integrity checking
- Non-cryptographic hashing
- File fingerprinting

### Security Note

MD5 is considered cryptographically broken and unsuitable for security-sensitive applications. Use stronger hashes like SHA-256 for security purposes.

### Internal Usage

This function is used internally for UUID v3 generation:

```ts
// Used inside UUID v3
const digest = md5(namespace + name);
```
