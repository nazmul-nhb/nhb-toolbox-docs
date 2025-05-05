---
id: special-guards
title: Special Guards
---

Collection of type-safe utility functions for runtime type checking of special non-primitive values. These guards enable TypeScript type narrowing and runtime validation.

## Import

```typescript
import { isDate, isSet, isMap, isRegExp, isError, isBigInt, isJSON } from 'nhb-toolbox';
```

<!-- markdownlint-disable-file MD024 -->
## isDate

```typescript
function isDate(value: unknown): value is Date
```

### Description

Validates if a value is a Date object. Properly handles Date instances across different execution contexts.

### Examples

```typescript
// Date checks
isDate(new Date());             // true
isDate(new Date('2020-01-01')); // true

// Non-dates
isDate('2020-01-01');           // false
isDate(1577836800000);          // false
isDate({});                     // false

// Type narrowing
const input: unknown = new Date();
if (isDate(input)) {
  console.log(input.getFullYear()); // safely accessible
}

// Cross-realm detection
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeDate = iframe.contentWindow.Date;
isDate(new iframeDate());       // true (works across realms)
```

### Use Cases

- Date parsing validation
- Serialization/deserialization
- Form input handling
- API response validation

## isSet

```typescript
function isSet<T>(value: unknown): value is Set<T>
```

### Description

Checks if a value is a Set object. Works with native Set and cross-realm instances.

### Examples

```typescript
// Set detection
isSet(new Set());               // true
isSet(new Set([1, 2, 3]));      // true

// Non-sets
isSet([]);                      // false
isSet({ size: 0 });             // false (Set-like)

// Type narrowing
const collection: unknown = new Set(['a', 'b']);
if (isSet<string>(collection)) {
  console.log([...collection].join(', ')); // a, b
}

// Cross-realm check
const iframeSet = new (document.createElement('iframe')
  .contentWindow.Set)();
isSet(iframeSet);               // true
```

### Use Cases

- Collection type validation
- Data processing pipelines
- Set operations validation
- Cross-window communication

## isMap

```typescript
function isMap<K, V>(value: unknown): value is Map<K, V>
```

### Description

Validates if a value is a Map object. Works with native Map and cross-realm instances.

### Examples

```typescript
// Map detection
isMap(new Map());               // true
isMap(new Map([['key', 'value']])); // true

// Non-maps
isMap({});                      // false
isMap(new Set());               // false

// Type-safe usage
const storage: unknown = new Map<string, number>();
if (isMap<string, number>(storage)) {
  storage.set('count', 42);     // properly typed
}

// Cross-frame detection
const iframeMap = new (document.createElement('iframe')
  .contentWindow.Map)();
isMap(iframeMap);               // true
```

### Notes

- Detects both empty and populated Maps
- Works across different JavaScript realms
- Preserves key-value type information

## isRegExp

```typescript
function isRegExp(value: unknown): value is RegExp
```

### Description

Checks if a value is a RegExp object. Handles both literal and constructor-created regular expressions.

### Examples

```typescript
// RegExp detection
isRegExp(/test/i);             // true
isRegExp(new RegExp('test'));  // true

// Non-regex
isRegExp('test');              // false
isRegExp({ test: true });      // false

// Type-safe operations
const pattern: unknown = /[a-z]+/;
if (isRegExp(pattern)) {
  const result = pattern.test('abc'); // safely callable
}

// Cross-realm check
const iframeRegex = new (document.createElement('iframe')
  .contentWindow.RegExp)('test');
isRegExp(iframeRegex);         // true
```

### Use Cases

- Input validation patterns
- Dynamic regex construction
- Serialization/deserialization
- Cross-window communication

## isError

```typescript
function isError(value: unknown): value is Error
```

### Description

Determines if a value is an Error object. Works with native errors and custom error classes.

### Examples

```typescript
// Error detection
isError(new Error());          // true
isError(new TypeError());      // true
isError(new CustomError());    // true (if extends Error)

// Non-errors
isError('error message');      // false
isError({ message: 'error' }); // false

// Error handling
try {
  // ...
} catch (e) {
  if (isError(e)) {
    console.error(e.message);  // safely accessible
    Sentry.captureException(e);
  } else {
    console.error('Unknown error:', e);
  }
}
```

### Notes

- Works with all Error subclasses
- Properly handles error-like objects
- Essential for robust error handling

## isBigInt

```typescript
function isBigInt(value: unknown): value is bigint
```

### Description

Checks if a value is a BigInt primitive. Essential for working with large integers.

### Examples

```typescript
// BigInt detection
isBigInt(1n);                  // true
isBigInt(BigInt(42));          // true

// Non-BigInt
isBigInt(42);                  // false
isBigInt('42');                // false

// Type-safe operations
const largeNumber: unknown = 9007199254740993n;
if (isBigInt(largeNumber)) {
  const squared = largeNumber * largeNumber; // valid operation
}

// Edge cases
isBigInt(null);                // false
isBigInt(undefined);           // false
```

### Use Cases

- Large integer calculations
- Financial/numeric applications
- Type-safe numeric operations
- BigInt serialization

## isJSON

```typescript
function isJSON(value: unknown): value is string
```

### Description

Validates if a string contains valid JSON. More strict than `isString` as it verifies parsable content.

### Examples

```typescript
// Valid JSON
isJSON('{}');                  // true
isJSON('{"key":"value"}');     // true
isJSON('[]');                  // true
isJSON('42');                  // true

// Invalid JSON
isJSON('');                    // false
isJSON('undefined');           // false
isJSON('{key: "value"}');      // false (no quotes)
isJSON("{'key': 'value'}");    // false (single quotes)

// Practical usage
function parseIfJSON(input: unknown) {
  if (isJSON(input)) {
    return JSON.parse(input);
  }
  return input;
}
```

### Notes

- Only returns true for strings that can be parsed
- Rejects JSON fragments (must be valid top-level value)
- Useful for API response validation

## Aliases

| Main Export           | Alias Names                           |
|-----------------------|---------------------------------------|
| `isJSON`              | `isJSONObject`, `isValidJSON`         |
| `isMap`               | `isValidMap`                          |
| `isRegExp`            | `isRegularExpression`                 |
| `isSet`               | `isValidSet`                          |
