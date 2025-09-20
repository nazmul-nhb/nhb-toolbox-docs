---
id: cloneObject  
title: Clone Object  
---

## cloneObject

Creates a deep clone of an object using JSON serialization.

### Function Signature

```typescript
function cloneObject<T extends GenericObject>(obj: T): T
```

### Parameters

| Parameter | Type                      | Description         |
| --------- | ------------------------- | ------------------- |
| `obj`     | `T extends GenericObject` | The object to clone |

### Returns

A new object that is a deep clone of the input.

### Example Usage

```typescript
import { cloneObject } from 'nhb-toolbox';

const original = { 
  name: 'John',
  address: {
    city: 'New York'
  }
};

const cloned = cloneObject(original);
console.log(cloned === original); // false
console.log(cloned.address === original.address); // false
```

### Type Definition

```typescript
type GenericObject = Record<string, any>;
```

### Behavior Details

1. **Deep Cloning**
   - Nested objects are fully cloned
   - Array references are broken
   - Circular references will cause errors

2. **Supported Types**
   - Objects
   - Arrays
   - Primitives (string, number, boolean, null)
   - Dates (converted to strings)
   - Other JSON-serializable values

3. **Unsupported Types**
   - Functions
   - Symbols
   - Undefined values
   - Class instances
   - DOM elements
   - Circular references

### Limitations

1. **Performance**
   - Not optimal for very large objects
   - Serialization/deserialization has overhead

2. **Type Fidelity**
   - Loses type information for custom classes
   - Converts Dates to strings

3. **Edge Cases**
   - Throws on circular references
   - Drops undefined values

### Use Cases

- Creating object snapshots
- Immutable state updates
- Breaking reference chains
- Simple deep copies of data objects

### Alternative Approaches

For more robust cloning consider:

- Built-in `structuredClone`
- Structured cloning algorithm
- Lodash's `cloneDeep`
- Manual cloning for complex types

### SSR Note

⚠️ Works in both browser and Node.js environments, but has the same limitations in both.
