---
id: generateRandomID
title: Generate Random ID
---

## generateRandomID

The `generateRandomID` function creates a customizable random alphanumeric ID with options for a prefix, suffix, timestamp, case formatting, and a separator.

### Function Signature

```typescript
generateRandomID (options?: RandomIdOptions): string;
```

### Parameters

- **`options`** _(optional)_: Configuration options for generating the random ID.

### Options

| Option       | Type                         | Default | Description                                                     |
| ------------ | ---------------------------- | ------- | --------------------------------------------------------------- |
| `prefix`     | `string`                     | `''`    | A string to prepend to the ID.                                  |
| `suffix`     | `string`                     | `''`    | A string to append to the ID.                                   |
| `timeStamp`  | `boolean`                    | `false` | Whether to include the current timestamp.                       |
| `length`     | `number`                     | `16`    | Length of the random alphanumeric string.                       |
| `separator`  | `string`                     | `''`    | The separator between parts of the ID.                          |
| `caseOption` | `'upper' \| 'lower' \| null` | `null`  | Converts the ID to uppercase, lowercase, or keeps default case. |

### Return Value

Returns a random alphanumeric ID string, optionally formatted with a prefix, suffix, timestamp, separator, and case transformation.

---

### Example Usage

#### Default ID Generation

#### Import

```ts
import { generateRandomID } from 'nhb-toolbox';
```

```typescript
generateRandomID();
// Output: 'g7sk49h32mzxp1qv'
```

#### ID with Prefix, Suffix, and Timestamp

```typescript
generateRandomID({
  prefix: 'user',
  suffix: 'end',
  timeStamp: true,
  separator: '-'
});
// Output: 'user-1709056123456-a1b2c3d4e5f6g7h8-end'
```

#### Uppercase ID with Custom Length

```typescript
generateRandomID({ length: 8, caseOption: 'upper' });
// Output: 'A1B2C3D4'
```
