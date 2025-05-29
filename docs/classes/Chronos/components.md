---
id: components
title: Get & Set Methods
---

<!-- markdownlint-disable-file MD024 -->
## get()

### Signature

```typescript
get(unit: TimeUnit): number
```

### Parameters

- `unit`: Time unit to get

### Return Type

`number` - Component value

### Example

```javascript
new Chronos('2025-01-15').get('month'); // 0 (January)
```

---

## set()

### Signature

```typescript
set(unit: TimeUnit, value: number): Chronos
```

### Parameters

- `unit`: Time unit to set
- `value`: Value to set

### Return Type

`Chronos` - New instance with updated value

### Example

```javascript
new Chronos('2025-01-15').set('month', 5); // June 15
```

---

## startOf()

### Signature

```typescript
startOf(unit: TimeUnit, weekStartsOn?: Enumerate<7>): Chronos
```

### Parameters

- `unit`: Unit to start from
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`Chronos` - Start of period

### Example

```javascript
new Chronos('2025-01-15').startOf('month'); // Jan 1
```

---

## endOf()

### Signature

```typescript
endOf(unit: TimeUnit, weekStartsOn?: Enumerate<7>): Chronos
```

### Parameters

- `unit`: Unit to end at
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`Chronos` - End of period

### Example

```javascript
new Chronos('2025-01-15').endOf('month'); // Jan 31 23:59:59.999
```

---

## firstDayOfMonth()

### Signature

```typescript
firstDayOfMonth(): Chronos
```

### Return Type

`Chronos` - First day of month

### Example

```javascript
new Chronos('2025-01-15').firstDayOfMonth(); // Jan 1
```

---

## lastDayOfMonth()

### Signature

```typescript
lastDayOfMonth(): Chronos
```

### Return Type

`Chronos` - Last day of month

### Example

```javascript
new Chronos('2025-01-15').lastDayOfMonth(); // Jan 31
```

---

## getWeek()

### Signature

```typescript
getWeek(): NumberRange<1, 53>
```

### Return Type

`NumberRange<1, 53>` - ISO week number (1-53)

### Example

```javascript
new Chronos('2022-01-01').getWeek(); // 52 (previous year)
```

---

## setWeek()

### Signature

```typescript
setWeek(week: NumberRange<1, 53>): Chronos
```

### Parameters

- `week`: Week number to set (from `1-53`)

### Return Type

`Chronos` - Instance at start of week

### Example

```javascript
new Chronos('2025-01-01').setWeek(1); // Jan 2 (ISO week 1)
```

---

## getWeekOfYear()

### Signature

```typescript
getWeekOfYear(weekStartsOn?: number): NumberRange<1, 53>
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`NumberRange<1, 53>` - Week number (`1-53`)

### Example

```javascript
new Chronos('2025-01-01').getWeekOfYear(); // 1 (Sunday-start week)
```

---

## getWeekYear()

### Signature

```typescript
getWeekYear(weekStartsOn?: Enumerate<7>): number
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`number` - ISO week-numbering year

### Example

```javascript
new Chronos('2025-01-01').getWeekYear(); // 2022 (ISO year)
```

---

## getDayOfYear()

### Signature

```typescript
getDayOfYear(): NumberRange<1, 366>
```

### Return Type

`NumberRange<1, 366>` - Day of year (1-366)

### Example

```javascript
new Chronos('2025-01-01').getDayOfYear(); // 1
```

---

## getZodiacSign()

### Signature

```typescript
getZodiacSign(): ZodiacSign
```

### Return Type

`ZodiacSign` - Western zodiac sign

### Example

```javascript
new Chronos('2025-01-15').getZodiacSign(); // "Capricorn"
```

---

## daysInMonth()

### Signature

```typescript
daysInMonth(): NumberRange<28, 31>
```

### Return Type

`NumberRange<28, 31>` - Days in month (`28 | 29 | 30 | 31`)

### Example

```javascript
new Chronos('2025-02-01').daysInMonth(); // 28
```

---

## toObject()

### Signature

```typescript
toObject(): ChronosObject
```

### Return Type

`ChronosObject` - Date components

```typescript
interface ChronosObject {
  year: number;
  month: number;
  isoMonth: number;
  date: number;
  weekDay: number;
  isoWeekDay: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  timestamp: number;
  unix: number;
}
```

### Example

```javascript
new Chronos('2025-01-15').toObject();
// {year: 2025, month: 0, isoMonth: 1, ...}
```

---

## toArray()

### Signature

```typescript
toArray(): number[]
```

### Return Type

`number[]` - Date component values

### Example

```javascript
new Chronos('2025-01-15').toArray();
// [2025, 0, 1, 15, 0, 0, 0, 0, 0, 1673740800000, 1673740800]
```
