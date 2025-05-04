---
id: class-methods
title: Class Methods Inspection Utilities
---
<!-- markdownlint-disable-file MD024 -->
Powerful utilities for examining and summarizing the instance/static methods of JavaScript/TypeScript classes. Analyze class APIs, count methods, and get comprehensive breakdowns—great for meta-programming, documentation tooling, and runtime validation.

---

## Import

```typescript
import {
  getInstanceMethodNames,
  getStaticMethodNames,
  countInstanceMethods,
  countStaticMethods,
  getClassDetails,
} from 'nhb-toolbox';
```

---

## Quick Overview

- **getInstanceMethodNames:** Lists names of all instance methods declared directly on a class.
- **getStaticMethodNames:** Lists static method names declared on the class itself.
- **countInstanceMethods/countStaticMethods:** Get instance/static method counts.
- **getClassDetails:** Get comprehensive info (names & counts).
- All return values are sorted alphabetically.

---

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Setup" label="Fixture">

```typescript
class Example {
  constructor() {}
  foo() {}
  bar() {}
  static zap() {}
  static zip() {}
}
```

</TabItem>
<TabItem value="Instance Names" label="Instance Methods">

```typescript
getInstanceMethodNames(Example)
// Returns: ['bar', 'foo']
```

</TabItem>
<TabItem value="Static Names" label="Static Methods">

```typescript
getStaticMethodNames(Example)
// Returns: ['zap', 'zip']
```

</TabItem>
<TabItem value="Instance Count" label="Count Instance">

```typescript
countInstanceMethods(Example)
// Returns: 2
```

</TabItem>
<TabItem value="Static Count" label="Count Static">

```typescript
countStaticMethods(Example)
// Returns: 2
```

</TabItem>
<TabItem value="Details" label="getClassDetails">

```typescript
getClassDetails(Example)
// Returns:
// {
//   instanceNames: ['bar', 'foo'],
//   staticNames: ['zap', 'zip'],
//   instances: 2,
//   statics: 2,
//   total: 4
// }
```

</TabItem>
</Tabs>

---

## API Reference

### getInstanceMethodNames

```typescript
function getInstanceMethodNames(cls: Constructor): string[]
```

Returns the sorted names of all instance methods defined directly on the class prototype (excluding inherited members and the constructor).

| Parameter | Type         | Description                                    |
|-----------|--------------|------------------------------------------------|
| cls       | Constructor  | The class constructor (not an instance)        |

---

### getStaticMethodNames

```typescript
function getStaticMethodNames(cls: Constructor): string[]
```

Returns the sorted names of all static methods defined directly on the class (excluding 'prototype', 'name', 'length', etc.).

---

### countInstanceMethods

```typescript
function countInstanceMethods(cls: Constructor): number
```

Returns the count of instance methods (see getInstanceMethodNames).

#### Alias

- `getInstanceMethodsCount`

---

### countStaticMethods

```typescript
function countStaticMethods(cls: Constructor): number
```

Returns the count of static methods (see getStaticMethodNames).

#### Alias

- `getStaticMethodsCount`

---

### getClassDetails

```typescript
function getClassDetails(cls: Constructor): ClassDetails
```

Returns a clean summary of a class’s instance/static method names and counts.

#### Returns

```typescript
interface ClassDetails {
  instanceNames: string[]; // List of instance method names
  staticNames: string[];   // List of static method names
  instances: number;       // Number of instance methods
  statics: number;         // Number of static methods
  total: number;           // Total methods (instance + static)
}
```

---

## Key Features

- **Alphabetical Sorting:** Always get deterministic, sorted lists.
- **Directly Defined Only:** Ignores prototype-chain/inherited members.
- **TypeScript Support:** Works seamlessly in TS and JS.

---

## Limitations

- **No Inherited Methods:** Only methods defined *directly* on the class (not the parent) are listed.
- **No Symbol Support:** Only string-named methods are included (symbol-named methods are ignored).
- **No Property Types:** Does not indicate async/getter/setter/property nature; only whether a key is a method.

---

## Recommended Use Cases

- Building class API documentation tools.
- Validating shape of user-extended classes.
- Automatic test-suite coverage reporting for class APIs.
- Debugging and runtime introspection for advanced libraries.

---

**Conclusion:**  
These utilities provide developer-friendly introspection of any ES6 class or constructor, helping with reflection, documentation, metaprogramming, and testing. Easy to drop in and reliable for modern JavaScript and TypeScript codebases.
