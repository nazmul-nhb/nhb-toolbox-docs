---
id: roundToNearest  
title: Round to Nearest  
---

## roundToNearest  

The `roundToNearest` function rounds a number (or numeric string) to the closest multiple of a specified interval. This is particularly useful for creating stepped values, quantization, or rounding to common increments like 5, 10, or 0.5.

### Function Signature  

```typescript
function roundToNearest(value: Numeric, interval?: number): number;
```

### Parameters  

- **`value`** (`Numeric`): The number or numeric string to round.  
- **`interval`** (optional, `number`): The rounding increment (default: `5`).  

### Type: `Numeric`  

A union type representing either a `number` or a numeric string (e.g., `"42.5"`):  

```typescript
type Numeric = number | `${number}`;
```

### Return Value  

Returns the input value rounded to the nearest multiple of the specified interval.  

### Example Usage  

#### Default Interval (5)  

```typescript
import { roundToNearest } from 'nhb-toolbox';

console.log(roundToNearest(27));    // 25
console.log(roundToNearest(28));    // 30
```

#### Custom Intervals  

```typescript
console.log(roundToNearest(13, 5));    // 15
console.log(roundToNearest(0.9, 0.5)); // 1.0
console.log(roundToNearest(17, 10));   // 20
```

#### With Numeric Strings  

```typescript
console.log(roundToNearest("42.3", 0.5)); // 42.5
console.log(roundToNearest("100", 30));    // 90
```

### Notes  

- **Direction**: Uses standard rounding (≥ .5 rounds up, < .5 rounds down).  
- **Negative Numbers**: Works correctly with negative values and intervals.  
- **Zero Handling**: If interval is `0`, returns `NaN`.  
- **String Conversion**: Automatically converts numeric strings to numbers.  

### Aliases  

- `roundNumberToNearestInterval`: Explicit naming variant  
- `roundToNearestInterval`: Similar functionality with different naming  

### Common Use Cases  

1. Creating rating systems (e.g., round to nearest 0.5)  
2. Financial calculations (rounding to nearest $5 increment)  
3. Data quantization for visualization  
4. Measurement systems requiring specific increments  
5. Game development for score rounding  

### Related Functions

- **[convertToDecimal](convertToDecimal)**: Use when you need fixed decimal places with optional string output.
- **[roundNumber](roundNumber)**: Use when you need simple decimal place rounding (including negative places) without interval-based rounding.
- For comparison [see here](roundNumber#comparison-with-similar-functions)

### Conclusion  

The `roundToNearest` function provides flexible value quantization with sensible defaults. Its aliases offer semantic options for different contexts while maintaining identical functionality. The support for both numbers and numeric strings makes it versatile for various input scenarios.
