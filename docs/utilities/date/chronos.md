---
id: chronos
title: Chronos Wrapper Function
---

## Overview

:::info
Function wrapper around the [`Chronos`](/docs/classes/Chronos) class that provides identical functionality with a simpler interface. All `Chronos` features are available through this function.
:::

## Key Features

- Same functionality as `new Chronos()` but with function syntax
- Full access to all `Chronos` instance methods
- Inherits all static methods from `Chronos` class (`chronos` without call signature)
- Supports all `Chronos` input types
- Maintains identical type safety

### 🧩 Plugin System

Chronos supports a modular plugin system that allows you to extend its capabilities without bloating the core. Plugin methods are **not available by default**—you must explicitly install them using the `.use()` static method.

#### How it works

```ts
import { Chronos } from 'nhb-toolbox';
import { seasonPlugin } from 'nhb-toolbox/plugins/seasonPlugin';

chronos.use(seasonPlugin); // Register the plugin before using its methods

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
- **[Component Methods](/docs/classes/Chronos/components)** - Date part manipulation
- **[Comparison Methods](/docs/classes/Chronos/comparison)** - Date relation checks
- **[Chronos Plugins](/docs/classes/Chronos/plugins)** - Learn about `Chronos` plugins
- **[String Methods](/docs/classes/Chronos/strings)** - Get time as string (some are just augmentation of JS defaults)
- **[Extra Time Information](/docs/classes/Chronos/comparison)** - Get extra information about part of year, month, day/date etc.

## [Static Methods](/docs/classes/Chronos/statics)

All [`Chronos static methods`](/docs/classes/Chronos/statics) are available directly on the wrapper function:

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

For complete method documentation, see the [`Chronos` class reference](/docs/classes/Chronos). All methods shown there are available through this wrapper.
