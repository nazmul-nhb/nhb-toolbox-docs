---
id: class-methods  
title: Class Methods Inspection Utilities  
---

Powerful utilities for examining and summarizing the instance/static methods and getters of JavaScript/TypeScript classes. Analyze class APIs, count methods/getters, and get comprehensive breakdowns—great for meta-programming, documentation tooling, and runtime validation.

---

<!-- markdownlint-disable-file MD024 -->
## Import

```typescript
import {
  getInstanceMethodNames,
  getStaticMethodNames,
  getInstanceGetterNames,
  getStaticGetterNames,
  countInstanceMethods,
  countStaticMethods,
  getClassDetails,
} from 'nhb-toolbox';
```

---

## Quick Overview

- **getInstanceMethodNames:** Lists names of all instance methods declared directly on a class prototype
- **getStaticMethodNames:** Lists static method names declared on the class itself
- **getInstanceGetterNames:** Lists names of all instance getters declared directly on a class prototype
- **getStaticGetterNames:** Lists static getter names declared on the class itself
- **countInstanceMethods/countStaticMethods:** Get instance/static method counts
- **getClassDetails:** Get comprehensive info (methods, getters, names & counts)
- All return values are sorted alphabetically

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
  
  get instanceProp() { return 42; }
  static get staticProp() { return 42; }
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
<TabItem value="Instance Getters" label="Instance Getters">

```typescript
getInstanceGetterNames(Example)
// Returns: ['instanceProp']
```

</TabItem>
<TabItem value="Static Getters" label="Static Getters">

```typescript
getStaticGetterNames(Example)
// Returns: ['staticProp']
```

</TabItem>
<TabItem value="Details" label="getClassDetails">

```typescript
getClassDetails(Example)
// Returns:
// {
//   instanceMethods: ['bar', 'foo'],
//   staticMethods: ['zap', 'zip'],
//   instanceGetters: ['instanceProp'],
//   staticGetters: ['staticProp'],
//   instanceCount: 2,
//   staticCount: 2,
//   totalGetters: 2,
//   totalMethods: 4
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

Returns the sorted names of all instance methods defined directly on the class prototype (excluding inherited members, getters, and the constructor).

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

### getInstanceGetterNames

```typescript
function getInstanceGetterNames(cls: Constructor): string[]
```

Returns the sorted names of all instance getters defined directly on the class prototype (excluding inherited members and methods).

---

### getStaticGetterNames

```typescript
function getStaticGetterNames(cls: Constructor): string[]
```

Returns the sorted names of all static getters defined directly on the class (excluding methods and prototype properties).

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

Returns a clean summary of a class's instance/static methods, getters, and counts.

#### Returns

```typescript
interface ClassDetails {
  instanceMethods: string[];  // List of instance method names
  staticMethods: string[];    // List of static method names
  instanceGetters: string[];  // List of instance getter names
  staticGetters: string[];    // List of static getter names
  instanceCount: number;      // Number of instance methods
  staticCount: number;        // Number of static methods
  totalGetters: number;       // Total getters (instance + static)
  totalMethods: number;       // Total methods (instance + static)
}
```

---

## Key Features

- **Alphabetical Sorting:** Always get deterministic, sorted lists
- **Directly Defined Only:** Ignores prototype-chain/inherited members
- **Getter Support:** Now includes comprehensive getter inspection
- **TypeScript Support:** Works seamlessly in TS and JS
- **Non-Invasive:** Doesn't modify the original class

---

## Limitations

- **No Inherited Members:** Only methods/getters defined *directly* on the class (not the parent) are listed
- **No Symbol Support:** Only string-named methods/getters are included
- **No Setter Detection:** Currently only detects getters (not setters) (coming in future update)
- **No Property Types:** Doesn't indicate async/static nature of methods

---

## Recommended Use Cases

- Building comprehensive class API documentation tools
- Validating shape of user-extended classes
- Automatic test-suite coverage reporting for class APIs
- Runtime validation of class interfaces
- Debugging and introspection for advanced libraries
- Analyzing class structures for code generation
