---
id: mergeObjects
title: Merge Objects
---

## mergeObjects

Deeply merges two or more objects using a Map for efficient key-value storage and conflict resolution.

## Import

```typescript
import { mergeObjects } from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
function mergeObjects<T extends GenericObject>(...objects: T[]): T
```

## Usage

### Basic Merging

```typescript
const obj1 = { a: 1, b: { x: 10 } };
const obj2 = { b: { y: 20 }, c: 3 };
const merged = mergeObjects(obj1, obj2);
// Returns { a: 1, b: { x: 10, y: 20 }, c: 3 }
```

## API Reference

### Type Parameters

| Name | Description           |
| ---- | --------------------- |
| `T`  | Type of input objects |

### Parameters

| Name         | Type  | Description                 |
| ------------ | ----- | --------------------------- |
| `...objects` | `T[]` | Objects to merge (variadic) |

### Returns

`T`: A new object (properly typed) containing the merged result

## Key Features

1. **Deep Merging**: Recursively combines nested objects
2. **Efficient**: Uses Map for better performance with many keys
3. **Non-Destructive**: Preserves all input objects
4. **Type Safe**: Maintains TypeScript type information

## Examples

### Multiple Object Merge

```typescript
const base = { theme: { color: 'blue' }, debug: false };
const user = { theme: { size: 'large' } };
const session = { debug: true };

mergeObjects(base, user, session);
// {
//   theme: { color: 'blue', size: 'large' },
//   debug: true
// }
```

### Conflict Resolution

```typescript
const defaultConfig = { timeout: 30, retries: 3 };
const customConfig = { timeout: 60 };

mergeObjects(defaultConfig, customConfig);
// { timeout: 60, retries: 3 }
```

## Limitations

1. **Arrays**: Overwrites entire arrays (does not merge)
2. **Special Objects**: Date, Map, Set etc. are treated as primitives
3. **Circular References**: May cause stack overflow for deeply nested objects and arrays
4. **Prototypes**: May not preserve prototype chains in certain scenarios

## Type Definition

```typescript
type GenericObject = Record<string, any>;
```

## Recommended Use Cases

- Configuration management
- State hydration
- Options merging
- Deep object composition
- Default value application

## Comparison with Similar Functions

| Feature          | mergeObjects | [mergeAndFlattenObjects](mergeAndFlattenObjects) |
| ---------------- | ------------ | ------------------------------------------------ |
| Output Structure | Nested       | Flat (dot notation)                              |
| Array Handling   | Overwrites   | Overwrites                                       |
| Performance      | Faster       | Slower (flattening)                              |
| Use Case         | Deep merge   | Configuration strings                            |
