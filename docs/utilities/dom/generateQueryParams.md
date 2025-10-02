---
id: generateQueryParams  
title: Generate Query Parameters  
---

## generateQueryParams  

Generates a URL-encoded query string from an object, flattening nested fields and supporting arrays, booleans, and various primitive types.

## Import

```typescript
import { generateQueryParams } from 'nhb-toolbox';
import { createQueryParams } from 'nhb-toolbox';
import { formatQueryParams } from 'nhb-toolbox';
```

## Function Signature

```typescript
generateQueryParams<T extends QueryObject>(
  params: T = {} as T
): QueryString
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic">

```typescript
generateQueryParams({ key1: 'value1', key2: 42 });
// Returns "?key1=value1&key2=42"
```

</TabItem>
<TabItem value="Array" label="Array Values">

```typescript
generateQueryParams({ key1: ['value1', 'value2'], key2: 42 });
// Returns "?key1=value1&key1=value2&key2=42"
```

</TabItem>
<TabItem value="Empty/null" label="Empty & Null Values">

```typescript
generateQueryParams({ key1: '', key2: null });
// Returns ""
```

</TabItem>
<TabItem value="Boolean" label="Boolean Values">

```typescript
generateQueryParams({ key1: true, key2: false });
// Returns "?key1=true&key2=false"
```

</TabItem>
<TabItem value="Nested" label="Nested Object">

```typescript
generateQueryParams({ filters: { category: 'laptop', price: 1000 } });
// Returns "?category=laptop&price=1000"
```

</TabItem>
</Tabs>

## API Reference

### Type Parameters

| Name   | Description                   |
| ------ | ----------------------------- |
| `T`    | Extends `QueryObject`         |

### Parameters

| Name    | Type         | Description                           |
| ------- | ------------ | ------------------------------------- |
| params  | `QueryObject`| Object containing query parameters     |

### Returns

A query string as a URL-encoded string (e.g., `"?key1=value1&key2=value2"`).

## Types

```typescript
type Primitive = string | number | boolean | null | undefined;

type QueryObjectValue = Primitive | Primitive[] | QueryObject;

type QueryObject = { [key: string]: QueryObjectValue };

type QueryString = string;
```

## Key Features

1. **Flattens Nested Objects**: Extracts nested key-value pairs as top-level query parameters.
2. **Array Support**: Handles array values, generating repeated query keys.
3. **Falsy/Empty Filtering**: Omits `null`, `undefined`, and empty-string values.
4. **Boolean Support**: Converts booleans to `"true"`/`"false"` string representations.
5. **Type Safe**: Accepts and enforces specific allowed input types.

## Aliases

This function is also exported as:

- `createQueryParams`
- `formatQueryParams`

## Limitations

1. **No Deep Key Names**: Nested objects are flattened, but no dot/bracket notation is used in the result.
2. **No Custom Encoding**: Uses standard `encodeURIComponent`; does not provide custom encoding strategies.
3. **No Array Indexing**: Arrays become repeated keys (`?key=a&key=b`), not `?key[]=a&key[]=b`.
4. **No Sorting**: Key order in the query string is not guaranteed.

## Notes

- An empty object or only "empty" values results in an empty string, not `"?"`.
- If a key’s value is an array, each value generates a separate key-value pair.
- Nested fields are extracted to top-level keys (overwrites may occur if nested keys collide).

## Recommended Use Cases

- Constructing REST API URLs with dynamic query parameters.
- Serializing objects for client-side navigation or caching.
- Handling form or filter objects for HTTP requests.

---

**Conclusion**
This utility simplifies turning complex, nested objects into URL-friendly query strings, especially for filtering, searching, or dynamic APIs. Be mindful of its flat key-space for deeply nested objects with possible key collisions.
