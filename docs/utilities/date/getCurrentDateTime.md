---
id: getCurrentDateTime  
title: Get Current Date Time  
---

## getCurrentDateTime

Returns the current date and time as a JavaScript `Date` object.

### Function Signature

```typescript
function getCurrentDateTime(): Date;
```

### Returns

A `Date` object representing the current system date and time, with all standard `Date` methods and properties available.

### Example Usage

```typescript
import { getCurrentDateTime } from 'nhb-toolbox';

const now = getCurrentDateTime();
console.log(now.toISOString()); // "2023-11-15T14:30:00.000Z"

// Access Date methods
console.log(now.getFullYear()); // 2023
console.log(now.getHours());    // 14
```

### Notes

- Wrapper around JavaScript's native `new Date()` constructor
- Returns a live `Date` object (not frozen/snapshot)
- Reflects system time including timezone
- All standard `Date` methods are available:
  - `getHours()`, `getMinutes()`, etc.
  - `toISOString()`, `toLocaleString()`, etc.
  - Date arithmetic operations

### Alias

- `getCurrentTime`

### Use Cases

- Time-stamping events
- Time-sensitive operations
- Date arithmetic
- Localized time displays
- Scheduling functions

### Conclusion

The `getCurrentDateTime` function provides:

1. **Simple access** to current datetime
2. **Full Date API** through returned object
3. **Consistent behavior** with native Date
4. **Convenient alias** for time-only contexts

Ideal for applications requiring:

- Current time operations
- Timestamp generation
- Time-based comparisons
- Date formatting utilities
