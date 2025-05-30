---
id: time-guards  
title: Time Guards  
---

<!-- markdownlint-disable-file MD024 -->
## isValidTime

Type guard that checks if a value is a valid time string in "HH:MM" format.

### Function Signature

```typescript
function isValidTime(value: unknown): value is Time;
```

### Parameters

- **`value`**: The value to check (any type)

### Returns

`true` if the value is a valid 24-hour time string, `false` otherwise

### Example Usage

```typescript
import { isValidTime } from 'nhb-toolbox';

console.log(isValidTime("14:30")); // true
console.log(isValidTime("25:00")); // false (invalid hour)
console.log(isValidTime("12:60")); // false (invalid minute)
console.log(isValidTime(1234));    // false (not a string)
```

### Validation Rules

1. Must be a string in "HH:MM" format
2. Hours must be between 00-23
3. Minutes must be between 00-59
4. Leading zeros required for single-digit values

### Alias

- `isValidTimeString`

### Type Definition

```typescript
type ClockTime = `${ClockHour}:${ClockMinute}`;
type ClockHour = '00'|'01'|...|'23';
type ClockMinute = '00'|'01'|...|'59';
```

---

## isValidUTCOffSet

Type guard that checks if a value is a valid UTC offset string.

### Function Signature

```typescript
function isValidUTCOffSet(value: unknown): value is UTCOffSet;
```

### Parameters

- **`value`**: The value to check (any type)

### Returns

`true` if the value is a valid UTC offset string, `false` otherwise

### Example Usage

```typescript
import { isValidUTCOffSet } from 'nhb-toolbox';

console.log(isValidUTCOffSet("UTC+05:30")); // true
console.log(isValidUTCOffSet("UTC-14:00")); // true
console.log(isValidUTCOffSet("GMT+08:00")); // false (invalid prefix)
console.log(isValidUTCOffSet("UTC+25:00")); // false (invalid hour)
```

### Validation Rules

1. Must start with "UTC" prefix
2. Must be followed by + or - sign
3. Hours must be 1-2 digits
4. Must include colon separator
5. Minutes must be exactly 2 digits
6. Followed by valid time components (hours 00-14, minutes 00/15/30/45)

### Alias

- `isValidUTC`

### Type Definition

```typescript
type UTCOffSet = `UTC${PositiveUTCHour|NegativeUTCHour}:${UTCMinute}`;
```

---

## Conclusion

These type guards provide:

1. **Strict validation** of time formats
2. **Type narrowing** for TypeScript
3. **Consistent checking** across applications
4. **Safety** for time-related operations

Ideal for:

- Input validation
- API response checking
- Type-safe time operations
- Data sanitization
