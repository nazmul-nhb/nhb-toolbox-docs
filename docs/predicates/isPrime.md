---
id: isPrime  
title: Check If a Number Is Prime  
---

Determines whether a given number is a prime number using an efficient 6k ± 1 optimization.

---

## `isPrime`

Checks whether the input number is prime.

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
