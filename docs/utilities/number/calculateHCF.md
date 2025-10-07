---
id: calculateHCF  
title: Calculate HCF (GCD)  
---

## calculateHCF

The `calculateHCF` function calculates the highest common factor (HCF), also known as the greatest common divisor (GCD), of multiple provided numbers.

### Function Signature

```typescript
calculateHCF(...numbers: Numeric[]): number;
```

### Parameters

- **`numbers`**: A list of numbers or numeric strings for which the HCF/GCD is to be calculated.

### Return Value

- Returns the HCF/GCD of the provided numbers.
- If no valid numbers are provided, it returns `0`.

### Example Usage

```typescript
import { calculateHCF } from 'nhb-toolbox';

console.log(calculateHCF(12, 15, 18)); // 3
console.log(calculateHCF(56, 98));     // 14
console.log(calculateHCF(5));          // 5
console.log(calculateHCF());           // 0
```

### Notes

- The function works by progressively finding the HCF of pairs of numbers using the `_find2NumbersHCF` function.
- If no valid numbers are provided, it returns `0` as the HCF/GCD.
- The HCF/GCD of a single number is the number itself.
- Only integer values are considered valid for calculating HCF/GCD.

### Aliases

- `calculateGCD`: Alias for `calculateHCF`.

### Conclusion

The `calculateHCF` function is essential for determining the greatest common divisor of multiple numbers, making it useful in scenarios such as fraction simplification or number theory calculations.

### See Also

- [**calculateLCM**](calculateLCM)
- [**factorial**](factorial)
- [**getFactors**](getFactors)
