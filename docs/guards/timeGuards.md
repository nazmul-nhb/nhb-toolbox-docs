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
type UTCOffset = `UTC${PositiveUTCHour | NegativeUTCHour}:${UTCMinute}`;
```

---

## isValidTimeZoneId()

Validates whether the provided value is a recognized [**IANA timezone identifier from the TZ database**](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

> See [`isNativeTimeZoneId`](#isnativetimezoneid) for lightweight native JS solution.

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

// Valid IANA identifiers (including modern canonical names)
console.log(isValidTimeZoneId('Asia/Dhaka')); // → true
console.log(isValidTimeZoneId('America/New_York')); // → true
console.log(isValidTimeZoneId('Europe/London')); // → true
console.log(isValidTimeZoneId('EST')); // → true (abbreviation + identifier)
console.log(isValidTimeZoneId('Asia/Kolkata')); // → true (modern canonical name)
console.log(isValidTimeZoneId('Asia/Calcutta')); // → true (legacy alias)

// Invalid identifiers
console.log(isValidTimeZoneId('UTC+06:00')); // → false (offset, not identifier)
console.log(isValidTimeZoneId('Invalid/Zone')); // → false
console.log(isValidTimeZoneId(123)); // → false
console.log(isValidTimeZoneId(null)); // → false
```

### Remarks

- **Comprehensive IANA TZ Database coverage** - validates against all 597 identifiers including both modern canonical names and legacy aliases
- **Includes both canonical and alias names** - recognizes modern names like `Asia/Kolkata` alongside legacy names like `Asia/Calcutta`
- **Type predicate function** - when returns `true`, TypeScript narrows the type to `$TimeZoneIdentifier`
- **Case-sensitive** - identifiers must match exactly (e.g., `'America/New_York'`, not `'america/new_york'`)
- **Larger bundle size** - includes a comprehensive array of all IANA identifiers (597 entries, around `10kilobytes` after minification)

:::tip
Full data is also available through this package subpath:

```ts
import { IANA_TZ_IDS, TIME_ZONE_IDS } from 'nhb-toolbox/constants';
```

- `IANA_TZ_IDS` contains array of identifiers while `TIME_ZONE_IDS` contains the identifiers in record style `{id: { tzName: '...', offset: '...' }}`

```ts
{
  'Asia/Dhaka': { tzName: 'Bangladesh Standard Time', offset: 'UTC+06:00' },
  // ...
}
```

:::

### When to Use

- **Future-proof applications** that want to use modern canonical names
- **Data validation** where you need to accept both canonical and alias timezone identifiers
- **Applications requiring maximum timezone coverage** including modern naming conventions
- **Backend systems** where bundle size is less critical

### Typical Use Cases

```ts
// Validate user input preferring modern names
const userInput = 'Asia/Kolkata'; // Modern systems should use this
if (isValidTimeZoneId(userInput)) {
    const ch = new Chronos().timeZone(userInput); // Type-safe usage
}

// Filter valid timezone identifiers including modern names
const potentialZones = ['Asia/Dhaka', 'EST', 'Asia/Kolkata', 'UTC+06:00'];
const validZones = potentialZones.filter(isValidTimeZoneId);
// → ['Asia/Dhaka', 'EST', 'Asia/Kolkata']

// Configuration validation for modern systems
const config = { timezone: 'Asia/Kolkata' }; // Modern configuration
if (!isValidTimeZoneId(config.timezone)) {
    throw new Error('Invalid timezone identifier in configuration');
}
```

## isNativeTimeZoneId()

Validates whether the provided value is a supported time zone identifier using the native JavaScript API ([`Intl.supportedValuesOf('timeZone')`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf)).

