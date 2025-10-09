---
id: checkers
title: Checker Methods
---

<!-- markdownlint-disable-file MD024 -->
## isBefore()

### Signature

```typescript
isBefore(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)
- `unit`: (Optional) The granularity for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')
- `weekStartsOn`: (Optional) Which day (0-6, Sunday-Saturday) to consider as the start of the week (default: `0`/Sunday)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is before the comparison date

### Example

```ts
// Compare entire dates
new Chronos('2025-01-01').isBefore('2025-02-01'); // true

// Compare just the months
new Chronos('2025-01-15').isBefore('2025-02-01', 'month'); // true
```

---

## isAfter()

### Signature

```typescript
isAfter(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)
- `unit`: (Optional) The granularity for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')
- `weekStartsOn`: (Optional) Which day (0-6, Sunday-Saturday) to consider as the start of the week (default: `0`/Sunday)

### Return Type

`boolean` - Returns `true` if the current date occurs after the comparison date

### Example

```ts
// Basic date comparison
new Chronos('2025-02-01').isAfter('2025-01-01'); // true

// Compare specific units
new Chronos('2025-01-15T12:00:00').isAfter('2025-01-15T10:00:00', 'hour'); // true
```

---

## isSame()

### Signature

```typescript
isSame(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)
- `unit`: (Optional) The granularity for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')
- `weekStartsOn`: (Optional) Which day (0-6, Sunday-Saturday) to consider as the start of the week (default: `0`/Sunday)

### Return Type

`boolean` - Returns `true` if dates match at the specified precision level

### Example

```ts
// Exact match
new Chronos('2025-01-15').isSame('2025-01-15'); // true

// Same month but different days
new Chronos('2025-01-15').isSame('2025-01-20', 'month'); // true
new Chronos('2025-01-15').isSame('2025-01-20', 'day'); // false
```

---

## isSameOrBefore()

### Signature

```typescript
isSameOrBefore(other: ChronosInput, unit: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)
- `unit`: The granularity for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')
- `weekStartsOn`: (Optional) Which day (0-6, Sunday-Saturday) to consider as the start of the week (default: `0`/Sunday)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is either:

- Exactly equal to the comparison date at the specified unit level, OR
- Occurs before the comparison date at the specified unit level

### Example

```ts
// Same month
new Chronos('2025-01-15').isSameOrBefore('2025-01-20', 'month'); // true

// Earlier month
new Chronos('2025-01-15').isSameOrBefore('2025-02-01', 'month'); // true

// Later month
new Chronos('2025-02-15').isSameOrBefore('2025-01-20', 'month'); // false
```

---

## isSameOrAfter()

### Signature

```typescript
isSameOrAfter(other: ChronosInput, unit: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)
- `unit`: The granularity for comparison ('year', 'month', 'week', 'day', 'hour', 'minute', 'second')
- `weekStartsOn`: (Optional) Which day (0-6, Sunday-Saturday) to consider as the start of the week (default: `0`/Sunday)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is either:

- Exactly equal to the comparison date at the specified unit level, OR
- Occurs after the comparison date at the specified unit level

### Example

```ts
// Same month
new Chronos('2025-01-20').isSameOrAfter('2025-01-15', 'month'); // true

// Later month
new Chronos('2025-02-01').isSameOrAfter('2025-01-15', 'month'); // true

// Earlier month
new Chronos('2025-01-01').isSameOrAfter('2025-02-15', 'month'); // false
```

---

## isBetween()

### Signature

```typescript
isBetween(
  start: ChronosInput,
  end: ChronosInput,
  inclusive?: '[]' | '[)' | '(]' | '()'
): boolean
```

### Parameters

- `start`: Start of date range
- `end`: End of date range
- `inclusive`: (Optional) Range boundary inclusion:
  - `[]`: Include both start and end
  - `[)` Include start, exclude end
  - `(]`: Exclude start, include end
  - `()`: Exclude both boundaries (default)

### Return Type

`boolean` - Returns `true` if the date falls within the specified range

### Example

```ts
const date = new Chronos('2025-01-15');

// Default exclusive end
date.isBetween('2025-01-01', '2025-01-31'); // true

// Inclusive range
date.isBetween('2025-01-15', '2025-01-20', '[]'); // true

// Exclusive range
date.isBetween('2025-01-01', '2025-01-15', '()'); // false
```

---

## isEqual()

### Signature

```typescript
isEqual(other: ChronosInput): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is exactly equal to the comparison date (including time components)

### Example

