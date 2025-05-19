---
id: calculatePercentage  
title: Calculate Percentage  
---

## calculatePercentage

The `calculatePercentage` function performs various percentage-related calculations based on the specified mode and input values. It supports operations such as computing percentages, values from percentages, original values, percentage changes, applying percentage changes, percentage differences, and inverse percentages.

### Function Signature

```typescript
function calculatePercentage(options: PercentageOptions): number;
```

### Parameters

- **`options`**: An object specifying the calculation mode and the necessary input values. The structure of this object varies depending on the selected mode.

- Common Option:

```ts
{ roundTo?: number }
```

> Determines the number of decimal places to round the result to if it's a float.

### Modes & Parameters (Options)

#### `get-percent`

Calculates what percentage the `part` is of the `total`.

```typescript
{
  mode: 'get-percent';
  part: number;
  total: number;
}
```

#### `get-value`

Calculates the value from a given `percentage` of a `total`.

```typescript
{
  mode: 'get-value';
  percentage: number;
  total: number;
}
```

#### `get-original`

Calculates the original value from a known `value` and `percentage`.

```typescript
{
  mode: 'get-original';
  percentage: number;
  value: number;
}
```

#### `get-change-percent`

Calculates the percentage increase or decrease from `oldValue` to `newValue`.

```typescript
{
  mode: 'get-change-percent';
  oldValue: number;
  newValue: number;
}
```

#### `apply-percent-change`

Applies an increase or decrease by `percentage` to `baseValue`.

```typescript
{
  mode: 'apply-percent-change';
  baseValue: number;
  percentage: number;
}
```

#### `get-percent-difference`

Calculates the absolute percentage difference between two values.

```typescript
{
  mode: 'get-percent-difference';
  value1: number;
  value2: number;
}
```

#### `inverse-percent`

Calculates what percentage the `total` is of the `part`.

```typescript
{
  mode: 'inverse-percent';
  part: number;
  total: number;
}
```

### Return Value

Returns the calculated number rounded to three decimal places by default, can be configured through `roundTo` option. If the input is invalid or the calculation cannot be performed (e.g., division by zero), it returns `NaN`.

### Example Usage

```typescript
import { calculatePercentage } from 'nhb-toolbox';

const percent = calculatePercentage({
  mode: 'get-percent',
  part: 25,
  total: 200,
});
console.log(percent); // 12.5

const value = calculatePercentage({
  mode: 'get-value',
  percentage: 20,
  total: 150,
});
console.log(value); // 30

const original = calculatePercentage({
  mode: 'get-original',
  percentage: 25,
  value: 50,
});
console.log(original); // 200

const changePercent = calculatePercentage({
  mode: 'get-change-percent',
  oldValue: 100,
  newValue: 120,
});
console.log(changePercent); // 20

const appliedChange = calculatePercentage({
  mode: 'apply-percent-change',
  baseValue: 100,
  percentage: -10,
});
console.log(appliedChange); // 90

const percentDifference = calculatePercentage({
  mode: 'get-percent-difference',
  value1: 100,
  value2: 120,
  roundTo: 2,
});
console.log(percentDifference); // 18.18 instead of 18.182

const inverse = calculatePercentage({
  mode: 'inverse-percent',
  part: 50,
  total: 200,
});
console.log(inverse); // 400
```

### PercentOptions Types/Interfaces

```ts

/** * Options to calculate what percentage a `part` is of a `total`. */
interface GetPercentOptions {
 /** Mode to calculate percentage from `part` and `total` */
 mode: 'get-percent';
 /** The part value (e.g., 25 out of 100) */
 part: number;
 /** The total value representing 100% */
 total: number;
}

/** * Options to calculate a value from a `percentage` of a `total`. */
interface GetValueOptions {
 /** Mode to calculate value from `percentage` and `total` */
 mode: 'get-value';
 /** The percentage (e.g., 25%) */
 percentage: number;
 /** The total value representing 100% */
 total: number;
}

/** * Options to calculate the original total from a known `value` and `percentage`. */
interface GetOriginalOptions {
 /** Mode to calculate original total from `value` and `percentage` */
 mode: 'get-original';
 /** The percentage the `value` represents */
 percentage: number;
 /** The known value that is a percentage of the original total */
 value: number;
}

/** * Calculates the percentage change from `oldValue` to `newValue`. */
interface GetChangeOptions {
 /** Mode to calculate percentage change from `oldValue` to `newValue` */
 mode: 'get-change-percent';
 /** The original value before the change */
 oldValue: number;
 /** The new value after the change */
 newValue: number;
}

/** * Applies a percentage increase or decrease to a `baseValue`. */
interface ApplyChangeOptions {
 /** Mode to apply percentage change to `baseValue` */
 mode: 'apply-percent-change';
 /** The base value to apply the percentage change to */
 baseValue: number;
 /** The percentage change to apply (positive or negative) */
 percentage: number;
}

/** * Calculates the absolute percentage difference between two values. */
interface GetDifferenceOptions {
 /** Mode to calculate percentage difference between `value1` and `value2` */
 mode: 'get-percent-difference';
 /** The first value to compare */
 value1: number;
 /** The second value to compare */
 value2: number;
}

/** * Calculates the inverse percentage: what percent `total` is of `part`. */
interface InversePercentageOptions {
 /** Mode to calculate inverse percentage from `part` and `total` */
 mode: 'inverse-percent';
 /** The part value to calculate inverse percentage from */
 part: number;
 /** The total value to calculate inverse percentage of */
 total: number;
}

/** * Options for calculating percentages and related values. */
export type PercentageOptions = (
 | GetPercentOptions
 | GetValueOptions
 | GetOriginalOptions
 | GetChangeOptions
 | ApplyChangeOptions
 | GetDifferenceOptions
 | InversePercentageOptions
) & {
 /** The number of decimal places to round the result to. */
 roundTo?: number;
};
```

### Notes

- The function ensures that inputs are valid numbers before performing calculations.
- For percentage change calculations, if the `oldValue` is zero, the function returns `NaN` to avoid division by zero.
- The function rounds the result to three decimal places for consistency.

### Limitations

- The function does not handle cases where the denominator in a percentage calculation is zero; it returns `NaN` in such scenarios.
- It assumes that all input values are finite numbers; passing `Infinity` or `NaN` as inputs will result in `NaN` outputs.

### Conclusion

The `calculatePercentage` function is a versatile utility for performing a variety of percentage-related calculations. By specifying the appropriate mode and inputs, it can compute percentages, values, original amounts, changes, and differences, making it a valuable tool for numerical and financial computations.
