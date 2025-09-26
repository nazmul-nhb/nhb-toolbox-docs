---
id: extractUpdatedAndNewFields
title: Extract Updated & New Fields
---

## extractUpdatedAndNewFields

Identifies both changed and newly added fields between two objects, including deep/nested changes.

## Import

```typescript
import { extractUpdatedAndNewFields } from 'nhb-toolbox';
```

## Usage

### Basic Usage

```typescript
const original = { name: 'John', age: 30 };
const updated = { name: 'Jane', age: 30, role: 'admin' };
const changes = extractUpdatedAndNewFields(original, updated);
// Returns { name: 'Jane', role: 'admin' }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of base object |
| `U`  | Type of potential new fields |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `baseObject` | `T` | Original reference object |
| `updatedObject` | `FlattenPartial<T> & FlattenPartial<U>` | Modified object |

### Returns

Combined object with both changed and new fields (`FlattenPartial<T> & FlattenPartial<U>`)

## Key Features

1. **Changed Fields**: Detects modified values (deep comparison)
2. **New Fields**: Identifies newly added keys
3. **Nested Objects**: Recursively compares object structures
4. **Type Safety**: Maintains proper TypeScript typing

## Examples

### With Nested Objects

```typescript
const v1 = { user: { id: 1 }, settings: {} };
const v2 = { user: { id: 1, name: 'Alice' }, settings: { darkMode: true } };
extractUpdatedAndNewFields(v1, v2);
// Returns { user: { name: 'Alice' }, settings: { darkMode: true } }
```

### Mixed Changes

```typescript
const config = { timeout: 30 };
const updatedConfig = { timeout: 60, retries: 3 };
extractUpdatedAndNewFields(config, updatedConfig);
// Returns { timeout: 60, retries: 3 }
```

## Limitations

1. **Circular References**: Not supported
2. **Array Changes**: Treats arrays as atomic values
3. **Special Types**: May not handle custom class instances properly

## Type Definitions

```typescript
type GenericObject = Record<string, any>;
type FlattenPartial<T> = Partial<{ [K in keyof T]: T[K] }>;
```

## Recommended Use Cases

- API response diffing
- Form change detection
- State management updates
- Configuration version comparison
