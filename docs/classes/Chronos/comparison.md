---
id: comparison
title: Comparison Methods
---

<!-- markdownlint-disable-file MD024 -->
> Relative Comparison Methods

## compare()

### Signature

```typescript
compare(unit: TimeUnit = 'minute', time?: ChronosInput): number
```

### Parameters

- `unit`: Time unit for comparison (default: 'minute')
- `time`: Optional comparison time (default: now)

### Return Type

`number` - Difference in specified units

### Notes

- Negative value indicates past time relative to comparison time
- Positive value indicates future time
- Wrapper around the various `getRelative*` methods

### Example

```javascript
const pastDate = new Chronos().subtract(2, 'days');
pastDate.compare('day'); // -2

const futureDate = new Chronos().add(3, 'hours'); 
futureDate.compare('hour'); // 3
```

---

## getRelativeYear()

### Signature

```typescript
getRelativeYear(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Full year difference

### Notes

- Counts complete years between dates
- Accounts for month/day position

### Example

```javascript
const date = new Chronos('2020-06-15');
date.getRelativeYear('2023-05-01'); // -2 (not quite 3 years)
date.getRelativeYear('2023-07-01'); // -3
```

---

## getRelativeMonth()

### Signature

```typescript
getRelativeMonth(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Full month difference

### Notes

- Counts complete months between dates
- Accounts for day position

### Example

```javascript
const date = new Chronos('2023-01-15');
date.getRelativeMonth('2023-03-10'); // -1 (not quite 2 months)
date.getRelativeMonth('2023-03-20'); // -2
```

---

## getRelativeDay()

### Signature

```typescript
getRelativeDay(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Day difference

### Special Values

- `-1`: Yesterday
- `0`: Today
- `1`: Tomorrow

### Example

```javascript
const today = new Chronos();
today.getRelativeDay(); // 0

const yesterday = new Chronos().subtract(1, 'day');
yesterday.getRelativeDay(); // -1

const tomorrow = new Chronos().add(1, 'day');
tomorrow.getRelativeDay(); // 1
```

---

## getRelativeWeek()

### Signature

```typescript
getRelativeWeek(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Week difference

### Notes

- Based on 7-day periods
- Uses same calculation as `getRelativeDay()` divided by 7

### Example

```javascript
new Chronos().getRelativeWeek('2023-01-01'); // Weeks between dates
```

---

## getRelativeHour()

### Signature

```typescript
getRelativeHour(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Hour difference

### Example

```javascript
const date = new Chronos().add(90, 'minutes');
date.getRelativeHour(); // 1 (full hours)
```

---

## getRelativeMinute()

### Signature

```typescript
getRelativeMinute(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Minute difference

### Example

```javascript
const date = new Chronos().add(150, 'seconds');
date.getRelativeMinute(); // 2 (full minutes)
```

---

## getRelativeSecond()

### Signature

```typescript
getRelativeSecond(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Second difference

### Example

```javascript
const date = new Chronos().add(1500, 'milliseconds');
date.getRelativeSecond(); // 1 (full seconds)
```

---

## getRelativeMilliSecond()

### Signature

```typescript
getRelativeMilliSecond(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Millisecond difference

### Notes

- Most precise relative comparison
- Returns raw millisecond delta

### Example

```javascript
const date = new Chronos().add(500, 'milliseconds');
date.getRelativeMilliSecond(); // 500
```

These relative comparison methods provide:

- Multiple granularities (years to milliseconds)
- Signed values indicating past/future
- Flexible comparison points
- Consistent immutable return types

The relative methods are particularly useful for:

- Age calculations
- Countdowns/timers
- Expiration checks
- Time-sensitive conditional logic
