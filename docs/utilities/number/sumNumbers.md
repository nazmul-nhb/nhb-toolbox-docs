---
id: sumNumbers  
title: Sum Numbers  
---

## sumNumbers

The `sumNumbers` function calculates the total sum of a set of numbers, accepting numeric values or numeric strings as input.

### Function Signature

```typescript
sumNumbers(...numbers: Numeric[]): number;
```

### Parameters

- **`numbers`**: A list of numbers (or numeric strings) to sum up.

### Return Value

- Returns the sum of all the provided numbers. If no numbers are provided, it returns `0`.

### Example Usage

#### Basic Summation

```typescript
import { sumNumbers } from 'nhb-toolbox';

console.log(sumNumbers(1, 2, 3));  // 6
```

#### Summing Stringified Numbers

```typescript
import { sumNumbers } from 'nhb-toolbox';

console.log(sumNumbers('4', '5', '6'));  // 15
```

#### No Numbers Provided

```typescript
import { sumNumbers } from 'nhb-toolbox';

console.log(sumNumbers());  // 0
```

### Notes

- The function handles both numeric and stringified numeric inputs. All values are converted to numbers before summing.
- If no numbers are provided, the sum defaults to `0`.

### Aliases

- `getSumOfNumbers`: Alias for `sumNumbers`.
- `sumOfNumbers`: Alias for `sumNumbers`.

### Conclusion

The `sumNumbers` function is a simple yet powerful utility for summing a list of numeric values, whether passed as actual numbers or numeric strings. It returns the total sum and defaults to `0` when no inputs are provided.
