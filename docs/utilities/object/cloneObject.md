---
id: cloneObject  
title: Clone Object  
---

## cloneObject

Creates a deep clone of an object using either [**structuredClone**](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) (when available) or deterministic JSON serialization.

### Function Signature

```typescript
cloneObject<T extends GenericObject>(obj: T, serialize?: boolean): T
```

### Parameters

| Parameter   | Type                      | Description                                                                |
| ----------- | ------------------------- | -------------------------------------------------------------------------- |
| `obj`       | `T extends GenericObject` | The object to clone                                                        |
| `serialize` | `boolean` (optional)      | When `true`, forces deterministic JSON serialization. Defaults to `false`. |

### Returns

A new object that is a deep clone of the input.

### Example Usage

```typescript
import { cloneObject } from 'nhb-toolbox';

const original = { 
  name: 'John',
  address: {
    city: 'New York'
  },
  date: new Date('2023-01-01'),
  map: new Map([['key', 'value']])
};

// Default behavior - uses structuredClone when available
const cloned = cloneObject(original);

console.log(cloned === original); // false
console.log(cloned.date instanceof Date); // true (preserved by structuredClone)
console.log(cloned.map instanceof Map); // true (preserved by structuredClone)

// Force JSON serialization mode
const serializedClone = cloneObject(original, true);
console.log(typeof serializedClone.date); // "string" (converted by JSON serialization)
console.log(serializedClone.map); // {} (Map converted to empty object)
```

### Type Definition

```typescript
type GenericObject = Record<string, any>;
```

## Behavior Details

### Primary Behavior (Default: `serialize = false`)

When `serialize` is `false` (default) and `structuredClone` is available:

- Uses the browser's built-in `structuredClone` API
- Supports circular references
- Preserves `Date` objects, `Map`, `Set`, `RegExp`, and Typed Arrays
- Preserves `undefined` values
- **Note:** Does not preserve class prototypes, only built-in types

### Deterministic Serialization Mode (`serialize = true`)

When `serialize` is `true`, or when `structuredClone` is unavailable:

- Uses stable JSON serialization via [stableStringify]
- All object keys are sorted alphabetically for deterministic output
- All `undefined` values are converted to `null`
- Date-like objects (`Date`, `Chronos`, `Moment.js`, etc.) are converted to strings **in the same way that `JSON.stringify` would serialize them**, ensuring predictable and JSON-compliant output.
- Guarantees consistent output across environments

### Final Safety Fallback

If both cloning methods fail (e.g., JSON serialization with circular references):

- Returns a shallow clone (`{ ...obj }`)
- Ensures the function never throws

## Supported Types

### With `structuredClone` (default mode)

- Objects and arrays
- Primitives (string, number, boolean, null, undefined)
- `Date` objects (preserved)
- `Map`, `Set`, `RegExp` (preserved)
- Typed arrays (preserved)
- Circular references (supported)
- Most built-in JavaScript types

### With JSON serialization mode

- Objects and arrays (with sorted keys)
- Primitives (string, number, boolean, null)
- Date-like objects (converted to strings)
- All `undefined` values (converted to `null`)
- JSON-serializable values only

## Unsupported Types

### In both modes

- Functions
- Symbols (dropped in JSON mode)
- Class instances (prototype information lost)
- DOM elements

### JSON serialization specific

- Circular references (will fail, triggers fallback)
- Non-JSON-serializable values

## Use Cases

### Default mode (`serialize = false`)

- General-purpose deep cloning
- Cloning objects with circular references
- Preserving Date, Map, Set, and other built-in types
- When type fidelity for built-in types is important

### Deterministic mode (`serialize = true`)

- Hashing and fingerprinting
- Signature generation
- Deep equality checks
- Creating deterministic snapshots
- Any scenario requiring environment-neutral, consistent output

## Limitations

### Performance Considerations

- `structuredClone` is generally faster than JSON serialization
- JSON serialization with stable stringify has additional overhead
- Very large objects may have performance implications in either mode

### Type Fidelity

- Neither mode preserves custom class prototypes
- JSON mode converts all Date-like objects to strings
- JSON mode converts Maps/Sets to plain objects

## Alternative Approaches

- **[`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) API**: Direct usage for modern environments
- **Lodash's `cloneDeep`**: More comprehensive but larger bundle size
- **Manual cloning**: For complex custom types requiring prototype preservation
