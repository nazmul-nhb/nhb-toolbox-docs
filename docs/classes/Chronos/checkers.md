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

### Signature

```typescript
isToday(): boolean
```

### Return Type

`boolean` - Whether date is today

### Example

```javascript
new Chronos().isToday(); // true
```

---

## isYesterday()

### Signature

```typescript
isYesterday(): boolean
```

### Return Type

`boolean` - Whether date is yesterday

### Example

```javascript
new Chronos().subtract(1, 'day').isYesterday(); // true
```

---

## isTomorrow()

### Signature

```typescript
isTomorrow(): boolean
```

### Return Type

`boolean` - Whether date is tomorrow

### Example

```javascript
new Chronos().add(1, 'day').isTomorrow(); // true
```

---

## isWeekend()

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

```javascript
new Chronos('2025-01-15').isWeekend(); // true (Sunday)
```

---

## isWorkday()

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

```javascript
new Chronos('2025-01-16').isWorkday(); // true (Monday)
```

---

## isBusinessHour()

### Signature

```typescript
isBusinessHour(
  businessStartHour?: Enumerate<24>,
  businessEndHour?: Enumerate<24>,
  weekStartsOn?: Enumerate<7>,
  weekendLength?: 1 | 2
): boolean
```

### Parameters

- `businessStartHour`: Start hour (from `0-23`) (default: 9)
- `businessEndHour`: End hour (from `0-23`) (default: 17)
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)
- `weekendLength`: Weekend days (default: 2)

### Return Type

`boolean` - Whether business hour

### Example

```javascript
new Chronos('2025-01-16T10:00:00').isBusinessHour(); // true
```

---

## isPalindromeDate()

### Signature

```typescript
isPalindromeDate(shortYear?: boolean): boolean
```

### Parameters

- `shortYear`: Use 2-digit year (default: false)

### Return Type

`boolean` - Whether palindrome date

### Example

```javascript
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
