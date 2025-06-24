---
id: deleteFields  
title: Delete Object Fields  
---

## deleteFields  

Creates a new object by removing specified properties from a source object.

## Import  

```typescript  
// Main function  
import { deleteFields } from 'nhb-toolbox';  

// Aliases also available:  
import { 
  omitFields,
  omitObjectFields,
  deleteObjectFields,
  removeFields,
  removeObjectFields
} from 'nhb-toolbox';  
```  

## Function Signature(s)  

```typescript  
function deleteFields<T extends GenericObject, U extends keyof T>(
  source: T,
  keys: readonly U[]
): { [K in Exclude<keyof T, U>]: T[K] }
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

const filtered = deleteFields(user, ['email', 'age']);
// Returns { id: 1, name: 'John' }
```  

## API Reference  

### Type Parameters  

| Name | Description |  
|------|-------------|  
| `T`  | Type of source object |  
| `U`  | Type of keys to delete |  

### Parameters  

| Name | Type | Description |  
|------|------|-------------|  
| `source` | `T` | Source object to delete fields from |  
| `keys` | `readonly U[]` | Array of property keys to delete |  

### Returns  

A new object excluding the specified properties  

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

deleteFields(book, ['author']);
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
  name: 'MacBook Pro',
  price: 1999
};

deleteFields(laptop, ['price']);
// Returns { id: 101, name: 'MacBook Pro' }
```  

## Limitations  

1. **No Deep Deletion**: Only works with top-level properties  
2. **No Dot Notation**: Doesn't support nested property paths  

## Recommended Use Cases  

- Removing sensitive data before logging  
- Creating subset objects for API responses  
- Filtering out unused fields  
- Data redaction/obfuscation  
- Preparing payloads for different contexts  

## Aliases  

This function is also exported as:  

- `omitFields`  
- `omitObjectFields`  
- `deleteObjectFields`  
- `removeFields`  
- `removeObjectFields`  

## Related Functions  

- [pickFields](pickFields) - Select specific object fields  
- [remapFields](remapFields) - Remap object fields
- [pickFieldsByCondition](pickFieldsByCondition) - Pick object fields conditionally  
