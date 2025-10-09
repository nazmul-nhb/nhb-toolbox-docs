---
id: Chronos
title: Chronos - Play with Time and Date, Be a Time Master like Chronos
---

## `Chronos`

:::tip[About Chronos]
In ancient Greek mythology, **Chronos** is the primordial embodiment of time — not merely tracking moments, but **defining their very existence**. Like its mythological namesake, the `Chronos` class offers **precise, immutable, and expressive control** over time within your application.

Designed to go beyond `Date`, it empowers you to manipulate, format, compare, and traverse time with **clarity, reliability, and confidence** — all while staying _immutable_ and _framework-agnostic_.

Whether you're building a calendar, a countdown, or scheduling logic, `Chronos` gives you the power to shape time as you see fit.
:::

<!-- markdownlint-disable-file MD024 -->
## API Reference for Chronos

This documentation provides a detailed guide to the `Chronos` class, a comprehensive date and time manipulation class. The methods are grouped into logical categories for easier navigation.

:::info
For `chronos` function, a `Chronos` wrapper, refer to [**chronos**](/docs/utilities/date/chronos)
:::

### Chronos Methods

- [Getters](Chronos/getters)
- [Format Methods](Chronos/format)
- [Calculation Methods](Chronos/calculation)
- [Name Getter Methods](Chronos/names)
- [Checker Methods](Chronos/checkers)
- [Conversion Methods](Chronos/conversion)
- [Comparison Methods](Chronos/comparison)
- [Component Methods](Chronos/components)
- [Static Methods](Chronos/statics)
- [Chronos Plugins](Chronos/plugins)
- [String Methods](Chronos/strings)
- [Extra Time Information](Chronos/extras)
- [Symbol Methods](Chronos/symbols)

## Constructor Signatures

```ts
 constructor();
 constructor(value: number);
 constructor(value: string);
 constructor(value: Date);
 constructor(value: Chronos);
 constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
 constructor(value?: ChronosInput);
```

### ChronosInput

```ts
type ChronosInput = number | string | Date | Chronos;
```

## Import

```ts
import { Chronos } from 'nhb-toolbox';
```

## Public Properties

These properties provide non-destructive, read-only access to the copies of internal states of a `Chronos` instance for debugging, inspection, or meta-awareness.

:::info
However, in JavaScript, these properties _can technically be mutated_ (Compile-time `Error` occurs in TypScript if these properties are tried to be mutated), but such mutations (changes) **do not** affect the `Chronos` instance itself. The class internally manages equivalent strict **readonly/private state**. These public properties exist _purely for developer convenience and sugar_.
:::

### `native: Date`

Returns the underlying native JavaScript `Date` object used internally by the `Chronos` instance. This is useful for interoperability with APIs or libraries that expect a native `Date`.

:::danger[Note]
It is **HIGHLY** advised not to rely on this `native` public property to access [native JS Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). It's not reliable when timezone and/or UTC related operations are performed. This particular `native` Date always shows a relative UTC time of the current instance even for UTC or zoned time. If you really need to use correct native `Date`, use [`toDate()`](Chronos/conversion#todate) instance method.
:::

```ts
const ch = new Chronos('2025-01-01');
console.log(ch.native.toISOString()); // → 2025-01-01T00:00:00.000Z
```

### `origin: ChronosMethods | 'root'`

Indicates how the current `Chronos` instance was created. This can be helpful for debugging flow logic or tracing method chains in complex date-time pipelines.

Possible values:

- `'root'`: if the instance was directly constructed
- A method name string such as `'addDays'`, `'startOf'`, etc., if the instance was produced as the result of a method call (which can create a new instance of `Chronos`). If no such method was called it shows the last previous method name as `origin`, if there is none, it shows `root`.

```ts
const root = new Chronos();
const viaMethod = root.addDays(3);

console.log(root.origin); // → 'root'
console.log(viaMethod.origin); // → 'addDays'
```

## Plugin System

Chronos supports a modular plugin system that allows you to extend its capabilities without bloating the core. Plugin methods are **not available by default**—you must explicitly install them using the `.use()` static method.

### How it works

```ts
import { Chronos } from 'nhb-toolbox';
import { seasonPlugin } from 'nhb-toolbox/plugins/seasonPlugin';

Chronos.use(seasonPlugin); // Register the plugin before using its methods

const now = new Chronos();
console.log(now.season()); // ✅ Safe to use after plugin registration
```

:::info
Each plugin enhances the `Chronos` prototype and becomes available globally after registration.
:::

## Alias

The `Chronos` class is also available under the following alias:

- `Chronus`
