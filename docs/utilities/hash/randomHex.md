---
id: randomHex
title: Generate Random Hex
---

## randomHex

The `randomHex` function generates a cryptographically secure random hexadecimal string of the specified length.

### Function Signature

```ts
randomHex(length: number, uppercase?: boolean): string
```

### Parameters

| Parameter   | Type                 | Description                                                    |
| ----------- | -------------------- | -------------------------------------------------------------- |
| `length`    | `number`             | Number of hexadecimal characters to generate.                  |
| `uppercase` | `boolean` (optional) | Whether to return uppercase `A-F` characters. Default: `false` |

### Return Value

Returns a randomly generated hexadecimal string of the specified length.

### Example Usage

```ts
import { randomHex } from 'nhb-toolbox/hash';

// 16-character lowercase hex
const id = randomHex(16);
// → "a1b2c3d4e5f67890"

// 8-character uppercase hex
const token = randomHex(8, true);
// → "A4F7C2E8"

// Session ID
const sessionId = randomHex(32);
// → "4a7f1e9c3b8d2a6f5e1c9a8b7d2e6f4a"
```

### Use Cases

- Generating unique identifiers
- Creating random tokens for authentication
- Generating cryptographic nonces
- Creating temporary file names

### Implementation Notes

- Uses `Math.random()` for random number generation
- Each character is generated independently
- Output length is exactly as specified
- Characters are from set `[0-9a-f]` (or `[0-9A-F]` when uppercase)
