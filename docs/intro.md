---
id: intro
title: Getting Started
slug: /
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- markdownlint-disable MD025 -->
# Welcome to NHB Toolbox 📦

>**Replace Boilerplate(s) with One-Liner(s)**

`nhb-toolbox` provides battle-tested utilities for professional TypeScript/JavaScript development. Carefully crafted to solve common challenges with elegant, production-ready solutions:

- **Helper Functions & Classes**: Reusable solutions for everyday tasks
- **Type Guards & Predicates**: Runtime safety with perfect type inference
- **Validation Utilities**: Robust data validation patterns
- **Zero Dependencies**: Framework-agnostic implementation using only native TS/JS with 0 external package
- **Types**: Includes utility [types](/docs/types) designed to enhance type safety and developer ergonomics

## 🧰 Installation Guide

`nhb-toolbox` is published to two package registries:

- **NPM Registry** (default public registry) - This is the simplest way to install and requires no additional setup.
- **GitHub Packages** (GitHub’s package registry, scoped package)

:::tip

- Use NPM Registry (default) if you want the stable public version without extra config.
- GitHub Packages requires authentication and scoped package names.

:::

---

### 📦 Install as Main Dependency

<Tabs groupId="package-manager">

<TabItem
  value="npm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/npm.svg" alt="npm" style={{width:"20px", height:"20px"}} />
      <span>NPM</span>
    </div>
  }
>

- NPM Registry

```shell
npm i nhb-toolbox
```

- GitHub Packages

```shell
npm i  @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="yarn"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/yarn.svg" alt="yarn" style={{width:"20px", height:"20px"}} />
      <span>YARN</span>
    </div>
  }
>

- NPM Registry

```shell
yarn add nhb-toolbox
```

- GitHub Packages

```shell
yarn add @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="pnpm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/pnpm.svg" alt="pnpm" style={{width:"20px", height:"20px"}} />
      <span>PNPM</span>
    </div>
  }
>

- NPM Registry

```shell
pnpm add nhb-toolbox
```

- GitHub Packages

```shell
pnpm add @nazmul-nhb/nhb-toolbox
```

</TabItem>
</Tabs>

### 🛠️ Install as Dev Dependency

<Tabs groupId="package-manager">

<TabItem
  value="npm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/npm.svg" alt="npm" style={{width:"20px", height:"20px"}} />
      <span>NPM</span>
    </div>
  }
>

- NPM Registry

```shell
npm i -D nhb-toolbox
```

- GitHub Packages

```shell
npm i -D @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="yarn"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/yarn.svg" alt="yarn" style={{width:"20px", height:"20px"}} />
      <span>YARN</span>
    </div>
  }
>

- NPM Registry

```shell
yarn add -D nhb-toolbox
```

- GitHub Packages

```shell
yarn add -D @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="pnpm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/pnpm.svg" alt="pnpm" style={{width:"20px", height:"20px"}} />
      <span>PNPM</span>
    </div>
  }
>

- NPM Registry

```shell
pnpm add -D nhb-toolbox
```

- GitHub Packages

```shell
pnpm add -D @nazmul-nhb/nhb-toolbox
```

</TabItem>
</Tabs>

<!-- 
### 🌐  Install Globally

<Tabs groupId="package-manager">

<TabItem
  value="npm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/npm.svg" alt="npm" style={{width:"20px", height:"20px"}} />
      <span>NPM</span>
    </div>
  }
>

- NPM Registry

```shell
npm i -g nhb-toolbox
```

- GitHub Packages

```shell
npm i -g @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="yarn"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/yarn.svg" alt="yarn" style={{width:"20px", height:"20px"}} />
      <span>YARN</span>
    </div>
  }
>

- NPM Registry

```shell
yarn add -g nhb-toolbox
```

- GitHub Packages

```shell
yarn add -g @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem
  value="pnpm"
  label={
    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
      <img src="/img/pnpm.svg" alt="pnpm" style={{width:"20px", height:"20px"}} />
      <span>PNPM</span>
    </div>
  }
