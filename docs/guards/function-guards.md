---
id: function-guards
title: Function Guards
---

Collection of type-safe utility functions for runtime type checking of functions. These guards enable TypeScript type narrowing and runtime validation.

<!-- markdownlint-disable-file MD024 -->
## Import

```typescript
import { isFunction, isMethodDescriptor, isPromise, isReturningPromise } from 'nhb-toolbox';
```

## Type Definitions

```typescript
/** Generic function type */
export type GenericFn = (...args: unknown[]) => unknown;

/** Asynchronous function type */
export type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;
```

## isFunction

```typescript
function isFunction(value: unknown): value is GenericFn
```

### Description

Determines if a value is a callable function. Works for all function types including async functions, generators, and class constructors.

### Examples

```typescript
// Function checks
isFunction(function() {});     // true
isFunction(() => {});          // true
isFunction(class {});          // true
isFunction(async function() {}); // true
isFunction(function*() {});    // true

// Non-functions
isFunction({});                // false
isFunction(null);              // false
isFunction('function');        // false

// Type narrowing
const callback: unknown = () => console.log('called');
if (isFunction(callback)) {
  callback(); // safely callable
}

// Constructor check
function createInstance(ctor: unknown, ...args: unknown[]) {
  if (isFunction(ctor)) {
    return new ctor(...args);
  }
  throw new Error('Constructor expected');
}
```

### Notes

- Returns true for all callable values
- Includes async functions and generators
- Properly handles edge cases like bound functions

## isMethodDescriptor

```typescript
function isMethodDescriptor(descriptor: PropertyDescriptor | undefined): boolean
```

### Description

Specialized guard checking if a property descriptor represents a method (function-valued property). Useful for reflection and decorators.

### Examples

```typescript
const obj = {
  method() {},
  prop: 'value',
  get accessor() { return this.prop; }
};

// Checking descriptors
const methodDesc = Object.getOwnPropertyDescriptor(obj, 'method');
isMethodDescriptor(methodDesc);  // true

const propDesc = Object.getOwnPropertyDescriptor(obj, 'prop');
isMethodDescriptor(propDesc);    // false

const accessorDesc = Object.getOwnPropertyDescriptor(obj, 'accessor'); 
isMethodDescriptor(accessorDesc); // false

// Practical usage in decorators
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  if (!isMethodDescriptor(descriptor)) {
    throw new Error('@logMethod can only decorate methods');
  }
  
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}
```

### Use Cases

- Property descriptor validation
- Decorator implementations
- Reflection-based code
- Runtime method checking

### isPromise

```typescript
function isPromise(value: unknown): value is Promise<unknown>
```

#### Description

Determines if a value is a Promise (thenable object). Works with native Promises and most Promise implementations.

#### Examples

```typescript
// Promise detection
isPromise(Promise.resolve());   // true
isPromise(new Promise(() => {})); // true
isPromise({
  then: () => {},
  catch: () => {}
});                            // true (thenable)

// Non-promises
isPromise({});                  // false
isPromise({ then: 1 });         // false (non-function then)
isPromise(null);                // false

// Async handling
async function process(value: unknown) {
  if (isPromise(value)) {
    value = await value;
  }
  // ... process value
}
```

#### Notes

- Detects both native Promises and thenables
- Works across different Promise implementations
- Useful for promise unwrapping utilities

## isReturningPromise

```typescript
function isReturningPromise<T>(fn: unknown): fn is AsyncFunction<T>
```

### Description

Checks if a function returns a Promise. Identifies async functions and regular functions that return promises.

### Examples

```typescript
// Async functions
isReturningPromise(async () => {});          // true
isReturningPromise(async function() {});     // true

// Promise-returning functions
isReturningPromise(() => Promise.resolve()); // true
isReturningPromise(() => new Promise(() => {})); // true

// Non-async functions
isReturningPromise(() => {});                // false
isReturningPromise(function*() {});          // false

// Type-safe handling
function wrapAsync(fn: unknown) {
  if (!isReturningPromise(fn)) {
    throw new Error('Function must return a Promise');
  }
  
  return async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Async error:', error);
      throw error;
    }
  };
}
```

### Notes

- Detects both async functions and explicit Promise returns
- Works with bound functions and methods
- Useful for API boundary validation

## Aliases

| Main Export           | Alias Names                           |
|-----------------------|---------------------------------------|
| `isMethodDescriptor`  | `isMethod`                            |
| `isReturningPromise`  | `doesReturnPromise`                   |
