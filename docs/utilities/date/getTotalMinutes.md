---
id: getTotalMinutes  
title: Extract Total Minutes  
---

## getTotalMinutes

Converts a time string in `HH:MM` or `-HH:MM` format into total minutes from `00:00`.

### Function Signature

```typescript
getTotalMinutes(time: `-${ClockTime}` | ClockTime): number;
```

### Parameters

- **`time`**: A time string in either:
  - Positive format: `HH:MM` (e.g., `"08:30"`)
  - Negative format: `-HH:MM` (e.g., `"-05:00"`)

### Returns

Total minutes elapsed since `00:00`:

- Positive number for times in `HH:MM` format
- Negative number for times in `-HH:MM` format
- `0` for `00:00` or `-00:00`

### Example Usage

```typescript
import { getTotalMinutes } from 'nhb-toolbox';

// Positive time
console.log(getTotalMinutes("14:45"));  // 885 (14*60 + 45)
console.log(getTotalMinutes("01:30"));  // 90

// Negative time
console.log(getTotalMinutes("-03:15")); // -195
console.log(getTotalMinutes("-00:30")); // -30

// Edge cases
console.log(getTotalMinutes("00:00"));  // 0
console.log(getTotalMinutes("-00:00")); // 0
```

### Notes

- Handles both positive and negative time formats
- Maintains sign convention from input
- Returns raw numeric value (no rounding)
- Follows 24-hour time format
- Returns 0 for both `00:00` and `-00:00`
- It internally uses [extractHourMinute](extractHourMinute)

### Aliases

- `extractTotalMinutesFromTime`
- `getTotalMinutesFromTime`

### Type Safety

Input is strictly validated through types:

```typescript
type ClockTime = `${ClockHour}:${ClockMinute}`;
type ClockHour = '00'|'01'|...|'23';
type ClockMinute = '00'|'01'|...|'59';
```

### Use Cases

- Time duration calculations
- Timezone offset conversions
- Scheduling and time arithmetic
- Comparing time intervals
- Converting time formats for storage

### Conclusion

The `getTotalMinutes` function provides:

1. **Simple conversion** from time strings to minutes
2. **Accurate time math** for calculations
3. **Consistent handling** of signed times
4. **Type-safe operations** through strict input validation

Ideal for applications requiring:

- Time-based calculations
- Duration measurements
- Timezone conversions
- Scheduling logic
- Time arithmetic operations
