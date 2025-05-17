---
id: pickFields
title: Pick Object Fields
---

## pickFields

Creates a new object containing only the specified properties from a source object.

## Import

```typescript
// Main function
import { pickFields } from 'nhb-toolbox';

// Alias also available:
import { pickObjectFields } from 'nhb-toolbox';
```

## Function Signature(s)

```typescript
function pickFields<T extends GenericObject, U extends keyof T>(
  source: T,
  keys: U[]
): { [K in U]: T[K] }
```

## Usage

### Basic Usage

```typescript
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30
};

const picked = pickFields(user, ['name', 'email']);
// Returns { name: 'John', email: 'john@example.com' }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `T`  | Type of source object |
| `U`  | Type of keys to pick |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `source` | `T` | Source object to pick from |
| `keys` | `U[]` | Array of property keys to pick |

### Returns

A new object containing only the specified properties

## Key Features

1. **Type Safe**: Maintains proper TypeScript typing
2. **Non-Destructive**: Creates new object without modifying original
3. **Simple API**: Easy to use with clear intent
4. **Performance**: Efficient implementation

## Examples

### Nested Objects

```typescript
const book = {
  title: 'Clean Code',
  author: 'Robert Martin',
  details: {
    pages: 464,
    publisher: 'Prentice Hall'
  }
};

pickFields(book, ['title', 'details']);
// Returns {
//   title: 'Clean Code',
//   details: { pages: 464, publisher: 'Prentice Hall' }
// }
```

### With Optional Fields

```typescript
interface Product {
  id: number;
  name: string;
  price?: number;
}

const laptop: Product = {
  id: 101,
  name: 'MacBook Pro'
};

pickFields(laptop, ['name', 'price']);
// Returns { name: 'MacBook Pro', price: undefined }
```

## Limitations

1. **No Deep Picking**: Only works with top-level properties
2. **No Dot Notation**: Doesn't support nested property paths
3. **No Default Values**: Returns undefined for missing properties

## Recommended Use Cases

- Creating view models from data objects
- Selecting API response fields
- Reducing payload size
- Creating partial objects for updates
- Data masking/redaction

## Aliases

This function is also exported as:

- `pickObjectFields`

## Related Functions

- [pickFieldsByCondition](pickFieldsByCondition) - Pick object fields conditionally
- [remapFields](remapFields) - Remap object fields
