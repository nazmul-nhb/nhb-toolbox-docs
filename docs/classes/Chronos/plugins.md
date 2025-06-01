---
id: plugins
title: Chronos Plugins
---

<!-- markdownlint-disable-file MD024 -->

import Copy from '@site/src/components/Copy'

:::info
Chronos supports a powerful **plugin system** that allows developers to inject additional methods or utilities into the `Chronos` class **without modifying its core**. This enables clean separation of concerns, tree-shaking, modular feature design, and maintainability.
:::

---

## 🧩 What Is a Plugin?

A plugin is a function that takes the `Chronos` class constructor and augments it—usually by adding prototype methods.

```ts
type ChronosPlugin = (ChronosClass: typeof Chronos) => void;
```

You can inject plugins via the static `Chronos.use()` method:

```ts
Chronos.use(myPlugin);
```

:::tip

- Each plugin is only applied once, even if `use()` is called multiple times with the same plugin.
- If a plugin enables multiple methods, injecting once will enable all the methods enabled by that particular plugin. [See the List](#-official-plugins)

:::

---

## 🛠️ Writing a Plugin

Here's the basic structure of a `Chronos` plugin with access to protected and/or private internals:

```ts
type ChronosConstructor = import('../Chronos').Chronos;
type MainChronos = typeof import('../Chronos').Chronos;

const INTERNALS = Symbol('Internals');

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
    // Example of accessing internals through protected static interface
    const internalDate = ChronosClass[INTERNALS].internalDate(this);
    return `Hello from plugin! Current date: ${internalDate}`;
  };
};
```

---

### 🔐 Accessing Internals

Plugins can safely access protected and/or private internals through the static `[INTERNALS]` interface:

#### Available Internal Methods & Properties

```ts
interface ChronosInternals {
  /**
   * Creates a new Chronos instance with origin tracking
   * @param instance - Chronos instance to operate on
   * @param method - Name of the method creating this instance
   * @param label - Optional UTC offset label
   */
  withOrigin(
    instance: Chronos,
    method: ChronosMethods,
    label?: UTCOffSet,
  ): Chronos;

  /**
   * Creates a new Date object from Chronos input
   * @param instance - Chronos instance to operate on
   * @param value - Input value to convert (optional, uses current date if omitted)
   */
  toNewDate(instance: Chronos, value?: ChronosInput): Date;

  /**
   * Gets the internal Date object
   * @param instance - Chronos instance to access
   */
  internalDate(instance: Chronos): Date;

  /**
   * Gets the current UTC offset
   * @param instance - Chronos instance to access
   */
  offset(instance: Chronos): UTCOffSet;
}
```

### 🚀 Usage Example

```ts
import { INTERNALS } from 'nhb-toolbox';

export const timezonePlugin = (ChronosClass: MainChronos): void => {
  ChronosClass.prototype.getDetailedTime = function(this: ChronosConstructor) {
    const internals = ChronosClass[INTERNALS];
    const date = internals.internalDate(this);
    const offset = internals.offset(this);
    
    return {
      time: date.toISOString(),
      offset,
      origin: 'timezonePlugin'
    };
  };
};
```

---

:::caution[Important Notes]

1. Always use the static `[INTERNALS]` interface rather than trying to access private fields directly
2. The `withOrigin` method should be used when creating new Chronos instances to maintain proper origin tracking
3. For date manipulation, prefer using `toNewDate` rather than creating Date objects directly to maintain consistency with Chronos' internal handling

:::

---

## ✅ Using the Plugin

To enable a plugin, use the static `Chronos.use()` method **before creating instances**:

```ts
import { Chronos } from 'nhb-toolbox';
import { customPlugin } from './plugins/customPlugin';

// For importing an actual plugin from the package
import { pluginName } from 'nhb-toolbox/plugins/pluginName';

Chronos.use(customPlugin);

const c = new Chronos();
console.log(c.customMethod()); // Hello from plugin!
```

---

## 📦 Official Plugins

| Plugin Names         | Imports Statements                          | Methods Registered                             |
| :------------------- | :------------------------------------------ | :--------------------------------------------- |
| `relativeTimePlugin` | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';" /> | [getRelativeYear](../Chronos/comparison#getrelativeyear), [getRelativeMonth](../Chronos/comparison#getrelativemonth), [getRelativeWeek](../Chronos/comparison#getrelativeweek), [getRelativeDay](../Chronos/comparison#getrelativeday), [getRelativeHour](../Chronos/comparison#getrelativehour), [getRelativeMinute](../Chronos/comparison#getrelativeminute), [getRelativeSecond](../Chronos/comparison#getrelativesecond), [getRelativeMilliSecond](../Chronos/comparison#getrelativemillisecond), [compare](../Chronos/comparison#compare), [isToday](../Chronos/checkers#istoday), [isTomorrow](../Chronos/checkers#istomorrow), [isYesterday](../Chronos/checkers#isyesterday) |
| `timeZonePlugin`     | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';" />         | [timeZone](../Chronos/conversion#timezone)  |
| `fromNowPlugin`      | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { fromNowPlugin } from 'nhb-toolbox/plugins/fromNowPlugin';" />           | [fromNow](../Chronos/format#fromnow) |
| `businessPlugin`     | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';" />         | [isWeekend](../Chronos/checkers#isweekend),  [isWorkday](../Chronos/checkers#isworkday), [isBusinessHour](../Chronos/checkers#isbusinesshour),  [toAcademicYear](../Chronos/extras#toacademicyear), [toFiscalQuarter](../Chronos/extras#tofiscalquarter) |
| `seasonPlugin`       | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { seasonPlugin } from 'nhb-toolbox/plugins/seasonPlugin';" />             | [season](../Chronos/names#season) |
| `dayPartPlugin`      | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { dayPartPlugin } from 'nhb-toolbox/plugins/dayPartPlugin';" />           | [getPartOfDay](../Chronos/names#getpartofday) |
| `zodiacPlugin`       | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { zodiacPlugin } from 'nhb-toolbox/plugins/zodiacPlugin';" />         | [getZodiacSign](../Chronos/names#getzodiacsign) |
| `palindromePlugin`   | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { palindromePlugin } from 'nhb-toolbox/plugins/palindromePlugin';" />     | [isPalindromeDate](../Chronos/checkers#ispalindromedate) |
| *(More coming soon)* |                                                                                              | |
