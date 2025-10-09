---
id: calculation
title: Calculation Methods
---

<!-- markdownlint-disable-file MD024 -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## valueOf()

### Signature

```typescript
valueOf(): number
```

### Return Type

`number` - Returns the timestamp (milliseconds since Unix epoch) of the `Chronos` instance

### Behavior & Notes

- Enables arithmetic and comparison operations when used with primitive conversion
- Automatically called when `Chronos` instance is used in numeric context
- Equivalent to `getTimeStamp()` method
- Returns same value as JavaScript Date's `valueOf()`

### Examples

```typescript
// Numeric comparison
const date1 = new Chronos('2025-01-01');
const date2 = new Chronos('2025-01-02');
date2 > date1; // true (automatically calls valueOf())

// Arithmetic operations
const diff = +new Chronos('2025-01-02') - +new Chronos('2025-01-01');
// diff = 86400000 (1 day in milliseconds)

// Explicit conversion
const timestamp = new Chronos().valueOf();
// timestamp = current time in milliseconds
```

### Use Cases

- Sorting arrays of `Chronos` instances
- Calculating time differences
- Interoperability with libraries expecting numeric timestamps

---

## add()

### Signature

```typescript
add(amount: number, unit: TimeUnit): Chronos
```

### Parameters

- `amount`: Number of units to add
- `unit`: Time unit to add ('year', 'month', 'day', etc.)

### Return Type

`Chronos` - New instance with added time

### Notes

- Returns new immutable instance
- Handles month/year overflow automatically

### Example

```javascript
new Chronos('2025-01-31').add(1, 'month'); // 2025-02-28
```

### Alternatives

- You can also use one/all of these methods as per your need, they're self-explanatory:
  - `addDays()`
  - `addHours()`
  - `addMinutes()`
  - `addMonths()`
  - `addSeconds()`
  - `addWeeks()`
  - `addYears()`

---

## subtract()

### Signature

```typescript
subtract(amount: number, unit: TimeUnit): Chronos
```

### Parameters

- `amount`: Number of units to subtract
- `unit`: Time unit to subtract

### Return Type

`Chronos` - New instance with subtracted time

### Example

```javascript
new Chronos('2025-03-31').subtract(1, 'month'); // 2025-02-28
```

---

## diff()

### Signature

```typescript
diff(other: ChronosInput, unit: TimeUnit): number
```

### Parameters

- `other`: Date to compare with
- `unit`: Unit for difference

### Return Type

`number` - Difference in specified units

### Notes

- Returns signed difference (negative if other is after this date)

### Example

```javascript
const date1 = new Chronos('2025-01-01');
const date2 = new Chronos('2025-01-15');
date2.diff(date1, 'days'); // 14
```

---

## round()

### Signature

```typescript
round(unit: TimeUnit, nearest?: number): Chronos
```

### Parameters

- `unit`: The time unit to round to. Valid units: `'year'`, `'month'`, `'week'`, `'day'`, `'hour'`, `'minute'`, `'second'`, `'millisecond'`
- `nearest`: *(optional)*: The nearest multiple to round to. Defaults to `1`.

### Return Type

`Chronos` - Returns a new `Chronos` instance rounded to the nearest point based on the specified unit and granularity. If an invalid unit is passed, the original instance is returned unchanged.

### Behavior & Notes

- Rounding is based on the **proximity to the start or end** of the specified time unit
- Rounding uses sub-unit fractions (e.g., seconds within minutes, minutes within hours) to determine proximity precisely.
- `nearest` defines the multiple to round to (e.g., 15-minute intervals)
- Rounding applies fractional logic based on how far into the unit the date is.
- If an invalid unit is passed, returns the original instance unchanged
- Returns a new immutable instance *(does not modify the original)*

#### Unit-specific Behavior

- **Milliseconds/Seconds/Minutes/Hours**:
  - Rounds based on fractional components
  - Example: `14:35:30` rounded to nearest 15 minutes becomes `14:30:00`

- **Days**:
  - Rounds to nearest day based on time of day
  - Example: `2025-05-23T18:00:00` rounds to `2025-05-24T00:00:00`

- **Weeks**:
  - Uses *ISO 8601* convention: **weeks start on Monday**.
  - Rounds to *nearest Monday* based on proximity
  - Rounding is determined by comparing the current date to:
    - The **start of the current week** (Monday at 00:00),
    - The **start of the next week** (the following Monday at 00:00).
  - If the current date is **closer to the next Monday**, it rounds forward. Otherwise, it rounds back to the previous (or same) Monday.
  - Rounded weeks are treated as **0-indexed** relative to the year.
  - Example: Once the current date passes *midweek* (e.g., *late Wednesday* or *beyond*), it becomes closer to the *next Monday*, so rounding moves forward to that *Monday’s start*.

