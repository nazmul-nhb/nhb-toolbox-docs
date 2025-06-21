---
id: statics
title: Static Methods
---

<!-- markdownlint-disable-file MD024 -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## use()

Injects a plugin into the Chronos system. This enables dynamic extension of the `Chronos` class at runtime by registering external functionality as methods on its prototype.

:::info One-time Injection
A plugin is only injected once per runtime. Re-registering the same plugin has no effect.
:::

### Signature

```typescript
static use(plugin: ChronosPlugin): void
```

### Parameters

| Name    | Type             | Description                      |
|---------|------------------|----------------------------------|
| plugin  | `ChronosPlugin`  | A plugin function that receives the Chronos class constructor and augments it. |

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';

Chronos.use(timeZonePlugin); // Injects timeZone() method
````

Once injected, the plugin methods become available on all `Chronos` instances:

```ts
const c = Chronos.now();
c.timeZone('UTC+06:00');
```

### Notes

:::info

* Plugins should be injected **before** any instance creation.
* Internally, Chronos maintains a `#plugins` set to prevent duplicate injections.
* This system is ideal for modular features like `seasons`, `zodiac`, or `timeZone` etc. support.

:::

---

## parse()

### Signature

```typescript
static parse(dateStr: string, format: string): Chronos
```

### Parameters

* `dateStr`: Date string to parse
* `format`: Format string

### Return Type

`Chronos` - Parsed date

### Supported Tokens

* `YYYY`, `YY` - Year
* `MM`, `M` - Month
* `DD`, `D` - Day
* `HH`, `H` - Hour
* `mm`, `m` - Minute
* `ss`, `s` - Second

### Example

```ts
Chronos.parse('15-01-2025', 'DD-MM-YYYY'); // Jan 15 2025
```

---

## today()

### Signature

```typescript
static today(options?: FormatOptions): string
```

### Parameters

* `options`: Formatting options

```typescript
interface FormatOptions {
  format?: string;
  useUTC?: boolean;
}
```

### Return Type

`string` - Formatted current date

### Example

```ts
Chronos.today({format: 'YYYY-MM-DD'}); // "2025-07-20"
```

## yesterday()

### Signature

```typescript
static yesterday(): Chronos
```

### Return Type

`Chronos` - Yesterday's date

### Example

```ts
Chronos.yesterday(); // Chronos instance for yesterday
```

---

## tomorrow()

### Signature

```typescript
static tomorrow(): Chronos
```

### Return Type

`Chronos` - Tomorrow's date

### Example

```ts
Chronos.tomorrow(); // Chronos instance for tomorrow
```

---

## now()

### Signature

```typescript
static now(): number
```

### Return Type

`number` - Current timestamp

### Notes

* Same as `Date.now()`

### Example

```ts
Chronos.now(); // 1689876543210
```

---

## utc()

### Signature

```ts
static utc(dateLike?: ChronosInput): Chronos
```

### Parameters

* `dateLike` *(optional)* – The date input to create a UTC-based time. If omitted, the current system date and time is used.

### Return Type

`Chronos` — A new Chronos instance representing the UTC equivalent of the given (or current) date.

### Notes

* Creates a Chronos instance based on Coordinated Universal Time (UTC).
* If no `dateLike` (string/number/object) is provided, it uses the current date and time.
* This UTC instance is considered the **base time**, meaning all time zone conversions are derived from this reference point and not the local time.

:::info
Internally, this method adjusts the local time to its UTC equivalent by removing the time zone offset.
:::

### Example

```ts
// Using a specific date string
const utcChronos = Chronos.utc('2025-01-15T12:00:00');
// Using the current system time
const nowUTC = Chronos.utc();
```

---

## formatTimePart()

### Signature

 ```ts
static formatTimePart(time: string, format?: TimeParts): string

```

### Parameters

* `time`: Time string to be formatted.Supported formats include:

* `HH:mm` → e.g., `'14:50'`
* `HH:mm:ss` → e.g., `'14:50:00'`
* `HH:mm:ss.mss` → e.g., `'14:50:00.800'`
* `HH:mm+TimeZoneOffset(HH)` → e.g., `'14:50-06'`
* `HH:mm:ss+TimeZoneOffset(HH)` → e.g., `'14:50:00+06'`
* `HH:mm:ss.mss+TimeZoneOffset(HH)` → e.g., `'14:50:00.800-06'`
* `HH:mm+TimeZoneOffset(HH:mm)` → e.g., `'14:50+06:00'`
* `HH:mm:ss+TimeZoneOffset(HH:mm)` → e.g., `'14:50:00+05:30'`
* `HH:mm:ss.mss+TimeZoneOffset(HH:mm)` → e.g., `'14:50:00.800+06:30'`

:::caution
*If no offset is provided with time string, local (system) timezone will be used. The current date will be used as the base date for the time internally.*
:::

* `format`: Format string accepted by the `formatStrict()` method for `TimeParts`.
  **Default**: `'hh:mm:ss a'` → e.g., `"02:33:36 pm"`

### Return Type

`string` – Formatted time string in local system time.

### Example

 ```ts
Chronos.formatTimePart('14:50'); 
// "02:50:00 pm"

Chronos.formatTimePart('14:50:00.800+05:30', 'HH:mm:ss');
// "14:50:00"
```

---

## getDatesForDay()

### Signature

