---
id: factorial
title: Calculate Factorial
---

## factorial

The `factorial` function computes the *factorial* of *a non-negative numeric value* **recursively**.

### Function Signature

```typescript
factorial(int: Numeric | undefined): number | undefined
```

### Parameters

- **`int`**: A numeric input value or numeric string whose factorial should be calculated. Can also be `undefined`.

### Return Value

- Returns the factorial result as a number if the input is valid.
- Returns `undefined` if the input is negative, not numeric, non-integer or `undefined`.

### Example Usage

```typescript
import { factorial } from 'nhb-toolbox';

factorial(5);           // 120
factorial(0);           // 1
factorial(1);           // 1
factorial(-3);          // undefined
factorial(undefined);   // undefined
factorial(5.5);         // undefined
```

### Aliases

`factorial` can also be imported using the following aliases:

- `getFactorial`: Alias for `factorial`.
- `calculateFactorial`: Alias for `factorial`.

### Notes

- The function uses a *recursive approach* internally.
- Input is normalized via [**normalizeNumber**](normalizeNumber) before computation.
- Factorial of `0` and `1` is `1`.
- It does not compute factorial for fractions (non-integer values).
- Can return very large values quickly due to the rapid growth rate of factorial values.
- Only *non-negative integer values* are considered valid for calculating factorial.

### Conclusion

The `factorial` function is useful for mathematical calculations involving permutations, combinations, and other scenarios where factorial values are required. It provides safe handling of invalid inputs by returning `undefined` for negative numbers, non-numeric values, or undefined inputs.

### See Also

- [**calculateHCF**](calculateHCF)
- [**calculateLCM**](calculateLCM)
- [**getFactors**](getFactors)
