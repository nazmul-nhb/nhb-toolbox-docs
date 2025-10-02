---
id: reverseNumber  
title: Reverse Number  
---

## reverseNumber

The `reverseNumber` function reverses the digits of a given number. For negative numbers, the sign is preserved, but the digits are reversed.

### Function Signature

```typescript
reverseNumber(num: Numeric): number;
```

### Parameters

- **`num`**: The number (or numeric string) to be reversed.

### Return Value

- Returns the number with its digits reversed. If the input number is negative, the negative sign is preserved.

### Example Usage

#### Basic Reversal

```typescript
import { reverseNumber } from 'nhb-toolbox';

console.log(reverseNumber(123));  // 321
```

#### Handling Negative Numbers

```typescript
import { reverseNumber } from 'nhb-toolbox';

console.log(reverseNumber(-456));  // -654
```

#### Reversing Stringified Numbers

```typescript
import { reverseNumber } from 'nhb-toolbox';

console.log(reverseNumber('789'));  // 987
```

### Notes

- The function uses `Math.abs` to handle negative numbers and preserve the sign after reversing.
- Converts the number to a string, reverses the string, and then converts it back to a number.
- It handles stringified numbers as well.

### Conclusion

The `reverseNumber` function is a simple utility to reverse the digits of a number, while maintaining the sign for negative numbers. This can be useful for tasks such as numerical analysis or generating patterns.
