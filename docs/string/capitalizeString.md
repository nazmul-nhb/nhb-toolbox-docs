---
id: capitalizeString
title: Capitalize a String
---

## capitalizeString

The `capitalizeString` function converts the first letter of a given string to uppercase while keeping the rest lowercase (unless otherwise specified). It provides flexible options to capitalize all letters, each word’s first letter, or retain the original casing.

### Function Signature

```typescript
function capitalizeString(string: string, options?: CapitalizeOptions): string;
```

### Parameters

- **`string`**: The string to capitalize.
- **`options`** _(optional)_: Customization options for capitalization:
  - `capitalizeEachFirst` _(boolean)_: Capitalizes the first letter of each word. Defaults to `false`.
  - `capitalizeAll` _(boolean)_: Converts the entire string to uppercase. Defaults to `false`.
  - `lowerCaseRest` _(boolean)_: Ensures all characters except the first are lowercase. Defaults to `true`.

### Return Value

Returns a string with capitalization applied based on the provided options:

- Default behavior: Only the first letter is capitalized, and the rest is lowercase.
- If `capitalizeEachFirst: true`, the first letter of every word is capitalized.
- If `capitalizeAll: true`, the entire string is converted to uppercase.
- If `lowerCaseRest: false`, the remaining letters retain their original casing.

### Example Usage

#### Basic Capitalization

```typescript
capitalizeString('hello world'); 
// Output: 'Hello world'
```

#### Capitalizing Each Word

##### Import

```ts
import { capitalizeString } from 'nhb-toolbox';
```

```typescript
capitalizeString('hello world', { capitalizeEachFirst: true });
// Output: 'Hello World'
```

#### Converting Entire String to Uppercase

```typescript
capitalizeString('hello world', { capitalizeAll: true });
// Output: 'HELLO WORLD'
```

#### Keeping the Rest of the String's Case Intact

```typescript
capitalizeString('hello WORLD', { lowerCaseRest: false });
// Output: 'Hello WORLD'
```

### Edge Cases Handled

- If the input is an empty string or not a valid string, it returns an empty string.
- It correctly handles strings with leading/trailing whitespace.
- Supports punctuation and special characters while preserving them.

### Types

#### `CapitalizeOptions`

```typescript
interface CapitalizeOptions {
  capitalizeEachFirst?: boolean;
  capitalizeAll?: boolean;
  lowerCaseRest?: boolean;
}
```

#### `CapitalizeResult<T, O>`

```typescript
type CapitalizeResult<T extends string, O extends CapitalizeOptions> =
  O['capitalizeAll'] extends true
    ? Uppercase<T>
    : O['capitalizeEachFirst'] extends true
      ? CapitalizeWords<O['lowerCaseRest'] extends false ? T : Lowercase<T>, O['lowerCaseRest'] extends boolean ? O['lowerCaseRest'] : true>
      : O['lowerCaseRest'] extends false
        ? Capitalize<T>
        : Capitalize<Lowercase<T>>;
```

### Conclusion

The `capitalizeString` function provides a versatile way to format text with precise capitalization rules, handling various cases such as entire-string uppercase, word-based capitalization, and preservation of casing when needed.
