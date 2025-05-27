---
id: Chronos
title: Chronos - Play with Time and Date like Chronos Himself
---

> In ancient Greek mythology, **Chronos** is the personification of time itself — relentless, precise, and inescapable. Just like the god it’s named after, the `Chronos` class embodies control over the abstract flow of time in your application.

<!-- markdownlint-disable-file MD024 -->
## API Reference for Chronos

This documentation provides a detailed guide to the `Chronos` class, a comprehensive date and time manipulation class. The methods are grouped into logical categories for easier navigation.

> For chronos function, a `Chronos` wrapper, refer to [chronos](/docs/utilities/date/chronos)

### Chronos Methods

- [Getters](Chronos/getters)
- [Format Methods](Chronos/format)
- [Calculation Methods](Chronos/calculation)
- [Checker Methods](Chronos/checkers)
- [Conversion Methods](Chronos/conversion)
- [Component Methods](Chronos/components)
- [Comparison Methods](Chronos/comparison)
- [Static Methods](Chronos/statics)
- [Symbol Methods](Chronos/symbols)

## Overload Signatures

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

## Public Properties

These properties provide non-destructive, read-only access to the copies of internal states of a `Chronos` instance for debugging, inspection, or meta-awareness.
> ⚠️ However, in JavaScript, these properties *can technically be mutated* (Compile-time `Error` occurs in TypScript if these properties are tried to be mutated), but such mutations (changes) **do not** affect the `Chronos` instance itself. The class internally manages equivalent strict **readonly/private state**. These public properties exist *purely for developer convenience and sugar*.

### `native: Date`

Returns the underlying native JavaScript `Date` object used internally by the `Chronos` instance. This is useful for interoperability with APIs or libraries that expect a native `Date`.

```ts
const ch = new Chronos('2025-01-01');
console.log(ch.native.toISOString()); // → 2025-01-01T00:00:00.000Z
```

### `origin: ChronosMethods | 'root'`

Indicates how the current `Chronos` instance was created. This can be helpful for debugging flow logic or tracing method chains in complex date-time pipelines.

Possible values:

- `'root'`: if the instance was directly constructed
- A method name string such as `'addDays'`, `'startOf'`, etc., if the instance was produced as the result of a method call (which can create a new instance of `Chronos`).

```ts
const root = new Chronos();
const viaMethod = root.addDays(3);

console.log(root.origin); // → 'root'
console.log(viaMethod.origin); // → 'addDays'
```

## Import

```ts
import { Chronos } from 'nhb-toolbox';
```

## Alias

The `Chronos` class is also available under the following alias:

- `Chronus`
