---
id: extractHourMinute  
title: Extract Hour & Minute from Time 
---

## extractHourMinute

Extracts the hour and minute components from a time string in `HH:MM` or `-HH:MM` format and returns them as a numeric tuple.

### Function Signature

```typescript
extractHourMinute(time: `-${ClockTime}` | ClockTime): [number, number];
```

### Parameters

- **`time`**: A string in either:
  - Positive format: `HH:MM` (e.g., `"08:30"`)
  - Negative format: `-HH:MM` (e.g., `"-05:00"`)

### Return Value

A tuple containing:

1. Hour component (number)
2. Minute component (number)

### Example Usage

```typescript
import { extractHourMinute } from 'nhb-toolbox';

// Positive time
const [hour1, minute1] = extractHourMinute("14:45");
console.log(hour1);    // 14
console.log(minute1);  // 45

// Negative time
const [hour2, minute2] = extractHourMinute("-03:30");
console.log(hour2);    // -3
console.log(minute2);  // 30
```

### Notes

- Handles both positive and negative time formats
- Returns raw numbers (negative sign preserved for hour)
- Uses strict type checking for valid time formats
- Follows 24-hour time format conventions
- Minute component always positive (0-59)

### Type Safety

The input type ensures only valid formats are accepted:

```typescript
type ClockTime = `${ClockHour}:${ClockMinute}`;  // HH:MM format
type ClockHour = '00'|'01'|...|'23';    // Valid hours
type ClockMinute = '00'|'01'|...|'59';  // Valid minutes
```

### Edge Cases

- `"00:00"` returns `[0, 0]`
- `"-00:30"` returns `[0, 30]` (negative zero becomes zero)
- `"23:59"` returns `[23, 59]`

### Use Cases

- Time manipulation utilities
- Timezone offset calculations
- Duration parsing
- Scheduling applications
- Time-based validation

### Conclusion

The `extractHourMinute` function provides:

1. **Strict** input validation through types
2. **Simple** time component extraction
3. **Consistent** numeric output
4. **Flexible** handling of signed times

Ideal for applications requiring:

- Precise time parsing
- Time arithmetic operations
- Timezone conversions
- Duration calculations
