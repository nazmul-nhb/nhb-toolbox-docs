---
id: Pluralizer
title: Pluralizer - Manipulate Plural/Singular
---

<!-- markdownlint-disable-file MD024 -->

The **`Pluralizer`** class provides a low‑level API to handle English word pluralization and singularization.  
It supports **irregular forms**, **uncountable nouns**, and allows you to **extend or customize** the behavior by adding new rules.

:::tip[**When to Use**]

- You need **multiple independent configurations**.
- You want to **add or override rules** without affecting the shared [`pluralizer`](/docs/utilities/string/pluralizer) instance.

:::

---

### ✨ Features

- ✅ Convert words between **singular** and **plural** forms.
- ✅ Built‑in **default rules** loaded on construction.
- ✅ Manage rules dynamically:
  - `addPluralRule()`
  - `addSingularRule()`
  - `addIrregular()`
  - `addUncountable()`
- ✅ Automatically handles **irregular words** (e.g. `child → children`).
- ✅ Detects **uncountable nouns** (e.g. `fish`).

---

### 📦 Import

```ts
import { Pluralizer } from 'nhb-toolbox';
```

---

### 🚀 Usage

```ts
const myPluralizer = new Pluralizer();

myPluralizer.pluralize('child'); // "children"
myPluralizer.toSingular('geese'); // "goose"
myPluralizer.isPlural('fish'); // false (uncountable)
```

---

### 🔧 Extending Rules

You can modify your instance without affecting others:

```ts
// Add a custom plural rule
myPluralizer.addPluralRule(/(foo)$/i, '$1bars');

// Add a custom singular rule
myPluralizer.addSingularRule(/(bars)$/i, '$1');

// Add an uncountable
myPluralizer.addUncountable('luggage');

// Add an irregular form
myPluralizer.addIrregular('cactus', 'cacti');
```

---

### 🛠️ API Overview

#### `constructor()`

Initializes with built‑in rules, irregular forms, and uncountables.

---

#### `pluralize(word, options?)`

Get the proper singular or plural form based on an optional count.

```ts
myPluralizer.pluralize('category', { count: 3 }); // "categories"
myPluralizer.pluralize('child', { count: 1, inclusive: true }); // "1 child"
```

##### `PluralizeOptions`

Options you can pass to `pluralize(word, options?)` to control how the result is formatted.

| Property        | Type | Description | Example |
| --------------- | ----- | --------- | -------------- |
| **`count`**     | `number \| string` (numeric) | Determines whether to use singular or plural form. <br/>If omitted, the method always returns the plural form. | `{ count: 1 }` → returns singular <br/>`{ count: 5 }` → returns plural                                    |
| **`inclusive`** | `boolean`                    | Whether to include the count in the returned string. <br/>Works only if `count` is provided.                   | `{ count: 3, inclusive: true }` → `"3 categories"` <br/>`{ count: 3, inclusive: false }` → `"categories"` |

---

##### Example Usage

```ts
// Count-based pluralization
myPluralizer.pluralize('category', { count: 3 });
// → "categories"

// Inclusive formatting
myPluralizer.pluralize('child', { count: 1, inclusive: true });
// → "1 child"

// No count provided: always plural
myPluralizer.pluralize('analysis');
// → "analyses"
```

:::tip[Tips]

- `count` can be a number (`3`) or a numeric string (`"3"`).
- If `count` is not supplied, `pluralize()` will **always** return the plural form without a count prefix.

:::

---

#### `toPlural(word)`

Convert a word to its plural form.

```ts
myPluralizer.toPlural('analysis'); // "analyses"
```

---

#### `toSingular(word)`

Convert a word to its singular form.

```ts
myPluralizer.toSingular('geese'); // "goose"
```

---

#### `isPlural(word)`

Check if a word is plural.

```ts
myPluralizer.isPlural('children'); // true
```

---

#### `isSingular(word)`

Check if a word is singular.

```ts
myPluralizer.isSingular('child'); // true
```

---

#### `addPluralRule(rule, replacement)`

Add a new pluralization rule.

```ts
myPluralizer.addPluralRule(/(quiz)$/i, '$1zes');
```

---

#### `addSingularRule(rule, replacement)`

Add a new singularization rule.

```ts
myPluralizer.addSingularRule(/(matr)ices$/i, '$1ix');
```

---

#### `addIrregular(single, plural)`

Add an irregular word pair.

```ts
myPluralizer.addIrregular('person', 'people');
```

---

#### `addUncountable(word)`

Add a word or pattern that should never change.

```ts
myPluralizer.addUncountable('information');
myPluralizer.addUncountable(/pok[eé]mon$/i);
```

---

### See also

- [**pluralizer (default instance)**](/docs/utilities/string/pluralizer) — shared instance.

---

### Summary

Use the `Pluralizer` class for **custom rules and isolated configurations**.
Use the [`pluralizer`](/docs/utilities/string/pluralizer) instance for **quick, standard use‑cases**.
