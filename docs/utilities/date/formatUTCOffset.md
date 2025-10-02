---
id: formatUTCOffset  
title: Format UTC Offset  
---

## formatUTCOffset

Converts a minute-based offset to a standardized UTC offset string in `UTC±HH:MM` format.

### Function Signature

```typescript
formatUTCOffset(minutes: Numeric): UTCOffSet;
```

### Parameters

- **`minutes`**: The offset in minutes (can be positive or negative), can be number or numeric number.

### Returns

A formatted UTC offset string (e.g., `UTC+05:30` or `UTC-04:00`)

### Example Usage

```typescript
import { formatUTCOffset } from 'nhb-toolbox';

// Positive offset
console.log(formatUTCOffset(330)); // "UTC+05:30"

// Negative offset
console.log(formatUTCOffset(-240)); // "UTC-04:00"

// Zero offset
console.log(formatUTCOffset(0)); // "UTC+00:00"
```

### Notes

- Rounds down to nearest hour for minute conversion
- Pads hours and minutes with leading zeros
- Handles both positive and negative offsets
- Returns valid `UTCOffSet` type strings only

---

### Aliases

- `convertMinutesToUTCOffset`: Alias for `getGreeting`
- `minutesToUTCOffset`: Shortened alias for `formatUTCOffset`

### Type Definitions

#### PositiveUTCHour

Valid positive UTC hour offsets:

```typescript
type PositiveUTCHour = 
  | '+00' | '+01' | '+02' | '+03' | '+04' | '+05' | '+06' | '+07' 
  | '+08' | '+09' | '+10' | '+11' | '+12' | '+13' | '+14';
```

#### NegativeUTCHour

Valid negative UTC hour offsets:

```typescript
type NegativeUTCHour = 
  | '-00' | '-01' | '-02' | '-03' | '-04' | '-05' | '-06' | '-07'
  | '-08' | '-09' | '-10' | '-11' | '-12' | '-13' | '-14';
```

#### UTCMinute

Supported minute offset values (quarter-hour increments):

```typescript
type UTCMinute = '00' | '15' | '30' | '45';
```

#### UTCOffSet

Complete UTC offset string format:

```typescript
type UTCOffSet = `UTC${PositiveUTCHour | NegativeUTCHour}:${UTCMinute}`;
```

### Validation Rules

1. **Hour Range**: -14 to +14
2. **Minute Values**: Only 00, 15, 30, or 45
3. **Format**: Strict `UTC±HH:MM` pattern
4. **Zero Offset**: Represented as `UTC+00:00`

### Use Cases

- Displaying timezone offsets in UIs
- Standardizing timezone data storage
- Timezone conversion utilities
- Calendar/scheduling applications

### Limitations

- Does not handle non-quarter-hour minute values
- Limited to ±14 hour range (following common timezone standards)
- Returns `UTC+00:00` for invalid inputs rather than throwing errors

### Conclusion

The `formatUTCOffset` function and associated types provide:

1. **Standardized** UTC offset formatting
2. **Type-safe** offset strings
3. **Consistent** timezone representation
4. **Validation** through type constraints

Ideal for applications requiring:

- Timezone-aware displays
- Internationalization support
- Time conversion utilities
- Standardized timezone data handling
