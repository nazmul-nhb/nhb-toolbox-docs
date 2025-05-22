---
id: calculation
title: Calculation Methods
---

<!-- markdownlint-disable-file MD024 -->
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

## duration()

### Signature

```typescript
duration(toTime?: ChronosInput, absolute?: boolean): TimeDuration
```

### Parameters

- `toTime`: End date (default: now)
- `absolute`: Return absolute values (default: true)

### Return Type

`TimeDuration` - Object with breakdown

```typescript
interface TimeDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
```

### Example

```javascript
new Chronos('2020-01-01').duration('2025-01-01');
// {years: 3, months: 0, days: 0, ...}
```

---

## round()

### Signature

```ts
round(unit: TimeUnit, nearest?: number): Chronos
```

### Parameters

- `unit`: The time unit to round to. Valid units: `'year'`, `'month'`, `'week'`, `'day'`, `'hour'`, `'minute'`, `'second'`, `'millisecond'`.
- `nearest` *(optional)*: The nearest multiple to round to. Defaults to `1`.

### Return Type

`Chronos` – Returns a new `Chronos` instance rounded to the nearest point based on the specified unit and granularity. If an invalid unit is passed, the original instance is returned.

### Example

```ts
new Chronos('2025-01-15T14:35:30').round('hour');        // 2025-01-15T15:00:00
new Chronos('2025-01-15T14:35:30').round('minute', 15);  // 2025-01-15T14:30:00
```

### Behavior & Notes

- Rounding is based on the **proximity to the start or end** of the specified time unit.
- `nearest` defines the multiple to round to (e.g., 15-minute intervals).
- Rounding applies fractional logic based on how far into the unit the date is.

#### Unit-specific Notes

- **`millisecond` / `second` / `minute` / `hour` / `day`**: Uses sub-unit fractions (e.g., seconds from minutes) for precise rounding.
- **month**: Rounding is based on how far into the month the date is (e.g., the 15th of May is halfway through). If the date is past the midpoint of the month, it rounds forward; otherwise, it rounds back. Internally, month indices are 0-based, but the resulting date is standard ISO-formatted.
- **`year`**: Considers day-of-year progress relative to leap years.
- **`week`**:
  - Uses ISO 8601 convention: **weeks start on Monday**.
  - Rounding is determined by comparing the current date to:
    - The **start of the current week** (Monday at 00:00),
    - The **start of the next week** (the following Monday at 00:00).
  - If the current date is **closer to the next Monday**, it rounds forward.
  - Otherwise, it rounds back to the previous (or same) Monday.
  - Rounded weeks are treated as **0-indexed** relative to the year.
