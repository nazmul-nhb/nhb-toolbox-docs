---
id: extractMinutesFromUTC  
title: Extract Minutes From UTC  
---

## extractMinutesFromUTC

Converts a UTC offset string in `UTC±HH:MM` format into total minutes as a number.

### Function Signature

```typescript
function extractMinutesFromUTC(utc: UTCOffSet): number;
```

### Parameters

- **`utc`**: A UTC offset string in format:
  - `UTC+HH:MM` (positive offset)
  - `UTC-HH:MM` (negative offset)

### Returns

The total minutes represented by the UTC offset:

- Positive number for east of UTC (e.g., `330` for `UTC+05:30`)
- Negative number for west of UTC (e.g., `-240` for `UTC-04:00`)
- `0` for `UTC+00:00`

### Example Usage

```typescript
import { extractMinutesFromUTC,  getMinutesFromUTC } from 'nhb-toolbox';

// Positive offset
console.log(extractMinutesFromUTC("UTC+05:30"));  // 330

// Negative offset
console.log(extractMinutesFromUTC("UTC-03:45"));  // -225

// Zero offset
console.log(extractMinutesFromUTC("UTC+00:00"));  // 0

const utcString = "UTC-06:30";

// Convert to minutes
const totalMinutes = extractMinutesFromUTC(utcString); // -390
const altMinutes = getMinutesFromUTC(utcString);      // -390 (alias)
```

### Notes

- Only accepts valid `UTCOffSet` formatted strings
- Minutes are calculated as `(hours * 60) + minutes`
- Returns 0 for UTC+00:00
- Maintains sign convention (negative for west of UTC)
- Works with all quarter-hour increments (00, 15, 30, 45 minutes)

### Aliases

- `getMinutesFromUTC`
- `getTotalMinutesFromUTC`

### Use Cases

- Timezone offset calculations
- Timezone-aware scheduling
- International time comparisons
- UTC conversion utilities

## Type Definitions

```typescript
type PositiveUTCHour = '+00'|'+01'|...|'+14';
type NegativeUTCHour = '-00'|'-01'|...|'-14';
type UTCMinute = '00'|'15'|'30'|'45';
type UTCOffSet = `UTC${PositiveUTCHour | NegativeUTCHour}:${UTCMinute}`;
```

---

### Conclusion

The `extractMinutesFromUTC` function provides:

1. **Simple conversion** from UTC strings to numeric minutes
2. **Accurate timezone math** for calculations
3. **Consistent handling** of positive/negative offsets
4. **Type-safe operations** through strict input validation

Ideal for applications requiring:

- Timezone conversions
- Global scheduling features
- Time arithmetic operations
- UTC-based time calculations