>

- NPM Registry

```shell
pnpm add -g nhb-toolbox
```

- GitHub Packages

```shell
pnpm add -g @nazmul-nhb/nhb-toolbox
```

</TabItem>
</Tabs>
 -->

## 📦 Installation Guide from GitHub Packages
  
GitHub Packages requires authentication and scoped package names.

### Step 1: Authenticate with GitHub Packages

Create or use a **GitHub Personal Access Token (PAT)** with `read:packages` permission.

Add the following to your project’s `.npmrc` file (create if it doesn’t exist):

```ini
@nazmul-nhb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

> Replace `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` with your actual token.

### Step 2: Install the package with scoped name

Choose your preferred package manager:

```shell
npm i @nazmul-nhb/nhb-toolbox
```

```shell
pnpm add @nazmul-nhb/nhb-toolbox
```

```shell
yarn add @nazmul-nhb/nhb-toolbox
```

---

### Where do consumers get the GitHub token?

- **The token is personal and private** — *each consumer must create own*.

- Your **GitHub Personal Access Token (PAT)** **should never be shared publicly or with consumers**.

---

### How consumers create own token

1. **Go to GitHub account settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.

2. Click **Generate new token**, then:

   - Give it a name (e.g., `npm package read access`).

   - Set expiration as prefer.

   - **Enable only the `read:packages` permission** (to allow reading packages).

3. Generate the token and **copy it immediately** — won't see it again.

---

### What should consumers do with the token?

- Add it to `.npmrc` file (or environment) to authenticate with GitHub Packages.

Example `.npmrc` snippet:

```ini
@nazmul-nhb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=PERSONAL_ACCESS_TOKEN_HERE
```

---

### Summary

| Registry        | Package Name              | Registry URL                                             | Requires Auth?                 |
| --------------- | ------------------------- | -------------------------------------------------------- | ------------------------------ |
| NPM Registry    | `nhb-toolbox`             | [https://registry.npmjs.org](https://registry.npmjs.org) | No                             |
| GitHub Packages | `@nazmul-nhb/nhb-toolbox` | [https://npm.pkg.github.com](https://npm.pkg.github.com) | Yes (PAT with `read:packages`) |

---

If you want to use both, just configure `.npmrc` accordingly and install the appropriate package name depending on your needs.

---

### Notes

- The GitHub Packages version may include pre-release or private builds.
- NPM Registry version is the recommended default for most users.
- You can safely use either registry depending on your environment.

---

## 🚀 Features

- **Type-Safe Utilities**: Fully typed for perfect TypeScript integration with strict type checking
- **Types**: Ready-to-use [types](/docs/types) designed to enhance type safety and developer efficiency
- **Modular Design**: Tree-shaking friendly – import only what you need with zero bloat
- **Zero Dependencies**: No external dependencies - works with any JS/TS framework
- **IDE Support**: Full type hints with JSDoc-powered API references in your editor
- **Battle-Tested**: Reliable utilities refined through real-world production use
- **Optimized for Production**: Focused on clean, efficient implementations

## 🪧 Examples from Signature Utilities

### 🕰️ Date & Time Mastery

**`Chronos`** - The ultimate date/time manipulation class with 100+ methods for parsing, formatting, calculating, and comparing dates. Handles all edge cases and timezones safely.

> 🧩 **Note**: Some methods in `Chronos` are available only through the [plugin system](/docs/classes/Chronos/plugins#-official-plugins). This modular design ensures the core bundle stays lightweight — plugins are loaded only when needed, reducing unnecessary code in your final build.

```typescript
new Chronos('2025-01-01').addDays(3).format('YYYY-MM-DD'); // "2025-01-04"
// or with `Chronos` wrapper
chronos('2025-01-01').addDays(3).format('YYYY-MM-DD'); // "2025-01-04"
```

[Documentation →](/docs/classes/Chronos)

---

### 🎨 Professional Color Manipulation

**`Color`** - Convert between color formats, generate palettes, check accessibility contrast, and perform advanced color math with perfect type safety.

```typescript
const blue = new Color('#0000ff');
const darkerBlue = blue.applyDarkness(20); // 20% darker
console.log(darkerBlue.hsl); // "hsl(240, 100%, 40%)" (was 50%)
```

[Documentation →](/docs/classes/Color)

---

### 🔍 Optimized Array Search

**`Finder`** - Blazing-fast array searching with binary search, fuzzy matching, and smart caching. Perfect for large datasets.

```typescript
const productFinder = new Finder(products);

