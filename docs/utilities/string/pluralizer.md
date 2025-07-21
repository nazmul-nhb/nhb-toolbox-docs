---
id: pluralizer
title: Pluralize Strings and More...
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- markdownlint-disable-file MD024 -->

The **`pluralizer`** is a **default shared instance** of the [`Pluralizer`](/docs/classes/Pluralizer) class.  
It comes **preloaded with standard English rules**, irregular forms, and uncountable nouns.

:::info[Acknowledgement]
This utility is **heavily inspired** by [Blake Embrey](https://github.com/blakeembrey)’s excellent [pluralize](https://www.npmjs.com/package/pluralize) package.  
Many thanks to the author for the original work and inspiration.
:::

:::tip[**When to Use**]

- **Use this instance when you don’t need multiple configurations.**  
- If you need isolated or custom rules, you can create your own [`Pluralizer`](#-need-your-own-configuration) instance.

:::

---

### ✨ Features

- ✅ Convert words between **singular** and **plural**.
- ✅ Built‑in support for **irregular forms** (e.g. `child → children`).
- ✅ Handles **uncountable nouns** (e.g. `fish`, `information`).
- ✅ Modify rules dynamically at runtime:
  - Add pluralization or singularization rules.
  - Add irregular forms.
  - Add uncountable words or regex patterns.

---

### 📦 Import

```ts
import { pluralizer } from 'nhb-toolbox';
```

---

### 🚀 Quick Usage

<Tabs>
<TabItem value="plural" label="Pluralize">

```ts
pluralizer.pluralize('child'); // "children"
pluralizer.pluralize('category', { count: 3 }); // "categories"
pluralizer.pluralize('child', { count: 1, inclusive: true }); // "1 child"
```

- For `options` details [see here](/docs/classes/Pluralizer#pluralizeword-options)

</TabItem>
<TabItem value="singular" label="Singularize">

```ts
pluralizer.toSingular('geese'); // "goose"
pluralizer.toSingular('children'); // "child"
```

</TabItem>
<TabItem value="checks" label="Check">

```ts
pluralizer.isPlural('children'); // true
pluralizer.isSingular('child'); // true
pluralizer.isPlural('fish'); // false (uncountable)
```

</TabItem>
</Tabs>

---

### 🔧 Extending Rules

Since `pluralizer` is an actual instance of [`Pluralizer`](/docs/classes/Pluralizer),
you can **extend or modify** it at runtime:

```ts
// Add a custom plural rule
pluralizer.addPluralRule(/(foo)$/i, '$1bars');

// Add a custom singular rule
pluralizer.addSingularRule(/(bars)$/i, '$1');

// Add an uncountable noun
pluralizer.addUncountable('luggage');

// Add an irregular word
pluralizer.addIrregular('cactus', 'cacti');
```

These modifications affect all consumers of the shared instance.

---

### 🏗 Need your own configuration?

If you want an isolated instance with its own rules, instantiate the class directly:

```ts
import { Pluralizer } from 'nhb-toolbox';

const myPluralizer = new Pluralizer();
myPluralizer.addPluralRule(/(baz)$/i, '$1zes');
console.log(myPluralizer.pluralize('baz')); // bazzes
```

See the [`Pluralizer` class docs](/docs/classes/Pluralizer) for full details.

---

### See also

- [**Pluralizer class**](/docs/classes/Pluralizer) — low‑level API for custom instances.

---

### Summary

Use `pluralizer` for common use‑cases.
Create `new Pluralizer()` for isolated/custom rules.
