---
id: isDeepEqual  
title: Deep Equality Checker  
---

## isDeepEqual

Performs a **deep comparison** between two values (arrays, objects, and primitives) to determine if they are structurally and value-wise equal.  
*This function is one of the foundational utilities, used internally throughout the `nhb-toolbox` package to compare arrays, objects, or any deeply nested structures.*

---

### Import

```typescript
import { isDeepEqual } from 'nhb-toolbox';
```

---

### Function Signature

```typescript
isDeepEqual(a: unknown, b: unknown): boolean
```

---

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Primitives" label="Primitive Values">

```typescript
isDeepEqual(42, 42)
// true

isDeepEqual('hello', 'world')
// false
```

</TabItem>
<TabItem value="Arrays" label="Arrays">

```typescript
isDeepEqual([1, 2, 3], [1, 2, 3])
// true

isDeepEqual([1, 2, 3], [3, 2, 1])
// false

isDeepEqual([1, [2, 3]], [1, [2, 3]])
// true
```

</TabItem>
<TabItem value="Objects" label="Objects">

```typescript
isDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })
// true

isDeepEqual({ x: 1, y: undefined }, { x: 1 })
// false (key set mismatch)
```

</TabItem>
<TabItem value="Mixed/Nested" label="Nested Structures">

```typescript
isDeepEqual(
  { foo: [1, 2, { bar: 'baz' }] },
  { foo: [1, 2, { bar: 'baz' }] }
)
// true

isDeepEqual(
  { foo: [1, 2, { bar: 'baz' }] },
  { foo: [1, 2, { bar: 'qux' }] }
)
// false
```

</TabItem>
<TabItem value="Null & Undefined" label="Null & Undefined">

```typescript
isDeepEqual(null, null)    // true
isDeepEqual(undefined, undefined)  // true
isDeepEqual(null, undefined)       // false
```

</TabItem>
</Tabs>

---

### API Reference

#### Parameters

| Name | Type | Description                              |
|------|------|------------------------------------------|
| a    | T    | First value to compare.                  |
| b    | T    | Second value to compare.                 |

#### Returns

- `true` if the values are deeply equal.
- `false` otherwise.

---

### How it Works

- **Strict Equality First:** If `a` and `b` are the same reference or primitive value, returns `true` immediately.
- **Type & Null Checks:** If types differ or either value is null, returns `false` unless both are strictly equal.
- **Array Handling:** Arrays compared recursively, including nested arrays.
- **Object Handling:** Objects compared recursively, ensuring both keys and values match exactly.
- **Shallow/Deep:** Works for deeply nested arrays/objects as well as simple values.

---

### Key Features

- **Recursive & Robust:** Handles arbitrary nesting for arrays and objects.
- **Type Safety:** Works generically for any consistent types.
- **Foundational Utility:** This deep comparison utility powers internal checks across many toolbox functions (e.g., deduplication, merging, diffing, and more).

---

### Limitations

- **No Cycles Supported:** Will stack overflow on *circular references*.
- **No Symbol/Function/Date Support:** Only works for plain objects, arrays, and primitives. Special types (functions, Dates, Maps, Sets, Symbols) are not deeply compared.
- **No Non-Enumerable or Prototype Chain:** Only owns keys compared, prototype chain & non-enumerable properties are ignored.
- **No Partial/Object Subset Comparison:** Strict equality over all keys and values only.

---

### Notes

- If you compare objects with arrays, types, or keys in different order but same values, equality will follow JavaScript’s structure (order matters in arrays, not in objects).
- For performance sensitive code, avoid using on excessively large or deeply nested structures unless necessary.
- This function is **extensively used internally** in `nhb-toolbox` for object/array equality checks.

---

### Recommended Use Cases

- Deduplicating structurally equal objects/arrays.
- Testing and assertion helpers.
- Data merging, diffing, or synchronization.
- Safely comparing complex API payloads or configurations.

---

**Conclusion:**  
`isDeepEqual` is a robust, recursive deep comparison tool for reliably testing equality of complex JavaScript values.  
Its reliability and correctness make it a key foundation internally across many `nhb-toolbox` features.
