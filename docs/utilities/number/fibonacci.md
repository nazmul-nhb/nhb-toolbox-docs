---
id: fibonacci  
title: Fibonacci Number(s)  
---

`nhb-toolbox` offers multiple utilities for working with the Fibonacci sequence:

- Generate full sequences
- Fetch a specific Fibonacci number
- Lazily iterate using a generator
- Supports aliases for convenient use

All inputs are coerced and validated using `Number()`.

---

## getFibonacciSeries

Generates the first `limit` Fibonacci numbers iteratively.

### Function Signature

```ts
function getFibonacciSeries(limit: Numeric): number[];
```

### Parameters

- `limit` — Number of Fibonacci numbers to generate.

### Returns

An array of Fibonacci numbers from `index 0` to `limit - 1`. If the input is invalid or non-positive, an empty array is returned.

### Example

```ts
getFibonacciSeries(7); // [0, 1, 1, 2, 3, 5, 8]
```

### Aliases

- `getFibonacci`
- `getFibonacciNumbers`

---

## getFibonacciSeriesMemo

Generates the first `limit` Fibonacci numbers using recursion with memoization.

<!-- markdownlint-disable-file MD024 -->
### Function Signature

```ts
function getFibonacciSeriesMemo(limit: Numeric): number[];
```

### Parameters

- `limit` — Number of Fibonacci numbers to generate.

### Returns

An array of Fibonacci numbers from `index 0` to `limit - 1`, using a memoized recursive function. Invalid input returns an empty array.

### Example

```ts
getFibonacciSeriesMemo(7); // [0, 1, 1, 2, 3, 5, 8]
```

### Aliases

- `getMemoizedFibonacci`
- `getMemoizedFibonacciSeries`

---

## fibonacciGenerator

A lazy generator that yields Fibonacci numbers up to a given `limit`.

### Function Signature

```ts
function* fibonacciGenerator(
  limit: Numeric,
  onYield?: (value: number, index: number) => void
): Generator<number, void, void>;
```

### Parameters

- `limit` — Number of Fibonacci values to yield.
- `onYield` _(optional)_ — Callback called on each yield with `(value, index)`.

### Returns

- A generator that yields Fibonacci numbers one by one up to the specified `limit`.

### Example

```ts
for (const value of fibonacciGenerator(5)) {
  console.log(value);
}
// Output: 0, 1, 1, 2, 3
```

### With Callback

```ts
fibonacciGenerator(3, (val, idx) => {
  console.log(`Index ${idx} => ${val}`);
});
```

### Aliases

- `generateFibonacci`

---

## getNthFibonacci

Returns the Fibonacci number at the specified `index`.

### Function Signature

```ts
function getNthFibonacci(index: Numeric): number;
```

### Parameters

- `index` — Index (0-based) of the Fibonacci number to retrieve.

### Returns

- The Fibonacci number at the given `index`.

### Example

```ts
getNthFibonacci(8); // 21
```

## Summary of Aliases

| Function                  | Aliases                                              |
|---------------------------|------------------------------------------------------|
| `getFibonacciSeries`      | `getFibonacci`, `getFibonacciNumbers`                |
| `getFibonacciSeriesMemo`  | `getMemoizedFibonacci`, `getMemoizedFibonacciSeries` |
| `getNthFibonacci`         | _None_                                               |
| `fibonacciGenerator`      | `generateFibonacci`                                  |

### Notes

- All functions gracefully handle invalid or non-numeric inputs.
- Internally, inputs are coerced using `Number(...)`, and validation is performed via `Number.isFinite(...)`.
- The `memo` version avoids recalculation via `Map`, but not tail-call optimized.
- The memoized variant is optimal for moderate `limit` values but not designed for very large `n` due to recursion depth limits.
- The generator is memory-efficient and supports optional side effects per iteration.
- Generator is ideal for performance-sensitive or infinite-like iteration use cases.

### Limitations

- `fibonacciGenerator()` does not return (short-circuits early) if `limit < 0` or not finite.
- Recursive memoized version is not tail-optimized; it may hit stack limits on very high input values.
- `getNthFibonacci()` uses an iterative approach, so it performs efficiently for most practical input ranges.
- Floating-point limits apply at high index values (`n > 70`).

### Summary

These Fibonacci utilities are flexible and efficient for different use cases — whether generating an entire sequence, computing a single term, or lazily consuming values via a generator.
