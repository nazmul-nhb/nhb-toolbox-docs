---
id: parseQueryString
title: Parse Query String into Object
---

Parses a query string (optionally starting with `?`) into a JavaScript object.  
Supports arrays for duplicate keys, and can intelligently convert string values to primitives (numbers, booleans, null).

## Import

```typescript
import { parseQueryString } from 'nhb-toolbox';
import { getQueryStringAsObject } from 'nhb-toolbox';
import { queryStringToObject } from 'nhb-toolbox';
```

## Function Signature

```typescript
function parseQueryString(
  query: string,
  parsePrimitives?: boolean
): StrictObject
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic">

```typescript
parseQueryString('a=1&b=hello');
// Returns: { a: 1, b: 'hello' }
```

</TabItem>
<TabItem value="With Question Mark" label="With '?' Prefix">

```typescript
parseQueryString('?token=abc&active=true');
// Returns: { token: 'abc', active: true }
```

</TabItem>
<TabItem value="Multiple Values" label="Multiple Values">

```typescript
parseQueryString('tag=js&tag=ts');
// Returns: { tag: ['js', 'ts'] }
```

</TabItem>
<TabItem value="No Primitives" label="No Primitive Parsing">

```typescript
parseQueryString('n=10&x=true', false);
// Returns: { n: '10', x: 'true' }
```

</TabItem>
<TabItem value="Null and False" label="Null and Booleans">

```typescript
parseQueryString('opt=null&isTrue=false');
// Returns: { opt: null, isTrue: false }
```

</TabItem>
</Tabs>

## API Reference

### Parameters

| Name            | Type     | Description                                                                                  |
|-----------------|----------|---------------------------------------------------------------------------------------------|
| `query`         | string   | The query string to parse (with or without starting `?`).                                    |
| `parsePrimitives` | boolean  | (Optional) Whether to parse primitive-like strings (`"false"`, `"1"`, `"null"`, etc). Defaults to `true`.   |

### Returns

A JavaScript object (<code>StrictObject</code>) where each key is a string and each value may be:

- `string`
- `number`
- `boolean`
- `null`
- `string[]`, `number[]`, `boolean[]`, or `null[]`

## Types

```typescript
export type StrictObject = Record<string, unknown>;
```

## Key Features

1. **Flexible Input**: Accepts query strings with or without a leading `?`.
2. **Arrays from Multiple Keys**: If a key appears more than once, you get an array.
3. **Automatic Primitive Parsing**: Converts `"1" → 1"`, `"true" → true"`, `"null" → null"` by default.
4. **Safe**: Does **not** touch or depend on the browser’s `window.location`.

## Aliases

This function is also exported as:

- `getQueryStringAsObject`
- `queryStringToObject`

## Limitations

1. **No Deep Objects**: Does not generate nested objects for dotted or bracketed keys (e.g., `a.b=1` stays flat).
2. **Empty Key Handling**: Keys without a value (e.g., `foo&b=2`) will be parsed with `foo` as an empty string `""`.
3. **No Key Decoding Customization**: Uses standard URL decoding.

## Notes

- **Type Guessing**: Primitive parsing is based on string matching; `"012"` becomes number `12`, not `"012"` unless `parsePrimitives = false`.
- Setting `parsePrimitives: false` is useful when you want all values as strings, like in typical form posts.
- Arrays are always returned for duplicate keys, regardless of primitive type.
- All values are `string` unless parsing is enabled (default).

## Recommended Use Cases

- Parsing URLs or query strings in client-side and server-side environments.
- Reading user input or redirects where the string isn’t available on `window.location.search`.
- Back-end parsing of GET query strings for API endpoints.

---

**Conclusion:**  
`parseQueryString` turns any query string into a highly usable JavaScript object, supporting advanced parsing and multi-value keys. It works with any string input, making it ideal for shared or non-browser environments.
