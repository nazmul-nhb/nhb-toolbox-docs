---
id: conversion
title: Conversion Methods
---

<!-- markdownlint-disable-file MD024 -->
## toDate()

### Signature

```typescript
toDate(): Date
```

### Return Type

`Date` - Native Date object

### Notes

- Returns new Date instance

### Example

```javascript
new Chronos('2025-01-15').toDate(); // Date object
```

---

## toUTC()

### Signature

```typescript
toUTC(): Chronos
```

### Return Type

`Chronos` - UTC instance

### Example

```javascript
new Chronos('2025-01-15').toUTC(); // UTC-converted instance
```

---

## toLocal()

### Signature

```typescript
toLocal(): Chronos
```

### Return Type

`Chronos` - Local time instance

### Example

```javascript
Chronos.utc('2025-01-15').toLocal(); // Local time instance
```

---

## timeZone()

### Signature

```typescript
timeZone(zone: TimeZone | UTCOffSet): Chronos
```

### Parameters

- `zone`: Timezone identifier or offset

### Return Type

`Chronos` - Instance in specified timezone

### Example

```javascript
new Chronos('2025-01-15').timeZone('EST'); // Eastern Time instance
```

---

## getUTCOffset()

### Signature

```ts
getUTCOffset(): string
```

### Return Type

`string` — Offset string in the format `±HH:mm` (e.g., `+05:30`, `-06:00`)

### Description

Returns the **system’s current UTC offset** in string format.

:::caution[Note]
Unlike JavaScript's `Date.prototype.getTimezoneOffset()` which returns the offset in **minutes behind UTC** (positive for locations west of UTC), this method returns a human-readable offset using **time zone sign conventions** (e.g., `+06:00` means 6 hours ahead of UTC).
:::

### Example

```ts
new Chronos('2025-01-15').getUTCOffset(); // "-05:00" for EST
```

---

## getTimeZoneOffset()

### Signature

```ts
getTimeZoneOffset(): string
```

### Return Type

`string` — Offset string in the format `±HH:mm`

### Description

Returns the **offset string of this Chronos instance’s stored timezone**, regardless of the current system's timezone.

- Useful for working with date instances that were parsed with or set to a specific timezone.

:::info
Follows the same sign convention as `getUTCOffset()` — positive if ahead of UTC, negative if behind.
:::

### Example

```ts
new Chronos().timeZone('IST-IN').getTimeZoneOffset(); // "+05:30"
```

---

## getUTCOffsetMinutes()

### Signature

```ts
getUTCOffsetMinutes(): number
```

### Return Type

`number` — The offset in minutes

### Description

Returns the **system’s UTC offset in minutes**, but using a **flipped sign convention** from JavaScript's native API:

- Returns a **positive value** if the local time is ahead of UTC.
- Returns a **negative value** if behind UTC.

:::tip[Note]
🧠 This matches the intuitive reading of `+06:00 → 360`, `-05:30 → -330`, unlike `Date.prototype.getTimezoneOffset()` which reverses this.
:::

### Example

```ts
new Chronos().getUTCOffsetMinutes(); // 360 for UTC+06:00
```

---

## getTimeZoneOffsetMinutes()

### Signature

```ts
getTimeZoneOffsetMinutes(): number
```

### Return Type

`number` — The offset in minutes

### Description

Returns the **offset of the current Chronos instance's timezone in minutes**, based on the internally stored offset string (e.g., `UTC+06:00` → `360`).

- Independent of system timezone
- Matches the `±HH:mm` sign convention

:::note
Used internally for calculating UTC equivalence, especially when converting between time zones.
:::

### Example

```ts
new Chronos().timeZone('IST-IN').getTimeZoneOffsetMinutes(); // 330
```

---

## day()

Get the name of a weekday

### Signature

```ts
day(index?: Enumerate<7>): WeekDay
```

### Parameter

- `index` *(optional)*: A number from `0` to `6` representing the day of the week, where `0` is Sunday and `6` is Saturday. If omitted, it defaults to the current day from the `Chronos` instance.

### Return Value

- `WeekDay` — The full name of the corresponding weekday (`"Sunday"`, `"Monday"`, ..., `"Saturday"`).

### Example Usage

```ts
new Chronos('2025-05-29').day(); // "Thursday"
new Chronos().day(0);            // "Sunday"
```

:::note

- This method supports overriding the current day with a specific index.
- Internally, it maps indices `0–6` to the English names of the weekdays.

:::

---

## monthName()

Get the name of a month

### Signature

```ts
monthName(index?: Enumerate<12>): MonthName
```

### Parameters

- `index` *(optional)*: A number from `0` to `11` representing the month, where `0` is January and `11` is December. If omitted, it defaults to the current month from the `Chronos` instance.

### Return Value

- `MonthName` — The full name of the month (`"January"`, `"February"`, ..., `"December"`).

### Example Usage

```ts
new Chronos('2025-05-29').monthName(); // "May"
new Chronos().monthName(11);           // "December"
```

:::note

- This method supports overriding the current month with a specific index.
- Internally, it maps indices `0–11` to the English names of the months.

:::
