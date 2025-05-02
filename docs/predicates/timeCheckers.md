---
id: time-checkers  
title: Time Checkers  
---

## isLeapYear

Checks if a given year is a leap year according to the Gregorian calendar rules.

### Function Signature

```typescript
function isLeapYear(year: Numeric): boolean;
```

### Parameters

- **`year`**: The year to check (can be number or numeric string)

### Returns

`true` if the year is a leap year, `false` otherwise

### Leap Year Rules

A year is a leap year if:

1. It's divisible by 4 **AND** not divisible by 100  
   **OR**  
2. It's divisible by 400

### Example Usage

```typescript
import { isLeapYear } from 'nhb-toolbox';

console.log(isLeapYear(2000));  // true (divisible by 400)
console.log(isLeapYear(2020));  // true (divisible by 4 but not 100)
console.log(isLeapYear(1900));  // false (divisible by 100 but not 400)
console.log(isLeapYear("2024")); // true (accepts numeric strings)
```

### Notes

- Handles both numbers and numeric strings
- Follows Gregorian calendar rules
- Works with negative years (BC dates)
- Returns `false` for non-numeric inputs

### Type Definition

```typescript
type Numeric = number | `${number}`;
```

### Use Cases

- Date validation
- Calendar applications
- Age calculations
- Date arithmetic
- Financial year calculations

### Conclusion

The `isLeapYear` function provides:

1. **Accurate** leap year detection
2. **Flexible** input (numbers or strings)
3. **Historical accuracy** for BC dates
4. **Simple integration** with date logic

Ideal for applications requiring:

- Calendar displays
- Date pickers
- Age verification
- Time-sensitive calculations
