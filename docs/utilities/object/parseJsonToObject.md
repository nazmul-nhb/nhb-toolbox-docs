---
id: parseJsonToObject
title: Parse JSON To Object
---

## parseJsonToObject

Safely parses a JSON string into an object with optional primitive value conversion.

## Import

```typescript
import { parseJsonToObject } from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
parseJsonToObject<T extends GenericObject = GenericObject>(
  value: string,
  parsePrimitives?: boolean
): T
```

## Usage

### Basic Parsing

```typescript
const jsonString = '{"num":"42","bool":"true","text":"hello"}';
const result = parseJsonToObject(jsonString);
// Returns { num: 42, bool: true, text: "hello" }
```

### Without Primitive Conversion

```typescript
const jsonString = '{"num":"42","valid":true}';
const result = parseJsonToObject(jsonString, false);
// Returns { num: "42", valid: true }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Return type (defaults to GenericObject) |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` | JSON string to parse |
| `parsePrimitives` | `boolean` | Convert stringified primitives (default: true) |

### Returns

`T`: Parsed object (or empty object on failure)

## Key Features

1. **Safe Parsing**: Returns empty object on failure
2. **Primitive Conversion**: Optionally converts string values to primitives
3. **Type Safety**: Ensures return value is always an object
4. **Strict Validation**: Rejects non-object root elements

## Examples

### Handling Invalid JSON

```typescript
parseJsonToObject('invalid json'); // Returns {}
parseJsonToObject('"just a string"'); // Returns {}
parseJsonToObject('null'); // Returns {}
```

### Nested Conversion

```typescript
const json = '{"nested":{"bool":"false","num":"3.14"}}';
parseJsonToObject(json);
// Returns { nested: { bool: false, num: 3.14 } }
```

## Limitations

1. **Non-Objects**: Rejects valid JSON with non-object roots
2. **Complex Types**: Doesn't handle Date, RegExp etc.
3. **Custom Classes**: Loses class instances
4. **Circular References**: Cannot parse circular structures

## Type Definitions

```typescript
type GenericObject = Record<string, any>;
```

## Recommended Use Cases

- API response parsing
- Configuration loading
- Data hydration
- Strict object parsing
- Safe JSON processing

## Related Functions

- `parseJSON`: For parsing any JSON value (not just objects)
- [parseObjectValues](parseObjectValues): The primitive conversion utility used internally
