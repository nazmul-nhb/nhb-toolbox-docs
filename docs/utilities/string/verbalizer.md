---
id: verbalizer
title: Manage Verb Forms
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- markdownlint-disable-file MD024 -->

## `verbalizer`

The **`verbalizer`** is a **default shared instance** of the [`Verbalizer`](/docs/classes/Verbalizer) class.  
It comes **preloaded with standard English conjugation rules** and irregular verbs.

:::tip[**When to Use**]

- **Use this instance when you don't need multiple configurations.**  
- If you need isolated or custom rules, you can create your own [`Verbalizer`](#-need-your-own-configuration) instance.

:::

---

### ✨ Features

- ✅ Convert verbs between **base**, **past tense**, and **past participle** forms
- ✅ Built‑in support for **irregular verbs** (e.g. `go → went → gone`)
- ✅ Preserves **case sensitivity** of input verbs
- ✅ Modify rules dynamically at runtime:
  - Add conjugation rules for different verb forms
  - Add irregular verbs

:::caution[Alert]
All methods return the trimmed verb if the input has trailing spaces.
:::

---

### 📦 Import

```ts
import { verbalizer } from 'nhb-toolbox';
// or
import { verbalizer } from 'nhb-toolbox/verbalizer';
```

---

### 🚀 Quick Usage

<Tabs>
<TabItem value="past" label="Past Tense">

```ts
verbalizer.toPast('run'); // "ran"
verbalizer.toPast('walk'); // "walked"
```

</TabItem>
<TabItem value="participle" label="Past Participle">

```ts
verbalizer.toParticiple('go'); // "gone"
verbalizer.toParticiple('walk'); // "walked"
```

</TabItem>
<TabItem value="base" label="Base Form">

```ts
verbalizer.toBase('went'); // "go"
verbalizer.toBase('walked'); // "walk"
```

</TabItem>
<TabItem value="checks" label="Form Checks">

```ts
verbalizer.isPast('ran'); // true
verbalizer.isParticiple('gone'); // true
verbalizer.isBase('run'); // true
```

</TabItem>
</Tabs>

---

### 🔧 Extending Rules

Since `verbalizer` is an actual instance of [`Verbalizer`](/docs/classes/Verbalizer),
you can **extend or modify** it at runtime:

```ts
// Add a custom base rule
verbalizer.addBaseRule(/ied$/i, 'y');

// Add a custom past tense rule
verbalizer.addPastRule(/e$/i, 'ed');

// Add a custom past participle rule
verbalizer.addParticipleRule(/e$/i, 'ed');

// Add an irregular verb
verbalizer.addIrregular('swim', 'swam', 'swum');
```

These modifications affect all consumers of the shared instance.

---

### 🏗 Need your own configuration?

If you want an isolated instance with its own rules, instantiate the class directly:

```ts
import { Verbalizer } from 'nhb-toolbox';

const myVerbalizer = new Verbalizer();
myVerbalizer.addIrregular('dream', 'dreamt', 'dreamt');
console.log(myVerbalizer.toPast('dream')); // dreamt
```

See the [`Verbalizer` class docs](/docs/classes/Verbalizer) for full details.

---

### See also

- [**Verbalizer class**](/docs/classes/Verbalizer) — low‑level API for custom instances.
- [**Pluralizer**](/docs/utilities/string/pluralizer) — Utility for _noun pluralization_.

---

### Summary

Use `verbalizer` for common use‑cases.  
Create `new Verbalizer()` for isolated/custom rules.
