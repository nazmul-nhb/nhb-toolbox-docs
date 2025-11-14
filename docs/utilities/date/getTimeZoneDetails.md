---
id: getTimeZoneDetails
title: Get Time Zone Details
---

## getTimeZoneDetails

Retrieves comprehensive time zone information using the Internationalization API (`Intl`): time zone identifiers, localized names, and GMT offset information.

### Function Signature

```typescript
getTimeZoneDetails(tzId?: $TimeZoneIdentifier, date?: Date): TimeZoneDetails
```

### Parameters

| Parameter | Type                 | Required | Default         | Description                                            |
| --------- | -------------------- | -------- | --------------- | ------------------------------------------------------ |
| `tzId`    | `$TimeZoneIdentifier` | No       | System timezone | IANA time zone identifier (e.g., `"America/New_York"`) |
| `date`    | `Date`               | No       | Current date    | Specific date for time zone resolution                 |

### Return Value

Returns a [`TimeZoneDetails`](#type-definitions) object containing:

| Property            | Type                               | Description                                        |
| ------------------- | ---------------------------------- | -------------------------------------------------- |
| `tzIdentifier`      | `LooseLiteral<$TimeZoneIdentifier>` | IANA time zone identifier                          |
| `tzNameLong`        | `LooseLiteral<TimeZoneName>`       | Long localized form of full time zone name         |
| `tzNameLongGeneric` | `LooseLiteral<TimeZoneName>`       | Long generic non-location format of time zone name |
| `tzNameLongOffset`  | `LooseLiteral<"GMT${$UTCOffset}">` | GMT offset representation of time zone name        |

### Example Usage

#### Basic Usage

```typescript
import { getTimeZoneDetails } from 'nhb-toolbox';

// Get details for current system timezone
const systemTZ = getTimeZoneDetails();
console.log(systemTZ);
// {
//   tzIdentifier: 'America/New_York',
//   tzNameLong: 'Eastern Standard Time',
//   tzNameLongGeneric: 'Eastern Time',
//   tzNameLongOffset: 'GMT-05:00'
// }
```

#### Specific Time Zone

```typescript
// Get details for London timezone
const londonTZ = getTimeZoneDetails('Europe/London');
console.log(londonTZ);
// {
//   tzIdentifier: 'Europe/London',
//   tzNameLong: 'Greenwich Mean Time',
//   tzNameLongGeneric: 'United Kingdom Time',
//   tzNameLongOffset: 'GMT'
// }
```

#### International Time Zones

```typescript
// Various international time zones
const timeZones = (
 ['Asia/Tokyo', 'Australia/Sydney', 'Europe/Paris', 'Pacific/Honolulu'] as const
).map((tz) => getTimeZoneDetails(tz));

timeZones.forEach(tz => {
  console.log(`${tz.tzIdentifier}: ${tz.tzNameLong} (${tz.tzNameLongOffset})`);
});
// Asia/Tokyo: Japan Standard Time (GMT+09:00)
// Australia/Sydney: Australian Eastern Daylight Time (GMT+11:00)
// Europe/Paris: Central European Standard Time (GMT+01:00)
// Pacific/Honolulu: Hawaii-Aleutian Standard Time (GMT-10:00)
```

### Type Definitions

```typescript
interface TimeZoneDetails {
 /** IANA time zone identifier */
 tzIdentifier: LooseLiteral<$TimeZoneIdentifier>;
 /** Long localized form (e.g., `'Pacific Standard Time'`, `'Nordamerikanische Westküsten-Normalzeit'`) */
 tzNameLong?: LooseLiteral<TimeZoneName>;
 /** Long generic non-location format (e.g.: `'Pacific Time'`, `'Nordamerikanische Westküstenzeit'`) */
 tzNameLongGeneric?: LooseLiteral<TimeZoneName>;
 /** Long localized GMT format, prefixed with `"GMT"` (e.g., `"GMT-08:00"`) */
 tzNameLongOffset?: LooseLiteral<`GMT${$UTCOffset}`>;
}
```

### Implementation Details

#### Internationalization API Usage

The function leverages the `Intl.DateTimeFormat` API with specific configuration:

```typescript
const formatter = new Intl.DateTimeFormat('en', {
  timeZone: tzId,
  timeZoneName: type // 'long' | 'longGeneric' | 'longOffset'
});
```

#### Time Zone Name Types

| Type          | Description             | Example                   |
| ------------- | ----------------------- | ------------------------- |
| `long`        | Complete time zone name | `"Eastern Daylight Time"` |
| `longGeneric` | Location-agnostic name  | `"Eastern Time"`          |
| `longOffset`  | GMT offset format       | `"GMT+06:00"`             |

### Integration with Other Utilities

#### Combined with [getGreeting](getGreeting)

```typescript
// Contextual greeting with timezone awareness
function getLocalizedGreeting(tzId: $TimeZoneIdentifier) {
  const tzDetails = getTimeZoneDetails(tzId);
  const localTime = new Date().toLocaleString('en', { timeZone: tzId });
  
  return {
    greeting: getGreeting({ currentTime: localTime }),
    timezone: tzDetails.tzNameLong,
    offset: tzDetails.tzNameLongOffset
  };
}
```

### Conclusion

The `getTimeZoneDetails` function provides:

- **Comprehensive** time zone information retrieval
- **Standardized** IANA time zone identifier support
- **Localized** naming conventions

### See Also

- Refer to [**Chronos**](/docs/classes/Chronos/names) class for methods like this.
