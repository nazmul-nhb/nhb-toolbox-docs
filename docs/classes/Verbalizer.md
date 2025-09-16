---
id: Verbalizer
title: Verbalizer - Manage Verb Forms
---

<!-- markdownlint-disable-file MD024 -->

## `Verbalizer`

The **`Verbalizer`** class provides a low‑level API to handle English verb conjugation between base, past tense, and past participle forms.  
It supports **irregular verbs**, **regular conjugation rules**, and allows you to **extend or customize** the behavior by adding new rules.

:::tip[**When to Use**]

- You need **multiple independent configurations**.
- You want to **add or override rules** without affecting the shared [`verbalizer`](/docs/utilities/string/verbalizer) instance.

:::

---

### ✨ Features

- ✅ Convert verbs between **base**, **past tense**, and **past participle** forms
- ✅ Built‑in **default rules** loaded on construction
- ✅ Manage rules dynamically:
  - `addBaseRule()`
  - `addPastRule()`
  - `addParticipleRule()`
  - `addIrregular()`
- ✅ Automatically handles **irregular verbs** (e.g. `go → went → gone`)
- ✅ Preserves **case sensitivity** of input verbs

:::caution[Alert]
All methods return the trimmed verb if the input has trailing spaces.
:::

---

### 📦 Import

```ts
import { Verbalizer } from 'nhb-toolbox';
```

---

### 🚀 Usage

```ts
const myVerbalizer = new Verbalizer();

myVerbalizer.toPast('run'); // "ran"
myVerbalizer.toParticiple('go'); // "gone"
myVerbalizer.toBase('went'); // "go"
myVerbalizer.isPast('ran'); // true
```

---

### 🔧 Extending Rules

You can modify your instance without affecting others:

```ts
// Add a custom base rule
myVerbalizer.addBaseRule(/ied$/i, 'y');

// Add a custom past tense rule
myVerbalizer.addPastRule(/e$/i, 'ed');

// Add a custom past participle rule
myVerbalizer.addParticipleRule(/e$/i, 'ed');

// Add an irregular verb
myVerbalizer.addIrregular('swim', 'swam', 'swum');
```

---

### 🛠️ API Overview

#### `constructor()`

Initializes with built‑in rules and irregular verbs.

---

#### `toPast(verb)`

Convert a verb to its past tense form.

```ts
myVerbalizer.toPast('walk'); // "walked"
myVerbalizer.toPast('run'); // "ran"
```

---

#### `toParticiple(verb)`

Convert a verb to its past participle form.

```ts
myVerbalizer.toParticiple('walk'); // "walked"
myVerbalizer.toParticiple('go'); // "gone"
```

---

#### `toBase(verb)`

Convert a verb to its base form.

```ts
myVerbalizer.toBase('went'); // "go"
myVerbalizer.toBase('walked'); // "walk"
```

---

#### `isPast(verb)`

Check if a verb is in past tense form.

```ts
myVerbalizer.isPast('ran'); // true
myVerbalizer.isPast('run'); // false
```

---

#### `isPastParticiple(verb)`

Check if a verb is in past participle form.

```ts
myVerbalizer.isPastParticiple('gone'); // true
myVerbalizer.isPastParticiple('go'); // false
```

---

#### `isBase(verb)`

Check if a verb is in base form.

```ts
myVerbalizer.isBase('run'); // true
myVerbalizer.isBase('ran'); // false
```

---

#### `addBaseRule(rule, replacement)`

Add a new base tense conjugation rule.

```ts
myVerbalizer.addBaseRule(/ied$/i, 'y');
```

---

#### `addPastRule(rule, replacement)`

Add a new past tense conjugation rule.

```ts
myVerbalizer.addPastRule(/e$/i, 'ed');
```

---

#### `addParticipleRule(rule, replacement)`

Add a new past participle conjugation rule.

```ts
myVerbalizer.addParticipleRule(/e$/i, 'ed');
```

---

#### `addIrregular(base, past, participle)`

Add an irregular verb.

```ts
myVerbalizer.addIrregular('swim', 'swam', 'swum');
```

---

### See also

- [**verbalizer (default instance)**](/docs/utilities/string/verbalizer) — shared instance of `Verbalizer`.
- [**Pluralizer**](/docs/classes/Pluralizer) — Similar class for _noun pluralization_.

---

### Summary

Use the `Verbalizer` class for **custom rules and isolated configurations**.  
Use the [`verbalizer`](/docs/utilities/string/verbalizer) instance for **quick, standard use‑cases**.
