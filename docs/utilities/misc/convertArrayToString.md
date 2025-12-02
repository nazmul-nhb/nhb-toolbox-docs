---
id: convertArrayToString
title: Convert Array to String
---

## convertArrayToString

Joins elements of an array of primitive values or array of objects into a single string using a custom separator.

### Import

```ts
import { convertArrayToString } from 'nhb-toolbox';
```

### Function Signatures

<Tabs groupId="overload">
<TabItem value="primitive" label="Array of Primitives">

```ts
convertArrayToString<T extends Primitive>(
  array: T[] | undefined,
  options?: {
    separator?: string;
  }
): string;
```

</TabItem>
<TabItem value="object" label="Array of Objects">

```ts
convertArrayToString<T extends GenericObject>(
  array: T[] | undefined,
  options: {
    target: NestedPrimitiveKey<T>;
    separator?: string;
  }
): string;
```

</TabItem>
</Tabs>

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="primitive-default" label="Primitive Default">

```ts
convertArrayToString(['a', 'b', 'c']);
// "a, b, c"
```

</TabItem>
<TabItem value="primitive-custom" label="Primitive Custom">

```ts
convertArrayToString([1, 2, 3], { separator: ' - ' });
// "1 - 2 - 3"
```

</TabItem>
<TabItem value="object-nested" label="Object Nested Key">

```ts
convertArrayToString(
  [{ user: { name: 'Alice' } }, { user: { name: 'Bob' } }],
  { target: 'user.name' }
);
// "Alice, Bob"
```

</TabItem>
<TabItem value="custom-separator" label="Custom Separator">

```ts
convertArrayToString(['JS', 'TS', 'React'], { separator: ' | ' });
// "JS | TS | React"
```

</TabItem>
<TabItem value="empty" label="Empty Array">

```ts
convertArrayToString([], { separator: ';' });
// ""
```

</TabItem>
</Tabs>

### API Reference

#### Parameters

| Name                | Type     | Description                                                                             |
| ------------------- | -------- | --------------------------------------------------------------------------------------- |
| `array`             | `T[]`    | Array of primitives or objects to convert to string                                     |
| `options`           | `object` | Options for separator and target key (if object array)                                  |
| `options.separator` | `string` | Optional separator for joining values (default: `", "`)                                 |
| `options.target`    | `string` | Required if array contains objects. Dot-accessible key to extract primitive values only |

#### Returns

A string formed by joining the values (primitive or extracted) with the given separator.

### Key Features

1. ✅ **Supports Primitives and Objects:** Handles both types cleanly with overloads.
2. 🧩 **Nested Key Extraction:** Extracts deep object properties using dot notation like `"user.name"`.
3. 🧼 **Handles Empty Inputs:** Returns empty string if array is `undefined` or empty.
4. 🛠️ **Customizable Separator:** Use any string to separate values (e.g., `" - "`, `"|"`, etc.).

### Recommended Use Cases

* Formatting tag or category lists for display.
* Preparing data for tooltips, labels, logs, or CSV-like formats.
* Joining object property values for human-readable summaries.

### Notes

* This function **always checks for array validity** before processing.
* For **object arrays**, use the `target` option to specify the key to extract (e.g., `"user.name"`).
* TypeScript enforces that the `target` path must resolve to a **primitive value** (like `string`, `number`, `boolean`, `null`, or `undefined`). In **JavaScript**, you may pass any path, but non-primitive values (e.g., objects, arrays) will result in `[object Object]` during stringification.
* If you need to **format, localize, or transform values** before joining, consider mapping the array beforehand:

```ts
convertArrayToString(users.map(u => u.name.trim()), { separator: ' • ' });
```

### Limitations

Requires a valid array. If not, it returns an empty string.

:::danger Warning

* Does **not auto-serialize objects**. You **must provide** a `target` key when working with object arrays.
* Only **primitive values** are supported correctly for both primitive arrays and object-based arrays.
  <!-- *Primitive here refers to:* `string`, `number`, `boolean`, `undefined`, and `null`.
  `Symbol` and other non-serializable types are **not supported**. -->
* Nested `target` keys must resolve to **primitive values** inside objects.
  TypeScript will **error** if you reference a non-primitive type.
* There is **no built-in formatting or filtering** — the function joins raw values directly.

:::

### Aliases

* `joinArrayElements` – named export alias for `convertArrayToString`

---

### Conclusion

`convertArrayToString` makes joining arrays clean, type-safe, and flexible—perfect for tags, logs, tooltips, and more. Just supply your array and desired separator!
