---
id: sha1
title: SHA-1 Generator
---

## sha1

The `sha1` function computes a SHA-1 digest of the given string using a pure JavaScript implementation.

### Function Signature

```ts
sha1(msg: string): string
```

### Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `msg`     | `string` | Input text to hash. |

### Return Value

Returns the SHA-1 hash as a 40-character hexadecimal string.

### Example Usage

```ts
import { sha1 } from 'nhb-toolbox/hash';

const hash = sha1("hello");
// → "6c530757b6d81f398aacc759ac2bd0cddc9d015e"

const emptyHash = sha1("");
// → "da39a3ee5e6b4b0d3255bfef95601890afd80709"

const passwordHash = sha1("mypassword123");
// → "490f217a586af7c3974123f73df9cf5cb74aa923"
```

### Characteristics

- **Pure JavaScript implementation** - runs on any JavaScript engine
- **Deterministic output** - same input always produces same output
- **40-character hex output** - fixed length regardless of input size
- **One-way function** - cannot be reversed to obtain original input

:::caution[Compatibility Note]
The output may differ from other SHA-1 implementations due to algorithmic or encoding variations, but is consistent within this implementation.
:::

### Common Uses

- Checksum verification
- Git commit hashing
- Data integrity checking
- UUID v5 generation (combined with namespaces)

### Security Note

SHA-1 is no longer considered secure against well-funded attackers. For security-sensitive applications, use SHA-256 or stronger hashing algorithms.

### Internal Usage

This function is used internally for UUID v5 generation:

```ts
// Used inside UUID v5
const digest = sha1(namespace + name);
```
