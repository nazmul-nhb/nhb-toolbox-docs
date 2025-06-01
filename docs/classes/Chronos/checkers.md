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

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`boolean` - Whether date is before

### Example

```javascript
new Chronos('2025-01-01').isBefore('2025-02-01'); // true
```

---

## isAfter()

### Signature

```typescript
isAfter(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`boolean` - Whether date is after

### Example

```javascript
new Chronos('2025-02-01').isAfter('2025-01-01'); // true
```

---

## isSame()

### Signature

```typescript
isSame(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: Enumerate<7>): boolean
```

### Parameters

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`boolean` - Whether dates match

### Example

```javascript
new Chronos('2025-01-15').isSame('2025-01-15', 'day'); // true
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

- `start`: Range start
- `end`: Range end
- `inclusive`: Range inclusivity (default: '()')

### Return Type

`boolean` - Whether date is in range

### Example

```javascript
new Chronos('2025-01-15').isBetween('2025-01-01', '2025-01-31'); // true
```

---

## isToday()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isToday()`. Once registered, all Chronos instances will have access to the `.isToday()` method.
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
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isTomorrow()`. Once registered, all Chronos instances will have access to the `.isTomorrow()` method.
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
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.isYesterday()`. Once registered, all Chronos instances will have access to the `.isYesterday()` method.
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
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isWeekend()`. Once registered, all Chronos instances will have access to the `.isWeekend()` method.
:::

### Signature

```typescript
isWeekend(weekStartsOn?: Enumerate<7>, weekendLength?: 1 | 2): boolean
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)
- `weekendLength`: Weekend days (default: 2)

### Return Type

`boolean` - Whether weekend

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-15').isWeekend(); // true (Sunday)
```

---

## isWorkday()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isWorkday()`. Once registered, all Chronos instances will have access to the `.isWorkday()` method.
:::

### Signature

```typescript
isWorkday(weekStartsOn?: Enumerate<7>, weekendLength?: 1 | 2): boolean
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)
- `weekendLength`: Weekend days (default: 2)

### Return Type

`boolean` - Whether workday

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-16').isWorkday(); // true (Monday)
```

---

## isBusinessHour()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.isBusinessHour()`. Once registered, all Chronos instances will have access to the `.isBusinessHour()` method.
:::

### Signature

```ts
isBusinessHour(options?: BusinessHourOptions): boolean
```

### Parameters

- `options`:Options to configure business hour

#### Options Type Definitions

```ts
interface BusinessHourOptions {
 /** - Optional starting hour of business time (0–23). Defaults to `9` (9 AM). */
 businessStartHour?: Enumerate<24>;
 /**- Optional ending hour of business time (0–23). Defaults to `17` (5 PM). */
 businessEndHour?: Enumerate<24>;
 /** - Optional day the week starts on (0–6). Default is `0` (Sunday). */
 weekStartsOn?: Enumerate<7>;
 /**- Optional weekend length (1 or 2). Default is `2`.*/
 weekendLength?: 1 | 2;
}
```

### Return Type

`boolean` - Whether business hour

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-16T10:00:00').isBusinessHour(); // true
```

---

## isPalindromeDate()

:::danger[Note]
This method is provided by `palindromePlugin`. You must register it using `Chronos.use(palindromePlugin)` before calling `.isPalindromeDate()`. Once registered, all Chronos instances will have access to the `.isPalindromeDate()` method.
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

`boolean` - Whether daylight saving time

### Notes

- Uses system timezone

### Example

```javascript
new Chronos('2025-07-01').isDST(); // true (in northern hemisphere)
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

```javascript
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

```javascript
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
