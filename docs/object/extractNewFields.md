---
id: extractNewFields
title: Extract New Fields
---

Extracts only new fields that exist in an updated object but not in a base object, including nested fields.

## Import

```typescript
import { extractNewFields } from 'nhb-toolbox';
```

## Usage

### Basic Example

```typescript
const original = { name: 'John' };
const updated = { name: 'John', age: 30 };
const newFields = extractNewFields(original, updated); // { age: 30 }
```

### Nested Objects

```typescript
const configV1 = { theme: { dark: true } };
const configV2 = { theme: { dark: true, colors: ['blue'] } };
const changes = extractNewFields(configV1, configV2); // { theme: { colors: ['blue'] } }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Base object type |
| `U`  | Updated object type |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `baseObject` | `T` | Original object for comparison |
| `updatedObject` | `FlattenPartial<T> & FlattenPartial<U>` | Object containing potential new fields |

### Returns

`FlattenPartial<U>`: New fields that didn't exist in base object.

## Examples

### Detecting New Configuration

```typescript
const oldSettings = { volume: 50 };
const newSettings = { volume: 50, notifications: true };
extractNewFields(oldSettings, newSettings); // { notifications: true }
```

### Deep Nested Comparison

```typescript
const v1 = { user: { profile: { name: 'Alice' } } };
const v2 = { user: { profile: { name: 'Alice', age: 28 } } };
extractNewFields(v1, v2); // { user: { profile: { age: 28 } } }
```

## Limitations

1. **Value Changes**: Won't detect if existing fields have new values
2. **Circular References**: May cause stack overflow with circular structures
3. **Type Strictness**: Requires both objects to be structurally compatible

## Type Definitions

```typescript
type GenericObject = Record<string, any>;
type FlattenPartial<T> = Partial<{ [K in keyof T]: T[K] }>;
```

## When to Use

- Comparing API response changes
- Detecting new configuration options
- State management diffing
- Migration scenario analysis
