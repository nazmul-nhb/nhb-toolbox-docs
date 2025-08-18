---
id: normalizeNumber
title: Normalize Numeric Value
---

<!-- markdownlint-disable-file MD024 -->
## normalizeNumber

:::caution[Note]
Normalize a numeric value to a `number` if possible.
:::

`normalizeNumber` accepts either a number or a numeric string and safely converts it to a `number`.  
If the input is not a valid number or a numeric string, it returns `undefined`.

---

### 📦 Import

```ts
import { normalizeNumber } from 'nhb-toolbox';
```

---

### 🔧 Signature

```ts
function normalizeNumber(num: unknown): number | undefined
```

| Parameter | Type      | Description                                         |
| --------- | --------- | --------------------------------------------------- |
| **`num`** | `unknown` | A value that might be a number or a numeric string. |

**Returns:**
`number | undefined` – A normalized number, or `undefined` if the input is invalid.

---

### ✅ Examples

```ts
normalizeNumber(42); 
// → 42

normalizeNumber('123');
// → 123

normalizeNumber('12.5');
// → 12.5

normalizeNumber('abc');
// → undefined

normalizeNumber(true);
// → undefined
```

---

### 💡 Notes

* Useful when you accept input from forms, query params, or external data sources where values might be strings.
* Automatically handles both integers and floating‑point numeric strings.

### 👉 See Also

* [isNumber](/docs/guards/primitive-guards#isnumber) - How number is checked in this function
* [isNumericString](/docs/guards/mixed-guards#isnumericstring) - How numeric string is checked in this function