- **Months**:
  - Rounds based on progress through the month (midpoint is day 15)
  - Example: `2025-01-20` rounds to `2025-02-01`

- **Years**:
  - Considers day-of-year progress relative to leap years
  - Example: `2025-07-01` (midyear) rounds to `2026-01-01`

### Examples

```typescript
// Round to nearest hour
new Chronos('2025-01-15T14:35:30').round('hour'); 
// Returns: 2025-01-15T15:00:00

// Round to nearest 15 minutes
new Chronos('2025-01-15T14:35:30').round('minute', 15);  
// Returns: 2025-01-15T14:30:00

// Round to nearest month (past midpoint)
new Chronos('2025-01-20').round('month');
// Returns: 2025-02-01T00:00:00

// Round to nearest week (closer to next Monday)
new Chronos('2025-01-16T18:00:00').round('week');
// Returns: 2025-01-20T00:00:00 (next Monday)
```

---

## duration()

### Signature

```typescript
duration(toTime?: ChronosInput, absolute?: boolean): TimeDuration
```

### Parameters

- `toTime`: End date (default: `now`)
- `absolute`: Return absolute value, always positive if `true` (default: `true`)

### Return Type

`TimeDuration` - Object with breakdown

```typescript
interface TimeDuration {
 /** Total number of years. */
 years: number;
 /** Number of months remaining after full years are counted. */
 months: number;
 /** Number of days remaining after full months are counted. */
 days: number;
 /** Number of hours remaining after full days are counted. */
 hours: number;
 /** Number of minutes remaining after full hours are counted. */
 minutes: number;
 /** Number of seconds remaining after full minutes are counted. */
 seconds: number;
 /** Number of milliseconds remaining after full seconds are counted. */
 milliseconds: number;
}
```

### Example

```javascript
new Chronos('2020-01-01').duration('2025-01-01');
// {years: 3, months: 0, days: 0, ...}
```

---

## getDatesInRange()

Generate an array of ISO date strings within a specified date range.

### Signatures

<Tabs>
<TabItem value="fixed" label="Fixed Range">

```ts
getDatesInRange(options?: RangeWithDates): string[]
```

</TabItem>
<TabItem value="relative" label="Relative Range">

```ts
getDatesInRange(options?: RelativeDateRange): string[]
```

</TabItem>
<TabItem value="implementation" label="Implementation">

```ts
getDatesInRange(options?: DatesInRangeOptions): string[]
```

</TabItem>
</Tabs>

### Overview

Generates dates between two points in time with:

- Fixed date ranges (`from`/`to`) or relative ranges (`span`/`unit`)
- Weekday filtering (`skipDays`/`onlyDays`)
- Format control (`local`/`utc`)
- Date boundary rounding

### Parameters

#### `options` *(Optional)*

Configuration object accepting either fixed or relative range parameters:

| Parameter   | Type                             | Required | Default         | Description                                        |
|-------------|----------------------------------|----------|-----------------|----------------------------------------------------|
| `from`      | `ChronosInput`                   | ❌      | Current date     | Start date (inclusive)                            |
| `to`        | `ChronosInput`                   | ❌      | 4 weeks from now | End date (inclusive)                              |
| `span`      | `number`                         | ❌      | 4                | Number of time units                              |
| `unit`      | `'year'\|'month'\|'week'\|'day'` | ❌      | 'week'           | Unit of time for relative ranges                  |
| `format`    | `'local'\|'utc'`                 | ❌      | 'local'          | Output format for ISO strings                     |
| `skipDays`  | `WeekDay[] \| Enumerate<7>[]`    | ❌      | `[]`             | Weekdays to exclude (e.g. `['Sunday', 'Saturday']` or `[0, 6]`) |
| `onlyDays`  | `WeekDay[] \| Enumerate<7>[]`    | ❌      | `[]`             | Only include these weekdays (e.g. `['Monday']` or `[1]`, overrides `skipDays`) |
| `roundDate` | `boolean`                        | ❌      | `false`          | Round dates to start of day                       |

<Tabs>
<TabItem value="fixed-options" label="Fixed Range Options">

