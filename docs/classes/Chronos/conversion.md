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
