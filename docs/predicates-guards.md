---
id: predicates-guards
title: Predicates & Type Guards
---

## Runtime Validation with Precision

NHB Toolbox provides two complementary validation tools:

### 1. [Predicate Functions](predicates) (Boolean Validators)

Simple functions that return `boolean` without affecting TypeScript's type system:

```ts
const prime = isPrime(number); // Returns true/false
```

### 2. [Type Guards](guards) (Type Narrowing)

Functions using `x is T` syntax that narrow types in conditional blocks:

```ts
if (isString(input)) { // input is now narrowed to string type
  input.toLowerCase(); // Type-safe access
}
```

### Key Differences

| Feature        | Predicates        | Type Guards       |
|----------------|-------------------|-------------------|
| Return type    | `boolean`         | `value is Type`   |
| Type narrowing | No                | Yes               |
| Usage          | Anywhere          | Conditionals      |
| Example        | `isPrime(value)`  | `isString(value)` |

### Why This Matters

- **Predicates** for simple validation
- **Guards** when you need type narrowing

---

Browse by category or use the search to find the perfect predicate/type guard for your task.
