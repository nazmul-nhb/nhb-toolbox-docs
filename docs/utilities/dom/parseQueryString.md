---
id: parseQueryString
title: Parse Query String into Object
---

<!-- markdownlint-disable-file MD024 -->

## parseQueryString

Parses a query string (optionally starting with `?`) into a JavaScript object.  
Supports arrays for duplicate keys, and can intelligently convert string values to primitives (numbers, booleans, null).

### Import

```typescript
import { parseQueryString } from 'nhb-toolbox';
import { getQueryStringAsObject } from 'nhb-toolbox';
import { queryStringToObject } from 'nhb-toolbox';
// All 3 alias for the same utility
```

### Function Signature

```typescript
parseQueryString<QParams extends ParsedQueryGeneric>(query: string, parsePrimitives = true): QParams
```

### Usage Examples

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

### API Reference

#### Parameters

| Name              | Type    | Description                                                                                    |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `query`           | string  | The query string to parse (with or without starting `?`).                                      |
| `parsePrimitives` | boolean | Whether to parse primitive-like strings (`"false"`, `"1"`, `"null"`, etc). Defaults to `true`. |

> For better type intellisense for the returned object, pass a generic type that extends to `ParsedQueryGeneric`

#### Returns

A JavaScript object (<code>StrictObject</code>) where each key is a string and each value may be:

- `string`
- `number`
- `boolean`
- `null`
- `string[]`, `number[]`, `boolean[]`, or `null[]`

### Types

```typescript
type ParsedQueryGeneric = Record<string, NormalPrimitive | NormalPrimitive[]>;
```

### Key Features

1. **Flexible Input**: Accepts query strings with or without a leading `?`.
2. **Arrays from Multiple Keys**: If a key appears more than once, you get an array.
3. **Automatic Primitive Parsing**: Converts `"1" → 1"`, `"true" → true"`, `"null" → null"` by default.
4. **Safe**: Does **not** touch or depend on the browser’s `window.location`.

### Aliases

This function is also exported as:

- `getQueryStringAsObject`
- `queryStringToObject`

### Limitations

1. **No Deep Objects**: Does not generate nested objects for dotted or bracketed keys (e.g., `a.b=1` stays flat).
2. **Empty Key Handling**: Keys without a value (e.g., `foo&b=2`) will be parsed with `foo` as an empty string `""`.
3. **No Key Decoding Customization**: Uses standard URL decoding.

### Notes

- **Type Guessing**: Primitive parsing is based on string matching; `"012"` becomes number `12`, not `"012"` unless `parsePrimitives = false`.
- Setting `parsePrimitives: false` is useful when you want all values as strings, like in typical form posts.
- Arrays are always returned for duplicate keys, regardless of primitive type.
- All values are `string` unless parsing is enabled (default).

### Recommended Use Cases

- Parsing URLs or query strings in client-side and server-side environments.
- Reading user input or redirects where the string isn’t available on `window.location.search`.
- Back-end parsing of GET query strings for API endpoints.

---

**Conclusion:**  
`parseQueryString` turns any query string into a highly usable JavaScript object, supporting advanced parsing and multi-value keys. It works with any string input, making it ideal for shared or non-browser environments.

---

## parseQueryStringLiteral

Parses a literal query string (optionally starting with `?`) into a strictly typed JavaScript object.  
This function is designed for use with literal string types to provide maximum TypeScript type safety and inference. It actually returns shows the runtime value as type!

### Import

```typescript
import { parseQueryStringLiteral } from 'nhb-toolbox';
import { literalQueryStringToObject } from 'nhb-toolbox';
// Both alias are for the same utility
```

### Function Signature

```typescript
parseQueryStringLiteral<Q extends string>(query: Q): ParsedQuery<Q>
```

### Usage Examples

<Tabs>
<TabItem value="Basic" label="Basic" default>

```typescript
parseQueryStringLiteral('a=1&b=hello');
// Returns: { a: '1', b: 'hello' }
// Typed as: { a: '1'; b: 'hello' }
```

</TabItem>
<TabItem value="With Question Mark" label="With '?' Prefix">

```typescript
parseQueryStringLiteral('?token=abc&active=true');
// Returns: { token: 'abc', active: 'true' }
// Typed as: { token: 'abc'; active: 'true' }
```

</TabItem>
<TabItem value="Multiple Values" label="Multiple Values">

```typescript
parseQueryStringLiteral('tag=js&tag=ts');
// Returns: { tag: ['js', 'ts'] }
// Typed as: { tag: ['js', 'ts'] }
```

</TabItem>
<TabItem value="Literal Types" label="With Literal Types">

```typescript
const query = 'status=active&role=admin';
const result = parseQueryStringLiteral(query);
// result is typed as: { status: 'active'; role: 'admin' }
// With full type inference from the literal string
```

</TabItem>
</Tabs>

### API Reference

#### Parameters

| Name    | Type | Description                                              |
| ------- | ---- | -------------------------------------------------------- |
| `query` | `Q`  | The literal query string to parse (with or without `?`). |

#### Returns

A strictly typed JavaScript object (`ParsedQuery<Q>`) where each key is inferred from the query string and values are properly typed as:

- `string` for single values
- `string[]` for multiple values with the same key

### Key Features

1. **Literal Type Inference**: Provides maximum TypeScript type safety by inferring types from literal string inputs.
2. **Array Support**: Automatically creates arrays for duplicate keys.
3. **Flexible Input**: Accepts query strings with or without a leading `?`.
4. **Strict Typing**: Returns properly typed objects based on the input query string structure.

### Aliases

This function is also exported as:

- `literalQueryStringToObject`

### Comparison with parseQueryString

| Feature               | `parseQueryStringLiteral`               | `parseQueryString`                              |
| --------------------- | --------------------------------------- | ----------------------------------------------- |
| **Type Inference**    | Infers from literal strings             | Generic object type                             |
| **Primitive Parsing** | No (returns strings only)               | Yes (converts to numbers, booleans, null)       |
| **Use Case**          | Literal string types with strict typing | Generic query strings with primitive conversion |
| **Performance**       | Faster (no type conversion)             | Slower (due to primitive parsing)               |

### Recommended Use Cases

- When working with literal string types and maximum TypeScript type safety is required
- API endpoints with known, fixed query parameter structures
- Configuration parsing where the query structure is statically known
- When you need strict type inference without runtime type conversion

### Notes

- **String Values Only**: Unlike `parseQueryString`, this function does not convert primitive values - all values remain as strings or string arrays.
- **Literal Types**: For best TypeScript inference, use `as const` with your query strings.
- **No Browser Dependency**: This function does not access or depend on `window.location.search`.
- **URL Decoding**: Uses standard URL decoding for parameter values.

### Example with Strict Typing

```typescript
// With literal type inference
const configQuery = 'theme=dark&lang=en&features=search';
const config = parseQueryStringLiteral(configQuery);
// config is returned and typed as: { theme: 'dark'; lang: 'en'; features: 'search' }

// With multiple values
const filterQuery = 'category=books&category=movies&sort=rating';
const filters = parseQueryStringLiteral(filterQuery);
// filters is returned and typed as: { category: ['books', 'movies']; sort: string }
```

---

**Conclusion:**  
`parseQueryStringLiteral` provides maximum TypeScript type safety for parsing query strings from literal types, making it ideal for scenarios where the query structure is known at compile time and strict typing is required.
