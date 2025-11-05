---
id: plugins
title: Chronos Plugins
---

<!-- markdownlint-disable-file MD024 -->

import Copy from '@site/src/components/Copy'

:::info

- `Chronos` supports a powerful **plugin system** that allows developers to inject additional methods or utilities into the `Chronos` class **without modifying its core**. This enables clean separation of concerns, tree-shaking, modular feature design, and maintainability.

- Plugins can be official (maintained by the core team) or custom (developed by users). [See the list of official plugins below](#-official-plugins) or [learn how to write your own plugin](#️-writing-your-own-custom-plugin).

:::

---

## 🧩 What Is a Plugin?

A plugin is a function that takes the `Chronos` class constructor and augments it—usually by adding prototype methods.

```ts
type ChronosPlugin = (ChronosClass: typeof Chronos) => void;
```

You can inject plugins via the static [`Chronos.use()`](/docs/classes/Chronos/statics#use) or [`Chronos.register()`](/docs/classes/Chronos/statics#register) method or its wrapper function:

```ts
Chronos.use(pluginName);

// or 
chronos.use(pluginName);

// or
Chronos.register(pluginName);

// or 
chronos.register(pluginName);
```

:::tip

- Each plugin is only applied once, even if `use()` or `register()` is called multiple times with the same plugin.
- If a plugin enables multiple methods, injecting once will enable all the methods by that particular plugin. [See the list below](#-official-plugins)

:::

---

## ✅ Using a Plugin

To enable a plugin, use the static [`Chronos.use()`](/docs/classes/Chronos/statics#use) or [`Chronos.register()`](/docs/classes/Chronos/statics#register) method **before creating instances**:

```ts
import { Chronos, chronos } from 'nhb-toolbox';

// For importing a plugin from the package, plugin name and import path are same
import { pluginName } from 'nhb-toolbox/plugins/pluginName';

// Using the plugin
Chronos.use(pluginName);
// or 
chronos.use(pluginName);
// or
Chronos.register(pluginName);
// or 
chronos.register(pluginName);

// Using the method enabled by that plugin
const c = new Chronos();
c.enabledMethod();

// or 
chronos().enabledMethod()
```

---

## 📦 Official Plugins

| Plugin Names         | Imports Statements                          | Methods Registered                             |
| :------------------- | :------------------------------------------ | :--------------------------------------------- |
| `relativeTimePlugin` | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';" /> | [getRelativeYear](../Chronos/comparison#getrelativeyear), [getRelativeMonth](../Chronos/comparison#getrelativemonth), [getRelativeWeek](../Chronos/comparison#getrelativeweek), [getRelativeDay](../Chronos/comparison#getrelativeday), [getRelativeHour](../Chronos/comparison#getrelativehour), [getRelativeMinute](../Chronos/comparison#getrelativeminute), [getRelativeSecond](../Chronos/comparison#getrelativesecond), [getRelativeMilliSecond](../Chronos/comparison#getrelativemillisecond), [compare](../Chronos/comparison#compare), [isToday](../Chronos/checkers#istoday), [isTomorrow](../Chronos/checkers#istomorrow), [isYesterday](../Chronos/checkers#isyesterday) |
| `timeZonePlugin`     | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';" />         | [timeZone](../Chronos/conversion#timezone), [getTimeZoneName](../Chronos/names#gettimezonename), [getTimeZoneNameShort](../Chronos/names#gettimezonenameshort) |
| `fromNowPlugin`      | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { fromNowPlugin } from 'nhb-toolbox/plugins/fromNowPlugin';" />           | [fromNow](../Chronos/format#fromnow) |
| `businessPlugin`     | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';" />         | [isWeekend](../Chronos/checkers#isweekend),  [isWorkday](../Chronos/checkers#isworkday), [isBusinessHour](../Chronos/checkers#isbusinesshour),  [toAcademicYear](../Chronos/extras#toacademicyear), [toFiscalQuarter](../Chronos/extras#tofiscalquarter) |
| `seasonPlugin`       | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { seasonPlugin } from 'nhb-toolbox/plugins/seasonPlugin';" />             | [season](../Chronos/names#season) |
| `dayPartPlugin`      | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { dayPartPlugin } from 'nhb-toolbox/plugins/dayPartPlugin';" />           | [getPartOfDay](../Chronos/names#getpartofday) |
| `zodiacPlugin`       | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { zodiacPlugin } from 'nhb-toolbox/plugins/zodiacPlugin';" />         | [getZodiacSign](../Chronos/names#getzodiacsign) |
| `palindromePlugin`   | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { palindromePlugin } from 'nhb-toolbox/plugins/palindromePlugin';" />     | [isPalindromeDate](../Chronos/checkers#ispalindromedate) |
| `greetingPlugin`   | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { greetingPlugin  } from 'nhb-toolbox/plugins/greetingPlugin ';" />     | [getGreeting](../Chronos/format#getgreeting) |
| `roundPlugin`   | <Copy message="Import Statement Copied!" afterCopy="Import Statement Copied!" text="import { roundPlugin  } from 'nhb-toolbox/plugins/roundPlugin ';" />     | [round](../Chronos/calculation#round) |
| *(More coming soon)* |                                                                                              | |

---

## 🛠️ Writing Your Own Custom Plugin

Here's the basic structure of a `Chronos` plugin with access to *protected and/or private* internals:

```ts
import { Chronos, INTERNALS } from 'nhb-toolbox';

// Create a module augmentation to add your custom method to the `Chronos` interface
// This allows TypeScript to recognize the new method on `Chronos` instances
// This should be inside a `d.ts` file or at the top of your plugin file (must be a `.ts` file)
declare module 'nhb-toolbox/chronos' {
  interface Chronos {
    /**
    * @instance Custom `Chronos` method to greet a user with the current date.
    * @param user The name of the user to greet.
    * @returns A greeting message including the user's name and the current ISO dates.
    */
    customMethod(user: string): string;
  }
}

// The plugin function must be in a `.ts` or `.js` file
/** * Plugin to inject `customMethod` into Chronos instances. */
export const customPlugin = (ChronosClass: typeof Chronos): void => {
  ChronosClass.prototype.customMethod = function (this: Chronos, user: string): string {
    // Example of accessing internals through protected static interface
    const internalDate = ChronosClass[INTERNALS].internalDate(this);
    return `Hello ${user}, Welcome to custom plugin! Current date: { local: ${this} } { utc: ${internalDate.toISOString()} }`;
  };
};
```

> Now consume the plugin in the same file or another file where you want to use your custom method

```ts
import { Chronos } from 'nhb-toolbox';
// or import { Chronos } from 'nhb-toolbox/chronos';
import { customPlugin } from './path-to-your-plugin-file';

// Use the plugin in your application's root/entry file or where you initialize `Chronos`
Chronos.use(customPlugin);
// or
Chronos.register(customPlugin);

new Chronos().customMethod('NHB');
// => "Hello NHB, Welcome to custom plugin! Current date: { local: 2025-09-22T14:47:44.132+06:00 } { utc: 2025-09-22T08:47:44.132Z }"
```

---

### 🔐 Accessing Internals

Plugins can safely access protected and/or private internal properties or methods through the static `[INTERNALS]` interface:

#### 🔐 Available Internal Properties

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

#### 🚀 Usage Example

> Here's a real example from the package itself: plugin that adds a `timeZone` method to `Chronos` instances, allowing users to convert the instance to a specified time zone using some internal methods and properties:

```ts
import { Chronos, INTERNALS } from 'nhb-toolbox';
// Other imports

declare module 'nhb-toolbox/chronos' {
  interface Chronos {
    timeZone(): string;
  }
}

export const timeZonePlugin = (ChronosClass: typeof Chronos): void => {
  ChronosClass.prototype.timeZone = function (
    this: Chronos,
    zone: TimeZone | UTCOffSet
  ): Chronos {
    let targetOffset: number;
    let stringOffset: UTCOffSet;

    if (isValidUTCOffSet(zone)) {
      targetOffset = extractMinutesFromUTC(zone);
      stringOffset = zone;
    } else {
      targetOffset = TIME_ZONES?.[zone] ?? TIME_ZONES['UTC'];
      stringOffset = formatUTCOffset(targetOffset);
    }

    const previousOffset = this.getTimeZoneOffsetMinutes();
    const relativeOffset = targetOffset - previousOffset;

    const internals = ChronosClass[INTERNALS];

    const adjustedTime = new Date(
      internals.internalDate(this).getTime() + relativeOffset * 60 * 1000
    );

    const instance = new ChronosClass(adjustedTime);

    return internals.withOrigin(instance, 'timeZone', stringOffset);
  };
};
```

---

### 🔥 Important Notes

:::danger[Important]

1. Always augment `Chronos` via module augmentation to ensure TypeScript recognizes your new methods using this subpath: `'nhb-toolbox/chronos'`
2. Import `Chronos` and `INTERNALS` from `'nhb-toolbox'` in your plugin file
3. Always use the static `[INTERNALS]` interface rather than trying to access private fields directly
4. The `withOrigin` method should be used when creating new `Chronos` instances to maintain proper origin tracking
5. For native js `Date` manipulation in your plugin, prefer using `toNewDate` from `ChronosInternals` interface rather than creating `Date` objects directly to maintain consistency with internal handling of `Chronos`

:::

---
