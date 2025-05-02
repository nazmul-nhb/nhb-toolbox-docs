---
id: splitArray
title: Split Array
---

## splitArray

The `splitArray` function divides an array into smaller sub-arrays (chunks) of a specified size. It's useful when you need to batch process or paginate data.

### Function Signature

```typescript
function splitArray<T>(arr: T[], chunkSize: number): T[][]
```

### Parameters

- `arr` (`T[]`): The array to split into chunks.
- `chunkSize` (`number`): The maximum size of each chunk.

### Returns

- `T[][]`: A new array where each item is a chunked sub-array of the original.

### Example

```ts
import { splitArray } from 'nhb-toolbox';

splitArray([1, 2, 3, 4, 5, 6, 7], 3);
// → [[1, 2, 3], [4, 5, 6], [7]]
```

### Notes

This function is ideal for handling pagination, batching API calls, or distributing data evenly in UI components like grid layouts.
