---
id: uuid
title: Generate UUID
---

## uuid

The `uuid` function generates UUIDs across all major RFC-compliant versions (1, 3, 4, 5, 6, 7, 8), following standards from RFC4122. Default version is `v4`.

### Function Signature & Types

```ts
// Function Signature
uuid<V extends SupportedVersion = 'v4'>(options?: UUIDOptions<V>): UUID<V>

/** UUID versions as string from `v1-v8` */
type UUIDVersion = `v${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

/** Supported UUID versions (without `v2`) as string */
type SupportedVersion = `v${1 | 3 | 4 | 5 | 6 | 7 | 8}`;

/** Branded UUID string type */
type UUID<V extends UUIDVersion> = Branded<string, V>;

/** Options for UUID generation */
type UUIDOptions<V extends SupportedVersion = 'v4'> = 
  V extends 'v3' | 'v5' 
    ? { version: V; namespace: string; name: string; uppercase?: boolean }
    : { version?: V; uppercase?: boolean };
```

### Parameters

| Parameter | Type                        | Description                                                          |
| --------- | --------------------------- | -------------------------------------------------------------------- |
| `options` | `UUIDOptions<V>` (optional) | Controls version, formatting, and required fields for `v3` and `v5`. |

### Version Behavior

- **`v1`** → Timestamp & node-identifier–based
- **`v3`** → MD5(namespace + name)
- **`v4`** → Pure random (correct variant + version injection)
- **`v5`** → SHA-1(namespace + name)
- **`v6`** → Re-ordered timestamp variant of `v1` (lexicographically sortable)
- **`v7`** → Unix-time–based, monotonic-friendly
- **`v8`** → Custom layout, "Future" variant (timestamp + randomness)

### Return Value

Returns a 5-part UUID string formatted with correct version/variant bits as a [*branded type*](/docs/types/utility-types#brandedt-b).

:::caution[Warning]
Throws `Error` if `namespace` is missing or *not a valid uuid* or *name is not a valid string* for `v3` and `v5`!
:::

### Example Usage

```ts
import { uuid } from 'nhb-toolbox/hash';

// Generate a random UUID v4 (default)
const id1 = uuid();
// → "f47ac10b-58cc-4372-a567-0e02b2c3d479"

// Generate uppercase v7
const id2 = uuid({ version: 'v7', uppercase: true });
// → "017F22E2-79B0-7CC3-98C4-DC0C0C07398F"

// Generate v5 UUID with namespace
const id3 = uuid({
  version: 'v5',
  namespace: uuid(),
  name: 'example'
});
// → "aad5a5a7-6c6a-5b5c-8c8c-9c9c9c9c9c9c"

// Generate v3 UUID
const id4 = uuid({
  version: 'v3', 
  namespace: uuid(),
  name: 'test'
});
// → "5df41881-3aed-3515-88a7-2f4a814cf09e"
```

### Notes

- **Engine Agnostic**: Provides complete RFC compliance without relying on crypto APIs
- **Deterministic**: `v3` and `v5` use internal MD5/SHA-1 implementations and remain fully deterministic
- **Privacy Focused**: `v1` and `v6` use pseudo-random node identifiers, not real MAC addresses

### Limitations

- **`v1`/`v6`**: Node identifier is pseudo-random, not derived from real MAC addresses
- **`v3`/`v5`**: MD5/SHA-1 algorithms follow RFC specs but are not cryptographically secure
- **`v7`**: Millisecond precision; extremely high throughput may cause rare collisions
- **`v8`**: Uses simple timestamp + randomness layout; custom layouts not supported

### See Also

- [md5](md5) - MD5 hashing implementation used in v3 UUIDs
- [sha1](sha1) - SHA-1 hashing implementation used in v5 UUIDs
- [randomHex](randomHex) - For hex-only strings with custom length
- [generateRandomID](/docs/utilities/string/generateRandomID) - For customized ID generation
