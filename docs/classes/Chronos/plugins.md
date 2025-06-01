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
- If a plugin enables multiple methods, injecting once will enable all the methods by that particular plugin. [See the list below](#-official-plugins)

:::

---

## ✅ Using the Plugin

To enable a plugin, use the static `Chronos.use()` method **before creating instances**:

```ts
import { Chronos } from 'nhb-toolbox';

// For importing a plugin from the package plugin name and import path are same
import { pluginName } from 'nhb-toolbox/plugins/pluginName';

// Using the plugin
Chronos.use(pluginName);

// Using the method enabled by that plugin
const c = new Chronos();
c.enabledMethod();
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
