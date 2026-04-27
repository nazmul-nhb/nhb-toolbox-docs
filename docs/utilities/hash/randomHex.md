---
id: randomHex
title: Generate Random Hex
---

## randomHex

The `randomHex` function generates a random hexadecimal string of the specified length.

:::info
Does not rely on `Node.js` or `Web APIs`. **Works on any JS engine**
:::

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

- This function generates a random hexadecimal string of the specified length.
- If `length` is `0` or negative, an empty string is returned.
- It uses `crypto.getRandomValues` when available for secure randomness, and falls back to `Math.random` if not.
- The output is a string of hex characters (`0–9`, `a–f` or `A–F` when uppercase) with no prefixes or separators.
- The `uppercase` parameter controls whether the hex characters are uppercase or lowercase. By default, it returns lowercase hex.
- The function is designed to be efficient and works in both browser and Node.js environments without relying on external libraries.
