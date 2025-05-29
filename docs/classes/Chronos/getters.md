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

---

## month

### Signature

```typescript
get month(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
```

### Return Type

`0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11` - Month (0-11)

### Notes

- 0 = January, 11 = December
- Consistent with JavaScript Date behavior

### Example

```javascript
new Chronos('2025-01-01').month; // 0 (January)
```

---

## date

### Signature

```typescript
get date(): NumberRange<1, 31>
```

### Return Type

`NumberRange<1, 31>` - Day of month (1-31)

### Example

```javascript
new Chronos('2025-01-15').date; // 15
```

---

## hour

### Signature

```typescript
get hour(): 0 | 1 | 2 | 3 | 4 | 5 | ... | 23
```

### Return Type

`0 | 1 | 2 | 3 | 4 | 5 | ... | 23` - Hour (0-23)

### Example

```javascript
new Chronos('2025-01-01T14:30:00').hour; // 14
```

---

## minute

### Signature

```typescript
get minute(): 0 | 1 | 2 | 3 | 4 | 5 | ... | 59
```

### Return Type

`0 | 1 | 2 | 3 | 4 | 5 | ... | 59` - Minute (0-59)

### Example

```javascript
new Chronos('2025-01-01T14:30:00').minute; // 30
```

---

## second

### Signature

```typescript
get second(): 0 | 1 | 2 | 3 | 4 | 5 | ... | 59
```

### Return Type

`0 | 1 | 2 | 3 | 4 | 5 | ... | 59` - Second (0-59)

### Example

```javascript
new Chronos('2025-01-01T14:30:45').second; // 45
```

---

## millisecond

### Signature

```typescript
get millisecond(): MilliSecond
```

### Return Type

`MilliSecond` - Millisecond (0-999)

### Example

```javascript
new Chronos('2025-01-01T14:30:45.123').millisecond; // 123
```

---

## weekDay

### Signature

```typescript
get weekDay(): 0 | 1 | 2 | 3 | 4 | 5 | 6
```

### Return Type

`0 | 1 | 2 | 3 | 4 | 5 | 6` - Day of week (0-6)

### Notes

- 0 = Sunday, 6 = Saturday

### Example

```javascript
new Chronos('2025-01-01').weekDay; // 0 (Sunday)
```

---

## isoWeekday

### Signature

```typescript
get isoWeekday(): 1 | 2 | 3 | 4 | 5 | 6 | 7
```

### Return Type

`1 | 2 | 3 | 4 | 5 | 6 | 7` - ISO day of week (1-7)

### Notes

- 1 = Monday, 7 = Sunday

### Example

```javascript
new Chronos('2025-01-01').isoWeekday; // 7 (Sunday)
```

---

## isoMonth

### Signature

```typescript
get isoMonth(): NumberRange<1, 12>
```

### Return Type

`NumberRange<1, 12>` - Month (1-12)

### Notes

- 1 = January, 12 = December

### Example

```javascript
new Chronos('2025-01-01').isoMonth; // 1
```

---

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

---

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

---

## lastDateOfMonth

### Signature

```typescript
get lastDateOfMonth(): NumberRange<28, 31>
```

### Return Type

`NumberRange<28, 31>` - Last day of month `(28, 29, 30 or 31)`

### Notes

- Accounts for leap years

### Example

```javascript
new Chronos('2025-02-01').lastDateOfMonth; // 28
new Chronos('2024-02-01').lastDateOfMonth; // 29
```

---
