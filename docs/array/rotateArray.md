---
id: rotateArray
title: Rotate Array
---

## `rotateArray`

The `rotateArray` function rotates an array to the left or right by a specified number of steps. Positive values rotate to the right, while negative values rotate to the left.

### Function Signature

```typescript
export function rotateArray<T>(arr: T[], steps: number): T[]
```

### Parameters

- `arr` (`T[]`): The array to rotate.
- `steps` (`number`): Number of positions to rotate.
  - Positive: rotates to the right.
  - Negative: rotates to the left.

### Returns

- `T[]`: A new array with elements rotated as specified.

### Example

```ts
rotateArray([1, 2, 3, 4, 5], 2);
// → [4, 5, 1, 2, 3]

rotateArray([1, 2, 3, 4, 5], -2);
// → [3, 4, 5, 1, 2]
```

### Notes

This function ensures consistent behavior by normalizing the number of steps, even if it's greater than the array length or negative. The original array remains unchanged.
