---
id: parseJSON
title: Parse Any JSON (Flexible Root)
---

Parses any valid JSON string (including arrays, primitives, or objects) and optionally converts stringified primitives in nested arrays or objects. This utility is ideal when the root value of the JSON could be anything, not just an object.

---

## Import

```typescript
import { parseJSON } from 'nhb-toolbox';
import { parseJsonDeep } from 'nhb-toolbox';
```

---

## Function Signature

```typescript
function parseJSON<T = unknown>(
  value: string,
  parsePrimitives?: boolean
): T
```

---

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Object" label="Root Object">

```typescript
parseJSON('{ "a": "1", "b": 2 }');
// Returns: { a: 1, b: 2 }
```

</TabItem>
<TabItem value="Array" label="Root Array">

```typescript
parseJSON('[ "1", "2", 3 ]');
// Returns: [1, 2, 3]
```

</TabItem>
<TabItem value="Primitive Root" label="Primitive Root">

```typescript
parseJSON('"42"');
// Returns: 42
```

</TabItem>
<TabItem value="No Primitive Parse" label="No Primitive Conversion">

```typescript
parseJSON('{"x":"false"}', false);
// Returns: { x: "false" }
```

</TabItem>
<TabItem value="Malformed JSON" label="Malformed Input">

```typescript
parseJSON("{ key: 'value' }");
// Returns: {}
```

</TabItem>
</Tabs>

---

## API Reference

### Parameters

| Name             | Type      | Description                                                                |
| ---------------- | --------- | -------------------------------------------------------------------------- |
| value            | string    | The JSON string to parse.                                                  |
| parsePrimitives  | boolean   | Optional. If true (default), recursively converts stringified primitives.  |

### Returns

- The parsed JSON value (typed as `T`), which may be an object, array, string, number, or boolean.
- Returns `{}` if the input is not valid JSON.

---

## Key Features

1. **Flexible Root:** Accepts any valid JSON root (object, array, primitive).
2. **Recursive Primitive Conversion:** Converts stringified numbers, booleans, `null`—deeply (see [deepParsePrimitives](./deepParsePrimitives.md)).
3. **Safe Fallback:** Malformed or invalid JSON always returns an empty object.
4. **Type-safe Generic:** Infer and enforce types with `<T>`.

---

## Aliases

Also exported as:

- `parseJsonDeep`

---

## Limitations

1. **Invalid input returns `{}`:** May mask input errors—double-check your sources.
2. **Only JSON-safe types:** Non-JSON, circular, or function values will not parse.
3. **No Reviver Support:** Doesn't expose a custom reviver function like `JSON.parse`.
4. **Single Quoted Strings Not Supported:** Must be valid JSON (double quotes).

---

## Notes

- For strict object parsing (root must be an object), use [`parseJsonToObject`](./parseJsonToObject.md).
- For deep primitive conversion logic, see [`deepParsePrimitives`](./deepParsePrimitives.md).
- Malformed JSON, such as single-quoted or badly formatted strings, will **not** throw but will result in `{}`.

---

## Recommended Use Cases

- Parsing unpredictable API or config data.
- Accepting JSON from user input, file uploads, or dynamic sources.
- Applications handling both primitive and complex JSON shapes.

---

## See Also

- [`deepParsePrimitives`](./deepParsePrimitives.md): Recursively converts stringified primitives inside objects/arrays.
- [`parseJsonToObject`](./parseJsonToObject.md): Like `parseJSON`, but root must be an object.
- [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) (MDN): Built-in JSON parsing in JS.

---

**Conclusion:**  
`parseJSON` provides a robust, type-safe, and deep-parsing JSON parser for any root shape. Prefer it when input is not always an object—or for extra primitive safety!
