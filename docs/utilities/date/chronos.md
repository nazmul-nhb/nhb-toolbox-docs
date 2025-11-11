---
id: chronos
title: Chronos Wrapper Function
---

## Overview

:::info
Function wrapper around the [`Chronos`](/docs/classes/Chronos) class that provides identical functionality with a simpler interface. All [`Chronos`](/docs/classes/Chronos) features are available through this function.
:::

## Key Features

- Same functionality as `new Chronos()` but with function syntax
- Full access to all `Chronos` instance methods
- Inherits all static methods from `Chronos` class (`chronos` without call signature)
- Supports all `Chronos` input types
- Maintains identical type safety

### 🧩 [Plugin System](Chronos/plugins)

Chronos supports a modular plugin system that allows you to extend its capabilities without bloating the core. Plugin methods are **not available by default**—you must explicitly install them using the `.use()` or `.register()` static method.

#### How it works

```ts
import { chronos } from 'nhb-toolbox';
import { seasonPlugin } from 'nhb-toolbox/plugins/seasonPlugin';

// Register the plugin before using its methods
chronos.use(seasonPlugin); 
// or
chronos.register(seasonPlugin);

console.log(chronos().season()); // ✅ Safe to use after plugin registration
```

:::info
Each plugin enhances the `Chronos` prototype and becomes available globally after registration.
:::

## Usage

### Import

```ts
import { chronos } from 'nhb-toolbox';
```

### Basic Instantiation

```typescript
// Function style
const date = chronos('2023-12-31')

date.year // 2023
date.formatStrict() // Formatted date string

// Class style (equivalent)
const date = new Chronos('2023-12-31')

date.year // 2023
date.formatStrict() // Formatted date string
```

### With Components

```typescript
const date = chronos(2023, 12, 31, 15, 30)

date.year // 2023
date.formatStrict() // Formatted date string
```

## Available Methods

The wrapper provides access to all `Chronos` methods through the returned instance:

- **[Public/Protected Properties](/docs/classes/Chronos#public--protected-properties)** - Access public/protected properties for debugging and easy access
- **[Getters](/docs/classes/Chronos/getters)** - Access date components
- **[Format Methods](/docs/classes/Chronos/format)** - Date display formatting
- **[Name Getter Methods](/docs/classes/Chronos/names)** - Get names of the date parts (day-name, month-name, time zone etc.)
- **[Calculation Methods](/docs/classes/Chronos/calculation)** - Date math operations
- **[Checker Methods](/docs/classes/Chronos/checkers)** - Date validation
- **[Conversion Methods](/docs/classes/Chronos/conversion)** - Type transformations
- **[Get & Set Methods](/docs/classes/Chronos/get-set)** - Set and get date part(s)
- **[Comparison Methods](/docs/classes/Chronos/comparison)** - Date relation checks
- **[String Methods](/docs/classes/Chronos/strings)** - Get time as string
- **[Extra Time Information](/docs/classes/Chronos/comparison)** - Get extra information about part of year, month, day/date etc.

## [Static Methods](/docs/classes/Chronos/statics)

All [`Chronos static methods`](/docs/classes/Chronos/statics) are available directly on the wrapper function:

<details>
  <summary>**List of Static Methods**</summary>
    | Method                                             | Short Description                                                          |
    | -------------------------------------------------- | -------------------------------------------------------------------------- |
    | [now()](Chronos/statics#now)                       | Returns the number of milliseconds elapsed since midnight, 1970-01-01 UTC. |
    | [use()](Chronos/statics#use)                       | Injects a plugin into the `Chronos` system.                                |
    | [register()](Chronos/statics#register)             | Alias for [`use()`](Chronos/statics#use)                                   |
    | [utc()](Chronos/statics#utc)                       | Creates a UTC-based `Chronos` instance.                                    |
    | [with()](Chronos/statics#with)                     | Creates a new `Chronos` instance with the provided time component(s).      |
    | [parse()](Chronos/statics#parse)                   | Parses a date string with a given format (limited support only).           |
    | [max()](Chronos/statics#max)                       | Returns latest Chronos.                                                    |
    | [min()](Chronos/statics#min)                       | Returns earliest Chronos.                                                  |
    | [today()](Chronos/statics#today)                   | Returns the current date and time in a specified format in local time.     |
    | [tomorrow()](Chronos/statics#tomorrow)             | Returns a new `Chronos` instance representing tomorrow's date.             |
    | [yesterday()](Chronos/statics#yesterday)           | Returns a new `Chronos` instance representing yesterday's date.            |
    | [formatTimePart()](Chronos/statics#formattimepart) | Formats a time-only string into a formatted time string.                   |
    | [getDatesForDay()](Chronos/statics#getdatesforday) | Returns ISO date strings for each occurrence of a weekday.                 |
    | [isLeapYear()](Chronos/statics#isleapyear)         | Checks if the year in the date or year (from 0 - 9999) is a leap year.     |
    | [isValidChronos()](Chronos/statics#isvalidchronos) | Checks if the given value is an instance of `Chronos`.                     |
    | [isValidDate()](Chronos/statics#isvaliddate)       | Checks if the given value is a valid `Date` object.                        |
    | [isDateString()](Chronos/statics#isdatestring)     | Checks if the given value is a valid date string.                          |
</details>

### Examples

```typescript
import { Chronos } from 'nhb-toolbox';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';

// Using wrapper function
chronos.parse('2023-12-31', 'YYYY-MM-DD')
chronos.use(timeZonePlugin)
chronos.today()
chronos.isLeapYear(2024)

// Using class (equivalent)
Chronos.parse('2023-12-31', 'YYYY-MM-DD')
Chronos.today()
Chronos.isLeapYear(2024)
```

## Aliases

The `chronos` function is also available under the following aliases:

- `chronosjs`
- `chronosts`
- `chronus`
- `chronusjs`
- `chronusts`

> These aliases exist to support flexible naming conventions and common user preferences.

## Full Documentation

For complete method documentation, see the [`Chronos` class reference](/docs/classes/Chronos#chronos-methods). All methods shown there are available through this wrapper.
