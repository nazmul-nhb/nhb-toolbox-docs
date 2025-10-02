---
id: getAverage  
title: Get Average  
---

## getAverage

The `getAverage` function calculates the average of a set of provided numbers, rounding the result to three decimal places. It returns `NaN` if no valid numbers are provided.

### Function Signature

```typescript
getAverage(...numbers: Numeric[]): number;
```

### Parameters

- **`numbers`**: A list of numbers or numeric strings to calculate the average. Each item in the list can be a `number` or a numeric string (e.g., `"5"`).

### Return Value

- Returns the average of the provided numbers, rounded to three decimal places.
- If no valid numbers are provided, it returns `NaN`.

### Example Usage

```typescript
import { getAverage } from 'nhb-toolbox';

console.log(getAverage(1, 2, 3));    // 2
console.log(getAverage(5, 5, '5'));  // 5
console.log(getAverage());           // NaN
```

### Notes

- The function will automatically skip invalid numbers, including `NaN` and non-numeric values.
- It rounds the result to three decimal places for better readability and precision.
- Works with both `number` and numeric string types (`"5"`, `"10.2"`).

### Aliases

`getAverage` can also be imported using the alias:

- `calculateAverage`
- `getAverageOfNumbers`

### Conclusion

The `getAverage` function is useful for calculating the mean of a series of numeric inputs, whether provided as numbers or numeric strings, ensuring a clean and precise result with automatic handling of invalid inputs.
