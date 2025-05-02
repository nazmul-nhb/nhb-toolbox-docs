---
id: parseObjectValues
title: Parse Object Values
---

Converts stringified primitive values within an object to their proper types (boolean, number, null, etc.), leaving non-string values unchanged.

## Import

```typescript
// Main function
import { parseObjectValues } from 'nhb-toolbox';

// Aliases also available:
import { 
  parsePrimitiveData,
  parsePrimitives,
  parseStringifiedObjectValues,
  parseStringifiedPrimitives,
  parseStringifiedValues 
} from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
function parseObjectValues<T extends GenericObject>(
  object: T
): { [K in keyof T]: ParsedPrimitive<T[K]> }

type ParsedPrimitive<T> = T extends string 
  ? string | number | boolean | null | undefined | object
  : T
```

## Usage

### Basic Conversion

```typescript
const obj = {
  flag: "true",
  count: "42",
  name: "John"
};

parseObjectValues(obj);
// Returns { flag: true, count: 42, name: "John" }
```

### Nested Objects

```typescript
const data = {
  settings: JSON.stringify({ darkMode: "true" }),
  version: "2.0"
};

parseObjectValues(data);
// Returns { 
//   settings: { darkMode: true },
//   version: "2.0" 
// }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of input object |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `object` | `T` | Object containing stringified values |

### Returns

A new object with the same keys but parsed values

## Key Features

1. **Smart Parsing**: Converts common string patterns to primitives
2. **JSON Support**: Parses valid JSON strings
3. **Non-Destructive**: Preserves non-string values
4. **Type Safe**: Maintains proper TypeScript typing

## Conversion Rules

| Input Value  | Output Value |
|-------------|-------------|
| "true"      | true        |
| "false"     | false       |
| "42"        | 42          |
| "null"      | null        |
| "undefined" | undefined   |
| JSON string | Parsed object/array |
| Other strings | Original string |

## Examples

### Mixed Value Types

```typescript
const mixed = {
  active: "false",
  price: "9.99",
  meta: null,
  tags: '["a","b"]'
};

parseObjectValues(mixed);
// Returns {
//   active: false,
//   price: 9.99,
//   meta: null,
//   tags: ["a", "b"]
// }
```

### Edge Cases

```typescript
parseObjectValues({
  empty: "",
  invalidJson: "{x:1}",
  numberLike: "123abc"
});
// Returns {
//   empty: "",
//   invalidJson: "{x:1}",
//   numberLike: "123abc"
// }
```

## Limitations

1. **No Deep Parsing**: Only converts top-level string values
2. **No Date Parsing**: Doesn't convert ISO date strings
3. **No Custom Types**: Can't revive class instances
4. **Performance**: May be slow with very large objects

## Recommended Use Cases

- API response normalization
- Form data processing
- Configuration loading
- Query parameter parsing
- Data hydration

## Aliases

This function is also exported under these alternative names:

- `parsePrimitiveData`
- `parsePrimitives`
- `parseStringifiedObjectValues`
- `parseStringifiedPrimitives`
- `parseStringifiedValues`
