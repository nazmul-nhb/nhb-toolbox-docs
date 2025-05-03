---
id: extractTimeFromUTC  
title: Extract Time From UTC  
---

## extractTimeFromUTC

Extracts the time portion from a UTC offset string, converting it to `±HH:MM` format.

### Function Signature

```typescript
function extractTimeFromUTC(utc: UTCOffSet): `-${Time}` | Time;
```

### Parameters

- **`utc`**: A UTC offset string in format:
  - `UTC+HH:MM` (positive offset)
  - `UTC-HH:MM` (negative offset)

### Returns

The time portion in `±HH:MM` format:

- `HH:MM` for positive offsets (e.g., `"05:30"`)
- `-HH:MM` for negative offsets (e.g., `"-04:00"`)

### Example Usage

```typescript
import { extractTimeFromUTC } from 'nhb-toolbox';

// Positive offset
console.log(extractTimeFromUTC("UTC+05:30"));  // "05:30"

// Negative offset
console.log(extractTimeFromUTC("UTC-03:45"));  // "-03:45"

// Zero offset
console.log(extractTimeFromUTC("UTC+00:00"));  // "00:00"
```

### Notes

- Preserves the original sign (+/-)
- Returns only the time portion without "UTC" prefix
- Maintains leading zeros for single-digit hours/minutes
- Works with all valid `UTCOffSet` formats

### Aliases

- `extractTimeStringFromUTC`
- `getTimeStringFromUTC`

### Type Definition

```typescript
type UTCOffSet = `UTC${'+00'|'+01'|...|'+14'|'-00'|'-01'|...|'-14'}:${'00'|'15'|'30'|'45'}`;
type Time = `${Hours}:${Minutes}`;
```

### Use Cases

- Displaying timezone offsets without UTC prefix
- Preparing time data for further processing
- Formatting timezone information for UI display
- Timezone conversion utilities

### Conclusion

The `extractTimeFromUTC` function provides:

1. **Clean extraction** of time portion from UTC strings
2. **Consistent formatting** in `±HH:MM` format
3. **Simple integration** with time-related operations
4. **Type-safe** input/output handling

Ideal for applications requiring:

- Timezone-aware displays
- UTC string manipulation
- Time formatting utilities
- Internationalization support
