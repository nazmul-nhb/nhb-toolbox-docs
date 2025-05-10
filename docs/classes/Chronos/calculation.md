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

## round()

### Signature

```typescript
round(unit: TimeUnit, nearest?: number): Chronos
```

### Parameters

- `unit`: Unit to round to
- `nearest`: Nearest multiple (default: 1)

### Return Type

`Chronos` - Rounded date

### Example

```javascript
new Chronos('2025-01-15T14:35:30').round('hour'); // 2025-01-15T15:00:00
new Chronos('2025-01-15T14:35:30').round('minute', 15); // 2025-01-15T14:30:00
```
