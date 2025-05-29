---
id: extractUpdatedFields
title: Extract Updated Fields
---

## extractUpdatedFields

Extracts only the fields that have changed between two objects, including deep/nested changes.

## Import

```typescript
import { extractUpdatedFields } from 'nhb-toolbox';
```

## Usage

### Basic Usage

```typescript
const original = { name: 'John', age: 30 };
const updated = { name: 'John', age: 31 };
const changes = extractUpdatedFields(original, updated); 
// Returns { age: 31 }
```

### Nested Objects

```typescript
const v1 = { user: { id: 1, profile: { name: 'Alice' } } };
const v2 = { user: { id: 1, profile: { name: 'Alice', active: true } } };
extractUpdatedFields(v1, v2);
// Returns { }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of the base object |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `baseObject` | `T` | Original reference object |
| `updatedObject` | `FlattenPartial<T>` | Object containing potential updates |

### Returns

`FlattenPartial<T>`: New object containing only changed fields (shallow copy)

## Behavior

1. **Value Comparison**: Uses deep equality check to detect changes
2. **Nested Objects**: Recursively compares nested object structures
3. **Empty Results**: Returns empty object if no changes found
4. **Reference Safety**: Never modifies input objects

## Examples

### Detecting Configuration Changes

```typescript
const oldConfig = { theme: 'dark', timeout: 30 };
const newConfig = { theme: 'light', timeout: 30 };
extractUpdatedFields(oldConfig, newConfig);
// { theme: 'light' }
```

### Partial Updates

```typescript
const dbRecord = { id: 1, content: 'Hello', meta: { views: 0 } };
const update = { content: 'Updated', meta: { views: 1 } };
extractUpdatedFields(dbRecord, update);
// { content: 'Updated', meta: { views: 1 } }
```

## Limitations

1. **Circular References**: Will fail on circular structures
2. **Special Types**: May not handle special objects (Date, RegExp, etc.) as expected
3. **Performance**: Deep comparison is slower for large objects
4. **Arrays**: Treats array replacements as single changes (does not diff array items)

## Type Definitions

```typescript
type GenericObject = Record<string, any>;
type FlattenPartial<T> = Partial<{ [K in keyof T]: T[K] }>;
```

## Suggested Use Cases

- API patch requests
- State change detection
- Configuration management
- Audit logging
- Database updates
