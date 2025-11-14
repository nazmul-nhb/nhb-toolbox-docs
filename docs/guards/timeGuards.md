---
id: time-guards  
title: Time Guards  
---

<!-- markdownlint-disable-file MD024 -->
## isValidTime

Type guard that checks if a value is a valid time string in "HH:MM" format.

### Function Signature

```typescript
isValidTime(value: unknown): value is Time;
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

## isValidUTCOffset

Type guard that checks if a value is a valid UTC offset string.

### Function Signature

```typescript
isValidUTCOffset(value: unknown): value is UTCOffset;
```

### Parameters

- **`value`**: The value to check (any type)

### Returns

`true` if the value is a valid UTC offset string, `false` otherwise

### Example Usage

```typescript
import { isValidUTCOffset } from 'nhb-toolbox';

console.log(isValidUTCOffset("UTC+05:30")); // true
console.log(isValidUTCOffset("UTC-14:00")); // true
console.log(isValidUTCOffset("GMT+08:00")); // false (invalid prefix)
console.log(isValidUTCOffset("UTC+25:00")); // false (invalid hour)
```

### Validation Rules

1. Must start with "UTC" prefix
2. Must be followed by + or - sign
3. Hours must be 1-2 digits
4. Must include colon separator
5. Minutes must be exactly 2 digits
6. Followed by valid time components (hours 00-14, minutes 00/15/30/45)

### Alias

This guard is also available as following aliases:

- `isValidUTC`
- `isValidUTCOffSet`

### Type Definition

```typescript
type UTCOffset = `UTC${PositiveUTCHour|NegativeUTCHour}:${UTCMinute}`;
```

---

## isValidTimeZoneId()

Validates whether the provided value is a recognized [**IANA timezone identifier from the TZ database**](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Signature

```typescript
isValidTimeZoneId(value: unknown): value is $TimeZoneIdentifier
```

### Parameters

- **`value`** - The value to validate as a timezone identifier

### Return Type

- **`value is $TimeZoneIdentifier`** - Type predicate that returns `true` if the value is a valid IANA timezone identifier

### Example

```ts
import { isValidTimeZoneId } from 'nhb-toolbox';

// Valid IANA identifiers
console.log(isValidTimeZoneId('Asia/Dhaka')); // → true
console.log(isValidTimeZoneId('America/New_York')); // → true
console.log(isValidTimeZoneId('Europe/London')); // → true

// Invalid identifiers
console.log(isValidTimeZoneId('EST')); // → false (abbreviation, not identifier)
console.log(isValidTimeZoneId('UTC+06:00')); // → false (offset, not identifier)
console.log(isValidTimeZoneId('Invalid/Zone')); // → false
console.log(isValidTimeZoneId(123)); // → false
console.log(isValidTimeZoneId(null)); // → false
```

### Remarks

- **Validates against the IANA TZ Database** - checks if the value exists in the comprehensive list of timezone identifiers
- **Type predicate function** - when returns `true`, TypeScript narrows the type to `$TimeZoneIdentifier`
- **Case-sensitive** - identifiers must match exactly (e.g., `'America/New_York'`, not `'america/new_york'`)
- **Useful for runtime validation** - ensures timezone identifiers are valid before passing to timezone-sensitive operations

### Typical Use Cases

```ts
// Validate user input
const userInput = 'Asia/Dhaka';
if (isValidTimeZoneId(userInput)) {
    const ch = new Chronos().timeZone(userInput); // Type-safe usage
}

// Filter valid timezone identifiers
const potentialZones = ['Asia/Dhaka', 'EST', 'UTC+06:00', 'Invalid/Zone'];
const validZones = potentialZones.filter(isValidTimeZoneId);
// → ['Asia/Dhaka']

// Configuration validation
const config = { timezone: 'America/Los_Angeles' };
if (!isValidTimeZoneId(config.timezone)) {
    throw new Error('Invalid timezone identifier in configuration');
}
```

## Conclusion

**These type guards provide:**

1. **Strict validation** of time formats
2. **Type narrowing** for TypeScript
3. **Consistent checking** across applications
4. **Safety** for time-related operations

**Ideal for:**

- Input validation
- API response checking
- Type-safe time operations
- Data sanitization