```ts
// Exact timestamp match
const date1 = new Chronos('2025-01-01T12:00:00');
const date2 = new Chronos('2025-01-01T12:00:00');
date1.isEqual(date2); // true

// Different time components
new Chronos('2025-01-01T12:00:00').isEqual('2025-01-01T12:00:01'); // false
```

---

## isEqualOrBefore()

### Signature

```typescript
isEqualOrBefore(other: ChronosInput): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is either:

- Exactly equal to the comparison date, OR
- Occurs before the comparison date

### Example

```ts
// Equal dates
new Chronos('2025-01-15').isEqualOrBefore('2025-01-15'); // true

// Earlier date
new Chronos('2025-01-10').isEqualOrBefore('2025-01-15'); // true

// Later date
new Chronos('2025-01-20').isEqualOrBefore('2025-01-15'); // false
```

---

## isEqualOrAfter()

### Signature

```typescript
isEqualOrAfter(other: ChronosInput): boolean
```

### Parameters

- `other`: The date to compare against (can be string, Date, or `Chronos` instance)

### Return Type

`boolean` - Returns `true` if the current `Chronos` date is either:

- Exactly equal to the comparison date, OR
- Occurs after the comparison date

### Example

```ts
// Equal dates
new Chronos('2025-01-15').isEqualOrAfter('2025-01-15'); // true

// Later date
new Chronos('2025-01-20').isEqualOrAfter('2025-01-15'); // true

// Earlier date
new Chronos('2025-01-10').isEqualOrAfter('2025-01-15'); // false
```

---

## isToday()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isToday()`. Once registered, all `Chronos` instances will have access to the `.isToday()` method.
:::

### Signature

```typescript
isToday(): boolean
```

### Return Type

`boolean` - Whether date is today

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

new Chronos().isToday(); // true
```

---

## isTomorrow()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isTomorrow()`. Once registered, all `Chronos` instances will have access to the `.isTomorrow()` method.
:::

### Signature

```typescript
isTomorrow(): boolean
```

### Return Type

`boolean` - Whether date is tomorrow

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

new Chronos().add(1, 'day').isTomorrow(); // true
```

---

## isYesterday()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isYesterday()`. Once registered, all `Chronos` instances will have access to the `.isYesterday()` method.
:::

### Signature

```typescript
isYesterday(): boolean
```

### Return Type

`boolean` - Whether date is yesterday

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

new Chronos().subtract(1, 'day').isYesterday(); // true
```

---

## isWeekend()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isWeekend()`. Once registered, all `Chronos` instances will have access to the `.isWeekend()` method.
:::

### Signatures

```typescript
isWeekend(weekStartsOn?: Enumerate<7>, weekendLength?: NumberRange<1, 4>): boolean;

isWeekend(weekendDays: RangeTuple<Enumerate<7>, 1, 4>): boolean;
```

### Parameters

- By default (`weekStartsOn = 0`, `weekendLength = 2`), Saturday (6) and Friday (5) are considered weekend.
  - `weekStartsOn` sets the start of the week for calculating weekend days.
  - `weekendLength` sets how many days at the end of the week are treated as weekend.
  - `weekendDays` is used directly as the weekend days instead of calculating from `weekStartsOn` + `weekendLength`.

### Return Type

`boolean` - Whether weekend (`true`) or not (`false`)

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-11').isWeekend(); // true (Saturday)

// Default: Saturday & Friday are weekend
new Chronos().isWeekend();

// Custom week start (Monday) with 2-day weekend (Saturday & Sunday)
new Chronos().isWeekend(1, 2);

// Custom 3-day weekend (Friday–Sunday)
new Chronos().isWeekend(1, 3);

// Fully custom weekend days (Sunday, Friday, Saturday)
new Chronos().isWeekend([0, 5, 6]);
```

---

## isWorkday()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isWorkday()`. Once registered, all `Chronos` instances will have access to the `.isWorkday()` method.
:::

### Signatures

```typescript
isWorkday(weekStartsOn?: Enumerate<7>, weekendLength?: NumberRange<1, 4>): boolean;

isWorkday(weekendDays: RangeTuple<Enumerate<7>, 1, 4>): boolean;
```

### Parameters

- By default (`weekStartsOn = 0`, `weekendLength = 2`), Saturday (6) and Friday (5) are considered weekend.
  - `weekStartsOn` sets the start of the week for calculating weekend days.
  - `weekendLength` sets how many days at the end of the week are treated as weekend.
  - `weekendDays` is used directly as the weekend days instead of calculating from `weekStartsOn` + `weekendLength`.

### Return Type

