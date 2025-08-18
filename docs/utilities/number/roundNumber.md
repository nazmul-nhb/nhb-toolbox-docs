---
id: roundNumber
title: Round A Number (Float & Integer)
---

## roundNumber

The `roundNumber` function provides flexible rounding capabilities, allowing rounding to both positive (right of decimal) and negative (left of decimal) decimal places. This makes it useful for both fractional rounding and whole number rounding scenarios.

### Function Signature  

```typescript
function roundNumber(number: Numeric, roundTo?: number): number;
```

### Parameters  

- **`number`** (`Numeric`): The number or numeric string to round.  
- **`roundTo`** (optional, `number`):
  - Positive values: Number of decimal places to round to (default: `2`).
  - Negative values: Rounds to the left of the decimal (e.g., `-1` = tens, `-2` = hundreds and so on...).
  - `0`: Rounds to nearest integer.

### Return Value  

Returns the rounded number as a `number` type (unlike `convertToDecimal` which can return strings).

### Example Usage  

#### Basic Decimal Rounding  

```typescript
import { roundNumber } from 'nhb-toolbox';

console.log(roundNumber(3.14159));       // 3.14
console.log(roundNumber(3.14159, 3));    // 3.142
console.log(roundNumber(1.005, 2));   // 1.01
```

#### Negative Decimal Places (Whole Number Rounding)  

```typescript
console.log(roundNumber(1234.56, -1));   // 1230
console.log(roundNumber(1234.56, -2));   // 1200
console.log(roundNumber(1234.56, -3));   // 1000
```

#### Edge Cases  

```typescript
console.log(roundNumber("123.456"));     // 123.46 (string input)
console.log(roundNumber(123.456, 0));    // 123
console.log(roundNumber(123.456, -4));   // 0
```

### Comparison with Similar Functions  

| Feature              | [roundNumber](#common-use-cases) | [convertToDecimal](convertToDecimal) | [roundToNearest](roundToNearest) |
| -------------------- | -------------------------------- | ------------------------------------ | -------------------------------- |
| Decimal places       | ✓                               | ✓                                   | ✗                               |
| Negative places      | ✓                               | ✗                                   | ✗                               |
| String output option | ✗                               | ✓                                   | ✗                               |
| Arbitrary intervals  | ✗                               | ✗                                   | ✓                               |
| Rounding direction   | Standard                         | Standard                             | Standard                         |

### When to Use Which?

1. **[roundNumber](#common-use-cases)**:
   - When you need simple decimal rounding (positive or negative places)
   - When you only need number output (not strings)
   - For whole number rounding (using negative decimal places)

2. **[convertToDecimal](convertToDecimal)**:
   - When you need string output options
   - For fixed decimal place formatting (e.g., currency)
   - When working with display values that require exact decimal places

3. **[roundToNearest](roundToNearest)**:
   - When rounding to arbitrary intervals (5, 10, 0.5, etc.)
   - For quantization or stepped value generation
   - For financial or measurement systems with specific increments

### Notes  

- **Negative Place Rounding**: A powerful feature for whole number rounding (e.g., `-2` rounds to hundreds).
- **String Handling**: Automatically converts numeric strings to numbers.
- **No Floating-Point Issues**: Unlike some naive implementations, this properly handles edge cases like `1.005`.

### Type: `Numeric`  

A union type representing either a `number` or a numeric string (e.g., `"42.5"`):  

```typescript
type Numeric = number | `${number}`;
```

### Aliases  

- `roundToDecimal`: More descriptive name for decimal place rounding

### Common Use Cases  

1. Financial calculations requiring specific decimal precision
2. Data visualization where values need rounding for display
3. Whole number rounding for statistics or approximations
4. Preparing data for systems with fixed precision requirements
5. Measurement conversions where decimal precision matters

### Conclusion  

`roundNumber` (and its alias `roundToDecimal`) provides the most flexible decimal place rounding in the toolbox, supporting both fractional and whole number rounding. For more specialized rounding needs, consider [`convertToDecimal`](convertToDecimal) (for string output) or [`roundToNearest`](roundToNearest) (for interval-based rounding).
