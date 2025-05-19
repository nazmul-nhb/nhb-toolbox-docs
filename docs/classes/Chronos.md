---
id: Chronos
title: Chronos - Play with Time and Date like Chronos Himself
---

> In ancient Greek mythology, **Chronos** is the personification of time itself — relentless, precise, and inescapable. Just like the god it’s named after, the `Chronos` class embodies control over the abstract flow of time in your application.

<!-- markdownlint-disable-file MD024 -->
## API Reference for Chronos

This documentation provides a detailed guide to the `Chronos` class, a comprehensive date and time manipulation class. The methods are grouped into logical categories for easier navigation.

> For chronos function, a `Chronos` wrapper, refer to [chronos](/docs/utilities/date/chronos)

### Table of Contents

- [Getters](Chronos/getters)
- [Format Methods](Chronos/format)
- [Calculation Methods](Chronos/calculation)
- [Static Methods](Chronos/statics)
- [Checker Methods](Chronos/checkers)
- [Conversion Methods](Chronos/conversion)
- [Component Methods](Chronos/components)
- [Comparison Methods](Chronos/comparison)
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

## Import

```ts
import { Chronos } from 'nhb-toolbox';
```

## Alias

The `Chronos` class is also available under the following alias:

`Chronus`