const laptop = productFinder.findOne('laptop', 'category', {
 fuzzy: true,
 caseInsensitive: false,
});
```

[Documentation →](/docs/classes/Finder)

---

### 🆔 Random ID Generation

**`generateRandomID`** - Enterprise-grade unique ID generation with prefixes, timestamps, and formatting.

```typescript
generateRandomID({
 prefix: 'user',
 timeStamp: true,
 length: 12,
 caseOption: 'upper',
}); // "USER-171234567890-AB3C4D5E6F7G"
```

[Documentation →](/docs/utilities/string/generateRandomID)

---

### 🔢 Pluralize Strings and More

**`pluralizer`** - Handles English word pluralization and singularization with support for irregular forms and uncountable nouns.

```ts
import { pluralizer } from 'nhb-toolbox';

pluralizer.pluralize('child'); // "children"
pluralizer.pluralize('category', { count: 3 }); // "categories"
pluralizer.pluralize('child', { count: 1, inclusive: true }); // "1 child"

pluralizer.toSingular('geese'); // "goose"
pluralizer.toSingular('children'); // "child"

pluralizer.isPlural('children'); // true
pluralizer.isSingular('child'); // true
pluralizer.isPlural('fish'); // true (uncountable)
```

[Documentation →](/docs/utilities/string/pluralizer)

---

### 🎨 Color System Utilities

**`getColorForInitial`** - Deterministic color mapping system for consistent UI theming

```typescript
// Get color palette for user avatars
getColorForInitial(['Alice', 'Bob', 'Charlie']);
// ['#00094C', '#00376E', '#005600']

getColorForInitial('Banana', 50); // '#00376E80' (50% opacity)
```

[Documentation →](/docs/utilities/color/getColorForInitial)

---

### 📄 FormData Preparation

**`createFormData`** - Convert JavaScript objects into `FormData` with extensive configuration options for handling nested structures, files, and data transformations.

```typescript
import { createFormData } from 'nhb-toolbox';

const formData = createFormData({
  user: {
    name: ' John Doe ',
    age: 30,
    preferences: { theme: 'dark' }
  },
  files: [file1, file2]
}, {
  trimStrings: true,
  lowerCaseValues: ['user.name'],
  dotNotateNested: ['user.preferences'],
  breakArray: ['files']
});

// Resulting FormData:
// user.name=john doe
// user.age=30
// user.preferences.theme=dark
// files[0]=[File1]
// files[1]=[File2]
```

[Documentation →](/docs/utilities/form/createFormData)

---

### 🛡️ Data Sanitization

**`sanitizeData`** - Clean and normalize strings/objects by trimming whitespace, removing empty values, and applying customizable filters.

```typescript
const user = {
 name: '  John Doe  ',
 age: null,
 address: { city: '  NYC  ', zip: '' },
 tags: [],
};

sanitizeData(user, { ignoreNullish: true, ignoreEmpty: true });
// Returns { name: "John Doe", address: { city: "NYC" } } with exact input type