```ts
interface RangeWithDates {
  /** Start date (inclusive). Default: current date */
  from?: ChronosInput;
  /** End date (inclusive). Default: 4 weeks from now */
  to?: ChronosInput;
  /** Output format. Default: 'local' */
  format?: 'local' | 'utc';
 /**
  * An array of weekdays to exclude from the date range.
  * - Accepts either weekday names (e.g., `'Saturday'`, `'Sunday'`) or numeric indices (0 for Sunday to 6 for Saturday).
  * - Ignored if `onlyDays` is provided.
  */
 skipDays?: Array<WeekDay> | Array<Enumerate<7>>;
 /**
  * An array of weekdays to explicitly include in the date range.
  * - Accepts either weekday names (e.g., `'Monday'`, `'Wednesday'`) or numeric indices (0 for Sunday to 6 for Saturday).
  * - When provided, this overrides `skipDays` and includes only the specified days.
  */
 onlyDays?: Array<WeekDay> | Array<Enumerate<7>>;
  /** Round dates to start of day. Default: false */
  roundDate?: boolean;
}
```

</TabItem>
<TabItem value="relative-options" label="Relative Range Options">

```ts
interface RelativeDateRange {
  /** Number of time units. Default: 4 */
  span?: number;
  /** Unit of time. Default: 'week' */
  unit?: 'year' | 'month' | 'week' | 'day';
  /** Output format. Default: 'local' */
  format?: 'local' | 'utc';
  /**
  * An array of weekdays to exclude from the date range.
  * - Accepts either weekday names (e.g., `'Saturday'`, `'Sunday'`) or numeric indices (0 for Sunday to 6 for Saturday).
  * - Ignored if `onlyDays` is provided.
  */
  skipDays?: Array<WeekDay> | Array<Enumerate<7>>;
  /**
  * An array of weekdays to explicitly include in the date range.
  * - Accepts either weekday names (e.g., `'Monday'`, `'Wednesday'`) or numeric indices (0 for Sunday to 6 for Saturday).
  * - When provided, this overrides `skipDays` and includes only the specified days.
  */
  onlyDays?: Array<WeekDay> | Array<Enumerate<7>>;
  /** Round dates to start of day. Default: false */
  roundDate?: boolean;
}
```

</TabItem>
<TabItem value="implementation-options" label="Implementation Options">

```ts
/** - Unified type that supports either a fixed or relative date range configuration. */
export type DatesInRangeOptions = RangeWithDates | RelativeDateRange;
```

</TabItem>
</Tabs>

### Return Value

`string[]` - Array of ISO date strings

### Behavior

- **Fixed ranges**: Includes all dates between `from` and `to` (inclusive)
- **Relative ranges**: Generates dates forward from current date
- `onlyDays` takes precedence over `skipDays` when both are provided
- Defaults to `4-week range` when no options provided

### Examples

<Tabs>
<TabItem value="fixed-example" label="Fixed Range">

```ts
// Get all dates in January 2025
new Chronos().getDatesInRange({
  from: '2025-01-01',
  to: '2025-01-31',
  skipDays: ['Saturday', 'Sunday'] // or [6, 0]
});

// Include only Fridays in a full month range
const now = new Chronos();
now.getDatesInRange({
  from: now.startOf('month'),
  to: now.endOf('month'),
  onlyDays: ['Friday'],
  roundDate: true
});

// Include only Mondays and Wednesdays in the range
new Chronos().getDatesInRange({
  from: '2025-07-01',
  to: '2025-07-15',
  onlyDays: ['Monday', 'Wednesday']
});
```

</TabItem>
<TabItem value="relative-example" label="Relative Range">

```ts
// Get UTC dates for next 10 business days
new Chronos().getDatesInRange({
  span: 10,
  unit: 'day',
  skipDays: ['Saturday', 'Sunday'], // or [6, 0]
  format: 'utc'
});

// Include only Tuesdays (2) and Thursdays (4) over the next 10 days
new Chronos().getDatesInRange({
  span: 10,
  unit: 'day',
  onlyDays: [2, 4],
});
```

</TabItem>
<TabItem value="rounding-example" label="With Rounding">

```ts
// Get rounded dates for current month as local ISO string
const now = new Chronos();
now.getDatesInRange({
  from: now.startOf('month'),
  to: now.endOf('month'),
  roundDate: true
});
```

</TabItem>
</Tabs>

### Notes

:::danger Important

- Weekday names must exactly match: `'Monday'`, `'Tuesday'`, etc. (case-sensitive)
- When using `onlyDays`, all other days are excluded regardless of `skipDays`
:::

:::tip Similar Static Method

- [getDatesForDay](statics#getdatesforday)

:::
