---
id: findPrimeNumbers
title: Find Prime Numbers in a Range  
---

Returns all prime numbers within a specified numeric range.

---

## `findPrimeNumbers`

Finds all primes between the `start` and `end` values (inclusive). If `start > end`, the range is automatically normalized.

### Function Signature

```ts
function findPrimeNumbers(start?: number, end?: number): number[];
```

### Parameters

- `start` — The start of the range (default: `1`).
- `end` — The end of the range (default: `1000`).

### Returns

- An array of prime numbers within the specified range.

---

### Examples

```ts
findPrimeNumbers();            // [2, 3, 5, 7, 11, ..., 997]
findPrimeNumbers(10, 30);      // [11, 13, 17, 19, 23, 29]
findPrimeNumbers(30, 10);      // [11, 13, 17, 19, 23, 29] (auto normalized)
findPrimeNumbers(100, 105);    // [101, 103]
```

---

### Aliases

- `getPrimeNumbers`

---

### Notes

- Uses a simple filtering strategy via a helper `isPrime()` function.
- Automatically corrects ranges where `start > end`.
- Efficiency is acceptable for small-to-medium ranges, but not suitable for very large datasets (e.g. millions of numbers).

---

### Conclusion

Use `findPrimeNumbers` to quickly get prime numbers between any two values. The normalization logic ensures it’s safe to pass unordered inputs, making it flexible for user input-driven ranges.
