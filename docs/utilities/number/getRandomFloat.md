---
id: getRandomFloat  
title: Get Random Float  
---

## getRandomFloat  

The `getRandomFloat` function generates a random floating-point number within a specified range (inclusive of min, exclusive of max). It's useful for simulations, statistical sampling, and any scenario requiring precise random decimal values.

### Function Signature  

```typescript
getRandomFloat(min: Numeric, max: Numeric): number;
```

### Parameters  

- **`min`** (`Numeric`): The lower bound (inclusive) - can be a number or numeric string.  
- **`max`** (`Numeric`): The upper bound (exclusive) - can be a number or numeric string.  

### Type: `Numeric`  

A union type representing either a `number` or a numeric string (e.g., `"3.14"`):  

```typescript
type Numeric = number | `${number}`;
```

### Return Value  

Returns a random floating-point number where:  
`min` ≤ value < `max`  

### Example Usage  

#### Basic Usage  

```typescript
import { getRandomFloat } from 'nhb-toolbox';

// Returns a float between 1.5 (inclusive) and 3.5 (exclusive)
console.log(getRandomFloat(1.5, 3.5)); // e.g. 2.84623
```

#### With Numeric Strings  

```typescript
console.log(getRandomFloat("0.1", "0.5")); // e.g. 0.37281
```

#### Negative Ranges  

```typescript
console.log(getRandomFloat(-2.5, -1.0)); // e.g. -1.76342
```

### Notes  

- **Inclusive/Exclusive**: The minimum is inclusive, while the maximum is exclusive (matches `Math.random()` behavior).  
- **Numeric Conversion**: Automatically converts numeric strings to numbers.  
- **Edge Cases**: If `min` equals `max`, always returns `min`. If `min` > `max`, the values are effectively swapped.  
- **Precision**: Uses JavaScript's native `Math.random()` precision (typically 53 bits).  

### Aliases  

- `getRandomDecimal`: Alias for `getRandomFloat`.  

### Common Use Cases  

1. Monte Carlo simulations  
2. Random sampling in statistical analysis  
3. Game development (physics, damage values)  
4. Generative art algorithms  
5. Machine learning weight initialization  

### Conclusion  

The `getRandomFloat` function provides a convenient way to generate precise random decimal numbers within any range, with support for both number and string inputs. Its alias `getRandomDecimal` offers semantic flexibility depending on context.
