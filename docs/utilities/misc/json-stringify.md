---
id: json-stringify
title: JSON Stringify Helpers
---

<!-- markdownlint-disable-file MD024 -->

## stableStringify

Creates a deterministic JSON string representation of any value with guaranteed sorted object keys.

### Function Signature

```typescript
stableStringify(obj: unknown): string
```

### Parameters

| Parameter | Type      | Description                                             |
| --------- | --------- | ------------------------------------------------------- |
| `obj`     | `unknown` | The value to stringify into a deterministic JSON string |

### Returns

A stable, deterministic string representation of the input that matches standard JSON format but with guaranteed sorted keys.

### Example Usage

```typescript
import { stableStringify } from 'nhb-toolbox';

const obj1 = { b: 2, a: 1, c: { z: 26, y: 25 } };
const obj2 = { a: 1, b: 2, c: { y: 25, z: 26 } };

// Different key order, same content
console.log(stableStringify(obj1));
// Output: '{"a":1,"b":2,"c":{"y":25,"z":26}}'

console.log(stableStringify(obj2));
// Output: '{"a":1,"b":2,"c":{"y":25,"z":26}}'

console.log(stableStringify(obj1) === stableStringify(obj2)); // true

// With Date objects
const data = { 
  timestamp: new Date('2023-01-01T00:00:00.000Z'),
  name: 'Test',
  value: undefined
};

console.log(stableStringify(data));
// Output: '{"name":"Test","timestamp":"2023-01-01T00:00:00.000Z","value":null}'
```

### Behavior Details

**Deterministic Output Guarantees:**

- All object keys are sorted alphabetically
- Nested objects and arrays are recursively stabilized
- All `undefined` values are converted to `null` for valid JSON output
- Date-like objects are serialized using standard `JSON.stringify` behavior

**Supported Date-like Objects:**

- Native `Date` objects
- `Chronos`, `Moment.js`, `Day.js`, `Luxon`, `JS-Joda`, `Temporal`
- Any object with a `toJSON()` method

**Use Cases:**

- Hash generation (signatures, cache keys)
- Deep equality checks
- Creating predictable output across different environments
- Generating consistent logs or serializations
- Any scenario requiring environment-neutral string representation

### Limitations

- Functions and `Symbol` values are not supported
- Circular references will cause infinite recursion
- Loses prototype and class instance information
- All date-like objects are converted to strings
- Large nested objects may have performance implications

---

## stripJsonEdgeGarbage

Removes trailing or leading garbage characters from strings that contain `JSON` objects or arrays.

### Function Signature

```typescript
stripJsonEdgeGarbage(str: string): string
```

### Parameters

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| `str`     | `string` | The string to sanitize/strip of edge garbage |

### Returns

A sanitized string containing only the JSON object or array content, with surrounding garbage removed.

### Example Usage

```typescript
import { stripJsonEdgeGarbage } from 'nhb-toolbox';

// Leading garbage
console.log(stripJsonEdgeGarbage('garbage{"a":1,"b":2}'));
// Output: '{"a":1,"b":2}'

// Trailing garbage
console.log(stripJsonEdgeGarbage('{"a":1,"b":2}garbage'));
// Output: '{"a":1,"b":2}'

// Both leading and trailing garbage
console.log(stripJsonEdgeGarbage('prefix{"x":10,"y":20}suffix'));
// Output: '{"x":10,"y":20}'

// With arrays
console.log(stripJsonEdgeGarbage('noise[1,2,3]more noise'));
// Output: '[1,2,3]'

// Mixed braces (takes first { or [ and last } or ])
console.log(stripJsonEdgeGarbage('start{"data":[1,2]}end'));
// Output: '{"data":[1,2]}'

// No JSON structure found - returns original
console.log(stripJsonEdgeGarbage('just plain text'));
// Output: 'just plain text'
```

### Behavior Details

**Extraction Logic:**

1. Finds the first occurrence of `{` or `[` (whichever comes first)
2. Finds the last occurrence of `}` or `]` (whichever comes last)
3. Extracts the substring between these indices
4. If no valid JSON structure boundaries are found, returns the original string

**Edge Cases:**

- Empty or non-string inputs return empty string
- Multiple JSON structures - extracts the outermost one
- Invalid JSON between boundaries is returned as-is (no validation performed)
- Nested structures are preserved entirely

**Use Cases:**

- Cleaning API responses that include metadata or whitespace
- Parsing logs that contain JSON payloads with extra information
- Extracting JSON from mixed-content strings
- Preparing strings for JSON parsing
- Sanitizing user input before JSON processing

### Limitations

- Does not validate the extracted JSON (may still be invalid)
- Only removes garbage at the edges, not within the JSON structure
- If multiple top-level JSON structures exist, only extracts the first complete one
- Assumes standard JSON delimiters (`{}` and `[]`)
