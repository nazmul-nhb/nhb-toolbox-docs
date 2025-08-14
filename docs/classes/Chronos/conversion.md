---
id: conversion
title: Conversion Methods
---

<!-- markdownlint-disable-file MD024 -->

## clone()

### Signature

```ts
clone(): Chronos
```

### Return Type

`Chronos` - New independent instance with identical date value

### Behavior & Notes

- Creates a new instance with the same timestamp as the original
- Preserves the original's internal metadata (origin tracking)
- While Chronos is immutable, cloning is still useful for:
  - Maintaining separate metadata histories
  - Explicitly creating new instances for semantic clarity
  - Working with libraries/frameworks that check object identity

### Example

```typescript
const original = new Chronos('2025-01-15T12:00:00');
const copy = original.clone();

console.log(original.isSame(copy)); // true (same timestamp)
console.log(original === copy);     // false (different instances)

// With immutable operations:
const modified = original.add(1, 'day');
console.log(original.format());  // "Wed, Jan 15, 2025 12:00:00"
console.log(modified.format());  // "Thu, Jan 16, 2025 12:00:00"
```

### Key Use Cases

- **Metadata Preservation**

```ts
const base = new Chronos('2025-01-01');
const modified = base.clone().subtract(3, 'days');

// Track different origins while maintaining immutability
console.log(base.origin);     // "constructor" 
console.log(modified.origin); // "clone"
```

### Comparison with Alternatives

| Approach         | Instance Identity | Preserves Metadata | Performance          |
| ---------------- | ----------------- | ------------------ | -------------------- |
| `clone()`        | New instance      | ✅ Yes             | ⚠️ Slight overhead  |
| `new Chronos()`  | New instance      | ❌ No              | ⚠️ Slight overhead  |
| Direct reference | Same instance     | ✅ Yes             | ✅ Best             |

:::tip
Use `clone()` when you need:

- Explicit control over instance creation
- To preserve metadata history
- Clear code semantics around date derivation

:::

:::note
While `Chronos's` immutability makes cloning less critical for safety, it remains valuable for:

- Tracking different origin points in complex date pipelines
- Integration with systems that care about object identity
- Making derivation operations more explicit in code

:::

---

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
toArray(): TupleOf<number, 12>
```

### Return Type

`TupleOf<number, 12>` - Date component values as array (tuple) of numbers (12 elements, the values of `ChronosObject` from [toObject](#toobject) method)

### Example

```javascript
new Chronos('2025-01-15').toArray();
// [ 2025, 0, 1, 15, 3, 3, 6, 0, 0, 0, 1736899200000, 1736899200 ]
```
