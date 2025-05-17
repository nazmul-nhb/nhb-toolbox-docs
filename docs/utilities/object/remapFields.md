---
id: remapFields
title: Remap Object Fields
---

## remapFields

Transforms an object's structure by mapping properties to new names according to a provided field mapping.

## Import

```typescript
import { remapFields } from 'nhb-toolbox';
import { remapObjectFields } from 'nhb-toolbox';
```

## Function Signature

```typescript
function remapFields<Source extends GenericObject, Target extends Record<string, keyof Source>>(
  source: Source,
  fieldMap: Target
): { [K in keyof Target]: Source[Target[K]] }
```

## Usage Examples

### Basic Field Renaming

```typescript
const user = {
  userId: 123,
  fullName: 'John Doe',
  emailAddress: 'john@example.com'
};

const mappedUser = remapFields(user, {
  id: 'userId',
  name: 'fullName',
  email: 'emailAddress'
});
// Returns { id: 123, name: 'John Doe', email: 'john@example.com' }
```

### Partial Remapping

```typescript
const product = {
  prodId: 'P100',
  productName: 'Laptop',
  price: 999,
  inStock: true
};

const inventoryItem = remapFields(product, {
  id: 'prodId',
  name: 'productName'
});
// Returns { id: 'P100', name: 'Laptop' }
```

## API Reference

### Type Parameters

| Name | Description |
|------|-------------|
| `Source` | Type of source object |
| `Target` | Object type mapping target keys to source keys |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `source` | `Source` | Source object to remap |
| `fieldMap` | `Target` | Mapping of target keys to source keys |

### Returns

An object with the same keys as `fieldMap` and corresponding value types from `source`

## Key Features

1. **Type Safe**: Preserves value types from source object
2. **Selective Mapping**: Only includes fields specified in fieldMap
3. **Non-Destructive**: Creates new object without modifying original
4. **Flexible**: Works with partial mappings
5. **Simple Types**: No complex generic type parameters needed

## Aliases

This function is also exported as:

- `remapObjectFields`

## Limitations

1. **Shallow Only**: Doesn't handle nested object remapping
2. **No Transformation**: Only renames fields, doesn't transform values
3. **No Defaults**: Missing fields become undefined, optional field's type will be `type` or `undefined`

## Recommended Use Cases

- API response reshaping
- Data normalization
- Interface adaptation
- Field name standardization
- Data transfer object (DTO) conversion
