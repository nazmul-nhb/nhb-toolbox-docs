---
id: convertToDecimal  
title: Convert to Decimal  
---

## convertToDecimal

The `convertToDecimal` function rounds a number to a specified number of decimal places and returns it as either a `number` or `string`, based on the provided options.

### Function Signature

```typescript
convertToDecimal<T extends boolean | undefined = false>(
    input: Numeric, options?: DecimalOptions<T>
): ConvertedDecimal<T>;
```

### Parameters

- **`input`**: A number or a numeric string that needs to be rounded.
- **`options`** (optional): Configuration object to customize the rounding behavior.
  - **`decimalPlaces`** (optional): The number of decimal places to round to. Defaults to `2`.
  - **`isString`** (optional): If set to `true`, the result will be returned as a string. Defaults to `false`, which returns the result as a number.

### Return Value

- Returns the input number rounded to the specified decimal places.
- The type of the return value depends on the `isString` option:
  - If `isString` is `false` (default), the result is returned as a `number`.
  - If `isString` is `true`, the result is returned as a `string`.

### Example Usage

#### Default (Returns Number)

```typescript
import { convertToDecimal } from 'nhb-toolbox';

console.log(convertToDecimal(3.14159));         // 3.14
console.log(convertToDecimal(3.14159, { decimalPlaces: 3 }));  // 3.142
```

#### With String Output

```typescript
import { convertToDecimal } from 'nhb-toolbox';

console.log(convertToDecimal(3.14159, { isString: true }));  // "3.14"
console.log(convertToDecimal(3.14159, { decimalPlaces: 3, isString: true }));  // "3.142"
```

### Type: `Numeric`  

A union type representing either a `number` or a numeric string (e.g., `"42.5"`):  

```typescript
type Numeric = number | `${number}`;
```

### Notes

- The function rounds the number based on the specified `decimalPlaces`, applying standard rounding rules.
- The default behavior is to return the result as a `number`, but it can be easily configured to return a `string`.
- If the `input` is already a numeric string, it will be automatically converted to a number for rounding.

### Related Functions

- **[roundNumber](roundNumber)**: Use when you need rounding to specific decimal places (including negative places for whole number rounding) without string output options.
- **[roundToNearest](roundToNearest)**: Use when you need to round to arbitrary intervals (like multiples of 5, 10, etc.) rather than decimal places.
- For comparison [see here](roundNumber#comparison-with-similar-functions)

### Aliases

`convertToDecimal` can also be imported using the alias:

- `convertToFixed`

### Conclusion

The `convertToDecimal` function is ideal for scenarios where you need to round numbers to a specific precision and control whether the result is returned as a number or a string.
