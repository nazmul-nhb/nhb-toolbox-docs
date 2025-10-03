---
id: sanitizeData
title: Sanitize Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## sanitizeData

A versatile utility that cleans and normalizes strings, arrays, and objects by trimming whitespace, removing empty values, and applying customizable filters.

### Import

```typescript
import { sanitizeData } from 'nhb-toolbox';
```

### Function Signatures

```typescript
// String version
sanitizeData(input: string): string;

// String array version
sanitizeData(input: string[]): string[];

// Object version with return type control
sanitizeData<T extends GenericObject, B extends PartialOrRequired = 'required'>(
  object: T,
  options?: SanitizeOptions<T>,
  _return?: B
): B extends 'partial' ? FlattenPartial<T> : T;

// Array version with return type control
sanitizeData<T extends GenericObject, B extends PartialOrRequired = 'required'>(
  array: T[],
  options?: SanitizeOptions<T>,
  _return?: B
): B extends 'partial' ? FlattenPartial<T>[] : T[];
```

### Usage Examples

<Tabs>
<TabItem value="string" label="String Input" default>

```typescript
const dirtyString = "  hello  world  ";
sanitizeData(dirtyString); 
// Returns "hello world"
```

</TabItem>
<TabItem value="string-array" label="String Array">

```typescript
const stringArray = ["  foo ", "bar  ", "  baz  "];
sanitizeData(stringArray);
// Returns ["foo", "bar", "baz"]
```

</TabItem>
<TabItem value="object" label="Object">

```typescript
const user = {
  name: "  John Doe  ",
  age: null,
  address: { city: "  NYC  ", zip: "" },
  tags: []
};

sanitizeData(user, { ignoreNullish: true,  ignoreEmpty: true });
// Returns { name: "John Doe", address: { city: "NYC" } } with exact input type

sanitizeData(user, { ignoreNullish: true }, 'partial');
// Return type: FlattenPartial<typeof user> which is Partial<T>
// Returns { name: "John Doe", address: { city: "NYC" } }
```

</TabItem>
<TabItem value="mixed-array" label="Mixed Array">

```typescript
const data = [
  { name: " Alice ", age: null },
  "  test  ",
  ["  foo  ", null, { empty: {} }]
];

sanitizeData(data, {
  trimStrings: true,
  ignoreNullish: true,
  ignoreEmpty: true
});
// Returns [
//   { name: "Alice" },
//   "test",
//   ["foo"]
// ]
```

</TabItem>
<TabItem value="advanced" label="Advanced Options">

```typescript
const config = {
  apiKey: "  secret  ",
  debug: " false ",
  settings: {
    timeout: " 30 ",
    nullValue: null,
    emptyObj: {}
  },
  ignored: "should not appear"
};

sanitizeData(config, {
  keysToIgnore: ['ignored'],
  trimStrings: true,
  ignoreNullish: true,
  ignoreEmpty: true,
  requiredKeys: ['apiKey']
});
// Returns {
//   apiKey: "secret",
//   debug: false,
//   settings: {
//     timeout: 30
//   }
// }
```

</TabItem>
</Tabs>

### Features

1. **Return Type Control**:
   - Use `_return: 'partial'` to get `FlattenPartial<T>` return type
   - Default (`'required'`) preserves original type structure
2. **Strict Typing**: Improved type inference for partial returns
3. **Consistent Behavior**: Same filtering logic applies regardless of return type

### Behavior Details

1. **String Trimming**: Removes leading/trailing whitespace (when `trimStrings=true`)
2. **Nullish Handling**: Filters `null`/`undefined` (when `ignoreNullish=true`)
3. **Falsy Filtering**: Removes `0`, `false`, `""` (when `ignoreFalsy=true`)
4. **Empty Removal**: Omits `{}` and `[]` (when `ignoreEmpty=true`)
5. **Key Preservation**: Always keeps `requiredKeys` regardless of other options

### When to Use Partial Return

- When you need explicit partial types for optional data
- When working with API responses that may have missing fields
- When using the result with systems that expect partial structures

### Limitations

1. **Circular References**: May cause stack overflow for deeply nested objects and arrays
2. **Special Objects**: Date, RegExp etc. are treated as regular objects and cannot be accessed their nested keys (which is good in most of the cases) through `keysToIgnore` or `requiredKeys` options.
3. **Performance**: Deep processing may be slow for large structures
4. **Type Strictness**: Return types are approximations of the runtime behavior

### Recommended Use Cases

- API input sanitization
- Form data cleaning
- Configuration normalization
- Database record preparation
- Log payload cleaning

### Type Definitions

```typescript
/** - Options for `sanitizeData` utility. */
export interface SanitizeOptions<T> {
 /**
  * An array of dot-notation keys to exclude from the sanitized output.
  * This is only applicable when sanitizing plain objects or arrays of objects.
  * When applied to nested or irregular array structures, behavior may be inconsistent or partially ignored.
  */
 keysToIgnore?: DotNotationKey<T>[];

 /** Whether to trim string values. Defaults to `true`. */
 trimStrings?: boolean;

 /** Whether to exclude nullish (`null` or `undefined`) values. Defaults to `false`. */
 ignoreNullish?: boolean;

 /** Whether to exclude all falsy values (`false`, `0`, `empty string: ''`, `null`, `undefined`. Defaults to `false`. */
 ignoreFalsy?: boolean;

 /** Whether to exclude empty object(s) and array(s) (`{}`, `[]`). Defaults to `false`. */
 ignoreEmpty?: boolean;

 /**
  * An array of dot-notation key paths that must be preserved in the sanitized output.
  * Use `"*"` to retain all keys. This applies primarily to plain or nested objects and arrays of objects.
  * When applied to nested or irregular array structures, behavior may be inconsistent or partially ignored.
  */
 requiredKeys?: '*' | DotNotationKey<T>[];
}

/** Literal type for `partial` and `required` */
type PartialOrRequired = 'partial' | 'required';

/** - Generic object but with `any` value */
type GenericObject = Record<string, any>;
```
