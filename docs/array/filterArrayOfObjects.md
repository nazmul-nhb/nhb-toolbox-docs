---
id: filterArrayOfObjects
title: Filter Array of Objects
---

## filterArrayOfObjects

Filters an array of objects based on multiple conditions for specified keys.

### Type Parameters

- `T`: The type of objects in the array.

### Parameters

- `array` (`T[]`): The array of objects to filter.
- `conditions` (`{ [K in keyof T]?: (value: T[K] | undefined) => boolean }`): An object where keys represent property names and values are functions defining filter conditions.

### Returns

- `T[]`: The filtered array of objects.

### Example

```typescript
import { filterArrayOfObjects } from 'nhb-toolbox';

const data = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true },
];

const conditions = {
  age: (age) => age > 28,
  active: (active) => active === true,
};

const filteredData = filterArrayOfObjects(data, conditions);
console.log(filteredData);
// Output: [{ name: 'Charlie', age: 35, active: true }]
