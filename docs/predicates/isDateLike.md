---
id: isDateLike
title: Check Date-like objects
description: Detect date-like objects from various date/time libraries
---

## isDateLike

Detects date-like objects from multiple popular date/time libraries.

## Features

- Detects native JavaScript `Date` objects
- Supports popular date libraries:
  - Moment.js
  - Dayjs
  - Luxon
  - JS-Joda
  - Temporal
  - [Chronos](../classes/Chronos.md)
- Type-safe TypeScript implementation
- Zero dependencies

## Usage

### Basic Usage

```ts
import { isDateLike } from 'nhb-toolbox';

const nativeDate = new Date();
const momentDate = moment(); // Moment.js
const luxonDate = DateTime.now(); // Luxon
const dayjsDate = dayjs(); // dayjs
const chronosDate = chronos(); // chronos

console.log(isDateLike(nativeDate)); // true
console.log(isDateLike(momentDate)); // true
console.log(isDateLike(luxonDate));  // true
console.log(isDateLike(dayjsDate));  // true
console.log(isDateLike(chronosDate));  // true
console.log(isDateLike('2023-01-01')); // false`}
```

### Supported Libraries

The function recognizes these date-like objects:

| Library      | Detection Criteria |
|--------------|--------------------|
| Native Date  | `instanceof Date` |
| Chronos      | Has `format()`, `toJSON()`, and `toISOString()` methods |
| Dayjs       | Same as Chronos |
| Moment.js    | Same as Chronos |
| Luxon        | Has `toISO()`, `toFormat()` methods and `isValid` property |
| JS-Joda      | Has `plus()`, `minus()`, `equals()`, and `getClass()` methods |
| Temporal     | Has `toJSON()`, `toString()` and specific constructor names |

## API Reference

### Function Signature

```ts
function isDateLike(value: unknown): boolean;
```

### Parameters

| Parameter | Type      | Description                |
|-----------|----------|----------------------------|
| value     | `unknown` | The value to be checked    |

### Returns

`boolean` - `true` if the value is a date-like object, `false` otherwise

## Examples

### Checking Different Value Types

```ts
import { DateTime } from 'luxon';
import { Temporal } from '@js-temporal/polyfill';

isDateLike(new Date()); // true
isDateLike(DateTime.now()); // true (Luxon)
isDateLike(Temporal.Now.instant()); // true
isDateLike({}); // false
isDateLike(null); // false
isDateLike('2023-01-01'); // false`}
```

## Notes

- The function performs `duck-typing` for library objects rather than checking `instanceof`
- For maximum reliability with custom date objects, ensure they implement the expected methods
- Returns `false` for date strings - this only checks for date objects