> See [`isValidTimeZoneId`](#isvalidtimezoneid) for full 597 time zone identifier support.

### Signature

```typescript
isNativeTimeZoneId(value: unknown): value is TimeZoneIdNative
```

### Parameters

- **`value`** - The value to validate as a timezone identifier

### Return Type

- **`value is TimeZoneIdNative`** - Type predicate that returns `true` if the value is a valid native JS-supported time zone identifier, otherwise `false`.

### Example

```ts
import { isNativeTimeZoneId } from 'nhb-toolbox';

// Valid Native JS identifiers (legacy names in some engines)
console.log(isNativeTimeZoneId('Asia/Dhaka')); // → true
console.log(isNativeTimeZoneId('America/New_York')); // → true
console.log(isNativeTimeZoneId('Europe/London')); // → true
console.log(isNativeTimeZoneId('Asia/Calcutta')); // → true (legacy name supported natively)

// Invalid identifiers
console.log(isNativeTimeZoneId('Asia/Kolkata')); // → false (modern name not in native list)
console.log(isNativeTimeZoneId('EST')); // → false (abbreviation, not identifier)
console.log(isNativeTimeZoneId('UTC+06:00')); // → false (offset, not identifier)
console.log(isNativeTimeZoneId('Invalid/Zone')); // → false
console.log(isNativeTimeZoneId(123)); // → false
console.log(isNativeTimeZoneId(null)); // → false
```

### Remarks

- **Native JavaScript validation** - uses `Intl.supportedValuesOf('timeZone')` for validation
- **Legacy-focused identifiers** - many JS engines still use legacy names like `Asia/Calcutta` instead of modern `Asia/Kolkata`
- **Small bundle footprint** - relies on built-in browser/Node.js APIs, no additional data (around `300 bytes` after minification)
- **Type predicate function** - when returns `true`, TypeScript narrows the type to `TimeZoneIdNative`
- **Case-sensitive** - identifiers must match exactly (e.g., `'America/New_York'`, not `'america/new_york'`)
- **Optimal performance** - leverages native browser optimizations
- **Note**: Some JS engines accept modern names in `DateTimeFormat` but don't include them in `supportedValuesOf()`

:::tip
Full data is also available through this package subpath:

```ts
import { TIME_ZONES_NATIVE } from 'nhb-toolbox/constants';
```

- `TIME_ZONES_NATIVE` contains the identifiers in record style `{id: { tzName: '...', offset: '...' }}`

```ts
{
  'Asia/Dhaka': { tzName: 'Bangladesh Standard Time', offset: 'UTC+06:00' },
  // ...
}
```

:::

### When to Use

- **Frontend applications** where bundle size is critical
- **Compatibility with older JS engines** that use legacy timezone names
- **Performance-sensitive code** that benefits from native API speed
- **Validation that must match exactly what the JS engine considers "supported"**

### Typical Use Cases

```ts
// Validate user input for maximum JS engine compatibility
const userInput = 'Asia/Calcutta'; // JS engines recognize this
if (isNativeTimeZoneId(userInput)) {
    const ch = new Chronos().timeZone(userInput); // Type-safe usage
}

// Filter valid native timezone identifiers
const potentialZones = ['Asia/Dhaka', 'EST', 'Asia/Kolkata', 'Asia/Calcutta'];
const validZones = potentialZones.filter(isNativeTimeZoneId);
// → ['Asia/Dhaka', 'Asia/Calcutta'] (only natively supported names)

// Configuration validation for JS engine compatibility
const config = { timezone: 'Asia/Calcutta' };
if (!isNativeTimeZoneId(config.timezone)) {
    throw new Error('Timezone not supported by JavaScript engine');
}
```

:::::info[`isValidTimeZoneId` vs `isNativeTimeZoneId`]
<br/>
| Aspect           | `isValidTimeZoneId`                    | `isNativeTimeZoneId`                             |
| ---------------- | -------------------------------------- | ------------------------------------------------ |
| **Coverage**     | 597 identifiers (full IANA database)   | 418 identifiers (engine-dependent legacy names)  |
| **Modern Names** | ✅ Includes `Asia/Kolkata` (canonical) | ❌ Usually only `Asia/Calcutta` (legacy)         |
| **Bundle Size**  | Larger (includes array of identifiers) | Minimal (uses native APIs)                       |
| **Performance**  | Good                                   | Excellent (native optimized)                     |
| **Use Case**     | Modern apps, future-proofing           | JS engine compatibility, performance             |

:::tip[Important Note on JavaScript Engine Behavior]

JavaScript engines have an interesting inconsistency:

- `Intl.supportedValuesOf('timeZone')` typically returns some legacy names like `Asia/Calcutta`
- But `new Intl.DateTimeFormat().format()` often accepts modern names like `Asia/Kolkata` and works correctly

This means `isNativeTimeZoneId` is stricter about what the engine explicitly "supports" vs what might actually work.
:::

:::tip[Decision Guide]

**Use `isValidTimeZoneId` when:**

- You want to use modern canonical timezone names (`Asia/Kolkata`)
- Building future-proof applications
- You need consistent validation regardless of JS engine quirks
- Bundle size is not a primary concern

**Use `isNativeTimeZoneId` when:**

- Building frontend applications with bundle size constraints
- You need maximum compatibility with what JS engines explicitly support
- Performance is critical
- You're working with data that might come from `Intl.supportedValuesOf()`

:::

**Practical Example**

```ts
import { isValidTimeZoneId, isNativeTimeZoneId } from 'nhb-toolbox';

// Modern name - valid in IANA but not in native JS list
console.log(isValidTimeZoneId('Asia/Kolkata')); // → true
console.log(isNativeTimeZoneId('Asia/Kolkata')); // → false

// Legacy name - valid in both
console.log(isValidTimeZoneId('Asia/Calcutta')); // → true  
console.log(isNativeTimeZoneId('Asia/Calcutta')); // → true

// But both work in DateTimeFormat!
const date = new Date();
console.log(new Intl.DateTimeFormat('en', { 
    timeZone: 'Asia/Kolkata', 
    timeZoneName: 'long' 
}).format(date)); // → Works!
console.log(new Intl.DateTimeFormat('en', { 
    timeZone: 'Asia/Calcutta', 
    timeZoneName: 'long' 
}).format(date)); // → Also works!
```

:::tip[Recommendation]

For most applications, **use `isValidTimeZoneId`** as it provides modern, future-proof validation. Use `isNativeTimeZoneId` only when you specifically need to validate against what the JS engine explicitly reports as supported.
:::

:::::
