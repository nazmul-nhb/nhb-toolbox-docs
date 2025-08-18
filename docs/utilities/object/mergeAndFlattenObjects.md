---
id: mergeAndFlattenObjects
title: Merge And Flatten Objects
---

## mergeAndFlattenObjects

Deeply merges multiple objects and flattens the resulting structure using dot notation. Duplicate keys are resolved with last-in-wins behavior.

## Import

```typescript
import { mergeAndFlattenObjects } from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
function mergeAndFlattenObjects<T extends GenericObject>(...objects: T[]): T
```

## Usage

### Basic Merging

```typescript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const result = mergeAndFlattenObjects(obj1, obj2);
// Returns { 'a': 1, 'b.c': 2, 'b.d': 3, 'e': 4 }
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

`T`: Single merged object (properly typed) with dot-notation keys

## Key Features

1. **Deep Merging**: Combines multiple objects recursively
2. **Dot Notation**: Flattens structure with nested keys
3. **Last-in Wins**: Duplicate keys use last provided value
4. **Type Safety**: Maintains proper TypeScript typing
5. **Non-Destructive**: Doesn't modify input objects

## Examples

### Multiple Object Merge

```typescript
const defaults = { theme: { color: 'blue' } };
const userPrefs = { theme: { size: 'large' } };
const session = { theme: { color: 'red' } };

mergeAndFlattenObjects(defaults, userPrefs, session);
// {
//   'theme.color': 'red',
//   'theme.size': 'large'
// }
```

### Conflict Resolution

```typescript
const a = { settings: { timeout: 30 } };
const b = { settings: { timeout: 60 } };
mergeAndFlattenObjects(a, b);
// { 'settings.timeout': 60 }
```

## Limitations

1. **Arrays**: Treated as terminal values (not merged)
2. **Circular References**: May cause stack overflow for deeply nested objects and arrays
3. **Special Objects**: Date, Map, Set etc. treated as terminal values

## Type Definition

```typescript
type GenericObject = Record<string, any>;
```

## Recommended Use Cases

- Configuration merging
- Deep object composition
- Settings hierarchy resolution
- API response consolidation
- State management updates

## Comparison with Similar Functions

| Feature          | mergeAndFlattenObjects | [mergeObjects](mergeObjects) |
| ---------------- | ---------------------- | ---------------------------- |
| Output Structure | Flat (dot notation)    | Nested                       |
| Array Handling   | Overwrites             | Overwrites                   |
| Performance      | Slower (flattening)    | Faster                       |
| Use Case         | Configuration strings  | Deep merge                   |
