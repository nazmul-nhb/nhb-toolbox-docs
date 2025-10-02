---
id: clampNumber  
title: Clamp Number  
---

## clampNumber  

The `clampNumber` function restricts a number to fall within a specified range. If the number is lower than the minimum, it returns the minimum; if higher than the maximum, it returns the maximum; otherwise, it returns the original number.

### Function Signature  

```typescript
clampNumber(value: number, min: number, max: number): number;
```

### Parameters  

- **`value`**: The number to be clamped.
- **`min`**: The lower bound of the range (inclusive).
- **`max`**: The upper bound of the range (inclusive).

### Return Value  

Returns:

- `min` if `value` < `min`
- `max` if `value` > `max`
- `value` if it's between `min` and `max`

### Example Usage  

#### Within Range

```typescript
import { clampNumber } from 'nhb-toolbox';

console.log(clampNumber(15, 10, 20)); // 15
```

#### Below Minimum

```typescript
console.log(clampNumber(5, 10, 20)); // 10
```

#### Above Maximum

```typescript
console.log(clampNumber(25, 10, 20)); // 20
```

#### Edge Cases

```typescript
console.log(clampNumber(10, 10, 20)); // 10 (equal to min)
console.log(clampNumber(20, 10, 20)); // 20 (equal to max)
```

### Notes  

- **Order Matters**: If `min` > `max`, the function will always return `min` (this is how `Math.max(min, Math.min(value, max))` works).
- **Type Safety**: Only accepts `number` type (unlike some functions that accept `Numeric` strings).
- **Performance**: Uses native `Math.max` and `Math.min` for optimal performance.

### Conclusion  

The `clampNumber` function is essential for:

- Restricting user input to valid ranges
- Preventing out-of-bounds errors
- Normalizing values in calculations
- Creating responsive design calculations

It's a fundamental utility for any numeric validation or normalization needs.
