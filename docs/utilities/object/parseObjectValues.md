---
id: parseObjectValues
title: Parse Object Values
---

## parseObjectValues

Recursively converts stringified primitive values within objects and arrays to their proper types (boolean, number, null, etc.), while preserving non-string values and handling nested structures.

### Import

```typescript
import { parseObjectValues } from 'nhb-toolbox';
import { parseStringifiedObjectValues } from 'nhb-toolbox';
```

### Function Signature

```typescript
parseObjectValues<T>(object: T, parseNested?: boolean): { [K in keyof T]: any; }
```

### Type Definitions

```typescript
/** Generic object with any value */
type GenericObject = Record<string, any>;
```

### Usage Examples

#### Basic Primitive Conversion

```typescript
const config = {
  debug: "true",
  port: "3000",
  title: "My App",
  nullable: "null"
};

parseObjectValues(config);
// Returns {
//   debug: true,
//   port: 3000,
//   title: "My App",
//   nullable: null
// }
```

#### Nested Object Parsing

```typescript
const userData = {
  id: "123",
  preferences: JSON.stringify({
    darkMode: "true",
    fontSize: "14"
  }),
  history: [
    { date: "2023-01-01", action: "login", count: "1" },
    { date: "2023-01-02", action: "logout", count: "1" }
  ]
};

parseObjectValues(userData);
// Returns {
//   id: 123,
//   preferences: {
//     darkMode: true,
//     fontSize: 14
//   },
//   history: [
//     { date: "2023-01-01", action: "login", count: 1 },
//     { date: "2023-01-02", action: "logout", count: 1 }
//   ]
// }
```

#### Disabling Nested Parsing

```typescript
const nested = {
  value: "42",
  children: JSON.stringify([{ val: "10" }, { val: "20" }])
};

parseObjectValues(nested, false);
// Returns {
//   value: 42,
//   children: [{val:"10"},{val:"20"}] // remains string
// }
```

### API Reference

#### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of input object |

#### Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `object` | `T` | | Object containing stringified values |
| `parseNested` | `boolean` | `true` | Whether to recursively parse nested objects/arrays |

#### Returns

A new object with the same structure but parsed values.

### Conversion Rules

| Input Value Type | Example Input | Output Value |
|-----------------|--------------|--------------|
| Boolean string | "true" | `true` |
| Boolean string | "false" | `false` |
| Numeric string | "42" | `42` |
| Null string | "null" | `null` |
| Undefined string | "undefined" | `undefined` |
| Valid JSON string | "\{"key":"value"\}" | `{ key: "value" }` |
| Valid JSON array string | "[1,2,3]" | `[1, 2, 3]` |
| Primitives inside array of objects | \[\{ a: "2" \}\] | `[{a: 2}]` |
| Other strings | "hello" | "hello" (unchanged) |
| Non-string values | `{key: true}` | `{key: true}` (unchanged) |

### Key Features

1. **Deep Parsing**: Recursively processes nested objects and arrays by default
2. **JSON Support**: Automatically parses valid JSON strings
3. **Non-Destructive**: Creates new object without modifying original
4. **Configurable**: Optional control over nested parsing
5. **Error Tolerant**: Silently skips invalid JSON strings

### Limitations

1. **No Date Parsing**: ISO date strings remain as strings
2. **No Custom Revivers**: Can't handle special class instances
3. **Performance Impact**: Deep parsing large objects may be slow
4. **String Whitelist**: Only converts specific primitive patterns

### Recommended Use Cases

- API response normalization
- Environment variable processing
- Configuration file loading
- Form data deserialization
- Query parameter conversion
- Local storage value hydration

### Aliases

This function is also exported as:

- `parseStringifiedObjectValues`

### Common Patterns

#### Processing API Responses

```typescript
const rawResponse = await fetch('/api/config');
const parsedConfig = parseObjectValues(await rawResponse.json());
// parsedConfig has proper typed values
```

#### Environment Variable Handling

```typescript
const env = parseObjectValues({
  PORT: process.env.PORT,
  DEBUG: process.env.DEBUG
});
// PORT converted to number, DEBUG to boolean
```

#### Form Data Conversion

```typescript
handleSubmit(formData: FormData) {
  const data = parseObjectValues(Object.fromEntries(formData));
  // Convert checkbox values from "true"/"false" to booleans
}
```
