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

:::danger[Note]
This method is provided by `timeZonePlugin`. You must register it using `Chronos.use(timeZonePlugin)` before calling `.timeZone()`. Once registered, all Chronos instances will have access to the `.timeZone()` method.
:::

### Signature

```typescript
timeZone(zone: TimeZone | UTCOffSet): Chronos
```

### Parameters

- `zone`: Timezone identifier or offset

### Return Type

`Chronos` - Instance in specified timezone

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';

Chronos.use(timeZonePlugin);

new Chronos('2025-01-15').timeZone('EST'); // Eastern Time instance
new Chronos('2025-01-15').timeZone('UTC+08:00'); // 8 hours ahead of UTC/GMT
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
