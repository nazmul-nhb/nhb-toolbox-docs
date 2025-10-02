---
id: pickFieldsByCondition
title: Pick Object Fields By Condition
---

## pickFieldsByCondition

Creates a new object containing only the properties that satisfy a given condition.

## Import

```typescript
// Main function
import { pickObjectFieldsByCondition } from 'nhb-toolbox';

// Alias also available:
import { pickFieldsByCondition } from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
pickObjectFieldsByCondition<T extends GenericObject>(
  source: T,
  condition: (key: keyof T, value: T[keyof T]) => boolean
): Partial<T>
```

## Usage

### Basic Usage

```typescript
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30,
  isAdmin: false
};

// Pick only string fields
const stringFields = pickObjectFieldsByCondition(
  user,
  (key, value) => typeof value === 'string'
);
// Returns { name: 'John', email: 'john@example.com' }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of source object |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `source` | `T` | Source object to pick from |
| `condition` | `(key: keyof T, value: T[keyof T]) => boolean` | Function that determines if a property should be picked |

### Returns

`Partial<T>`: New object containing only the properties that satisfy the condition

## Key Features

1. **Flexible Filtering**: Condition can be based on key, value, or both
2. **Type Safe**: Maintains TypeScript typing
3. **Non-Destructive**: Creates new object without modifying original
4. **Deep Inspection**: Can evaluate both keys and values

## Examples

### Pick Non-Null Values

```typescript
const data = {
  title: 'Document',
  content: null,
  author: 'Jane',
  createdAt: undefined
};

pickObjectFieldsByCondition(data, (key, value) => value != null);
// Returns { title: 'Document', author: 'Jane' }
```

### Pick Numeric Fields

```typescript
const product = {
  id: 101,
  name: 'Laptop',
  price: 999.99,
  inStock: true
};

pickObjectFieldsByCondition(
  product,
  (key, value) => typeof value === 'number'
);
// Returns { id: 101, price: 999.99 }
```

### Key-Based Selection

```typescript
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retryCount: 3,
  debugMode: false
};

pickObjectFieldsByCondition(
  config,
  (key) => key.toString().endsWith('Count') || key.toString().endsWith('Mode')
);
// Returns { retryCount: 3, debugMode: false }
```

## Limitations

1. **Shallow Only**: Doesn't recursively inspect nested objects
2. **No Dot Notation**: Can't filter nested properties by path
3. **Performance**: Slower than `pickFields` for simple key selection

## Recommended Use Cases

- Filtering object properties by type
- Removing null/undefined values
- Selecting fields based on complex conditions
- Data cleaning and normalization
- Creating view-specific object subsets

## Aliases

This function is also exported as:

- `pickFieldsByCondition`

## Related Functions

- [pickFields](pickFields) - For simple key-based selection
