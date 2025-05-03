---
id: calculateLCM  
title: Calculate LCM (LCD)  
---

## calculateLCM

The `calculateLCM` function calculates the least common multiple (LCM), also known as the least common divisor (LCD), of multiple provided numbers.

### Function Signature

```typescript
function calculateLCM(...numbers: Numeric[]): number;
```

### Parameters

- **`numbers`**: A list of numbers or numeric strings for which the LCM/LCD is to be calculated.

### Return Value

- Returns the LCM/LCD of the provided numbers.
- If no valid numbers are provided, it returns `0`.

### Example Usage

```typescript
import { calculateLCM } from 'nhb-toolbox';

console.log(calculateLCM(12, 15, 18)); // 180
console.log(calculateLCM(5, 10));      // 10
console.log(calculateLCM(7));          // 7
console.log(calculateLCM());           // 0
```

### Notes

- The function works by progressively finding the LCM of pairs of numbers using the `_find2NumbersLCM` function.
- If no valid numbers are provided, it returns `0` as the LCM/LCD.
- The LCM of a single number is the number itself.
- Only integer values are considered valid for calculating LCM/LCD.

### Aliases

- `calculateLCD`: Alias for `calculateLCM`.

### Conclusion

The `calculateLCM` function is useful for determining the least common multiple of multiple numbers, making it valuable in problems such as scheduling, fractions, and number theory.
