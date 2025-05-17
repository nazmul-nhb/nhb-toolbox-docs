---
id: chronos
title: Chronos Wrapper Function
---

## Overview

Function wrapper around the [`Chronos`](/docs/classes/Chronos) class that provides identical functionality with a simpler interface. All Chronos features are available through this function.

## Key Features

- Same functionality as `new Chronos()` but with function syntax
- Inherits all static methods from Chronos class
- Supports all Chronos input types
- Maintains identical type safety
- Full access to all Chronos instance methods

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

## Method Categories

The wrapper provides access to all Chronos methods through the returned instance:

- **[Getters](/docs/classes/Chronos/getters)** - Access date components
- **[Format Methods](/docs/classes/Chronos/format)** - Date display formatting
- **[Calculation Methods](/docs/classes/Chronos/calculation)** - Date math operations
- **[Checker Methods](/docs/classes/Chronos/checkers)** - Date validation
- **[Conversion Methods](/docs/classes/Chronos/conversion)** - Type transformations
- **[Component Methods](/docs/classes/Chronos/components)** - Date part manipulation
- **[Comparison Methods](/docs/classes/Chronos/comparison)** - Date relation checks

## Static Methods

All [`Chronos static methods`](/docs/classes/Chronos/statics) are available directly on the wrapper function:

```typescript
// Using wrapper function
chronos.parse('2023-12-31', 'YYYY-MM-DD')
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
