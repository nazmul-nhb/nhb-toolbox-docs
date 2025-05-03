---
id: getLastArrayElement
title: Get Last Array Element
---

## getLastArrayElement

Gets the last element of an array.

### Function Signature

```typescript
const getLastArrayElement = <T>(array: T[]): T | undefined;
```

### Parameters

- `array` (`T[]`): The array to get the last element from.

### Returns

- `T | undefined`: The last element of the array or `undefined` if the array is empty.

### Example

```typescript
import { getLastArrayElement } from 'nhb-toolbox';

const numbers = [1, 2, 3, 4, 5];

const lastNumber = getLastArrayElement(numbers);
console.log(lastNumber);
// Output: 5

const emptyArray: number[] = [];
const lastEmpty = getLastArrayElement(emptyArray);
console.log(lastEmpty);
// Output: undefined
