---
id: format
title: Format Methods
---

import Copy from '@site/src/components/Copy'

## Format Tokens

:::info
Chronos supports a rich set of format tokens that you can use to customize how a date is displayed. These tokens work across `format`, `formatUTC`, and `formatStrict` methods as well as for other methods that accept a format, and behave similarly to libraries like `Moment.js` or `Day.js`.
:::

Use square brackets (`[ ]`) to escape literal text. Unescaped characters will be treated as formatting tokens and replaced accordingly.

Below is a list of all supported tokens:

| Token                                        | Output           | Example           |
|----------------------------------------------|------------------|-------------------|
| <Copy text="YYYY" /> or <Copy text="yyyy" /> | Full year        | 2025              |
| <Copy text="YY" /> or <Copy text="yy" />     | 2-digit year     | 23                |
| <Copy text="mmmm" />                         | Full month       | January           |
| <Copy text="mmm" />                          | Short month      | Jan               |
| <Copy text="MM" />                           | 2-digit month    | 01-12             |
| <Copy text="M" />                            | Month            | 1-12              |
| <Copy text="DD" />                           | 2-digit day      | 01-31             |
| <Copy text="D" />                            | Day              | 1-31              |
| <Copy text="Do" />                           | Ordinal day      | 1st, 2nd          |
| <Copy text="ddd" />                          | Full weekday     | Monday            |
| <Copy text="dd" />                           | Short weekday    | Mon               |
| <Copy text="d" />                            | Shorter weekday  | Mo                |
| <Copy text="HH" />                           | 24-hour (00-23)  | 09                |
| <Copy text="H" />                            | 24-hour (0-23)   | 9                 |
| <Copy text="hh" />                           | 12-hour (01-12)  | 02                |
| <Copy text="h" />                            | 12-hour (1-12)   | 2                 |
| <Copy text="mm" />                           | Minutes (00-59)  | 05                |
| <Copy text="m" />                            | Minutes (0-59)   | 5                 |
| <Copy text="ss" />                           | Seconds (00-59)  | 09                |
| <Copy text="s" />                            | Seconds (0-59)   | 9                 |
| <Copy text="A" />                            | AM/PM            | PM                |
| <Copy text="a" />                            | am/pm            | pm                |
| <Copy text="ZZ" />                           | TZ Offset ±HH:mm | +06:00 or Z (UTC) |

:::danger[Note]

- To output raw text (i.e., not interpreted as a date token), wrap it in square brackets.
- For example, `[Today is] ddd` results in `Today is Sunday`, and `YYYY[ year]` results in `2025 year`.

- Supported format tokens include: `YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dd`, `ddd`, `Do`, `HH`, `H`, `hh`, `h`, `mm`, `m`, `ss`, `s`, `mss`, `a`, `A`, and `ZZ`.
- *Any token not wrapped in brackets will be parsed and replaced with its corresponding date component.*

:::

<!-- markdownlint-disable-file MD024 -->
## format()

### Signature

```typescript
format(format?: string, useUTC?: boolean): string
```

### Parameters

- `format`: Format string (default: `'dd, mmm DD, YYYY HH:mm:ss'`)
- `useUTC`: Use UTC time (default: `false`)

### Return Type

`string` - Formatted date

### Example

```javascript
const date = new Chronos('2025-01-15T14:30:00');
date.format('YYYY-MM-DD'); // "2025-01-15"
date.format('ddd, mmmm Do YYYY'); // "Wednesday, January 15th 2025"
date.format('h:mm A'); // "2:30 PM"
```

---

## formatUTC()

### Signature

```typescript
formatUTC(format?: string): string
```

### Parameters

- `format`: Format string (default: `'dd, mmm DD, YYYY HH:mm:ss:mss'`)

### Return Type

`string` - Formatted UTC date

### Notes

- Always uses UTC time regardless of instance configuration

### Example

```javascript
const date = new Chronos('2025-01-15T14:30:00Z');
date.formatUTC('YYYY-MM-DD HH:mm:ss'); // "2025-01-15 14:30:00"
```

---

## formatStrict()

### Signature

```typescript
formatStrict(format?: StrictFormat, useUTC?: boolean): string
```

### Parameters

- `format`: Predefined strict format
- `useUTC`: Use UTC time (default: `false`)

### Return Type

`string` - Formatted date

### Notes

- Provides type-safe formatting with IntelliSense support
- See `StrictFormat` type for available formats

### Example

```javascript
date.formatStrict('YYYY-MM-DD'); // Type-safe format
```

---

## calendar()

### Signature

```typescript
calendar(baseDate?: ChronosInput): string
```

### Parameters

- `baseDate`: Reference date (default: now)

### Return Type

`string` - Human-readable relative date

### Notes

- Returns strings like "Today at 3:00 PM", "Yesterday at 2:30 AM"

### Example

```javascript
const date = new Chronos().subtract(1, 'day');
date.calendar(); // "Yesterday at [time]"
```

---

## fromNow()

### Signature

```typescript
fromNow(
  level?: Exclude<TimeUnit, 'millisecond'>,
  withSuffixPrefix?: boolean,
  time?: ChronosInput
): string
```

### Parameters

- `level`: Smallest unit to include (default: 'minute')
- `withSuffixPrefix`: Include "ago"/"in" (default: true)
- `time`: Comparison time (default: now)

### Return Type

`string` - Human-readable duration

### Example

```javascript
new Chronos().subtract(2, 'days').fromNow(); // "2 days ago"
new Chronos().add(3, 'hours').fromNow(); // "in 3 hours"
```

---

## fromNowShort()

### Signature

```typescript
fromNowShort(): string
```

### Return Type

`string` - Short duration string

### Notes

- Returns strings like "2h ago", "in 5m"

### Example

```javascript
new Chronos().subtract(150, 'minutes').fromNowShort(); // "2h ago"
```
