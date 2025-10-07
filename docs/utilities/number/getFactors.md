---
id: getFactors
title: getFactors
---

## getFactors

The `getFactors` function efficiently computes all positive integer factors (divisors) of a number.

### Function Signature

```typescript
getFactors(int: Numeric | undefined): number[]
```

### Parameters

- **`int`**: A numeric value or numeric string to find factors for. Can also be `undefined`.

### Return Value

- Returns an *array of positive integer factors* in *ascending order* for valid input.
- Returns an *empty array for non-integer, negative, or invalid values*.

### Example Usage

```typescript
import { getFactors } from 'nhb-toolbox';

getFactors(12);        // [1, 2, 3, 4, 6, 12]
getFactors(7);         // [1, 7]
getFactors(1);         // [1]
getFactors(-4);        // []
getFactors(undefined); // []
getFactors(6.6);       // []
```

### Notes

- Uses the square root method for optimal performance (`O(√n)` complexity).
- Returns an empty array for negative numbers, non-integer values, or undefined input.
- For the number `1`, returns `[1]`.
- Factors are always returned in ascending order.

### Aliases

`getFactors` can also be imported using the following aliases:

- `factorsOf`: Alias for `getFactors`.
- `getDivisors`: Alias for `getFactors`.

### Conclusion

The `getFactors` function is useful for mathematical operations requiring divisor analysis, such as number theory calculations, prime factorization, or finding common factors between numbers. It provides efficient computation with proper handling of edge cases.
