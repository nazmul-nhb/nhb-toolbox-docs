---
id: flattenObjectDotNotation
title: Flatten Object Dot Notation
---

## flattenObjectDotNotation

Converts a nested object structure into a flat object using dot notation for keys.

## Import

```typescript
import { flattenObjectDotNotation } from 'nhb-toolbox';
```

## Usage

### Basic Usage

```typescript
const nested = { user: { name: 'John', address: { city: 'NYC' } } };
const flat = flattenObjectDotNotation(nested);
// Returns { 'user.name': 'John', 'user.address.city': 'NYC' }
```

## API Reference

### Type Parameters

| Name | Description          |
| ---- | -------------------- |
| `T`  | Type of input object |

### Parameters

| Name     | Type | Description              |
| -------- | ---- | ------------------------ |
| `object` | `T`  | Nested object to flatten |

### Returns

`FlattenDotValue<MergeAll<[T]>`: Flat object (properly typed) with dot-notation keys

## Key Features

1. **Deep Flattening**: Handles arbitrarily nested objects
2. **Dot Notation**: Creates keys like 'parent.child.value'
3. **Type Safety**: Maintains proper TypeScript typing
4. **Non-Destructive**: Preserves original object

## Examples

### Simple Object

```typescript
const obj = { a: 1, b: { c: 2 } };
flattenObjectDotNotation(obj);
// { 'a': 1, 'b.c': 2 }
```

### Complex Nesting

```typescript
const config = {
  server: {
    host: 'localhost',
    ports: { http: 80, https: 443 }
  }
};
flattenObjectDotNotation(config);
// {
//   'server.host': 'localhost',
//   'server.ports.http': 80,
//   'server.ports.https': 443
// }
```

## Limitations

1. **Arrays**: Will be treated as terminal values (not flattened)
2. **Special Objects**: Date, RegExp etc. will be kept as-is
3. **Circular References**: May cause stack overflow for deeply nested objects and arrays
4. **Key Collisions**: Potential for duplicate keys in complex cases

## Type Definition

```typescript
type GenericObject = Record<string, any>;
```

## Recommended Use Cases

- Configuration normalization
- API request/response transformation
- Database document flattening
- Object key path visualization
