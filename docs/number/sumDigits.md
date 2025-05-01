---
id: sumDigits  
title: Sum Digits  
---

## sumDigits

The `sumDigits` function calculates the sum of all digits in a given number, ignoring the sign of the number.

### Function Signature

```typescript
function sumDigits(num: Numeric): number;
```

### Parameters

- **`num`**: The number (or numeric string) whose digits will be summed.

### Return Value

- Returns the sum of all digits in the number. If the number is negative, the sign is ignored.

### Example Usage

#### Basic Digit Summation

```typescript
import { sumDigits } from 'nhb-toolbox';

console.log(sumDigits(123));  // 6 (1 + 2 + 3)
```

#### Handling Negative Numbers

```typescript
import { sumDigits } from 'nhb-toolbox';

console.log(sumDigits(-456));  // 15 (4 + 5 + 6)
```

#### Summing Digits from a Stringified Number

```typescript
import { sumDigits } from 'nhb-toolbox';

console.log(sumDigits('789'));  // 24 (7 + 8 + 9)
```

### Notes

- The function ignores the sign of the number by using `Math.abs`.
- Works with both number types and numeric strings.
- The digits are summed after converting the number to a string and splitting it into individual characters.

### Conclusion

The `sumDigits` function provides a simple way to calculate the sum of digits of any number, regardless of its sign. It is a straightforward utility to analyze or process numeric values at the digit level.
