---
id: sanitizeData
title: Sanitize Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A versatile utility that cleans and normalizes strings, arrays, and objects by trimming whitespace, removing empty values, and applying customizable filters.

## Import

```typescript
import { sanitizeData } from 'nhb-toolbox';
import { type SanitizeOptions } from 'nhb-toolbox/types/object';
```

## Function Signatures

```typescript
// String version
function sanitizeData(input: string): string;

// String array version
function sanitizeData(input: string[]): string[];

// Object version
function sanitizeData<T extends GenericObject>(object: T,  options?: SanitizeOptions<T>): FlattenPartial<T>;

// Mixed array version
function sanitizeData<T>(array: T[],  options?: SanitizeOptions<T>): FlattenPartial<T>[];
```

## Options

```typescript
interface SanitizeOptions<T> {
  keysToIgnore?: DotNotationKey<T>[];
  trimStrings?: boolean;
  ignoreNullish?: boolean;
  ignoreFalsy?: boolean;
  ignoreEmpty?: boolean;
  requiredKeys?: '*' | DotNotationKey<T>[];
}
```

## Usage Examples

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

sanitizeData(user, {
  ignoreNullish: true,
  ignoreEmpty: true
});
// Returns {
//   name: "John Doe",
//   address: { city: "NYC" }
// }
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

## Behavior Details

1. **String Trimming**: Removes leading/trailing whitespace (when `trimStrings=true`)
2. **Nullish Handling**: Filters `null`/`undefined` (when `ignoreNullish=true`)
3. **Falsy Filtering**: Removes `0`, `false`, `""` (when `ignoreFalsy=true`)
4. **Empty Removal**: Omits `{}` and `[]` (when `ignoreEmpty=true`)
5. **Key Preservation**: Always keeps `requiredKeys` regardless of other options

## Limitations

1. **Circular References**: May cause stack overflow
2. **Special Objects**: Date, RegExp etc. are treated as regular objects
3. **Performance**: Deep processing may be slow for large structures
4. **Type Strictness**: Return types are approximations of the runtime behavior

## Recommended Use Cases

- API input sanitization
- Form data cleaning
- Configuration normalization
- Database record preparation
- Log payload cleaning
