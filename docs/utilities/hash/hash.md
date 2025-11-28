---
id: hash
title: Hash Utilities
---

A collection of cryptographic and utility functions for hashing, UUID generation, and random string creation.

## Available Utilities

### Hash Functions

- **[md5](md5)** - Compute `MD5` hash (32-character hex)
- **[sha1](sha1)** - Compute `SHA-1` hash (40-character hex)

### UUID Generation

- **[uuid](uuid)** - Generate RFC-compliant UUIDs (versions 1, 3, 4, 5, 6, 7, 8)
- **[decodeUUID](decodeUUID)** - Decode UUIDs into version, variant, and timestamp information
- **[Version Checkers](check-uuid-versions)** - Type-safe validation for specific UUID versions

### Random Generation

- **[randomHex](randomHex)** - Generate cryptographically secure random hex strings

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
- **Type-safe** - Full TypeScript support with branded types
- **RFC compliant** - Follows UUID and hash specifications
- **No dependencies** - Pure JavaScript implementation

## Common Use Cases

- Generating unique identifiers
- Data integrity verification
- Creating random tokens and nonces
- Cryptographic hashing needs