sanitizeData(user, { ignoreNullish: true }, 'partial');
// Return type: FlattenPartial<typeof user> which is Partial<T>
// Returns { name: "John Doe", address: { city: "NYC" } }
// { name: 'John' }
```

[Documentation →](/docs/utilities/object/sanitizeData)

---

### 🔄 JSON Hydration

**`parseJSON`** - Bulletproof JSON parsing with primitive conversion

```typescript
parseJSON<{ value: number }>('{"value":"42"}'); // { value: 42 } (auto-converts numbers)
```

[Documentation →](/docs/utilities/misc/parseJSON)

---

### 🔢 Number to Words

**`numberToWords`** - Convert numbers to human-readable words (supports up to 100 quintillion).

```typescript
numberToWords(125); // "one hundred twenty-five"
```

[Documentation →](/docs/utilities/number/numberToWords)

---

### 🔢 Advanced Number Operations

**`getNumbersInRange`** - Generate intelligent number sequences with prime, even/odd, and custom filtering capabilities

```typescript
// Get primes between 10-30 as formatted string
getNumbersInRange('prime', { min: 10, max: 30, getAsString: true });
// "11, 13, 17, 19, 23, 29"
```

[Documentation →](/docs/utilities/number/getNumbersInRange)

**`calculatePercentage`** - Swiss Army knife for percentage calculations with 7 specialized modes

```typescript
// Calculate percentage change
calculatePercentage({
 mode: 'get-change-percent',
 oldValue: 100,
 newValue: 150,
}); // 50 (50% increase)
```

[Documentation →](/docs/utilities/number/calculatePercentage)

---

### 🔄 Extract Updated Fields

**`extractUpdatedFields`** - Detect exactly what changed between two objects (including deep nested changes).

```typescript
const dbRecord = { id: 1, content: 'Hello', meta: { views: 0 } };
const update = { content: 'Hello', meta: { views: 1 } };
extractUpdatedFields(dbRecord, update);
// { meta: { views: 1 } }
```

[Documentation →](/docs/utilities/object/extractUpdatedFields)

---

### 🎨 Style Console Output(s)

**`Stylog`** - `Chalk`-like minimal utility to style console output(s) in both Node.js & Browser environment(s) (supports named CSS colors).

```typescript
// Basic coloring
Stylog.error.log('Error message');
Stylog.success.log('Success message');
Stylog.info.log('Info message');
Stylog.whitesmoke.log('I am White!');

// Multiple styles
Stylog.blue.bold.underline.log('I am Bold Underlined Blue!');

// With object stringification
Stylog.magenta.italic.log({ data: 'value' }, true);
```

[Documentation →](/docs/utilities/misc/stylog)

---

### ⚡ Performance Optimizers

**`throttleAction`** - Precision control for high-frequency events

```typescript
// Smooth scroll handling
throttleAction(updateScrollPosition, 100);
```

[Documentation →](/docs/utilities/misc/throttleAction)

**`debounceAction`** - Intelligent delay for expensive operations

```typescript
// Search-as-you-type
debounceAction(fetchResults, 300);
```

[Full Documentation →](/docs/utilities/misc/debounceAction)

> These utilities represent just a portion of the comprehensive `nhb-toolbox`. Each is designed with production-grade reliability and developer experience in mind. All the utilities and classes are categorized. Explore by categories or use `ctrl+k` to search your desired *utility*, *class* or *type*.

---

## 🔗 Related Packages

<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <a target="_blank" href="https://www.npmjs.com/package/nhb-hooks">
    <img src="https://img.shields.io/badge/React_Hooks-nhb--hooks-blue" alt="nhb-hooks" />
  </a>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <a target="_blank" href="https://www.npmjs.com/package/nhb-scripts">
    <img src="https://img.shields.io/badge/Development_Scripts-nhb--scripts-red" alt="nhb-scripts" />
  </a>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <a target="_blank" href="https://www.npmjs.com/package/nhb-express">
    <img src="https://img.shields.io/badge/Express_Server_Scaffolder-nhb--express-orange" alt="nhb-express" />
  </a>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <a target="_blank" href="https://www.npmjs.com/package/nhb-anagram-generator">
    <img src="https://img.shields.io/badge/Anagram_Generator-nhb--anagram--generator-teal" alt="nhb-anagram-generator" />
  </a>
</div>
