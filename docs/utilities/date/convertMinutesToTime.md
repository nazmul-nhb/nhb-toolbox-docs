---
id: convertMinutesToTime
title: Convert Minutes into Formatted Time-string
---

## convertMinutesToTime

Converts a number of minutes into a standardized "HH:MM" time string format.

### Aliases

- `convertMinutesToHourMinutes`
- `getTimeFromMinutes`
- `getHourMinutesFromMinutes`

### Function Signature

```typescript
function convertMinutesToTime(minutes: Numeric): HourMinutes;
```

### Parameters

- **`minutes`**:
  - Type: `Numeric` (number or numeric string)
  - The total minutes to convert (e.g., `90`, `"-45"`, `"120"`)

### Return Value

- `HourMinutes` - A string in `hour:minute` format where:
  - Hour portion has 1+ digits (e.g., `"1:05"`, `"12:30"`, `"123:45"` etc.)
  - Minute portion always has 2 digits (e.g., `"0:05"`, `"8:00"`)

### Example Usage

```typescript
import { convertMinutesToTime, getTimeFromMinutes } from 'nhb-toolbox';

// Basic conversion
convertMinutesToTime(90);    // "1:30"
getTimeFromMinutes(-45);     // "0:45" 

// With numeric strings
convertMinutesToTime("120"); // "2:00"
getTimeFromMinutes("-90");   // "1:30"
```

### Behavior

- Always returns absolute value (ignores negative signs)
- Formats minutes with leading zero (e.g., `5` → `"0:05"`)
- Handles both numbers and numeric strings
- Returns 24+ hour formats for large inputs (e.g., `1500` → `"25:00"`)

### Type Safety

Uses strict type definitions:

```typescript
type HourMinutes = `${number}:${'00'|'01'|...|'59'}`;
type Numeric = number | `${number}`;
```

### Edge Cases

| Input   | Output      | Notes                   |
|---------|-------------|-------------------------|
| `0`     | `"0:00"`    | Zero minutes            |
| `"59"`  | `"0:59"`    | String input            |
| `-1600` | `"26:40"`   | Ignores negative        |
| `NaN`   | `"NaN:NaN"` | Invalid number handling |

### Comparison

| Feature | This Function | Alternative |
|---------|--------------|-------------|
| Negative Input | Absolute value | Preserves sign |
| Output Format | "H:MM" or "HH:MM" | Always "HH:MM" |
| Input Types | Number/String | Number only |
| Decimal Handling | Truncates | Rounds |

### Notes

:::tip
For 24-hour formatted output with leading zeros create custom function:

```ts
function formatWithLeadingZero(minutes: number) {
  const [h, m] = convertMinutesToTime(minutes).split(':');
  return `${h.padStart(2, '0')}:${m}`;
}
```

:::

:::danger
Does not handle:

- Days conversion (max 1600m → "26:40")
- Timezone adjustments
- Seconds precision

:::
