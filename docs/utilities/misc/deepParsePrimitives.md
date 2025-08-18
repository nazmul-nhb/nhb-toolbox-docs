---
id: deepParsePrimitives
title: Deep Parse Primitive Values
---

## deepParsePrimitives

Recursively parses an input—object, array, or primitive—and converts stringified numbers, booleans, `null`, and `undefined` to their proper JavaScript types throughout the structure.

---

## Import

```typescript
import { deepParsePrimitives } from 'nhb-toolbox';
import { parsePrimitivesDeep } from 'nhb-toolbox';
```

---

## Function Signature

```typescript
function deepParsePrimitives<T = unknown>(input: unknown): T
```

---

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic Object" label="Basic Object">

```typescript
deepParsePrimitives({ count: "10", enabled: "false" });
// Returns: { count: 10, enabled: false }
```

</TabItem>
<TabItem value="Nested Array" label="Nested Array">

```typescript
deepParsePrimitives(["true", "5", ["42", "null"]]);
// Returns: [true, 5, [42, null]]
```

</TabItem>
<TabItem value="Deep Object" label="Deep Nested Object">

```typescript
deepParsePrimitives({
  user: {
    age: "30",
    flags: ["true", "false", "null"]
  },
  data: "undefined"
});
// Returns: { user: { age: 30, flags: [true, false, null] }, data: undefined }
```

</TabItem>
<TabItem value="Already Primitives" label="Non-string Primitives">

```typescript
deepParsePrimitives({ id: 99, ready: true });
// Returns: { id: 99, ready: true }
```

</TabItem>
<TabItem value="Strings Not Matching" label="Non-primitive Strings">

```typescript
deepParsePrimitives({ word: "hello", code: "A1B" });
// Returns: { word: "hello", code: "A1B" }
```

</TabItem>
</Tabs>

---

## API Reference

### Parameters

| Name   | Type    | Description                                  |
|--------|---------|----------------------------------------------|
| input  | unknown | Any value: array, object, primitive, etc.    |

### Returns

- The input structure, with all strings like `"true"`, `"42"`, `"null"`, or `"undefined"` converted to their actual JS primitive types, recursively.

---

## Key Features

1. **Recursive:** Handles any nesting depth—arrays and objects are traversed fully.
2. **Smart Conversion:** Converts `"true"`/`"false"` (case-insensitive) to booleans, string numbers to numbers, `"null"` to `null`, and `"undefined"` to `undefined`.
3. **Non-destructive:** Already-typed values (booleans, numbers, etc.) remain unchanged.
4. **Works with All Inputs:** Supports arrays, objects, primitives, deeply nested mixed structures.

---

## Aliases

Also exported as:

- `parsePrimitivesDeep`

---

## Limitations

1. **String Match Only:** Only exact matches (`"true"`, not `"True"` or `"TRUE"`, for booleans; numeric strings must be entirely numeric, etc.).
2. **Falsy Strings Stay Strings:** Strings like `"0"` are converted to `0`, but random strings (e.g., `"no"`, `"NaN"`) are left unchanged.
3. **Structural Immutability:** Use caution if expecting references to remain unchanged (pure transformation).

---

## Notes

- Most useful after JSON parsing (see [`parseJSON`](./parseJSON)) or any time you process loosely typed data (e.g., from APIs, user input, or query strings).
- For strict root-object-only parsing, see [`parseJsonToObject`](../object/parseJsonToObject).

---

## See Also

- [`parseJSON`](./parseJSON): Complete JSON parsing with deep primitive conversion.
- [`parseJsonToObject`](../object/parseJsonToObject): Like `parseJSON`, but requires an object at the root.

---

## Recommended Use Cases

- Cleaning up data from APIs, user forms, or URL query decoding.
- Ensuring type-safety after parsing loosely-typed or legacy data.
- Data migration or preprocessing before validation.

---

**Conclusion:**  
`deepParsePrimitives` is your go-to utility for guaranteeing primitive types throughout any structured value, especially after parsing JSON or serializing user input. Use it to turn all the `"true"`, `"null"`, or `"123"` strings in your objects/arrays into proper booleans, nulls, and numbers—automatically!
