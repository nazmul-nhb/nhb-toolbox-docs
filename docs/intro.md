---
id: intro
title: Introduction
slug: /intro
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
- **Types**: Includes [types](/docs/types) designed to enhance type safety and developer ergonomics

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

<TabItem value="npm" label="📦 npm">

- NPM Registry

```shell
npm i nhb-toolbox
```

- GitHub Packages

```shell
npm i  @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="yarn" label="🧶 yarn">

- NPM Registry

```shell
yarn add nhb-toolbox
```

- GitHub Packages

```shell
yarn add @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="pnpm" label="🚀 pnpm">

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

<TabItem value="npm" label="📦 npm">

- NPM Registry

```shell
npm i -D nhb-toolbox
```

- GitHub Packages

```shell
npm i -D @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="yarn" label="🧶 yarn">

- NPM Registry

```shell
yarn add -D nhb-toolbox
```

- GitHub Packages

```shell
yarn add -D @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="pnpm" label="🚀 pnpm">

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

### 🌐  Install Globally

<Tabs groupId="package-manager">

<TabItem value="npm" label="📦 npm">

- NPM Registry

```shell
npm i -g nhb-toolbox
```

- GitHub Packages

```shell
npm i -g @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="yarn" label="🧶 yarn">

- NPM Registry

```shell
yarn add -g nhb-toolbox
```

- GitHub Packages

```shell
yarn add -g @nazmul-nhb/nhb-toolbox
```

</TabItem>

<TabItem value="pnpm" label="🚀 pnpm">

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
