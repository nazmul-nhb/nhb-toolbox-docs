---
id: convertObjectValues
title: Convert Object Values
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## convertObjectValues

Converts specified values in objects or arrays of objects between string and number types, supporting nested properties via dot notation.

## Import

```typescript
import { convertObjectValues } from 'nhb-toolbox';
```

## Function Signatures

```typescript
// Object version
function convertObjectValues<T extends GenericObject, C extends 'string' | 'number'>(
  data: T,
  options: { keys: DotNotationKey<T>[]; convertTo: C }
): C extends 'string' ? Stringified<T> : Numberified<T>

// Array version
function convertObjectValues<T extends GenericObject, C extends 'string' | 'number'>(
  data: T[],
  options: { keys: DotNotationKey<T>[]; convertTo: C }
): C extends 'string' ? Stringified<T>[] : Numberified<T>[]
```

## Usage Examples

<Tabs>
<TabItem value="object" label="Object Conversion" default>

### Convert to Numbers

```typescript
const product = {
  id: "123",
  price: "99.99",
  meta: { weight: "1.5" }
};

const result = convertObjectValues(product, {
  keys: ['price', 'meta.weight'],
  convertTo: 'number'
});
// Returns { id: "123", price: 99.99, meta: { weight: 1.5 } }
// Type: Numberified<typeof product>
```

### Convert to Strings

```typescript
const user = {
  id: 456,
  profile: { age: 30 }
};

convertObjectValues(user, {
  keys: ['id', 'profile.age'],
  convertTo: 'string'
});
// Returns { id: "456", profile: { age: "30" } }
// Type: Stringified<typeof user>
```

</TabItem>
<TabItem value="array" label="Array Conversion">

### Convert Array to Numbers

```typescript
const items = [
  { sku: "A100", price: "25" },
  { sku: "B200", price: "50" }
];

convertObjectValues(items, {
  keys: ['price'],
  convertTo: 'number'
});
// Returns [
//   { sku: "A100", price: 25 },
//   { sku: "B200", price: 50 }
// ]
// Type: Numberified<typeof items[0]>[]
```

### Convert Array to Strings

```typescript
const measurements = [
  { temp: 36.5, timestamp: 1234567890 },
  { temp: 37.0, timestamp: 1234567999 }
];

convertObjectValues(measurements, {
  keys: ['temp', 'timestamp'],
  convertTo: 'string'
});
// Returns [
//   { temp: "36.5", timestamp: "1234567890" },
//   { temp: "37.0", timestamp: "1234567999" }
// ]
// Type: Stringified<typeof measurements[0]>[]
```

</TabItem>
<TabItem value="nested" label="Nested Objects">

### Complex Nested Conversion

```typescript
const order = {
  id: "1001",
  total: "199.99",
  items: [
    { id: "1", price: "49.99" },
    { id: "2", price: "59.99" }
  ],
  customer: {
    id: 5001,
    loyaltyPoints: "1000"
  }
};

// Convert numbers throughout structure
convertObjectValues(order, {
  keys: ['total', 'items.price', 'customer.loyaltyPoints'],
  convertTo: 'number'
});
/* Returns:
{
  id: "1001",
  total: 199.99,
  items: [
    { id: "1", price: 49.99 },
    { id: "2", price: 59.99 }
  ],
  customer: {
    id: 5001,
    loyaltyPoints: 1000
  }
}
*/
```

</TabItem>
</Tabs>

## Behavior Details

1. **Dot Notation**: Supports nested paths like `'user.profile.age'`
2. **Type Safety**: Maintains proper TypeScript types in return value
3. **Non-Destructive**: Returns new object/array without modifying original
4. **Selective Conversion**: Only converts specified fields
5. **Array Support**: Works with arrays of objects

## Limitations

1. **Circular References**: May cause stack overflow for deeply nested objects and arrays
2. **Special Types**: Dates, RegExp etc. are treated as regular objects
3. **Invalid Numbers**: String values that can't convert to numbers are preserved
4. **Performance**: Deep cloning may be slow for large structures

## Recommended Use Cases

- API response normalization
- Form data processing
- Database record preparation
- Configuration transformation
- Data migration scripts

## Type Definitions

```typescript
// Result when converting to strings
type Stringified<T> = {
  [K in keyof T]: T[K] extends (infer U)[] ? Stringified<U>[]
    : T[K] extends object | null | undefined ? Stringified<T[K]>
    : T[K] extends string | number ? string
    : T[K]
};

// Result when converting to numbers
type Numberified<T> = {
  [K in keyof T]: T[K] extends (infer U)[] ? Numberified<U>[]
    : T[K] extends object | null | undefined ? Numberified<T[K]>
    : T[K] extends string ? number
    : T[K] extends number ? T[K]
    : number
};
```
