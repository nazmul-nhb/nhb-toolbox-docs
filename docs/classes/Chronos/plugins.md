---
id: plugins
title: Chronos Plugins
---

<!-- markdownlint-disable-file MD024 -->

:::info
Chronos supports a powerful **plugin system** that allows developers to inject additional methods or utilities into the `Chronos` class **without modifying its core**. This enables clean separation of concerns, tree-shaking, modular feature design, and maintainability.
:::

---

## 🧱 What Is a Plugin?

A plugin is a function that takes the `Chronos` class constructor and augments it—usually by adding prototype methods.

```ts
type ChronosPlugin = (ChronosClass: typeof Chronos) => void;
```

You can inject plugins via the static `Chronos.use()` method:

```ts
Chronos.use(myPlugin);
```

:::tip
Each plugin is only applied once, even if `use()` is called multiple times with the same plugin.
:::

---

## 🛠️ Writing a Plugin

Here’s the basic structure of a Chronos plugin:

```ts
type ChronosConstructor = import('../Chronos').Chronos;
type MainChronos = typeof import('../Chronos').Chronos;

declare module '../Chronos' {
  interface Chronos {
    customMethod(): string;
  }
}

/**
 * Plugin to inject `customMethod` into Chronos instances.
 */
export const customPlugin = (ChronosClass: MainChronos): void => {
  ChronosClass.prototype.customMethod = function (
    this: ChronosConstructor
  ): string {
    return 'Hello from plugin!';
  };
};
```

---

## ✅ Using the Plugin

To enable a plugin, use the static `Chronos.use()` method **before creating instances**:

```ts
import { Chronos } from 'nhb-toolbox';
import { customPlugin } from './plugins/customPlugin';

Chronos.use(customPlugin);

const c = new Chronos();
console.log(c.customMethod()); // Hello from plugin!
```

---

## 🔐 Accessing Protected Internals

Plugins can safely use protected static internals if designed carefully:

```ts
ChronosClass[INTERNALS].withOrigin(instance, 'pluginName', 'UTC Offset');
```

Avoid depending on private instance methods directly unless mediated through `INTERNALS`.

---

## 📦 Official Plugins

| Plugin Name                                       | Description                                   |
| ------------------------------------------------- | --------------------------------------------- |
| [`season`](../Chronos/names#season)               | Get seasonal name based on month/date         |
| [`timeZone`](../Chronos/conversion#timezone)      | Adjust time zone and get new Chronos instance |
| [`getPartOfDay`](../Chronos/names#getpartofday)   | Get names of date parts e.g. night, noon etc. |
| [`getZodiacSign`](../Chronos/names#getzodiacsign) | Get name of western zodiac sign on date       |
| *(More coming soon)*                              |                                               |
