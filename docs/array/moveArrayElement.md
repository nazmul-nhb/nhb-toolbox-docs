---
id: moveArrayElement
title: Move Array Element
---

## `moveArrayElement`

The `moveArrayElement` function repositions an element in an array from one index to another, returning a new array with the updated order.

### Function Signature

```typescript
function moveArrayElement<T>(arr: T[], fromIndex: number, toIndex: number): T[]
```

### Usage

This function is available under the following aliases:

- `moveArrayElement`

### Parameters

- `arr` (`T[]`): The original array to operate on.
- `fromIndex` (`number`): The index of the element to move.
- `toIndex` (`number`): The target index where the element should be placed.

### Returns

- `T[]`: A new array with the element moved to the desired position.

### Example

```ts
import { moveArrayElement } from 'nhb-toolbox';

const original = ['a', 'b', 'c', 'd'];

moveArrayElement(original, 1, 3);
// → ['a', 'c', 'd', 'b']
```

### Notes

Returns a **new array** with the element moved — **does not mutate** the original array.

If `fromIndex` and `toIndex` are equal or out of bounds, behavior mimics JavaScript’s `splice` mechanics without throwing errors.
