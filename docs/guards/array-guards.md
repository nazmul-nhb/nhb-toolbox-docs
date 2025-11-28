---
id: array-guards
title: Array Guards
---

Collection of type-safe utility functions for runtime type checking of arrays. These guards enable TypeScript type narrowing and runtime validation.

<!-- markdownlint-disable-file MD024 -->
## Import

```typescript
import { isArray, isValidArray, isArrayOfType } from 'nhb-toolbox';
```

## isArray

```typescript
function isArray<T>(value: unknown): value is Array<T>
```

### Description

Determines whether a value is a JavaScript array. Properly narrows TypeScript type to `Array<T>` when used in type predicates. Handles all array types including typed arrays.

### Examples

```typescript
// Basic array detection
isArray([1, 2, 3]);           // true
isArray(new Array(5));        // true

// Edge cases
isArray({ length: 0 });       // false (array-like objects)
isArray('array');             // false (strings are not arrays)
isArray(null);                // false
isArray(undefined);           // false

// Type narrowing
const unknownValue: unknown = ['a', 'b', 'c'];
if (isArray<string>(unknownValue)) {
  unknownValue.join(', ');    // safely typed as string[]
}
```

## isValidArray

```typescript
function isValidArray<T>(value: unknown): value is Array<T>
```

### Description

Checks if a value is both an array and contains at least one element. Combines array detection with length check in a single operation.

### Examples

```typescript
// Positive cases
isValidArray([1]);            // true
isValidArray([null]);         // true (contains element)
isValidArray(new Array(1));   // true (array with length)

// Negative cases
isValidArray([]);             // false
isValidArray({ length: 1 });  // false (not a real array)

// With type parameter
const data: unknown = [1, 2, 3];
if (isValidArray<number>(data)) {
  const sum = data.reduce((a, b) => a + b, 0); // data is number[]
}
```

### Notes

- More efficient than separate `isArray` and `length` checks
- Returns `false` for sparse arrays with length but no elements
- Preserves type information through generics

## isArrayOfType

```typescript
function isArrayOfType<T>(
  value: unknown,
  typeCheck: (item: unknown) => item is T
): value is T[]
```

### Description

Validates that all elements in an array match a specific type guard. Useful for checking homogeneous collections from untyped sources.

### Examples

```typescript
// Primitive type checking
isArrayOfType([1, 2, 3], isNumber);      // true
isArrayOfType(['a', 'b'], isString);     // true
isArrayOfType([true, false], isBoolean); // true

// Complex object validation
interface User {
  id: number;
  name: string;
  active: boolean;
}

const isUser = (u: unknown): u is User => (
  isObject(u) && 
  isNumber(u.id) && 
  isString(u.name) && 
  isBoolean(u.active)
);

const apiResponse: unknown = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false }
];

if (isArrayOfType(apiResponse, isUser)) {
  // apiResponse is now typed as User[]
  const activeUsers = apiResponse.filter(u => u.active);
}
```

### Use Cases

- Validating API response arrays
- Processing CSV/JSON data
- Sanitizing user-provided arrays
- Runtime validation of typed collections

## Aliases

| Main Export           | Alias Names                           |
|-----------------------|---------------------------------------|
| `isValidArray`        | `isArrayWithLength`                   |