`boolean` - Whether workday (`true`) or not (`false`)

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-16').isWorkday(); // true (Thursday)
```

:::tip[Hint]
This method internally uses [**isWeekend**](#isweekend) method.
:::
---

## isBusinessHour()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isBusinessHour()`. Once registered, all `Chronos` instances will have access to the `.isBusinessHour()` method.
:::

### Signatures

```ts
isBusinessHour(options?: BusinessOptionsBasic): boolean;

isBusinessHour(options?: BusinessOptionsWeekends): boolean;
```

### Parameters

- `options`: Options to configure business hour

#### Options Type Definitions

```ts
interface $BusinessHourBaseOptions {
 /** - Optional starting hour of business time (0–23). Defaults to `9` (9 AM). */
 businessStartHour?: Enumerate<24>;
 /** - Optional ending hour of business time (0–23). Defaults to `17` (5 PM). */
 businessEndHour?: Enumerate<24>;
}

/** Options for configuring business hour with `weekStartsOn` and `weekendLength` */
interface BusinessOptionsBasic extends $BusinessHourBaseOptions {
 /** - Optional day the week starts on (0–6). Default is `0` (Sunday). */
 weekStartsOn?: Enumerate<7> | undefined;
 /** - Optional weekend length (1-4). Default is `2`.*/
 weekendLength?: NumberRange<1, 4> | undefined;
}

/** Options for configuring business hour with `weekendDays` tuple */
interface BusinessOptionsWeekends extends $BusinessHourBaseOptions {
 /** - Tuple of indices (0-6) of weekend days. Can pass only 1-4 elements. Default is `undefined`. */
 weekendDays?: RangeTuple<Enumerate<7>, 1, 4> | undefined;
}
```

### Return Type

`boolean` - Whether business hour (`true`) or not (`false`)

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-16T10:00:00').isBusinessHour(); // true

new Chronos().isBusinessHour({ weekendDays: [0, 2, 4] });

// Or

new Chronos().isBusinessHour({ weekendLength: 3 });
```

:::

:::tip[Note]
Weekends are determined by `weekStartsOn` and `weekendLength` or `weekdays` array if provided using the [**isWeekend**](#isweekend) method.
:::

---

## isPalindromeDate()

:::danger[Note]
This method is provided by `palindromePlugin`. You must register it using `Chronos.use(palindromePlugin)` before calling `.isPalindromeDate()`. Once registered, all `Chronos` instances will have access to the `.isPalindromeDate()` method.
:::

### Signature

```typescript
isPalindromeDate(shortYear?: boolean): boolean
```

### Parameters

- `shortYear`: Use 2-digit year (default: false)

### Return Type

`boolean` - Whether palindrome date

### Example

```ts
import { palindromePlugin } from 'nhb-toolbox/plugins/palindromePlugin';

Chronos.use(palindromePlugin);

new Chronos('2020-02-02').isPalindromeDate(); // true
```

---

## isDST()

### Signature

```typescript
isDST(): boolean
```

### Return Type

`boolean` - Returns `true` if the date is in Daylight Saving Time for the current timezone

:::info Note

- Detection is based on the system's timezone settings
- Only accurate for timezones that observe DST
:::

### Example

```ts
// Northern hemisphere summer
new Chronos('2025-07-01').isDST(); // true

// Northern hemisphere winter
new Chronos('2025-01-01').isDST(); // false
```

---

## isFirstDayOfMonth()

### Signature

```typescript
isFirstDayOfMonth(): boolean
```

### Return Type

`boolean` - Whether first day

### Example

```ts
new Chronos('2025-01-01').isFirstDayOfMonth(); // true
```

---

## isLastDayOfMonth()

### Signature

```typescript
isLastDayOfMonth(): boolean
```

### Return Type

`boolean` - Whether last day

### Example

```ts
new Chronos('2025-01-31').isLastDayOfMonth(); // true
```

---

## isLeapYear()

:::info

- A year is a leap year if it is divisible by 4.
- However, years divisible by 100 are not leap years **unless** they are also divisible by 400.
- For example:

  - `2000`, `2400` → leap years ✅
  - `1900`, `2100` → not leap years ❌

:::

### Signature

```typescript
isLeapYear(year?: number): boolean
```

### Parameters

 `year` *(optional)*: The year to check. If omitted, the method uses the year from the current `Chronos` instance.

### Return Value

 `boolean` — Returns `true` if the year is a leap year, otherwise `false`.

### **Example Usage**

```ts
new Chronos().isLeapYear(2024); // true
new Chronos('2025-05-29').isLeapYear(); // false
```
