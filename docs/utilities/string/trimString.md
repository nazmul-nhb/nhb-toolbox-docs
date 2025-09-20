---
id: trimString
title: Trim String or Array of Strings
---

## trimString

The `trimString` function removes unnecessary spaces from a string or an array of strings.

### Function Signatures

```typescript
function trimString(input: string): string;

function trimString(input: string[]): string[];
```

### Parameters

| Parameter | Type                 | Description                              |
| --------- | -------------------- | ---------------------------------------- |
| `input`   | `string \| string[]` | A string or an array of strings to trim. |

### Return Value

Returns:

- A trimmed string if `input` is a string.
- A trimmed array of strings if `input` is an array.

---

### Example Usage

#### Import

```ts
import { trimString } from 'nhb-toolbox';
```

#### Trimming a Single String

```typescript
trimString("   Hello   World!   ");
// Output: "Hello World!"
```

#### Trimming an Array of Strings

```typescript
trimString(["  Hello   ", "   World!  "]);
// Output: ["Hello", "World!"]
```

#### Handling Empty Input

```typescript
trimString("");
// Output: ""

trimString([]);
// Output: []
```
