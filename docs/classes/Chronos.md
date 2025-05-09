---
id: Chronos
title: Chronos - Play with Time and Date like Chronos.
---

<!-- markdownlint-disable-file MD024 -->
## Chronos Documentation

This documentation provides a detailed guide to the `Chronos` class, a comprehensive date and time manipulation class. The methods are grouped into logical categories for easier navigation.

## Comprehensive Method Reference

This documentation provides complete coverage of all 80 instance methods and 12 static methods in the Chronos library, organized into logical categories with detailed sections for each method.

## Table of Contents

- [Getters](#getters)
- [Format Methods](#format-methods)
- [Calculation Methods](#calculation-methods)
- [Static Methods](#static-methods)
- [Checker Methods](#checker-methods)
- [Conversion Methods](#conversion-methods)
- [Component Methods](#component-methods)
- [Relative Comparison Methods](#relative-comparison-methods)
- [Symbol Methods](#symbol-methods)

---

## Getters

### year

#### Signature

```typescript
get year(): number
```

#### Return Type

`number` - Full year (e.g., 2025)

#### Notes

- Returns the full 4-digit year
- Uses local time unless instance is UTC-based

#### Example

```javascript
new Chronos('2025-01-01').year; // 2025
```

### month

#### Signature

```typescript
get month(): number
```

#### Return Type

`number` - Month (0-11)

#### Notes

- 0 = January, 11 = December
- Consistent with JavaScript Date behavior

#### Example

```javascript
new Chronos('2025-01-01').month; // 0 (January)
```

### date

#### Signature

```typescript
get date(): number
```

#### Return Type

`number` - Day of month (1-31)

#### Example

```javascript
new Chronos('2025-01-15').date; // 15
```

### hour

#### Signature

```typescript
get hour(): number
```

#### Return Type

`number` - Hour (0-23)

#### Example

```javascript
new Chronos('2025-01-01T14:30:00').hour; // 14
```

### minute

#### Signature

```typescript
get minute(): number
```

#### Return Type

`number` - Minute (0-59)

#### Example

```javascript
new Chronos('2025-01-01T14:30:00').minute; // 30
```

### second

#### Signature

```typescript
get second(): number
```

#### Return Type

`number` - Second (0-59)

#### Example

```javascript
new Chronos('2025-01-01T14:30:45').second; // 45
```

### millisecond

#### Signature

```typescript
get millisecond(): number
```

#### Return Type

`number` - Millisecond (0-999)

#### Example

```javascript
new Chronos('2025-01-01T14:30:45.123').millisecond; // 123
```

### weekDay

#### Signature

```typescript
get weekDay(): number
```

#### Return Type

`number` - Day of week (0-6)

#### Notes

- 0 = Sunday, 6 = Saturday

#### Example

```javascript
new Chronos('2025-01-01').weekDay; // 0 (Sunday)
```

### isoWeekday

#### Signature

```typescript
get isoWeekday(): number
```

#### Return Type

`number` - ISO day of week (1-7)

#### Notes

- 1 = Monday, 7 = Sunday

#### Example

```javascript
new Chronos('2025-01-01').isoWeekday; // 7 (Sunday)
```

### isoMonth

#### Signature

```typescript
get isoMonth(): number
```

#### Return Type

`number` - Month (1-12)

#### Notes

- 1 = January, 12 = December

#### Example

```javascript
new Chronos('2025-01-01').isoMonth; // 1
```

### unix

#### Signature

```typescript
get unix(): number
```

#### Return Type

`number` - Unix timestamp in seconds

#### Example

```javascript
new Chronos('2025-01-01').unix; // 1672531200
```

### timestamp

#### Signature

```typescript
get timestamp(): number
```

#### Return Type

`number` - Milliseconds since epoch

#### Example

```javascript
new Chronos('2025-01-01').timestamp; // 1672531200000
```

### lastDateOfMonth

#### Signature

```typescript
get lastDateOfMonth(): 28 | 29 | 30 | 31
```

#### Return Type

`28 | 29 | 30 | 31` - Last day of month

#### Notes

- Accounts for leap years

#### Example

```javascript
new Chronos('2025-02-01').lastDateOfMonth; // 28
new Chronos('2024-02-01').lastDateOfMonth; // 29
```

---

## Format Methods

### format()

#### Signature

```typescript
format(format?: string, useUTC?: boolean): string
```

#### Parameters

- `format`: Format string (default: `'dd, mmm DD, YYYY HH:mm:ss'`)
- `useUTC`: Use UTC time (default: `false`)

#### Return Type

`string` - Formatted date

#### Format Tokens

| Token | Output | Example |
|-------|--------|---------|
| YYYY  | Full year | 2025 |
| YY    | 2-digit year | 23 |
| MMMM  | Full month | January |
| MMM   | Short month | Jan |
| MM    | 2-digit month | 01-12 |
| M     | Month | 1-12 |
| DD    | 2-digit day | 01-31 |
| D     | Day | 1-31 |
| Do    | Ordinal day | 1st, 2nd |
| dddd  | Full weekday | Monday |
| ddd   | Short weekday | Mon |
| HH    | 24-hour (00-23) | 14 |
| H     | 24-hour (0-23) | 14 |
| hh    | 12-hour (01-12) | 02 |
| h     | 12-hour (1-12) | 2 |
| mm    | Minutes (00-59) | 05 |
| m     | Minutes (0-59) | 5 |
| ss    | Seconds (00-59) | 09 |
| s     | Seconds (0-59) | 9 |
| A     | AM/PM | PM |
| a     | am/pm | pm |

#### Example

```javascript
const date = new Chronos('2025-01-15T14:30:00');
date.format('YYYY-MM-DD'); // "2025-01-15"
date.format('dddd, MMMM Do YYYY'); // "Wednesday, January 15th 2025"
date.format('h:mm A'); // "2:30 PM"
```

### formatUTC()

#### Signature

```typescript
formatUTC(format?: string): string
```

#### Parameters

- `format`: Format string (default: `'dd, mmm DD, YYYY HH:mm:ss:mss'`)

#### Return Type

`string` - Formatted UTC date

#### Notes

- Always uses UTC time regardless of instance configuration

#### Example

```javascript
const date = new Chronos('2025-01-15T14:30:00Z');
date.formatUTC('YYYY-MM-DD HH:mm:ss'); // "2025-01-15 14:30:00"
```

### formatStrict()

#### Signature

```typescript
formatStrict(format?: StrictFormat, useUTC?: boolean): string
```

#### Parameters

- `format`: Predefined strict format
- `useUTC`: Use UTC time (default: `false`)

#### Return Type

`string` - Formatted date

#### Notes

- Provides type-safe formatting with IntelliSense support
- See `StrictFormat` type for available formats

#### Example

```javascript
date.formatStrict('YYYY-MM-DD'); // Type-safe format
```

### toLocalISOString()

#### Signature

```typescript
toLocalISOString(): string
```

#### Return Type

`string` - ISO string with local offset

#### Notes

- Similar to native `toISOString()` but preserves local timezone

#### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toLocalISOString();
// "2025-01-01T00:00:00.000-05:00"
```

### toISOString()

#### Signature

```typescript
toISOString(): string
```

#### Return Type

`string` - Standard ISO 8601 string

#### Notes

- Always returns UTC time
- Consistent with native Date behavior

#### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toISOString();
// "2025-01-01T05:00:00.000Z"
```

### toLocaleString()

#### Signature

```typescript
toLocaleString(
  locale?: LocaleCode | Intl.Locale | (LocaleCode | Intl.Locale)[],
  options?: Intl.DateTimeFormatOptions
): string
```

#### Parameters

- `locale`: Locale string(s)
- `options`: Intl.DateTimeFormat options

#### Return Type

`string` - Localized date string

#### Notes

- Wrapper around native `Date.toLocaleString()`

#### Example

```javascript
new Chronos('2025-01-15').toLocaleString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
// "Wednesday, January 15, 2025"
```

### toString()

#### Signature

```typescript
toString(): string
```

#### Return Type

`string` - Date string

#### Notes

- Returns localized string representation
- Includes timezone information when relevant

#### Example

```javascript
new Chronos('2025-01-15').toString();
// "Sun Jan 15 2025 00:00:00 GMT-0500 (Eastern Standard Time)"
```

### toJSON()

#### Signature

```typescript
toJSON(): string
```

#### Return Type

`string` - ISO string

#### Notes

- Used by `JSON.stringify()`
- Same as `toISOString()`

#### Example

```javascript
JSON.stringify({ date: new Chronos('2025-01-15') });
// '{"date":"2025-01-15T00:00:00.000Z"}'
```

### inspect()

#### Signature

```typescript
inspect(): string
```

#### Return Type

`string` - Debug-friendly string

#### Notes

- Used by Node.js `util.inspect`
- Includes Chronos prefix

#### Example

```javascript
new Chronos('2025-01-15').inspect();
// "[Chronos 2025-01-15T00:00:00.000-05:00]"
```

### toAcademicYear()

#### Signature

```typescript
toAcademicYear(): `${number}-${number}`
```

#### Return Type

`string` - Academic year string

#### Notes

- Assumes academic year runs July-June

#### Example

```javascript
new Chronos('2025-01-15').toAcademicYear(); // "2022-2025"
new Chronos('2025-08-15').toAcademicYear(); // "2025-2024"
```

### toQuarter()

#### Signature

```typescript
toQuarter(): Quarter
```

#### Return Type

`Quarter` - Calendar quarter (1-4)

#### Notes

- Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec

#### Example

```javascript
new Chronos('2025-01-15').toQuarter(); // 1
new Chronos('2025-04-01').toQuarter(); // 2
```

### toFiscalQuarter()

#### Signature

```typescript
toFiscalQuarter(startMonth?: number): Quarter
```

#### Parameters

- `startMonth`: Fiscal year start month (1-12, default: 7)

#### Return Type

`Quarter` - Fiscal quarter (1-4)

#### Notes

- Default assumes fiscal year starts in July

#### Example

```javascript
new Chronos('2025-01-15').toFiscalQuarter(); // 3 (July-start year)
new Chronos('2025-01-15').toFiscalQuarter(10); // 2 (October-start year)
```

### calendar()

#### Signature

```typescript
calendar(baseDate?: ChronosInput): string
```

#### Parameters

- `baseDate`: Reference date (default: now)

#### Return Type

`string` - Human-readable relative date

#### Notes

- Returns strings like "Today at 3:00 PM", "Yesterday at 2:30 AM"

#### Example

```javascript
const date = new Chronos().subtract(1, 'day');
date.calendar(); // "Yesterday at [time]"
```

### fromNow()

#### Signature

```typescript
fromNow(
  level?: Exclude<TimeUnit, 'millisecond'>,
  withSuffixPrefix?: boolean,
  time?: ChronosInput
): string
```

#### Parameters

- `level`: Smallest unit to include (default: 'minute')
- `withSuffixPrefix`: Include "ago"/"in" (default: true)
- `time`: Comparison time (default: now)

#### Return Type

`string` - Human-readable duration

#### Example

```javascript
new Chronos().subtract(2, 'days').fromNow(); // "2 days ago"
new Chronos().add(3, 'hours').fromNow(); // "in 3 hours"
```

### fromNowShort()

#### Signature

```typescript
fromNowShort(): string
```

#### Return Type

`string` - Short duration string

#### Notes

- Returns strings like "2h ago", "in 5m"

#### Example

```javascript
new Chronos().subtract(150, 'minutes').fromNowShort(); // "2h ago"
```

### getPartOfDay()

#### Signature

```typescript
getPartOfDay(config?: Partial<DayPartConfig>): DayPart
```

#### Parameters

- `config`: Custom day part ranges

#### Return Type

`DayPart` - Current part of day

#### Default Ranges

| Part      | Range    |
|-----------|----------|
| midnight  | 00:00-01:00 |
| lateNight | 02:00-04:00 |
| morning   | 05:00-11:00 |
| afternoon | 12:00-16:00 |
| evening   | 17:00-20:00 |
| night     | 21:00-23:00 |

#### Example

```javascript
new Chronos('2025-01-15T09:00:00').getPartOfDay(); // "morning"
```

---
I'll continue with the detailed documentation for the remaining methods in the Chronos class.

## Calculation Methods

### add()

#### Signature

```typescript
add(amount: number, unit: TimeUnit): Chronos
```

#### Parameters

- `amount`: Number of units to add
- `unit`: Time unit to add ('year', 'month', 'day', etc.)

#### Return Type

`Chronos` - New instance with added time

#### Notes

- Returns new immutable instance
- Handles month/year overflow automatically

#### Example

```javascript
new Chronos('2025-01-31').add(1, 'month'); // 2025-02-28
```

### subtract()

#### Signature

```typescript
subtract(amount: number, unit: TimeUnit): Chronos
```

#### Parameters

- `amount`: Number of units to subtract
- `unit`: Time unit to subtract

#### Return Type

`Chronos` - New instance with subtracted time

#### Example

```javascript
new Chronos('2025-03-31').subtract(1, 'month'); // 2025-02-28
```

### diff()

#### Signature

```typescript
diff(other: ChronosInput, unit: TimeUnit): number
```

#### Parameters

- `other`: Date to compare with
- `unit`: Unit for difference

#### Return Type

`number` - Difference in specified units

#### Notes

- Returns signed difference (negative if other is after this date)

#### Example

```javascript
const date1 = new Chronos('2025-01-01');
const date2 = new Chronos('2025-01-15');
date2.diff(date1, 'days'); // 14
```

### duration()

#### Signature

```typescript
duration(toTime?: ChronosInput, absolute?: boolean): TimeDuration
```

#### Parameters

- `toTime`: End date (default: now)
- `absolute`: Return absolute values (default: true)

#### Return Type

`TimeDuration` - Object with breakdown

```typescript
interface TimeDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
```

#### Example

```javascript
new Chronos('2020-01-01').duration('2025-01-01');
// {years: 3, months: 0, days: 0, ...}
```

### round()

#### Signature

```typescript
round(unit: TimeUnit, nearest?: number): Chronos
```

#### Parameters

- `unit`: Unit to round to
- `nearest`: Nearest multiple (default: 1)

#### Return Type

`Chronos` - Rounded date

#### Example

```javascript
new Chronos('2025-01-15T14:35:30').round('hour'); // 2025-01-15T15:00:00
new Chronos('2025-01-15T14:35:30').round('minute', 15); // 2025-01-15T14:30:00
```

## Static Methods

### parse()

#### Signature

```typescript
static parse(dateStr: string, format: string): Chronos
```

#### Parameters

- `dateStr`: Date string to parse
- `format`: Format string

#### Return Type

`Chronos` - Parsed date

#### Supported Tokens

- `YYYY`, `YY` - Year
- `MM`, `M` - Month
- `DD`, `D` - Day
- `HH`, `H` - Hour
- `mm`, `m` - Minute
- `ss`, `s` - Second

#### Example

```javascript
Chronos.parse('15-01-2025', 'DD-MM-YYYY'); // Jan 15 2025
```

### today()

#### Signature

```typescript
static today(options?: FormatOptions): string
```

#### Parameters

- `options`: Formatting options

```typescript
interface FormatOptions {
  format?: string;
  useUTC?: boolean;
}
```

#### Return Type

`string` - Formatted current date

#### Example

```javascript
Chronos.today({format: 'YYYY-MM-DD'}); // "2025-07-20"
```

### yesterday()

#### Signature

```typescript
static yesterday(): Chronos
```

#### Return Type

`Chronos` - Yesterday's date

#### Example

```javascript
Chronos.yesterday(); // Chronos instance for yesterday
```

### tomorrow()

#### Signature

```typescript
static tomorrow(): Chronos
```

#### Return Type

`Chronos` - Tomorrow's date

#### Example

```javascript
Chronos.tomorrow(); // Chronos instance for tomorrow
```

### now()

#### Signature

```typescript
static now(): number
```

#### Return Type

`number` - Current timestamp

#### Notes

- Same as `Date.now()`

#### Example

```javascript
Chronos.now(); // 1689876543210
```

### utc()

#### Signature

```typescript
static utc(dateLike: ChronosInput): Chronos
```

#### Parameters

- `dateLike`: Date input

#### Return Type

`Chronos` - UTC instance

#### Example

```javascript
Chronos.utc('2025-01-15'); // UTC instance
```

### min()

#### Signature

```typescript
static min(...dates: ChronosInput[]): Chronos
```

#### Parameters

- `dates`: Dates to compare

#### Return Type

`Chronos` - Earliest date

#### Example

```javascript
Chronos.min('2025-01-01', '2025-02-01'); // Jan 1
```

### max()

#### Signature

```typescript
static max(...dates: ChronosInput[]): Chronos
```

#### Parameters

- `dates`: Dates to compare

#### Return Type

`Chronos` - Latest date

#### Example

```javascript
Chronos.max('2025-01-01', '2025-02-01'); // Feb 1
```

### isLeapYear()

#### Signature

```typescript
static isLeapYear(date: ChronosInput): boolean
```

#### Parameters

- `date`: Date to check

#### Return Type

`boolean` - Whether year is leap

#### Example

```javascript
Chronos.isLeapYear(2024); // true
```

### isValidDate()

#### Signature

```typescript
static isValidDate(value: unknown): value is Date
```

#### Parameters

- `value`: Value to check

#### Return Type

`boolean` - Whether valid Date

#### Example

```javascript
Chronos.isValidDate(new Date()); // true
```

### isDateString()

#### Signature

```typescript
static isDateString(value: unknown): value is string
```

#### Parameters

- `value`: Value to check

#### Return Type

`boolean` - Whether valid date string

#### Example

```javascript
Chronos.isDateString('2025-01-01'); // true
```

### isValidChronos()

#### Signature

```typescript
static isValidChronos(value: unknown): value is Chronos
```

#### Parameters

- `value`: Value to check

#### Return Type

`boolean` - Whether Chronos instance

#### Example

```javascript
Chronos.isValidChronos(new Chronos()); // true
```

## Checker Methods

### isBefore()

#### Signature

```typescript
isBefore(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: number): boolean
```

#### Parameters

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`boolean` - Whether date is before

#### Example

```javascript
new Chronos('2025-01-01').isBefore('2025-02-01'); // true
```

### isAfter()

#### Signature

```typescript
isAfter(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: number): boolean
```

#### Parameters

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`boolean` - Whether date is after

#### Example

```javascript
new Chronos('2025-02-01').isAfter('2025-01-01'); // true
```

### isSame()

#### Signature

```typescript
isSame(other: ChronosInput, unit?: TimeUnit, weekStartsOn?: number): boolean
```

#### Parameters

- `other`: Date to compare
- `unit`: Comparison unit
- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`boolean` - Whether dates match

#### Example

```javascript
new Chronos('2025-01-15').isSame('2025-01-15', 'day'); // true
```

### isBetween()

#### Signature

```typescript
isBetween(
  start: ChronosInput,
  end: ChronosInput,
  inclusive?: '[]' | '[)' | '(]' | '()'
): boolean
```

#### Parameters

- `start`: Range start
- `end`: Range end
- `inclusive`: Range inclusivity (default: '()')

#### Return Type

`boolean` - Whether date is in range

#### Example

```javascript
new Chronos('2025-01-15').isBetween('2025-01-01', '2025-01-31'); // true
```

### isToday()

#### Signature

```typescript
isToday(): boolean
```

#### Return Type

`boolean` - Whether date is today

#### Example

```javascript
new Chronos().isToday(); // true
```

### isYesterday()

#### Signature

```typescript
isYesterday(): boolean
```

#### Return Type

`boolean` - Whether date is yesterday

#### Example

```javascript
new Chronos().subtract(1, 'day').isYesterday(); // true
```

### isTomorrow()

#### Signature

```typescript
isTomorrow(): boolean
```

#### Return Type

`boolean` - Whether date is tomorrow

#### Example

```javascript
new Chronos().add(1, 'day').isTomorrow(); // true
```

### isWeekend()

#### Signature

```typescript
isWeekend(weekStartsOn?: number, weekendLength?: 1 | 2): boolean
```

#### Parameters

- `weekStartsOn`: Week start day (default: 0)
- `weekendLength`: Weekend days (default: 2)

#### Return Type

`boolean` - Whether weekend

#### Example

```javascript
new Chronos('2025-01-15').isWeekend(); // true (Sunday)
```

### isWorkday()

#### Signature

```typescript
isWorkday(weekStartsOn?: number, weekendLength?: 1 | 2): boolean
```

#### Parameters

- `weekStartsOn`: Week start day (default: 0)
- `weekendLength`: Weekend days (default: 2)

#### Return Type

`boolean` - Whether workday

#### Example

```javascript
new Chronos('2025-01-16').isWorkday(); // true (Monday)
```

### isBusinessHour()

#### Signature

```typescript
isBusinessHour(
  businessStartHour?: number,
  businessEndHour?: number,
  weekStartsOn?: number,
  weekendLength?: 1 | 2
): boolean
```

#### Parameters

- `businessStartHour`: Start hour (default: 9)
- `businessEndHour`: End hour (default: 17)
- `weekStartsOn`: Week start day (default: 0)
- `weekendLength`: Weekend days (default: 2)

#### Return Type

`boolean` - Whether business hour

#### Example

```javascript
new Chronos('2025-01-16T10:00:00').isBusinessHour(); // true
```

### isPalindromeDate()

#### Signature

```typescript
isPalindromeDate(shortYear?: boolean): boolean
```

#### Parameters

- `shortYear`: Use 2-digit year (default: false)

#### Return Type

`boolean` - Whether palindrome date

#### Example

```javascript
new Chronos('2020-02-02').isPalindromeDate(); // true
```

### isDST()

#### Signature

```typescript
isDST(): boolean
```

#### Return Type

`boolean` - Whether daylight saving time

#### Notes

- Uses system timezone

#### Example

```javascript
new Chronos('2025-07-01').isDST(); // true (in northern hemisphere)
```

### isFirstDayOfMonth()

#### Signature

```typescript
isFirstDayOfMonth(): boolean
```

#### Return Type

`boolean` - Whether first day

#### Example

```javascript
new Chronos('2025-01-01').isFirstDayOfMonth(); // true
```

### isLastDayOfMonth()

#### Signature

```typescript
isLastDayOfMonth(): boolean
```

#### Return Type

`boolean` - Whether last day

#### Example

```javascript
new Chronos('2025-01-31').isLastDayOfMonth(); // true
```

## Conversion Methods

### toDate()

#### Signature

```typescript
toDate(): Date
```

#### Return Type

`Date` - Native Date object

#### Notes

- Returns new Date instance

#### Example

```javascript
new Chronos('2025-01-15').toDate(); // Date object
```

### toUTC()

#### Signature

```typescript
toUTC(): Chronos
```

#### Return Type

`Chronos` - UTC instance

#### Example

```javascript
new Chronos('2025-01-15').toUTC(); // UTC-converted instance
```

### toLocal()

#### Signature

```typescript
toLocal(): Chronos
```

#### Return Type

`Chronos` - Local time instance

#### Example

```javascript
Chronos.utc('2025-01-15').toLocal(); // Local time instance
```

### timeZone()

#### Signature

```typescript
timeZone(zone: TimeZone | UTCOffSet): Chronos
```

#### Parameters

- `zone`: Timezone identifier or offset

#### Return Type

`Chronos` - Instance in specified timezone

#### Example

```javascript
new Chronos('2025-01-15').timeZone('EST'); // Eastern Time instance
```

### getUTCOffset()

#### Signature

```typescript
getUTCOffset(): string
```

#### Return Type

`string` - Offset string (e.g. "+05:30")

#### Example

```javascript
new Chronos('2025-01-15').getUTCOffset(); // "-05:00" (EST)
```

## Component Methods

### get()

#### Signature

```typescript
get(unit: TimeUnit): number
```

#### Parameters

- `unit`: Time unit to get

#### Return Type

`number` - Component value

#### Example

```javascript
new Chronos('2025-01-15').get('month'); // 0 (January)
```

### set()

#### Signature

```typescript
set(unit: TimeUnit, value: number): Chronos
```

#### Parameters

- `unit`: Time unit to set
- `value`: Value to set

#### Return Type

`Chronos` - New instance with updated value

#### Example

```javascript
new Chronos('2025-01-15').set('month', 5); // June 15
```

### startOf()

#### Signature

```typescript
startOf(unit: TimeUnit, weekStartsOn?: number): Chronos
```

#### Parameters

- `unit`: Unit to start from
- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`Chronos` - Start of period

#### Example

```javascript
new Chronos('2025-01-15').startOf('month'); // Jan 1
```

### endOf()

#### Signature

```typescript
endOf(unit: TimeUnit, weekStartsOn?: number): Chronos
```

#### Parameters

- `unit`: Unit to end at
- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`Chronos` - End of period

#### Example

```javascript
new Chronos('2025-01-15').endOf('month'); // Jan 31 23:59:59.999
```

### firstDayOfMonth()

#### Signature

```typescript
firstDayOfMonth(): Chronos
```

#### Return Type

`Chronos` - First day of month

#### Example

```javascript
new Chronos('2025-01-15').firstDayOfMonth(); // Jan 1
```

### lastDayOfMonth()

#### Signature

```typescript
lastDayOfMonth(): Chronos
```

#### Return Type

`Chronos` - Last day of month

#### Example

```javascript
new Chronos('2025-01-15').lastDayOfMonth(); // Jan 31
```

### getWeek()

#### Signature

```typescript
getWeek(): number
```

#### Return Type

`number` - ISO week number (1-53)

#### Example

```javascript
new Chronos('2025-01-01').getWeek(); // 52 (previous year)
```

### setWeek()

#### Signature

```typescript
setWeek(week: number): Chronos
```

#### Parameters

- `week`: Week number to set

#### Return Type

`Chronos` - Instance at start of week

#### Example

```javascript
new Chronos('2025-01-01').setWeek(1); // Jan 2 (ISO week 1)
```

### getWeekOfYear()

#### Signature

```typescript
getWeekOfYear(weekStartsOn?: number): number
```

#### Parameters

- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`number` - Week number (1-53)

#### Example

```javascript
new Chronos('2025-01-01').getWeekOfYear(); // 1 (Sunday-start week)
```

### getWeekYear()

#### Signature

```typescript
getWeekYear(weekStartsOn?: number): number
```

#### Parameters

- `weekStartsOn`: Week start day (default: 0)

#### Return Type

`number` - ISO week-numbering year

#### Example

```javascript
new Chronos('2025-01-01').getWeekYear(); // 2022 (ISO year)
```

### getDayOfYear()

#### Signature

```typescript
getDayOfYear(): number
```

#### Return Type

`number` - Day of year (1-366)

#### Example

```javascript
new Chronos('2025-01-01').getDayOfYear(); // 1
```

### getZodiacSign()

#### Signature

```typescript
getZodiacSign(): ZodiacSign
```

#### Return Type

`ZodiacSign` - Western zodiac sign

#### Example

```javascript
new Chronos('2025-01-15').getZodiacSign(); // "Capricorn"
```

### daysInMonth()

#### Signature

```typescript
daysInMonth(): number
```

#### Return Type

`number` - Days in month

#### Example

```javascript
new Chronos('2025-02-01').daysInMonth(); // 28
```

### toObject()

#### Signature

```typescript
toObject(): ChronosObject
```

#### Return Type

`ChronosObject` - Date components

```typescript
interface ChronosObject {
  year: number;
  month: number;
  isoMonth: number;
  date: number;
  weekDay: number;
  isoWeekDay: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  timestamp: number;
  unix: number;
}
```

#### Example

```javascript
new Chronos('2025-01-15').toObject();
// {year: 2025, month: 0, isoMonth: 1, ...}
```

### toArray()

#### Signature

```typescript
toArray(): number[]
```

#### Return Type

`number[]` - Date component values

#### Example

```javascript
new Chronos('2025-01-15').toArray();
// [2025, 0, 1, 15, 0, 0, 0, 0, 0, 1673740800000, 1673740800]
```

Here's the detailed documentation for the remaining methods you've highlighted:

## Relative Comparison Methods

### compare()

#### Signature

```typescript
compare(unit: TimeUnit = 'minute', time?: ChronosInput): number
```

#### Parameters

- `unit`: Time unit for comparison (default: 'minute')
- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Difference in specified units

#### Notes

- Negative value indicates past time relative to comparison time
- Positive value indicates future time
- Wrapper around the various `getRelative*` methods

#### Example

```javascript
const pastDate = new Chronos().subtract(2, 'days');
pastDate.compare('day'); // -2

const futureDate = new Chronos().add(3, 'hours'); 
futureDate.compare('hour'); // 3
```

### getRelativeYear()

#### Signature

```typescript
getRelativeYear(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Full year difference

#### Notes

- Counts complete years between dates
- Accounts for month/day position

#### Example

```javascript
const date = new Chronos('2020-06-15');
date.getRelativeYear('2023-05-01'); // -2 (not quite 3 years)
date.getRelativeYear('2023-07-01'); // -3
```

### getRelativeMonth()

#### Signature

```typescript
getRelativeMonth(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Full month difference

#### Notes

- Counts complete months between dates
- Accounts for day position

#### Example

```javascript
const date = new Chronos('2023-01-15');
date.getRelativeMonth('2023-03-10'); // -1 (not quite 2 months)
date.getRelativeMonth('2023-03-20'); // -2
```

### getRelativeDay()

#### Signature

```typescript
getRelativeDay(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Day difference

#### Special Values

- `-1`: Yesterday
- `0`: Today
- `1`: Tomorrow

#### Example

```javascript
const today = new Chronos();
today.getRelativeDay(); // 0

const yesterday = new Chronos().subtract(1, 'day');
yesterday.getRelativeDay(); // -1

const tomorrow = new Chronos().add(1, 'day');
tomorrow.getRelativeDay(); // 1
```

### getRelativeWeek()

#### Signature

```typescript
getRelativeWeek(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Week difference

#### Notes

- Based on 7-day periods
- Uses same calculation as `getRelativeDay()` divided by 7

#### Example

```javascript
new Chronos().getRelativeWeek('2023-01-01'); // Weeks between dates
```

### getRelativeHour()

#### Signature

```typescript
getRelativeHour(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Hour difference

#### Example

```javascript
const date = new Chronos().add(90, 'minutes');
date.getRelativeHour(); // 1 (full hours)
```

### getRelativeMinute()

#### Signature

```typescript
getRelativeMinute(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Minute difference

#### Example

```javascript
const date = new Chronos().add(150, 'seconds');
date.getRelativeMinute(); // 2 (full minutes)
```

### getRelativeSecond()

#### Signature

```typescript
getRelativeSecond(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Second difference

#### Example

```javascript
const date = new Chronos().add(1500, 'milliseconds');
date.getRelativeSecond(); // 1 (full seconds)
```

### getRelativeMilliSecond()

#### Signature

```typescript
getRelativeMilliSecond(time?: ChronosInput): number
```

#### Parameters

- `time`: Optional comparison time (default: now)

#### Return Type

`number` - Millisecond difference

#### Notes

- Most precise relative comparison
- Returns raw millisecond delta

#### Example

```javascript
const date = new Chronos().add(500, 'milliseconds');
date.getRelativeMilliSecond(); // 500
```

These methods complete the relative comparison functionality in Chronos, providing:

- Multiple granularities (years to milliseconds)
- Signed values indicating past/future
- Flexible comparison points
- Consistent immutable return types

The relative methods are particularly useful for:

- Age calculations
- Countdowns/timers
- Expiration checks
- Time-sensitive conditional logic

## Symbol Methods

### [Symbol.toPrimitive]

#### Signature

```typescript
[Symbol.toPrimitive](hint: string): string | number
```

#### Parameters

- `hint`: Conversion hint ('number' or 'string')

#### Return Type

`string | number` - Primitive value

#### Behavior

- `number` hint: Returns timestamp
- Other hints: Returns ISO string

#### Example

```javascript
+new Chronos(); // timestamp
`${new Chronos()}`; // ISO string
```

### [Symbol.toStringTag]

#### Signature

```typescript
get [Symbol.toStringTag](): string
```

#### Return Type

`string` - String tag

#### Notes

- Used by `Object.prototype.toString()`

#### Example

```javascript
Object.prototype.toString.call(new Chronos()); // "[object Chronos]"
```

### [Symbol.iterator]

#### Signature

```typescript
*[Symbol.iterator](): IterableIterator<[string, number]>
```

#### Return Type

`IterableIterator<[string, number]>` - Date components

#### Notes

- Allows destructuring and iteration

#### Example

```javascript
for (const [key, value] of new Chronos()) {
  console.log(key, value);
}
// "year" 2025
// "month" 0
// ...
```

This completes the comprehensive documentation of all 80 instance methods and 12 static methods in the Chronos class. Each method includes:

- Signature with TypeScript types
- Parameters documentation
- Return type
- Detailed notes
- Usage examples
- Special behaviors

The methods are organized into logical categories for easier navigation while maintaining all the requested detailed sections for each method.
