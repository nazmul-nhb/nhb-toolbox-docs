---
id: check-uuid-versions
title: Check UUID Versions
---

<!-- markdownlint-disable-file MD024 -->

The UUID version checking functions provide type-safe validation for specific UUID versions. Each function checks if a value is a valid UUID of the specified version and returns a TypeScript ([branded](/docs/types/utility-types#brandedt-b)) type predicate.

## Available Version Checkers

### isUUIDv1

Checks if a value is a valid UUID version 1 (time-based).

```ts
isUUIDv1(value: unknown): value is UUID<'v1'>
```

**Example:**

```ts
import { isUUIDv1 } from 'nhb-toolbox/hash';

const id = "d7b3a3d0-9e8b-11ef-9c5e-0a5e5e5e5e5e";
if (isUUIDv1(id)) {
  // id is now typed as UUID<'v1'>
  console.log("This is a time-based UUID v1");
}
```

### isUUIDv2

Checks if a value is a valid UUID version 2 (DCE security).

```ts
isUUIDv2(value: unknown): value is UUID<'v2'>
```

**Example:**

```ts
import { isUUIDv2 } from 'nhb-toolbox/hash';

const id = "000003e8-9e8b-21ef-9c5e-0a5e5e5e5e5e";
if (isUUIDv2(id)) {
  // id is now typed as UUID<'v2'>
  console.log("This is a DCE security UUID v2");
}
```

### isUUIDv3

Checks if a value is a valid UUID version 3 (MD5 hash-based).

```ts
isUUIDv3(value: unknown): value is UUID<'v3'>
```

**Example:**

```ts
import { isUUIDv3 } from 'nhb-toolbox/hash';

const id = "5df41881-3aed-3515-88a7-2f4a814cf09e";
if (isUUIDv3(id)) {
  // id is now typed as UUID<'v3'>
  console.log("This is an MD5 hash-based UUID v3");
}
```

### isUUIDv4

Checks if a value is a valid UUID version 4 (random).

```ts
isUUIDv4(value: unknown): value is UUID<'v4'>
```

**Example:**

```ts
import { isUUIDv4 } from 'nhb-toolbox/hash';

const id = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
if (isUUIDv4(id)) {
  // id is now typed as UUID<'v4'>
  console.log("This is a random UUID v4");
}
```

### isUUIDv5

Checks if a value is a valid UUID version 5 (SHA-1 hash-based).

```ts
isUUIDv5(value: unknown): value is UUID<'v5'>
```

**Example:**

```ts
import { isUUIDv5 } from 'nhb-toolbox/hash';

const id = "aad5a5a7-6c6a-5b5c-8c8c-9c9c9c9c9c9c";
if (isUUIDv5(id)) {
  // id is now typed as UUID<'v5'>
  console.log("This is a SHA-1 hash-based UUID v5");
}
```

### isUUIDv6

Checks if a value is a valid UUID version 6 (reordered time-based).

```ts
isUUIDv6(value: unknown): value is UUID<'v6'>
```

**Example:**

```ts
import { isUUIDv6 } from 'nhb-toolbox/hash';

const id = "1f0cc416-05fd-6880-af56-f3f09b82e5e6";
if (isUUIDv6(id)) {
  // id is now typed as UUID<'v6'>
  console.log("This is a reordered time-based UUID v6");
}
```

### isUUIDv7

Checks if a value is a valid UUID version 7 (Unix time-based).

```ts
isUUIDv7(value: unknown): value is UUID<'v7'>
```

**Example:**

```ts
import { isUUIDv7 } from 'nhb-toolbox/hash';

const id = "017f22e2-79b0-7cc3-98c4-dc0c0c07398f";
if (isUUIDv7(id)) {
  // id is now typed as UUID<'v7'>
  console.log("This is a Unix time-based UUID v7");
}
```

### isUUIDv8

Checks if a value is a valid UUID version 8 (custom).

```ts
isUUIDv8(value: unknown): value is UUID<'v8'>
```

**Example:**

```ts
import { isUUIDv8 } from 'nhb-toolbox/hash';

const id = "019ac9eb-ccd6-8bea-b9e4-ffed911153e6";
if (isUUIDv8(id)) {
  // id is now typed as UUID<'v8'>
  console.log("This is a UUID v8");
}
```

## Common Usage Pattern

```ts
import { isUUIDv4, isUUIDv7 } from 'nhb-toolbox/hash';

function processUUID(id: string) {
  if (isUUIDv4(id)) {
    // TypeScript knows this is UUID<'v4'>
    return `Random UUID: ${id}`;
  }
  
  if (isUUIDv7(id)) {
    // TypeScript knows this is UUID<'v7'>
    return `Time-based UUID: ${id}`;
  }
  
  return `Other UUID type: ${id}`;
}
```

## Features

- **Type Predicates**: Each function acts as a TypeScript type guard
- **Version-specific Validation**: Precisely checks UUID version bits
- **Performance Optimized**: Lightweight validation without full parsing
- **RFC Compliant**: Follows UUID version specification standards

## See Also

- [uuid](uuid) - Generate UUIDs across all versions
- [decodeUUID](decodeUUID) - Decode UUIDs into structured information
- [isUUID](/docs/guards/mixed-guards#isuuid) - General UUID validation (any version). All the version checkers are derived from this guard.
