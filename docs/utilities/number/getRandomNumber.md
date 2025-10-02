---
id: getRandomNumber  
title: Get Random Number  
---

## getRandomNumber

The `getRandomNumber` function generates a random number within a specified range, with flexible options for including or excluding the boundary values. It defaults to generating a number between `0` and `100`.

### Function Signature

```typescript
getRandomNumber(options?: RandomNumberOptions): number;
```

### Parameters

- **`options`** (optional): Configuration object for the random number generation.
  - **`min`** (optional): The minimum value of the range (inclusive). Defaults to `0`.
  - **`max`** (optional): The maximum value of the range (inclusive). Defaults to `100`.
  - **`includeMin`** (optional): Whether to include the minimum value. Defaults to `true`.
  - **`includeMax`** (optional): Whether to include the maximum value. Defaults to `true`.

### Return Value

- Returns a randomly generated number based on the provided options:
  - If no options are provided, it returns a random number between `0` and `100`.
  - The number will be within the specified range, with boundaries determined by the `includeMin` and `includeMax` flags.

### Example Usage

#### Default Range (0 to 100)

```typescript
import { getRandomNumber } from 'nhb-toolbox';

console.log(getRandomNumber());  // Random number between 0 and 100
```

#### Custom Range with Inclusive Boundaries

```typescript
import { getRandomNumber } from 'nhb-toolbox';

console.log(getRandomNumber({ min: 1, max: 10 }));  // Random number between 1 and 10, inclusive
```

#### Exclusive Boundaries

```typescript
import { getRandomNumber } from 'nhb-toolbox';

console.log(getRandomNumber({ min: 1, max: 10, includeMin: false, includeMax: false }));  // Random number between 2 and 9
```

#### Min Greater Than Max (Automatically Swaps)

```typescript
import { getRandomNumber } from 'nhb-toolbox';

console.log(getRandomNumber({ min: 10, max: 5 }));  // Random number between 5 and 10 (automatically swapped)
```

### Notes

- If `min` is greater than `max`, the function automatically swaps the values before generating the random number.
- Supports multiple combinations of inclusive and exclusive boundaries to give the user complete control over the generated range.
- If both `min` and `max` are equal, the function will simply return the `min` value as the random number.

### Aliases

- `getRandomInt`: Alias for `getRandomNumber`.

### Conclusion

The `getRandomNumber` function is a versatile utility for generating random numbers within a customizable range, offering flexibility with inclusive and exclusive boundaries, as well as automatic swapping of `min` and `max` when necessary.
