---
id: extractObjectKeys
title: Extract Object Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- markdownlint-disable-file MD024 -->

## extractObjectKeys

> Extracts the keys of an object with proper typing.

### Import

```typescript
import { extractObjectKeys } from 'nhb-toolbox';
```

### Function Signatures

```typescript
extractObjectKeys<T extends GenericObject>(obj: T): Array<keyof T>;

extractObjectKeys<T extends GenericObject>(obj: T, tuple: true): Tuple<keyof T>;
```

### Aliases

- `extractKeys` - Alias for `extractObjectKeys`

### Usage

#### Basic Usage

```typescript
const obj = { a: 1, b: 2, c: 3 };
const keys = extractObjectKeys(obj); // Returns ['a', 'b', 'c']
```

#### With Tuple Return Type

```typescript
const obj = { a: 1, b: 2, c: 3 };
const keys = extractObjectKeys(obj, true); // Returns ['a', 'b', 'c'] as Tuple
```

#### With Empty Object

> TypeScript will complain and it will return empty array.

```typescript
const keys = extractObjectKeys({}); // Returns []
```

#### With Null/Undefined

> TypeScript will complain and it will return empty array.

```typescript
const keys = extractObjectKeys(null); // Returns []
const keys = extractObjectKeys(undefined); // Returns []
```

### API

#### Type Parameters

| Parameter | Description           |
| --------- | --------------------- |
| `T`       | A generic object type |

#### Parameters

| Parameter | Type      | Description                                                     |
| --------- | --------- | --------------------------------------------------------------- |
| `obj`     | `T`       | The object to extract keys from                                 |
| `tuple`   | `boolean` | Optional. If `true`, returns keys as tuple instead of an array. |

#### Return Value

- Without `tuple`: `Array<keyof T>` - An array of keys from the specified object
- With `tuple: true`: `Tuple<keyof T>` - A tuple of keys from the specified object
- Returns empty array/tuple if the object is null/undefined/empty

### Examples

<Tabs>
<TabItem value="simple" label="Simple Object" default>

```typescript
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

const keys = extractObjectKeys(user); // ['id', 'name', 'email']
```

</TabItem>
<TabItem value="tuple" label="With Tuple">

```typescript
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

const keys = extractObjectKeys(user, true); // ['id', 'name', 'email'] as Tuple
```

</TabItem>
<TabItem value="nested" label="Nested Object">

```typescript
const product = {
  id: 1,
  name: 'Laptop',
  details: {
    brand: 'Dell',
    price: 999
  }
};

const keys = extractObjectKeys(product); // ['id', 'name', 'details']
// Note: Only top-level keys are returned
```

</TabItem>
<TabItem value="edge" label="Edge Cases">

> TypeScript will complain and it will return empty array.

```typescript
// Empty object
extractObjectKeys({}); // []

// Null case
extractObjectKeys(null); // []

// Undefined case
extractObjectKeys(undefined); // []

// Non-object values
extractObjectKeys('string'); // []
extractObjectKeys(123); // []
```

</TabItem>
</Tabs>

### Notes

- This function only returns top-level (own) enumerable properties
- Returns an empty array for empty objects, null, undefined, or non-object values
- Internally uses `Object.keys()` with proper TypeScript typing
- Symbol-keyed properties are not included in the result
- Inherited properties are not included (only own properties)
- The return type is properly typed as `Array<keyof T>` for better TypeScript support
- For nested objects, only the top-level keys are extracted
- When using the `tuple` parameter, the order is determined by TypeScript's type system and may not match runtime order

---

## extractObjectKeysDeep

> Recursively extracts all nested keys from an object with proper typing.

### Import

```typescript
import { extractObjectKeysDeep } from 'nhb-toolbox';
```

### Function Signatures

```typescript
extractObjectKeysDeep<T extends GenericObject>(obj: T): Array<DeepKeys<T>>;
```

### Aliases

- `extractKeysDeep` - Alias for `extractObjectKeysDeep`

### Usage

#### Basic Usage

```typescript
const obj = { 
  a: 1, 
  b: { 
    c: 2, 
    d: { 
      e: 3 
    } 
  } 
};
const keys = extractObjectKeysDeep(obj); 
// Returns ['a', 'b', 'c', 'd', 'e']
```

#### With Empty Object

```typescript
const keys = extractObjectKeysDeep({}); // Returns []
```

#### With Null/Undefined

```typescript
const keys = extractObjectKeysDeep(null); // Returns []
const keys = extractObjectKeysDeep(undefined); // Returns []
```

### API

#### Type Parameters

| Parameter | Description           |
| --------- | --------------------- |
| `T`       | A generic object type |

#### Parameters

| Parameter | Type | Description                     |
| --------- | ---- | ------------------------------- |
| `obj`     | `T`  | The object to extract keys from |

#### Return Value

`Array<DeepKeys<T>>`: An array of all nested keys from the specified object, or empty array if the object is null/undefined/empty.

### Examples

<Tabs>
<TabItem value="simple" label="Simple Nested Object" default>

```typescript
const user = {
  id: 1,
  profile: {
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'New York'
    }
  }
};

const keys = extractObjectKeysDeep(user); 
// ['id', 'profile', 'name', 'address', 'street', 'city']
```

</TabItem>
<TabItem value="complex" label="Complex Object">

```typescript
const company = {
  name: 'Tech Corp',
  departments: {
    engineering: {
      team: 'dev',
      lead: 'Alice'
    },
    sales: {
      region: 'north',
      manager: 'Bob'
    }
  }
};

const keys = extractObjectKeysDeep(company);
// ['name', 'departments', 'engineering', 'team', 'lead', 'sales', 'region', 'manager']
```

</TabItem>
<TabItem value="edge" label="Edge Cases">

```typescript
// Empty object
extractObjectKeysDeep({}); // []

// Null case
extractObjectKeysDeep(null); // []

// Undefined case
extractObjectKeysDeep(undefined); // []

// Flat object (same as extractObjectKeys)
extractObjectKeysDeep({ a: 1, b: 2 }); // ['a', 'b']
```

</TabItem>
</Tabs>

### Notes

- Recursively extracts all nested keys from an object
- Returns an empty array for empty objects, null, undefined, or non-object values
- For only top-level keys, use `extractObjectKeys` or its alias `extractKeys`
- The return type is properly typed as `Array<DeepKeys<T>>` for better TypeScript support
- Useful when you need to access all properties in a deeply nested object structure
