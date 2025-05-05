---
id: object-guards
title: Object Guards
---

Collection of type-safe utility functions for runtime type checking of objects. These guards enable TypeScript type narrowing and runtime validation.

<!-- markdownlint-disable-file MD024 -->
## Import

```typescript
import { isObject, isNotEmptyObject, isObjectWithKeys, isEmptyObject } from 'nhb-toolbox';
```

## Type Definitions

```typescript
/** Generic object with any value */
export type GenericObject = Record<string, any>;
```

## isObject

```typescript
function isObject(value: unknown): value is Record<string, unknown>
```

### Description

Determines if a value is a plain JavaScript object (excluding null and arrays). Properly narrows TypeScript type to object with string keys.

### Examples

```typescript
// Object detection
isObject({});                 // true
isObject({ key: 'value' });   // true
isObject(Object.create(null)); // true (prototype-less objects)
isObject(new Date());         // true (object wrapper)

// Non-object values
isObject([]);                 // false 
isObject(null);               // false
isObject(42);                 // false
isObject('text');             // false
isObject(() => {});           // false (functions are objects but excluded)

// Type narrowing
const config: unknown = { env: 'production' };
if (isObject(config)) {
  // config is now Record<string, unknown>
  if (isString(config.env)) {
    // config.env is string
  }
}
```

### Notes

- Returns `true` for any object type except arrays
- Functions are intentionally excluded despite being objects
- Properly handles edge cases like `Object.create(null)`

## isNotEmptyObject

```typescript
function isNotEmptyObject(
  value: unknown
): value is Record<string, unknown>
```

### Description

Validates that a value is both an object and contains at least one enumerable property. Useful for checking non-empty configurations or data payloads.

### Examples

```typescript
// With properties
isNotEmptyObject({ a: 1 });    // true
isNotEmptyObject({ '': 0 });   // true (empty string key counts)

// Empty cases  
isNotEmptyObject({});          // false
isNotEmptyObject(Object.create(null)); // false
isNotEmptyObject({ [Symbol('key')]: 'value' }); // false (symbol keys not enumerable)

// Practical usage
function processConfig(config: unknown) {
  if (isNotEmptyObject(config)) {
    // Safe to access properties
    return {
      ...defaults,
      ...config
    };
  }
  throw new Error('Configuration must be a non-empty object');
}
```

### Use Cases

- Validating API response objects
- Checking for non-empty configurations
- Ensuring payloads contain data
- Input validation for object parameters

## isObjectWithKeys

```typescript
function isObjectWithKeys<T extends Record<string, unknown>>(
  value: unknown,
  keys: (keyof T)[]
): value is T
```

### Description

Checks if a value is an object containing all specified keys. The most strict object validation guard, ensuring both the object shape and required properties.

### Examples

```typescript
// Basic usage
const value = { name: 'Alice', age: 30 };
isObjectWithKeys(value, ['name', 'age']);  // true
isObjectWithKeys(value, ['email']);        // false

// With interface
interface Person {
  name: string;
  age: number;
}

function validatePerson(data: unknown): Person {
  if (isObjectWithKeys<Person>(data, ['name', 'age']) &&
      isString(data.name) && 
      isNumber(data.age)) {
    return data; // data is now Person
  }
  throw new Error('Invalid person data');
}

// Edge cases
isObjectWithKeys({}, ['any']);            // false
isObjectWithKeys(null, ['key']);          // false
isObjectWithKeys({ [Symbol()]: 1 }, ['key']); // false
```

### Notes

- Only checks for presence of keys, not their types
- Combine with other guards for complete validation
- Works with both string and symbol keys in the check

## isEmptyObject

```typescript
function isEmptyObject(value: unknown): boolean
```

### Description

Determines if a value is an object with no enumerable properties of its own. Useful for checking default/empty states.

### Examples

```typescript
// Empty objects
isEmptyObject({});              // true
isEmptyObject(Object.create(null)); // true

// Non-empty cases
isEmptyObject({ key: undefined }); // false
isEmptyObject(new Date());       // false (has prototype properties)

// With Object.create
const obj = Object.create({ inherited: 'prop' });
isEmptyObject(obj);             // true (only checks own properties)

// Type guard pattern
function isMaybeEmpty<T>(value: T | {}): value is {} {
  return isEmptyObject(value);
}
```

### Use Cases

- Checking for empty state objects
- Default parameter handling
- Validating cleaned or stripped objects
- Difference detection in state management

## Aliases

| Main Export           | Alias Names                           |
|-----------------------|---------------------------------------|
| `isEmptyObject`       | `isEmptyObjectGuard`, `isObjectEmpty` |
| `isNotEmptyObject`    | `isValidObject`                       |
