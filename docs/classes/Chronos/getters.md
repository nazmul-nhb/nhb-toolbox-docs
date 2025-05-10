---
id: getters
title: Getter Methods
---

<!-- markdownlint-disable-file MD024 -->
## year

### Signature

```typescript
get year(): number
```

### Return Type

`number` - Full year (e.g., 2025)

### Notes

- Returns the full 4-digit year
- Uses local time unless instance is UTC-based

### Example

```javascript
new Chronos('2025-01-01').year; // 2025
```

## month

### Signature

```typescript
get month(): number
```

### Return Type

`number` - Month (0-11)

### Notes

- 0 = January, 11 = December
- Consistent with JavaScript Date behavior

### Example

```javascript
new Chronos('2025-01-01').month; // 0 (January)
```

## date

### Signature

```typescript
get date(): number
```

### Return Type

`number` - Day of month (1-31)

### Example

```javascript
new Chronos('2025-01-15').date; // 15
```

## hour

### Signature

```typescript
get hour(): number
```

### Return Type

`number` - Hour (0-23)

### Example

```javascript
new Chronos('2025-01-01T14:30:00').hour; // 14
```

## minute

### Signature

```typescript
get minute(): number
```

### Return Type

`number` - Minute (0-59)

### Example

```javascript
new Chronos('2025-01-01T14:30:00').minute; // 30
```

## second

### Signature

```typescript
get second(): number
```

### Return Type

`number` - Second (0-59)

### Example

```javascript
new Chronos('2025-01-01T14:30:45').second; // 45
```

## millisecond

### Signature

```typescript
get millisecond(): number
```

### Return Type

`number` - Millisecond (0-999)

### Example

```javascript
new Chronos('2025-01-01T14:30:45.123').millisecond; // 123
```

## weekDay

### Signature

```typescript
get weekDay(): number
```

### Return Type

`number` - Day of week (0-6)

### Notes

- 0 = Sunday, 6 = Saturday

### Example

```javascript
new Chronos('2025-01-01').weekDay; // 0 (Sunday)
```

## isoWeekday

### Signature

```typescript
get isoWeekday(): number
```

### Return Type

`number` - ISO day of week (1-7)

### Notes

- 1 = Monday, 7 = Sunday

### Example

```javascript
new Chronos('2025-01-01').isoWeekday; // 7 (Sunday)
```

## isoMonth

### Signature

```typescript
get isoMonth(): number
```

### Return Type

`number` - Month (1-12)

### Notes

- 1 = January, 12 = December

### Example

```javascript
new Chronos('2025-01-01').isoMonth; // 1
```

## unix

### Signature

```typescript
get unix(): number
```

### Return Type

`number` - Unix timestamp in seconds

### Example

```javascript
new Chronos('2025-01-01').unix; // 1672531200
```

## timestamp

### Signature

```typescript
get timestamp(): number
```

### Return Type

`number` - Milliseconds since epoch

### Example

```javascript
new Chronos('2025-01-01').timestamp; // 1672531200000
```

## lastDateOfMonth

### Signature

```typescript
get lastDateOfMonth(): 28 | 29 | 30 | 31
```

### Return Type

`28 | 29 | 30 | 31` - Last day of month

### Notes

- Accounts for leap years

### Example

```javascript
new Chronos('2025-02-01').lastDateOfMonth; // 28
new Chronos('2024-02-01').lastDateOfMonth; // 29
```

---