```typescript
// Relative range signature
static getDatesForDay(day: WeekDay, options?: RelativeRangeOptions): string[];

// Absolute range signature
static getDatesForDay(day: WeekDay, options?: DateRangeOptions): string[];

// Implementation signature
static getDatesForDay(day: WeekDay, options?: WeekdayOptions): string[]
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `day` | `WeekDay` | ✅ | - | Target weekday name (case-sensitive) |
| `span` | `number` | ❌ | 4 | Number of time units for relative range |
| `unit` | `TimeUnit` | ❌ | 'week' | Unit for relative range ('day'/'week'/'month'/'year') |
| `from` | `ChronosInput` | ❌ | Current date | Start date for absolute range |
| `to` | `ChronosInput` | ❌ | 4 weeks from now | End date for absolute range |
| `format` | `'local'\|'utc'` | ❌ | 'local' | Output format for ISO strings |
| `roundDate` | `boolean` | ❌ | false | Round dates to start of day |

#### Common Parameter

* `day`: The weekday to match (case-sensitive full day name)
  * Type: `WeekDay` (`'Monday' | 'Tuesday' | ... | 'Sunday'`)
  * Example: `'Wednesday'`, `'Friday'`

#### Options (Differ by Signature)

<Tabs>
<TabItem value="relative-options" label="Relative Range Options">

```typescript
interface RelativeRangeOptions {
  span?: number;    // Duration quantity (default: 4)
  unit?: TimeUnit;  // 'day' | 'week' | 'month' | 'year' (default: 'week')
  format?: 'local' | 'utc'; // Output format (default: 'local')
  roundDate?: boolean; // Round to start of day (default: false)
}
```

</TabItem>
<TabItem value="absolute-options" label="Absolute Range Options">

```typescript
interface DateRangeOptions {
  from?: ChronosInput; // Start date (default: now)
  to?: ChronosInput;   // End date (default: 4 weeks from now)
  format?: 'local' | 'utc'; // Output format (default: 'local')
  roundDate?: boolean; // Round to start of day (default: false)
}
```

</TabItem>
</Tabs>

### Return Type

`string[]` - Array of ISO-8601 formatted date strings

### Behavior

* Finds all occurrences of the specified weekday within:
  * A relative time span from now (when using `span`/`unit`)
  * Or between two fixed dates (when using `from`/`to`)
* Returns dates in chronological order
* Empty array if no matches found in range

### Examples

<Tabs>
<TabItem value="relative-example" label="Relative Range">

```ts
// Get rounded UTC Wednesdays for next month
Chronos.getDatesForDay('Wednesday', { 
  span: 1,
  unit: 'month',
  format: 'utc',
  roundDate: true
});
//=> ['2025-05-28T00:00:00.000Z', '2025-06-04T00:00:00.000Z', ...]
```

</TabItem>
<TabItem value="absolute-example" label="Absolute Range">

```ts
// Get local Fridays in Q3 2025 (rounded)
Chronos.getDatesForDay('Friday', {
  from: '2025-07-01',
  to: '2025-09-30',
  roundDate: true
});
//=> ['2025-07-04T00:00:00+06:00', '2025-07-11T00:00:00+06:00', ...]
```

</TabItem>
</Tabs>

### Notes

* When `format: 'local'` (default):
  * Output includes local timezone offset (e.g., `+06:00`)
  * Uses `toLocalISOString()` internally
* When `format: 'utc'`:
  * Output is in UTC/Zulu time (ends with `Z`)
  * Uses `toISOString()` internally
* The method always starts searching from:
  * Current date (for relative ranges)
  * The `from` date (for absolute ranges)
* Weekday names must exactly match: `'Monday'`, `'Tuesday'`, etc. (case-sensitive English day-names)
* When `roundDate: true`, all times are set to `00:00:00`
* Default range is `4 weeks` when no dates specified

:::tip Similar Instance Method

* [getDatesInRange](calculation#getdatesinrange)

:::

---

## min()

### Signature

```typescript
static min(...dates: ChronosInput[]): Chronos
```

### Parameters

* `dates`: Dates to compare

### Return Type

`Chronos` - Earliest date

### Example

```ts
Chronos.min('2025-01-01', '2025-02-01'); // Jan 1
```

---

## max()

### Signature

```typescript
static max(...dates: ChronosInput[]): Chronos
```

### Parameters

* `dates`: Dates to compare

### Return Type

`Chronos` - Latest date

### Example

```ts
Chronos.max('2025-01-01', '2025-02-01'); // Feb 1
```

---

## isLeapYear()

:::info

* A year is a leap year if it is divisible by 4.
* However, years divisible by 100 are not leap years **unless** they are also divisible by 400.
* For example:

  * `2000`, `2400` → leap years ✅
  * `1900`, `2100` → not leap years ❌s

:::

### Signature

```typescript
static isLeapYear(date: ChronosInput): boolean
```

### Parameters

* `date`: Date to check

### Return Type

`boolean` - Whether year is leap

### Example

```ts
Chronos.isLeapYear(2024); // true
```

---

## isValidDate()

### Signature

```typescript
static isValidDate(value: unknown): value is Date
```

### Parameters

* `value`: Value to check

### Return Type

`boolean` - Whether valid Date

### Example

```ts
Chronos.isValidDate(new Date()); // true
```

---

## isDateString()

### Signature

```typescript
static isDateString(value: unknown): value is string
```

### Parameters

* `value`: Value to check

### Return Type

`boolean` - Whether valid date string

### Example

```ts
Chronos.isDateString('2025-01-01'); // true
```

---

## isValidChronos()

### Signature

```typescript
static isValidChronos(value: unknown): value is Chronos
```

### Parameters

* `value`: Value to check

### Return Type

`boolean` - Whether Chronos instance

### Example

```ts
Chronos.isValidChronos(new Chronos()); // true
```
