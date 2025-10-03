---
id: extractObjectKeys
title: Extract Object Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## extractObjectKeys

> Extracts the keys of an object with proper typing.

### Import

```typescript
import { extractObjectKeys } from 'nhb-toolbox';
```

### Usage

#### Basic Usage

```typescript
const obj = { a: 1, b: 2, c: 3 };
const keys = extractObjectKeys(obj); // Returns ['a', 'b', 'c']
```

#### With Empty Object
>
> TypeScript will complain and it will return empty array.

```typescript
const keys = extractObjectKeys({}); // Returns []
```

#### With Null/Undefined
>
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

| Parameter | Type | Description                     |
| --------- | ---- | ------------------------------- |
| `obj`     | `T`  | The object to extract keys from |

#### Return Value

`Array<keyof T>`: An array of keys from the specified object, or empty array if the object is null/undefined/empty.

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

---

### Notes

- This function only returns top-level (own) enumerable properties
- Returns an empty array for empty objects, null, undefined, or non-object values
- Internally uses `Object.keys()` with proper TypeScript typing
- Symbol-keyed properties are not included in the result
- Inherited properties are not included (only own properties)
- The return type is properly typed as `Array<keyof T>` for better TypeScript support
- For nested objects, only the top-level keys are extracted

## extractObjectKeysDeep
