---
id: getNumbersInRange
title: Get Numbers In Range
---

## getNumbersInRange

The `getNumbersInRange` function generates a sequence of numbers within a specified range, with various filtering and formatting options. It can produce different types of number sequences (primes, odds, evens, etc.) and return them either as an array or a formatted string.

### Function Signature

```typescript
function getNumbersInRange<T extends boolean = false>(
 type: NumberType = 'any',
 options?: RangeOptions<T>,
): RangedNumbers<T>;
```

### Parameters

#### `type` (optional)

Specifies the type of numbers to generate:

- `'any'`: All numbers in range (default)
- `'natural'`: Natural numbers (≥1)
- `'odd'`: Odd numbers
- `'even'`: Even numbers
- `'prime'`: Prime numbers
- `'random'`: Random numbers within each step

#### `options` (optional)

Configuration object with these properties:

| Property      | Type      | Default     | Description                                               |
| ------------- | --------- | ----------- | --------------------------------------------------------- |
| `min`         | `number`  | `0`         | Range minimum                                             |
| `max`         | `number`  | `100`       | Range maximum                                             |
| `includeMin`  | `boolean` | `true`      | Include minimum value                                     |
| `includeMax`  | `boolean` | `true`      | Include maximum value                                     |
| `multiplesOf` | `number`  | `undefined` | Filter for multiples of this number                       |
| `getAsString` | `boolean` | `false`     | Output format                                             |
| `separator`   | `string`  | `','`       | String separator (only available when `getAsString=true`) |

### Return Value

Returns either:

- `number[]` when `getAsString=false`
- `string` when `getAsString=true`

### Example Usage

#### Basic Range

```typescript
import { getNumbersInRange } from 'nhb-toolbox';

// Get all numbers from 1 to 10
console.log(getNumbersInRange('any', { min: 1, max: 10 }));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### Prime Numbers

```typescript
// Get primes between 10 and 30 as a string
console.log(getNumbersInRange('prime', { 
  min: 10, 
  max: 30, 
  getAsString: true 
}));
// "11, 13, 17, 19, 23, 29"
```

#### Custom Formatting

```typescript
// Get even multiples of 5 from 0-100 with custom separator
console.log(getNumbersInRange('even', {
  min: 0,
  max: 100,
  multiplesOf: 5,
  getAsString: true,
  separator: ' | '
}));
// "0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100"
```

### Types

#### `NumberType`

```typescript
type NumberType = 'any' | 'natural' | 'odd' | 'even' | 'prime' | 'random';
```

#### `RangeOptions<T>`

```typescript
interface RangeOptions<T extends boolean = false> {
  min?: number;
  max?: number;
  includeMin?: boolean;
  includeMax?: boolean;
  multiplesOf?: number;
  getAsString?: T;
  separator?: string;
}
```

#### `RangedNumbers<T>`

```typescript
type RangedNumbers<T extends boolean = false> = T extends true ? string : number[];
```

### Notes

1. **Range Handling**:
   - Automatically swaps min/max if provided in reverse order
   - Respects `includeMin/includeMax` boundaries

2. **Special Cases**:
   - `multiplesOf` is ignored when type is `'prime'`
   - `'natural'` type forces minimum to be ≥1
   - `'random'` type shuffles the results

3. **Performance**:
   - For large ranges, consider specifying exact multiples rather than filtering
   - Prime checking becomes slower with larger numbers

### Use Cases

- Generating number sequences for mathematical operations
- Creating datasets for visualization
- Game development (spawn points, damage values)
- Educational tools for number theory
- Data sampling and quantization

### Conclusion

The `getNumbersInRange` function provides a flexible way to generate and format number sequences with precise control over range, type, and output format. Its combination of filtering options and output formatting makes it useful for a wide variety of numerical operations.
