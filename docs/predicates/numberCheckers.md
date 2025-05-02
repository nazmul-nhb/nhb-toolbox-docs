---
id: number-checkers  
title: Number Checkers  
---

<!-- markdownlint-disable-file MD024 -->
## isPrime

Determines whether a given number is a prime number using an efficient 6k ± 1 optimization.

### Function Signature

```ts
function isPrime(number: number): boolean;
```

### Parameters

- `number` — The integer to evaluate for prime number check.

### Returns

- `true` if the number is a prime, otherwise `false`.

---

### Examples

```ts
isPrime(2);    // true
isPrime(9);    // false
isPrime(17);   // true
isPrime(100);  // false
```

---

### Aliases

- `isPrimeNumber`

---

### Notes

- Uses a fast prime number check based on:
  - Simple divisibility rules for 2 and 3.
  - 6k ± 1 optimization to reduce unnecessary checks.
- Returns `false` for all numbers below 2.
- Ideal for performance on small to moderate integers.

---

### Conclusion

Use `isPrime` for fast and reliable checks on prime numbers. Optimized to skip redundant checks for improved efficiency, making it a solid choice for real-time filters, math utilities, or validation routines.

---

## isEven

Checks if a number is even (divisible by 2).

### Function Signature

```ts
function isEven(input: number): boolean;
```

### Parameters

- **`input`**: The number to check.

### Returns

Returns `true` if the number is even, otherwise `false`.

### Example

```ts
isEven(4); // true
isEven(3); // false
```

### Aliases

- `isEvenNumber`: Alias for `isEven`.

---

## isOdd

Checks if a number is odd (not divisible by 2).

### Function Signature

```ts
function isOdd(input: number): boolean;
```

### Parameters

- **`input`**: The number to check.

### Returns

Returns `true` if the number is odd, otherwise `false`.

### Example

```ts
isOdd(3); // true
isOdd(4); // false
```

### Aliases

- `isOddNumber`: Alias for `isOdd`.

---

## isMultiple

Checks if a number is a multiple of another number.

### Function Signature

```ts
function isMultiple(input: number, multipleOf: number): boolean;
```

### Parameters

- **`input`**: The number to check.
- **`multipleOf`**: The potential multiple.

### Returns

Returns `true` if `input` is a multiple of `multipleOf`, otherwise `false`.

### Example

```ts
isMultiple(10, 5); // true
isMultiple(10, 3); // false
```

### Notes

- Returns `true` when `input` is 0 and `multipleOf` is 0 (mathematically undefined case)
- Handles negative numbers correctly

---

## isPerfectSquare

Checks if a number is a perfect square.

### Function Signature

```ts
function isPerfectSquare(num: number): boolean;
```

### Parameters

- **`num`**: The number to check.

### Returns

Returns `true` if the number is a perfect square, otherwise `false`.

### Example

```ts
isPerfectSquare(16); // true
isPerfectSquare(15); // false
```

---

## isFibonacci

Checks if a number is part of the Fibonacci sequence.

### Function Signature

```ts
function isFibonacci(num: number): boolean;
```

### Parameters

- **`num`**: The number to check.

### Returns

Returns `true` if the number is in the Fibonacci sequence, otherwise `false`.

### Example

```ts
isFibonacci(8); // true (Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...)
isFibonacci(9); // false
```

### Algorithm

Uses the mathematical property that a number `n` is Fibonacci if and only if one or both of `(5*n^2 + 4)` or `(5*n^2 - 4)` is a perfect square.

### Aliases

- `isParOfFibonacci`: Alias for `isFibonacci`.
- `isParOfFibonacciSeries`: Alias for `isFibonacci`.

---

## areInvalidNumbers

Checks if any input is not a finite number.

### Function Signature

```ts
function areInvalidNumbers(...numbers: number[]): boolean;
```

### Parameters

- **`numbers`**: Spread of numbers to validate.

### Returns

Returns `true` if any input is not finite (NaN, Infinity, etc.), otherwise `false`.

### Example

```ts
areInvalidNumbers(1, 2, NaN); // true
areInvalidNumbers(1, 2, 3); // false
```

### Common Use Cases

- Validating user input
- Sanity checking before mathematical operations
- Data quality verification

### Notes

- Returns `true` for:
  - `NaN`
  - `Infinity`
  - `-Infinity`
  - Non-number values (due to type coercion)
- Returns `false` for all finite numbers including zero

### Aliases

- `areNumbersInvalid`: Alias for `areInvalidNumbers`.
- `isInvalidNumber`: Alias for `areInvalidNumbers`.
- `isNumberInvalid`: Alias for `areInvalidNumbers`.
