---
id: extras
title: Extra Time Information
---

<!-- markdownlint-disable-file MD024 -->

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

## toAcademicYear()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.toAcademicYear()`. Once registered, all Chronos instances will have access to the `.toAcademicYear()` method.
:::

### Signature

```typescript
toAcademicYear(): `${number}-${number}`
```

### Return Type

`string` - Academic year string

### Notes

- Assumes academic year runs July-June

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-15').toAcademicYear(); // "2022-2025"
new Chronos('2025-08-15').toAcademicYear(); // "2025-2024"
```

---

## toQuarter()

### Signature

```typescript
toQuarter(): Quarter
```

### Return Type

`Quarter` - Calendar quarter (1-4)

### Notes

- Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec

### Example

```javascript
new Chronos('2025-01-15').toQuarter(); // 1
new Chronos('2025-04-01').toQuarter(); // 2
```

---

## toFiscalQuarter()

:::danger[Note]
This method is provided by `businessPlugin`. You must register it using `Chronos.use(businessPlugin)` before calling `.toFiscalQuarter()`. Once registered, all Chronos instances will have access to the `.toFiscalQuarter()` method.
:::

### Signature

```typescript
toFiscalQuarter(startMonth?: NumberRange<1, 12>): Quarter
```

### Parameters

- `startMonth`: Fiscal year start month (1-12, default: 7)

### Return Type

`Quarter` - Fiscal quarter (1-4)

### Notes

- Default assumes fiscal year starts in July

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { businessPlugin } from 'nhb-toolbox/plugins/businessPlugin';

Chronos.use(businessPlugin);

new Chronos('2025-01-15').toFiscalQuarter(); // 3 (July-start year)
new Chronos('2025-01-15').toFiscalQuarter(10); // 2 (October-start year)
```
