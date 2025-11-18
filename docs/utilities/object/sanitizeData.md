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

<Tabs groupId="fn-variants">
  <TabItem value="string" label="String Input" default>

  Trims all the words in a string.

  ```ts
  // String version
  sanitizeData(input: string): string;
  ```

  </TabItem>

  <TabItem value="string-array" label="String Array">

  Trims all the words in an array of strings.

  ```ts
  // String array version
  sanitizeData(input: string[]): string[];
  ```

  </TabItem>

  <TabItem value="object" label="Object">

  Sanitizes an object by ignoring specified keys and trimming string values based on options provided. Also excludes nullish values (`null`, `undefined`), falsy (`nullish` + `0` & `""`) or empty values (`object`, `array`) if specified.

  ```ts
  // Object version with return type control
  sanitizeData<
  Data extends GenericObject,
  Ignored extends DotNotationKey<Data> = never,
  PoR extends PartialOrRequired = 'required',
  >(
  object: Data,
  options?: SanitizeOptions<Data, Ignored>,
  _return?: PoR
  ): SanitizedData<Data, Ignored, PoR>;
  ```

  </TabItem>

  <TabItem value="mixed-array" label="Mixed Array">

  Sanitizes a deeply nested array that may contain arrays, objects or other (mixed) data types.

  ```ts
  // Array version with return type control
  sanitizeData<
  Data extends GenericObject,
  Ignored extends DotNotationKey<Data> = never,
  PoR extends PartialOrRequired = 'required',
  >(
  array: Data[],
  options?: SanitizeOptions<Data, Ignored>,
  _return?: PoR
  ): Array<SanitizedData<Data, Ignored, PoR>>;
  ```

  </TabItem>
</Tabs>

### Usage Examples

<Tabs groupId="fn-variants">
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

### Notes on Return Type

- **Return Type Control**:
  - Use `_return: 'partial'` to get `$DeepPartial<T>` return type
  - Default (`'required'`) preserves original type structure
- **Strict Typing**: Omits ignored keys from the return type if any key is passed in `keysToIgnore` option

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
2. **Special Objects**: `Date`, `RegExp`, `Map`, `Set`, `Chronos` etc. are intentionally treated as regular objects and cannot be accessed their nested keys (which is good in most of the cases) through `keysToIgnore` or `requiredKeys` options.
3. **Performance**: Deep processing may be slow for large structures
4. **Type Strictness**: Return types are approximations of the runtime behavior.

### Recommended Use Cases

- API input sanitization
- Form data cleaning
- Configuration normalization
- Database record preparation
- Log payload cleaning

### Type Definitions

```typescript
/** - Options for `sanitizeData` utility. */
interface SanitizeOptions<T, Ignored extends DotNotationKey<T>> {
 /**
  * An array of dot-notation keys to exclude from the sanitized output.
  * This is only applicable when sanitizing plain objects or arrays of objects.
  * When applied to nested or irregular array structures, behavior may be inconsistent or partially ignored.
  */
 keysToIgnore?: Ignored[];

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

/**
 * Produces sanitized output data by omitting keys in `keysToIgnore` from {@link SanitizeOptions} and optionally applying partial deep nesting based on `_return` parameter.
 *
 * @remarks
 * - When `PoR` is `'partial'`, all nested properties become optional after path omission.
 * - When `PoR` is `'required'`, the resulting type keeps full property requirements.
 * - Intended for return type of `sanitizeData` utility.
 */
type SanitizedData<
 Data extends GenericObject,
 Ignored extends DotNotationKey<Data>,
 PoR extends PartialOrRequired,
> = PoR extends 'partial' ? $DeepPartial<OmitPath<Data, Ignored>> : OmitPath<Data, Ignored>;

/** Removes a dot-notation path from an object type while preserving its original shape. */
type OmitPath<
 Object extends GenericObject,
 Ignored extends DotNotationKey<Object>,
> = $OmitPath<Object, Ignored>;
```
