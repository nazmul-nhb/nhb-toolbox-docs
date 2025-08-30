---
id: flattenObjectKeyValue
title: Flatten Object Key Value
---

## flattenObjectKeyValue

Recursively flattens a nested object structure into a single-level object while preserving leaf values.

## Import

```typescript
import { flattenObjectKeyValue } from 'nhb-toolbox';
```

## Usage

### Basic Usage

```typescript
const nested = { 
  user: { 
    details: { 
      name: 'John',
      age: 30 
    } 
  } 
};
const flat = flattenObjectKeyValue(nested);
// Returns { name: 'John', age: 30 }
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

`FlattenLeafValue<MergeAll<[T]>>`: Flat object with all leaf values (type cast to input types)

## Key Features

1. **Deep Flattening**: Recursively processes nested objects
2. **Value Preservation**: Maintains all terminal values
3. **Non-Destructive**: Doesn't modify original object
4. **Type Safety**: Maintains proper TypeScript typing
5. **Simple Output**: Single-level key-value structure

## Examples

### Simple Nesting

```typescript
const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
flattenObjectKeyValue(obj);
// { a: 1, c: 2, e: 3 }
```

### Mixed Types

```typescript
const data = {
  meta: {
    version: '1.0',
    config: {
      debug: true
    }
  },
  items: ['a', 'b'] // Arrays remain untouched
};
flattenObjectKeyValue(data);
// { version: '1.0', debug: true, items: ['a', 'b'] }
```

## Limitations

1. **Key Collisions**: Nested objects may have duplicate keys that get overwritten
2. **Arrays**: Treated as terminal values (not flattened)
3. **Circular References**: May cause stack overflow for deeply nested objects and arrays

## Type Definition

```typescript
type GenericObject = Record<string, any>;
```

## Recommended Use Cases

- Simplifying complex configurations
- Preparing data for key-value stores
- Redux state normalization
- Form data processing
- API response simplification

## Kye differences from [flattenObjectDotNotation](flattenObjectDotNotation)

1. Doesn't use dot notation - merges keys at root level
2. More aggressive flattening (loses structural information)
3. Better for cases where you only care about terminal values
4. Simpler output format for certain use cases
