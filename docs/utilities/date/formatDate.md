---
id: formatDate
title: Format Date & Time
---

import Copy from '@site/src/components/Copy'

## formatDate

Formats a date into a specified string format using comprehensive [formatting tokens](#format-tokens).

### Signature

```typescript
formatDate(options?: DateFormatOptions): string
```

### Parameter

- `options`: Options to control date and time formatting.

```ts
interface DateFormatOptions {
    /** Date to format, must be parsable by `Date` constructor. Can be string, number or `Date`. Defaults to current time. */
    date?: string | number | Date;
    /** The desired format (Default format is `'dd, mmm DD, YYYY HH:mm:ss'` = `'Sun, Apr 06, 2025 16:11:55'`). */
    format?: StrictFormat; // 21,000+ predefined formats + any string that uses tokens
    /** Whether to use UTC time. Defaults to `false`. */
    useUTC?: boolean;
}
```

### Return Type

`string` - Formatted date/time string according to the specified format.

### Example

```ts
// Using string date
formatDate({ 
  date: '2025-01-15T14:30:00', 
  format: 'YYYY-MM-DD HH:mm:ss' 
});
// "2025-01-15 14:30:00"

// Using number (timestamp)
formatDate({ 
  date: 1736944200000, 
  format: 'dd, mmm DD, YYYY' 
});
// "Wed, Jan 15, 2025"

// Using Date object
formatDate({ 
  date: new Date('2025-01-15T14:30:00'), 
  format: 'mmmm D, YYYY [at] h:mm A' 
});
// "January 15, 2025 at 2:30 PM"

// Format current time in UTC time
formatDate({ 
  format: 'YYYY-MM-DD HH:mm:ss ZZ',
  useUTC: true 
});
// "2025-01-15 14:30:00 Z"

// With ordinal day and escaped text
formatDate({ 
  date: '2025-01-01', 
  format: '[Today is the] Do [of] mmmm, YYYY' 
});
// "Today is the 1st of January, 2025"

// 12-hour time format
formatDate({
 date: '2025-01-15T19:30:00',
 format: 'hh:mm A',
}),
// "07:30 PM"

// 24-hour time format
formatDate({ 
  date: '2025-01-15T14:30:00', 
  format: 'HH:mm:ss' 
});
// "14:30:00"

// Current time (no date option)
formatDate({ 
  format: 'YYYY-MM-DD HH:mm:ss' 
});
// "2025-11-21 16:11:55" (current date/time)

// Complex format with multiple escaped sections
formatDate({ 
  date: '2025-12-25T18:45:30', 
  format: '[Christmas Party:] ddd, mmmm Do [@] h:mm A [sharp!]' 
});
// "Christmas Party: Thursday, December 25th @ 6:45 PM sharp!"
```

### Alias

`formatDate` can also be accessed via the following aliases:

- `formatDateTime`

### See Also

- [Chronos format methods](/docs/classes/Chronos/format) for similar date formatting capabilities within the Chronos class.

---

### Format Tokens

:::info
`formatDate` supports a rich set of format tokens that you can use to customize how a date is displayed. These tokens work across [Chronos format](/docs/classes/Chronos/format) methods, and behave similarly to libraries like `Moment.js` or `Day.js`.
:::

Use square brackets (`[ ]`) to escape literal text. Unescaped characters will be treated as formatting tokens and replaced accordingly.

Below is a list of all supported tokens:

| Token                                        | Output                 | Example           |
| -------------------------------------------- | ---------------------- | ----------------- |
| <Copy text="YYYY" /> or <Copy text="yyyy" /> | Full year              | 2025              |
| <Copy text="YY" /> or <Copy text="yy" />     | 2-digit year           | 23                |
| <Copy text="mmmm" />                         | Full month             | January           |
| <Copy text="mmm" />                          | Short month            | Jan               |
| <Copy text="MM" />                           | 2-digit month          | 01-12             |
| <Copy text="M" />                            | Month                  | 1-12              |
| <Copy text="DD" />                           | 2-digit day            | 01-31             |
| <Copy text="D" />                            | Day                    | 1-31              |
| <Copy text="Do" />                           | Ordinal day            | 1st, 2nd          |
| <Copy text="ddd" />                          | Full weekday           | Monday            |
| <Copy text="dd" />                           | Short weekday          | Mon               |
| <Copy text="d" />                            | Shorter weekday        | Mo                |
| <Copy text="HH" />                           | 24-hour (00-23)        | 09                |
| <Copy text="H" />                            | 24-hour (0-23)         | 9                 |
| <Copy text="hh" />                           | 12-hour (01-12)        | 02                |
| <Copy text="h" />                            | 12-hour (1-12)         | 2                 |
| <Copy text="mm" />                           | Minutes (00-59)        | 05                |
| <Copy text="m" />                            | Minutes (0-59)         | 5                 |
| <Copy text="ss" />                           | Seconds (00-59)        | 09                |
| <Copy text="s" />                            | Seconds (0-59)         | 9                 |
| <Copy text="ms" />                           | Milliseconds (0-999)   | 9                 |
| <Copy text="mss" />                          | Milliseconds (000-999) | 009               |
| <Copy text="A" />                            | AM/PM                  | PM                |
| <Copy text="a" />                            | am/pm                  | pm                |
| <Copy text="ZZ" />                           | TZ Offset ±HH:mm       | +06:00 or Z (UTC) |

:::danger[Note]

- To output raw text (i.e., not interpreted as a date token), wrap it in square brackets.
- For example, `[Today is] ddd` results in `Today is Sunday`, and `YYYY[ year]` results in `2025 year`.

- Supported format tokens include: `YYYY`, `YY`, `MMMM`, `MMM`, `MM`, `M`, `DD`, `D`, `dd`, `ddd`, `Do`, `HH`, `H`, `hh`, `h`, `mm`, `m`, `ss`, `s`, `ms`, `mss`, `a`, `A`, and `ZZ`.
- *Any token not wrapped in brackets will be parsed and replaced with its corresponding date component.*

:::
