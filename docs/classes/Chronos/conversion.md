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

## getUTCOffset()

### Signature

```typescript
getUTCOffset(): string
```

### Return Type

`string` - Offset string (e.g. "+05:30")

### Example

```javascript
new Chronos('2025-01-15').getUTCOffset(); // "-05:00" (EST)
```
