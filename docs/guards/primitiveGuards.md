---
id: primitive-guards
title: Primitive Guards
---

Collection of type-safe utility functions for runtime type checking of primitive values, enabling TypeScript type narrowing.

## Import

```typescript
import {
  isNumber, isString, isInteger, isPositiveInteger,
  isBoolean, isNull, isUndefined, isSymbol,
  isPrimitive, isNonEmptyString, isFalsy, isTruthy
} from 'nhb-toolbox';
```

## Type Definitions

```typescript
/** Represents all falsy primitive values */
export type FalsyPrimitive = false | 0 | '' | null | undefined;
```

## Core Type Guards

### `isNumber`

Validates if a value is a number (excluding NaN).

**Signature:**

```typescript
function isNumber(value: unknown): value is number
```

**Examples:**

```typescript
isNumber(42);           // true
isNumber('42');         // false
isNumber(NaN);          // false
isNumber(Infinity);     // true

// Type narrowing example
const input: unknown = 10;
if (isNumber(input)) {
  input.toFixed(2);     // OK - input is number
}
```

### `isString`

Validates if a value is a string.

**Signature:**

```typescript
function isString(value: unknown): value is string
```

**Examples:**

```typescript
isString('hello');      // true
isString(123);          // false
isString(null);         // false

// Practical usage
function capitalize(input: unknown): string {
  if (!isString(input)) {
    throw new Error('Input must be a string');
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}
```

### `isBoolean`

Validates if a value is a boolean.

**Signature:**

```typescript
function isBoolean(value: unknown): value is boolean
```

**Examples:**

```typescript
isBoolean(true);        // true
isBoolean(false);       // true
isBoolean('true');      // false
isBoolean(1);           // false
```

### `isSymbol`

Validates if a value is a Symbol.

**Signature:**

```typescript
function isSymbol(value: unknown): value is symbol
```

**Examples:**

```typescript
const sym = Symbol('key');
isSymbol(sym);          // true
isSymbol('symbol');     // false
isSymbol(42);           // false

// Practical usage with symbol properties
const PRIVATE_KEY = Symbol('private');
const obj = { [PRIVATE_KEY]: 'secret' };

function getPrivateValue(instance: unknown): string | never {
  if (!isObject(instance) || !isSymbol(PRIVATE_KEY)) {
    throw new Error('Invalid instance');
  }
  return instance[PRIVATE_KEY];
}
```

**Key Notes:**

1. Returns true only for actual Symbol primitives
2. Useful for working with unique identifier patterns
3. Helps maintain type safety when using Symbol properties

---

## Numeric Guards

### `isInteger`

Validates if a value is an integer.

**Signature:**

```typescript
function isInteger(value: unknown): value is number
```

**Examples:**

```typescript
isInteger(42);          // true
isInteger(42.5);        // false
isInteger('42');        // false
```

### `isPositiveInteger`

Validates if a value is a positive integer.

**Signature:**

```typescript
function isPositiveInteger(value: unknown): value is number
```

**Examples:**

```typescript
isPositiveInteger(42);  // true
isPositiveInteger(-42); // false
isPositiveInteger(0);   // false
```

## Nullish Guards

### `isNull`

Validates if a value is null.

**Signature:**

```typescript
function isNull(value: unknown): value is null
```

**Examples:**

```typescript
isNull(null);           // true
isNull(undefined);      // false
isNull(0);              // false
```

### `isUndefined`

Validates if a value is undefined.

**Signature:**

```typescript
function isUndefined(value: unknown): value is undefined
```

**Examples:**

```typescript
let var1;
isUndefined(var1);      // true
isUndefined(null);      // false
```

## Composite Guards

### `isPrimitive`

Validates if a value is a JavaScript primitive.

**Signature:**

```typescript
function isPrimitive(value: unknown): value is Primitive
```

**Examples:**

```typescript
isPrimitive('hello');   // true
isPrimitive(42);        // true
isPrimitive(null);      // true
isPrimitive({});        // false
```

### `isNonEmptyString`

Validates if a value is a non-empty string.

**Signature:**

```typescript
function isNonEmptyString(value: unknown): value is string
```

**Examples:**

```typescript
isNonEmptyString('hi'); // true
isNonEmptyString('');   // false
isNonEmptyString(42);   // false
```

### `isFalsy`

Validates if a value is falsy.

**Signature:**

```typescript
function isFalsy(value: unknown): value is FalsyPrimitive
```

**Examples:**

```typescript
isFalsy(false);         // true
isFalsy(0);             // true
isFalsy('');            // true
isFalsy('hello');       // false
```

### `isTruthy`

Validates if a value is truthy.

**Signature:**

```typescript
function isTruthy<T>(value: T): value is Exclude<T, FalsyPrimitive>
```

**Examples:**

```typescript
isTruthy('hello');      // true
isTruthy(42);           // true
isTruthy(true);         // true
isTruthy(null);         // false
```

## Performance Comparison

Type guards enable optimized code by allowing engines to make assumptions:

```typescript
// Without guard
if (typeof value === 'string') {
  // Additional checks needed
}

// With guard
if (isNonEmptyString(value)) {
  // Already validated
}
```

## Best Practices

1. Use guards at system boundaries (API responses, user input)
2. Prefer specific guards (e.g. `isPositiveInteger`) over general checks
3. Use truthy/falsy guards for straightforward conditional logic
