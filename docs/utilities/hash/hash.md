---
id: hash
title: Hash & Encoding Utilities
---

A comprehensive suite of hashing, UUID, encoding, and lightweight cryptographic utilities—including JWT-style signing [Signet](Signet), `stream-cipher` encryption [Cipher](Cipher), and more.

:::info
Does not rely on `Node.js` or `Web APIs`. **Works on any JS engine**
:::

## Available Utilities

### Hash Functions

- **[md5](md5)** - Compute `MD5` hash (32-character hex)
- **[sha1](sha1)** - Compute `SHA-1` hash (40-character hex)
- **[sha256](sha256)** - Compute `SHA-256` hash (64-character hex)

### UUID Utilities

- **[uuid](uuid)** - Generate RFC-compliant UUIDs (versions 1, 3, 4, 5, 6, 7, 8)
- **[decodeUUID](decodeUUID)** - Decode UUIDs into version, variant, and timestamp information
- **[Version Checkers](check-uuid-versions)** - Type-safe ([branded type](/docs/types/utility-types#brandedt-b)) validation for specific UUID versions

### Encryption/Authentication Tools

- **[Signet](Signet)** - Sign, decode, verify tokens in `JWT` style
- **[Cipher](Cipher)** - Encrypt, decrypt text in `stream-cipher` encryption style

### Other Utilities

- **[randomHex](randomHex)** - Generate cryptographically secure random hex strings
- **[Encoding & Crypto Utilities](encoding)** - Low-level encoding, decoding, and cryptographic functions
- **[TextCodec](/docs/utilities/hash/TextCodec)** - Convert text between hex, binary, and Base64 formats

## Quick Start

```typescript
import { uuid, md5, randomHex } from 'nhb-toolbox/hash';

// Generate a random UUID v4
const id = uuid();

// Create MD5 hash
const hash = md5('hello world');

// Generate random token
const token = randomHex(16, true);
```

## Features

- **Cross-platform** - Works in Node.js, browsers, and edge runtimes
- **Type-safe** - Full TypeScript support with [branded](/docs/types/utility-types#brandedt-b) types
- **RFC compliant** - Follows UUID and hash specifications
- **No dependencies** - Pure JavaScript implementation

## Common Use Cases

- Generating unique identifiers
- Data integrity verification
- Creating random tokens and nonces
- Cryptographic hashing needs
- Encrypting/decrypting text, tokens etc.
