---
id: remapFields
title: Remap Object Fields
---

Transforms an object's structure by mapping properties to new names according to a provided field mapping.

## Import

```typescript
import { remapFields } from 'nhb-toolbox';
import { remapObjectFields } from 'nhb-toolbox';
```

## Function Signature

```typescript
function remapFields<Source extends GenericObject, Target extends GenericObject>(
  source: Source,
  fieldMap: FieldMap<Source, Target>
): Target
```

## Type Definition

```typescript
type FieldMap<Source, Target> = {
  [K in keyof Partial<Target>]: keyof Partial<Source>
};
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
| `Target` | Type of target object |

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `source` | `Source` | Source object to remap |
| `fieldMap` | `FieldMap<Source, Target>` | Mapping of target keys to source keys |

### Returns

`Target`: New object with remapped fields

## Key Features

1. **Type Safe**: Maintains proper typing between source and target
2. **Selective Mapping**: Only includes fields specified in fieldMap
3. **Non-Destructive**: Creates new object without modifying original
4. **Flexible**: Works with partial mappings

## Aliases

This function is also exported as:

- `remapObjectFields`

## Limitations

1. **Shallow Only**: Doesn't handle nested object remapping
2. **No Transformation**: Only renames fields, doesn't transform values
3. **No Defaults**: Missing fields become undefined

## Recommended Use Cases

- API response reshaping
- Data normalization
- Interface adaptation
- Field name standardization
- Data transfer object (DTO) conversion
