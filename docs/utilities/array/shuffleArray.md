---
id: shuffleArray
title: Shuffle Array
---

## shuffleArray

Shuffles the elements of an array.

### Function Signature

```typescript
shuffleArray <T>(array: T[]): T[];
```

### Parameters

- `array` (`T[]`): Array to shuffle.

### Returns

- `T[]`: Shuffled array.

### Example

```typescript
import { shuffleArray } from 'nhb-toolbox';

const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffleArray(numbers);
console.log(shuffledNumbers); // Output: [3, 1, 5, 2, 4] (example output; actual result may vary)
