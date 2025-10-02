---
id: countObjectFields
title: Count Object Fields
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## countObjectFields

Counts the number of enumerable properties in an object.

## Import

```typescript
import { countObjectFields } from 'nhb-toolbox';
```

## Usage

### Basic Usage

```typescript
const obj = { a: 1, b: 2, c: 3 };
const count = countObjectFields(obj); // Returns 3
```

### With Null/Undefined

```typescript
const count = countObjectFields(null); // Returns 0
```

## API

### Type Parameters

| Parameter | Description           |
| --------- | --------------------- |
| `T`       | A generic object type |

### Parameters

| Parameter | Type | Description                       |
| --------- | ---- | --------------------------------- |
| `obj`     | `T`  | The object to count properties of |

### Return Value

`number`: The count of enumerable properties, or 0 if the object is null/undefined.

## Examples

<Tabs>
<TabItem value="simple" label="Simple Object" default>

```typescript
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

const fieldCount = countObjectFields(user); // 3
```

</TabItem>
<TabItem value="empty" label="Empty Object">

```typescript
const emptyObj = {};
const fieldCount = countObjectFields(emptyObj); // 0
```

</TabItem>
<TabItem value="edge" label="Edge Cases">

```typescript
// Null case
countObjectFields(null); // 0

// Undefined case
countObjectFields(undefined); // 0
```

</TabItem>
</Tabs>

## Notes

- This function only counts enumerable properties (same behavior as `Object.keys()`)
- Non-object values will return 0
- Symbol-keyed properties are not counted
- Inherited properties are not counted (only own properties)
