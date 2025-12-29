---
id: BanglaCalendar
title: BanglaCalendar - Bengali Date Manipulation
---

<!-- markdownlint-disable-file MD024 -->

## `BanglaCalendar`

The `BanglaCalendar` class provides utilities for handling dates in the Bengali calendar system. It supports creation, manipulation, and conversion between Bengali and Gregorian calendars with two variants: `'revised-2019'` (default) and `'revised-1966'`.

### Import

```ts
import { BanglaCalendar } from 'nhb-toolbox';
// or
import { BanglaCalendar } from 'nhb-toolbox/bn-calendar';
```

### Constructor

Creates a new `BanglaCalendar` instance from various input formats.

#### Constructor Signatures

**Signature 1:** From current date with optional configuration

```typescript
constructor(config?: BnCalendarConfig)
```

**Signature 2:** From Bangla or Gregorian date string

```typescript
constructor(date: string, config?: BnCalendarConfig)
```

**Signature 3:** From Date object

```typescript
constructor(date: Date, config?: BnCalendarConfig)
```

**Signature 4:** From timestamp or Bangla year (Latin digits)

```typescript
constructor(tsOrBnYear: number, config?: BnCalendarConfig)
```

**Signature 5:** From Bangla year (Bangla digits)

```typescript
constructor(bnYear: BanglaYear, config?: BnCalendarConfig)
```

**Signature 6:** From Bangla year and month (Latin digits)

```typescript
constructor(bnYear: number, bnMonth: NumberRange<1, 12>, config?: BnCalendarConfig)
```

**Signature 7:** From Bangla year and month (Bangla digits)

```typescript
constructor(bnYear: BanglaYear, bnMonth: BanglaMonth, config?: BnCalendarConfig)
```

**Signature 8:** From Bangla year, month, and day (Latin digits)

```typescript
constructor(
  bnYear: number,
  bnMonth: NumberRange<1, 12>,
  bnDate: NumberRange<1, 31>,
  config?: BnCalendarConfig
)
```

**Signature 9:** From Bangla year, month, and day (Bangla digits)

```typescript
constructor(
  bnYear: BanglaYear,
  bnMonth: BanglaMonth,
  bnDate: BanglaDate,
  config?: BnCalendarConfig
)
```

#### Parameters

- `date`: Various date formats including Bangla date strings, Gregorian date strings, Date objects, timestamps, or individual date components
- `bnYear`: Bengali year in either Bangla (`০-৯৯৯৯`) or Latin (`0-9999`) digits
- `bnMonth`: Bengali month (1-12 or `১-১২`)
- `bnDate`: Bengali day of month (1-31 or `১-৩১`)
- `config`: Optional configuration object with `variant` property (`'revised-2019'` or `'revised-1966'`)

#### Behavior

- Automatically detects input format and parses accordingly
- Defaults to current date if no valid input is provided
- Uses `'revised-2019'` variant by default
- Validates all date components
- Handles leap years according to the selected variant

#### Examples

```typescript
// Current date
new BanglaCalendar();

// From Bangla date string
new BanglaCalendar('১৪৩২-১১-০৮');

// From Gregorian date string
new BanglaCalendar('2023-04-14');

// From Date object
new BanglaCalendar(new Date('2023-04-14'));

// From Bangla year, month, date (Latin)
new BanglaCalendar(1430, 1, 1);

// From Bangla year, month, date (Bangla)
new BanglaCalendar('১৪৩০', '১', '১');

// With specific variant
new BanglaCalendar('১৪৩০', '১', '১', { variant: 'revised-1966' });
```

---

### Available Methods

- **Instance Methods**
  - [valueOf](#valueof)
  - [isLeapYear](#isleapyear)
  - [toDate](#todate)
  - [getSeasonName](#getseasonname)
  - [getMonthName](#getmonthname)
  - [getDayName](#getdayname)
  - [startOfMonth](#startofmonth)
  - [endOfMonth](#endofmonth)
  - [startOfYear](#startofyear)
  - [endOfYear](#endofyear)
  - [daysInMonth](#daysinmonth)
  - [toJSON](#tojson)
  - [toString](#tostring)
  - [toStringEn](#tostringen)
  - [format](#format)
  - [addDays](#adddays)
  - [addWeeks](#addweeks)
  - [addMonths](#addmonths)
  - [addYears](#addyears)
  - [$hasVariantConfig](#hasvariantconfig)

- **Static Methods**
  - [isBanglaYear](#isbanglayear)
  - [isBanglaYearEn](#isbanglayear)
  - [isBanglaMonth](#isbanglamonth)
  - [isBanglaMonthEn](#isbanglamonthen)
  - [isBanglaDate](#isbangladate)
  - [isBanglaDateEn](#isbangladateen)
  - [isBanglaDateString](#isbangladatestring)

- **Symbol Methods**

  - [Symbol.toPrimitive](#symboltoprimitive)
  - [Symbol.toStringTag](#symboltostringtag)

---

### Properties

#### variant

```typescript
readonly variant: BnCalendarVariant
```

The calendar variant being used (`'revised-2019'` or `'revised-1966'`).

**Example:**

```typescript
const cal2019 = new BanglaCalendar(); // Default: 'revised-2019'
console.log(cal2019.variant); // 'revised-2019'

const cal1966 = new BanglaCalendar({ variant: 'revised-1966' });
console.log(cal1966.variant); // 'revised-1966'

// Different leap year behavior
console.log(cal2019.isLeapYear()); // Follows Gregorian rules
console.log(cal1966.isLeapYear()); // Follows Bangla year % 4 === 2 rule
```

#### year

```typescript
readonly year: Readonly<{
  bn: BanglaYear;    // Bangla year in Bangla digits
  en: number;        // Bangla year in Latin digits
}>
```

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০১-০১');
console.log(bnCal.year.bn);  // '১৪৩০' (Bangla digits)
console.log(bnCal.year.en);  // 1430 (Latin digits)

// Type-safe access
const banglaYear: string = bnCal.year.bn; // Type: BanglaYear
const latinYear: number = bnCal.year.en;  // Type: number
```

#### month

```typescript
readonly month: Readonly<{
  bn: BanglaMonth;   // Bangla month in Bangla digits (১-১২)
  en: NumberRange<1, 12>;  // Bangla month in Latin digits (1-12)
}>
```

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০৫-১৫'); // ভাদ্র ১৫
console.log(bnCal.month.bn);  // '৫' (Bangla digits)
console.log(bnCal.month.en);  // 5 (Latin digits, 1-based)

// Get month name to verify
console.log(bnCal.getMonthName()); // 'ভাদ্র'
console.log(bnCal.getMonthName('en')); // 'Bhadro'

// Type-safe access
const monthNumber: number = bnCal.month.en; // Type: NumberRange<1, 12>
```

#### date

```typescript
readonly date: Readonly<{
  bn: BanglaDate;    // Bangla day of month in Bangla digits (১-৩১)
  en: NumberRange<1, 31>;  // Bangla day of month in Latin digits (1-31)
}>
```

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০৫-১৫'); // ১৫ ভাদ্র
console.log(bnCal.date.bn);  // '১৫' (Bangla digits)
console.log(bnCal.date.en);  // 15 (Latin digits)

// Type-safe access
const dayNumber: number = bnCal.date.en; // Type: NumberRange<1, 31>
```

#### gregorian

```typescript
readonly gregorian: Readonly<{
  year: number;      // Gregorian year
  month: NumberRange<1, 12>;  // Gregorian month (1-12)
  date: NumberRange<1, 31>;   // Gregorian day of month (1-31)
}>
```

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০১-০১'); // ১ বৈশাখ ১৪৩০
console.log(bnCal.gregorian.year);   // 2023
console.log(bnCal.gregorian.month);  // 4 (April)
console.log(bnCal.gregorian.date);   // 14

// Verify conversion
const gregorianDate = bnCal.toDate();
console.log(gregorianDate); // Date: Fri Apr 14 2023 00:00:00 GMT+0000

// Conversion works both ways
const fromGregorian = new BanglaCalendar(new Date(2023, 3, 14)); // April 14, 2023
console.log(fromGregorian.toJSON()); // '১৪৩০-০১-০১'
```

#### weekDay

```typescript
readonly weekDay: Enumerate<7>
```

Day of the week (0-6, where 0 is Sunday/রবিবার).

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০১-০১'); // Friday, April 14, 2023
console.log(bnCal.weekDay); // 5 (Friday)

// Get day name to verify
console.log(bnCal.getDayName());     // 'শুক্রবার'
console.log(bnCal.getDayName('en')); // 'Shukrobar (Friday)'

// Check specific days
if (bnCal.weekDay === 0) {
  console.log('It is Sunday (রবিবার)');
} else if (bnCal.weekDay === 5) {
  console.log('It is Friday (শুক্রবার)');
}
```

#### isoWeekDay

```typescript
readonly isoWeekDay: NumberRange<1, 7>
```

ISO weekday (1 = Monday, 7 = Sunday).

**Example:**

```typescript
const bnCal = new BanglaCalendar('১৪৩০-০১-০১'); // Friday, April 14, 2023
console.log(bnCal.isoWeekDay); // 5 (Friday in ISO format)

// Compare with weekDay
console.log(bnCal.weekDay);    // 5 (0-based, Sunday=0)
console.log(bnCal.isoWeekDay); // 5 (1-based, Monday=1)

// Useful for ISO-compliant calculations
const isWeekend = bnCal.isoWeekDay >= 6; // Saturday or Sunday
console.log(isWeekend); // false (Friday is not weekend)

// ISO week starts on Monday
const mondayDate = bnCal.addDays(1 - bnCal.isoWeekDay); // Get Monday of the week
console.log(mondayDate.toJSON()); // Get Monday's date
```

---

### Examples

#### Basic Usage

```typescript
const today = new BanglaCalendar();
console.log(today.toString()); // "শুক্রবার, ১ বৈশাখ, ১৪৩০ [গ্রীষ্ম]"
console.log(today.toJSON());   // "১৪৩০-০১-০১"

const specificDate = new BanglaCalendar('১৪৩২-১১-০৮');
console.log(specificDate.getMonthName()); // "ফাল্গুন"
```

#### Date Conversion

```typescript
const bnDate = new BanglaCalendar('১৪৩০', '১', '১');
const gregorianDate = bnDate.toDate();
console.log(gregorianDate.toISOString()); // "2023-04-14T00:00:00.000Z"
```

#### Month Operations

```typescript
const date = new BanglaCalendar('১৪৩০', '৫', '১৫');
console.log(date.startOfMonth().toString()); // "১ জ্যৈষ্ঠ ১৪৩০"
console.log(date.endOfMonth().toString());   // "৩১ জ্যৈষ্ঠ ১৪৩০"
```

---

## Aliases

`BanglaCalendar` can also be imported using **BnCalendar** and **Bongabdo** aliases.

---

## API Reference for BanglaCalendar

### valueOf()

Gets the numeric timestamp (in milliseconds) for the current Bangla date.

#### Signature

```typescript
valueOf(): number
```

#### Return Value

Unix timestamp in milliseconds representing the Gregorian equivalent of the current Bangla date.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১');
const timestamp = bnCal.valueOf(); // 1681430400000 (equivalent to April 14, 2023)
```

#### Remarks

- Internally calls [**`toDate().getTime()`**](#todate) to convert the Bangla date to Gregorian and get its timestamp
- The time component is normalized to midnight UTC during conversion
- This method is automatically called when the instance is used in numeric contexts

---

### isLeapYear()

Checks if the current Bangla year is a leap year according to the selected calendar variant.

#### Signature

```typescript
isLeapYear(): boolean
```

#### Return Value

`true` if the year is a leap year, `false` otherwise.

#### Example

```typescript
const date = new BanglaCalendar(1430, 1, 1);
const isLeap = date.isLeapYear(); // false
```

#### Remarks

- **Revised-2019**: Follows Gregorian leap year rules (divisible by 4, not by 100 unless also divisible by 400)
- **Revised-1966**: Leap year when `bnYear % 4 === 2`

---

### toDate()

Converts the Bangla calendar date to a JavaScript Date object.

#### Signature

```typescript
toDate(): Date
```

#### Return Value

Gregorian Date object equivalent to the Bangla date.

#### Example

```typescript
const bnDate = new BanglaCalendar('১৪৩০', '১', '১');
const gregorianDate = bnDate.toDate(); // Date for April 14, 2023
```

#### Remarks

- Time component is always set to `00:00:00` in UTC
- Accounts for calendar variant and leap year rules

---

### getSeasonName()

Gets the Bangla season name for the current date.

#### Signature

```typescript
getSeasonName<Locale extends $BnEn = 'bn'>(locale?: Locale): BanglaSeasonName<Locale>
```

#### Parameters

- `locale`: Output locale (`'bn'` for Bengali, `'en'` for English). Defaults to `'bn'`.

#### Return Value

Name of the season in the specified locale.

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14');
bnCal.getSeasonName(); // "গ্রীষ্ম"
bnCal.getSeasonName('en'); // "Grisma (Summer)"
```

#### Seasons

- গ্রীষ্ম (Summer): Mid-April to Mid-June
- বর্ষা (Monsoon): Mid-June to Mid-August
- শরৎ (Autumn): Mid-August to Mid-October
- হেমন্ত (Late Autumn): Mid-October to Mid-December
- শীত (Winter): Mid-December to Mid-February
- বসন্ত (Spring): Mid-February to Mid-April

---

### getMonthName()

Gets the Bangla name of the month for the current date.

#### Signature

```typescript
getMonthName<Locale extends $BnEn = 'bn'>(locale?: Locale): BanglaMonthName<Locale>
```

#### Parameters

- `locale`: Output locale (`'bn'` for Bengali, `'en'` for English). Defaults to `'bn'`.

#### Return Value

Name of the month in the specified locale.

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14');
bnCal.getMonthName(); // "বৈশাখ"
bnCal.getMonthName('en'); // "Boishakh"
```

---

### getDayName()

Gets the Bangla name of the weekday for the current date.

#### Signature

```typescript
getDayName<Locale extends $BnEn = 'bn'>(locale?: Locale): BanglaDayName<Locale>
```

#### Parameters

- `locale`: Output locale (`'bn'` for Bengali, `'en'` for English). Defaults to `'bn'`.

#### Return Value

Name of the weekday in the specified locale.

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14'); // Friday
bnCal.getDayName(); // "শুক্রবার"
bnCal.getDayName('en'); // "Shukrobar (Friday)"
```

---

### startOfMonth()

Gets a new BanglaCalendar instance representing the first day of the current month.

#### Signature

```typescript
startOfMonth(): BanglaCalendar
```

#### Return Value

A BanglaCalendar instance set to the 1st day of the current month.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '৫', '১৫');
const startOfMonth = bnCal.startOfMonth(); // ১ জ্যৈষ্ঠ ১৪৩০
```

#### Remarks

- Preserves the calendar variant of the original
- Time component is set to midnight UTC

---

### endOfMonth()

Gets a new `BanglaCalendar` instance representing the last day of the current month.

#### Signature

```typescript
endOfMonth(): BanglaCalendar
```

#### Return Value

A `BanglaCalendar` instance set to the last day of the current month.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '৫', '১৫');
const endOfMonth = bnCal.endOfMonth(); // ৩১ জ্যৈষ্ঠ ১৪৩০
```

#### Remarks

- Accounts for month length variations (29/30/31 days)
- Includes leap year adjustments

---

### startOfYear()

Gets a new `BanglaCalendar` instance representing the first day of the current year (১ বৈশাখ).

#### Signature

```typescript
startOfYear(): BanglaCalendar
```

#### Return Value

A `BanglaCalendar` instance set to ১ বৈশাখ of the current year.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '৫', '১৫');
const startOfYear = bnCal.startOfYear(); // ১ বৈশাখ ১৪৩০
```

---

### endOfYear()

Gets a new `BanglaCalendar` instance representing the last day of the current year (৩০ চৈত্র).

#### Signature

```typescript
endOfYear(): BanglaCalendar
```

#### Return Value

A `BanglaCalendar` instance set to ৩০ চৈত্র of the current year.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '৫', '১৫');
const endOfYear = bnCal.endOfYear(); // ৩০ চৈত্র ১৪৩০
```

---

### daysInMonth()

Gets the number of days in a Bangla month.

#### Signature

```typescript
daysInMonth(month?: NumberRange<1, 12>): NumberRange<29, 31>
```

#### Parameters

- `month`: Optional Bangla month (1-12 in Latin digits). If not provided, uses the current month.

#### Return Value

Number of days in the specified month (29, 30, or 31).

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১');
bnCal.daysInMonth(); // 31 (বৈশাখ has 31 days)
bnCal.daysInMonth(12); // 30 (চৈত্র has 30 days)
```

---

### toJSON()

Returns a string representation of the Bangla date in ISO-like format (`YYYY-MM-DD` with Bangla digits).

#### Signature

```typescript
toJSON(): string
```

#### Return Value

Bangla date string in the format: `"YYYY-MM-DD"` (e.g., `"১৪৩০-০১-০১"`).

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14');
console.log(bnCal.toJSON()); // "১৪৩০-০১-০১"
```

#### Remarks

- Automatically called by `JSON.stringify()`
- Output follows: `"বছর-মাস-দিন"` with zero-padded Bangla digits

---

### toString()

Returns a string representation of the Bangla date in Bengali format.

#### Signature

```typescript
toString(): string
```

#### Return Value

Bangla date string in the format: "শুক্রবার, ১৫ জ্যৈষ্ঠ, ১৪৩০ [গ্রীষ্ম]".

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14');
console.log(bnCal.toString()); // "শুক্রবার, ১ বৈশাখ, ১৪৩০ [গ্রীষ্ম]"
```

#### Remarks

- Equivalent to [toStringEn()](#tostringen) with `'bn'` locale

---

### toStringEn()

Returns a string representation of the Bangla date in English/Latin format.

#### Signature

```typescript
toStringEn(): string
```

#### Return Value

Bangla date string in the format: "Shukrobar (Friday), 15 Joishtho, 1430 [Grisma (Summer)]".

#### Example

```typescript
const bnCal = new BanglaCalendar('2023-04-14');
console.log(bnCal.toStringEn()); // "Shukrobar (Friday), 1 Boishakh, 1430 [Grisma (Summer)]"
```

---

### format()

Formats the current date as a Bangla calendar date string using customizable tokens.

#### Signature

```typescript
format(format?: BanglaDateFormat): string
```

#### Parameters

- `format`: Format string using tokens (default: `'ddd, DD mmmm (SS), YYYY বঙ্গাব্দ'`)

#### Return Value

Formatted Bangla date string according to the specified format.

#### Examples

```typescript
const bnCal = new BanglaCalendar('2023-04-14');

bnCal.format();
// Returns: 'শুক্রবার, বৈশাখ ০১ (গ্রীষ্মকাল), ১৪৩০ বঙ্গাব্দ'

bnCal.format('YYYY-MM-DD');
// Returns: '১৪৩০-০১-০১'

bnCal.format('mmmm DD, YYYY');
// Returns: 'বৈশাখ ০১, ১৪৩০'
```

#### Format Tokens

- **Year**: `YYYY`/`yyyy` (full year), `YY`/`yy` (last 2 digits)
- **Month**: `M`/`MM` (padded), `mmm` (short name), `mmmm` (full name)
- **Day**: `D`/`DD` (padded), `Do` (cardinal)
- **Weekday**: `d` (short), `dd` (without 'বার'), `ddd` (full)
- **Season**: `S` (season), `SS` (season with 'কাল' suffix)

#### Escaping Text

To output raw text (not interpreted as a token), wrap it in square brackets:

- `[আজ] ddd` → `আজ রবিবার`
- `[year ]YYYY` → `year ২০২৫`

---

### addDays()

Adds (or subtracts) days to (or from) the current Bangla date.

#### Signature

```typescript
addDays(days: number): BanglaCalendar
```

#### Parameters

- `days`: Number of days to add (negative values subtract days)

#### Return Value

A new `BanglaCalendar` instance with the adjusted date.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১'); // ১ বৈশাখ ১৪৩০

// Add days
bnCal.addDays(7);   // ৮ বৈশাখ ১৪৩০
bnCal.addDays(35);  // ৫ জ্যৈষ্ঠ ১৪৩০

// Subtract days
bnCal.addDays(-3);  // ২৮ চৈত্র ১৪২৯

// Cross year boundary
const lateDate = new BanglaCalendar('১৪৩০', '১২', '২৫');
lateDate.addDays(10); // ৫ বৈশাখ ১৪৩১
```

#### Remarks

- Preserves the calendar variant of the original instance
- Handles month and year transitions automatically
- Accounts for varying month lengths and leap years
- Negative values subtract days from the current date
- Time component remains at midnight UTC

---

### addWeeks()

Adds (or subtracts) weeks to (or from) the current Bangla date.

#### Signature

```typescript
addWeeks(weeks: number): BanglaCalendar
```

#### Parameters

- `weeks`: Number of weeks to add (negative values subtract weeks)

#### Return Value

A new `BanglaCalendar` instance with the adjusted date.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১'); // ১ বৈশাখ ১৪৩০

// Add weeks
bnCal.addWeeks(2);   // ১৫ বৈশাখ ১৪৩০
bnCal.addWeeks(5);   // ৫ জ্যৈষ্ঠ ১৪৩০

// Subtract weeks
bnCal.addWeeks(-1);  // ২৪ চৈত্র ১৪২৯
```

#### Remarks

- Each week is treated as exactly 7 days
- Preserves the calendar variant of the original instance
- Handles month and year transitions automatically
- Useful for scheduling recurring weekly events
- Negative values subtract weeks from the current date

---

### addMonths()

Adds (or subtracts) months to (or from) the current Bangla date.

#### Signature

```typescript
addMonths(months: number, overflow?: boolean): BanglaCalendar
```

#### Parameters

- `months`: Number of months to add (negative values subtract months)
- `overflow`: Controls behavior when day doesn't exist in target month (default: `true`)
  - `true`: Invalid dates overflow to the next month
  - `false`: Clamps to the last valid day of the target month

#### Return Value

A new `BanglaCalendar` instance with the adjusted date.

#### Example

```typescript
const normal = new BanglaCalendar('১৪৩০', '২', '১৫');
normal.addMonths(1);         // ১৫ আষাঢ় ১৪৩০
normal.addMonths(1, false);  // ১৫ আষাঢ় ১৪৩০

// Edge case: 31st doesn't exist in কার্তিক (30 days)
const edgeCase = new BanglaCalendar('১৪৩০', '৬', '৩১'); // ৩১ আশ্বিন ১৪৩০
edgeCase.addMonths(1);         // ১ অগ্রহায়ণ ১৪৩০ (overflow)
edgeCase.addMonths(1, false);  // ৩০ কার্তিক ১৪৩০ (clamped)

// Subtract months
edgeCase.addMonths(-1);        // ১ আশ্বিন ১৪৩০
edgeCase.addMonths(-1, false); // ৩১ ভাদ্র ১৪৩০
```

#### Remarks

- When `overflow=true` (default): Follows JavaScript `Date` behavior where invalid dates overflow
- When `overflow=false`: Clamps to the last valid day of the target month
- Preserves the calendar variant of the original instance
- Handles year transitions automatically
- Negative values subtract months from the current date

---

### addYears()

Adds (or subtracts) years to (or from) the current Bangla date.

#### Signature

```typescript
addYears(years: number, overflow?: boolean): BanglaCalendar
```

#### Parameters

- `years`: Number of years to add (negative values subtract years)
- `overflow`: Controls behavior for leap year adjustments (default: `true`)
  - `true`: Allows date overflow when day doesn't exist in target year
  - `false`: Clamps to last valid day of month in non-leap years

#### Return Value

A new `BanglaCalendar` instance with the adjusted date.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১৫'); // ১৫ বৈশাখ ১৪৩০

// Add years
bnCal.addYears(1);   // ১৫ বৈশাখ ১৪৩১
bnCal.addYears(5);   // ১৫ বৈশাখ ১৪৩৫

// Subtract years
bnCal.addYears(-1);  // ১৫ বৈশাখ ১৪২৯

// Leap year adjustment
const leapDay = new BanglaCalendar('১৪৩১', '১১', '৩০'); // ৩০ ফাল্গুন ১৪৩১ (leap year)
leapDay.addYears(1, false); // ২৯ ফাল্গুন ১৪৩২ (non-leap year has 29 days)
```

#### Remarks

- Preserves the calendar variant of the original instance
- Negative values subtract years from the current date
- Year addition follows Bangla calendar years
- The month and day generally remain the same unless affected by leap year rules
- When `overflow=false`, dates in ফাল্গুন (month 11) are adjusted for leap year differences

---

### $hasVariantConfig()

Checks if a value is a configuration object that contains a valid calendar `variant`.

#### Signature

```typescript
$hasVariantConfig(value: unknown): value is { variant: BnCalendarVariant }
```

#### Parameters

- `value`: The value to check

#### Return Value

`true` if the value contains a valid `variant` property, `false` otherwise.

#### Example

```typescript
const bnCal = new BanglaCalendar();

// Valid configuration objects
bnCal.$hasVariantConfig({ variant: 'revised-2019' }); // true
bnCal.$hasVariantConfig({ variant: 'revised-1966' }); // true

// Invalid configuration objects
bnCal.$hasVariantConfig({ variant: 'invalid' }); // false
bnCal.$hasVariantConfig({}); // false
bnCal.$hasVariantConfig(null); // false
```

#### Remarks

- This method is used internally by the constructor to extract variant configuration from various parameter positions
- Can be useful for type-checking configuration objects before passing them to the constructor
- Validates if the object has a `variant` property and it contains one of the 2 supported values: `'revised-2019'` or `'revised-1966'`

---

## Static Methods

### isBanglaYear()

Checks whether a value is a valid Bangla year in Bangla digits (`০–৯৯৯৯`).

#### Signature

```typescript
static isBanglaYear(value: unknown): value is BanglaYear
```

#### Example

```typescript
BanglaCalendar.isBanglaYear('১৪৩০'); // true
BanglaCalendar.isBanglaYear('১০০০০'); // false (too many digits)
BanglaCalendar.isBanglaYear('1430');  // false (Latin digits)
```

---

### isBanglaYearEn()

Checks whether a value is a valid Bangla year in Latin digits (`0–9999`).

#### Signature

```typescript
static isBanglaYearEn(value: number): boolean
```

#### Example

```typescript
BanglaCalendar.isBanglaYearEn(1430);  // true
BanglaCalendar.isBanglaYearEn(10000); // false
BanglaCalendar.isBanglaYearEn(-1);    // false
```

---

### isBanglaMonth()

Checks whether a value is a valid Bangla month in Bangla digits (`১–১২`).

#### Signature

```typescript
static isBanglaMonth(value: unknown): value is BanglaMonth
```

#### Example

```typescript
BanglaCalendar.isBanglaMonth('১');  // true
BanglaCalendar.isBanglaMonth('১২'); // true
BanglaCalendar.isBanglaMonth('১৩'); // false
```

---

### isBanglaMonthEn()

Checks whether a value is a valid Bangla month in Latin digits (`1–12`).

#### Signature

```typescript
static isBanglaMonthEn(value: unknown): value is NumberRange<1, 12>
```

#### Example

```typescript
BanglaCalendar.isBanglaMonthEn(1);  // true
BanglaCalendar.isBanglaMonthEn(12); // true
BanglaCalendar.isBanglaMonthEn(13); // false
```

---

### isBanglaDate()

Checks whether a value is a valid Bangla date of month in Bangla digits (`১–৩১`).

#### Signature

```typescript
static isBanglaDate(value: unknown): value is BanglaDate
```

#### Example

```typescript
BanglaCalendar.isBanglaDate('১');   // true
BanglaCalendar.isBanglaDate('৩১');  // true
BanglaCalendar.isBanglaDate('৩২');  // false
```

---

### isBanglaDateEn()

Checks whether a value is a valid Bangla date of month in Latin digits (`1–31`).

#### Signature

```typescript
static isBanglaDateEn(value: unknown): value is NumberRange<1, 31>
```

#### Example

```typescript
BanglaCalendar.isBanglaDateEn(1);   // true
BanglaCalendar.isBanglaDateEn(31);  // true
BanglaCalendar.isBanglaDateEn(32);  // false
```

---

### isBanglaDateString()

Checks whether a string follows the Bangla date format pattern (`YYYY-MM-DD` with Bangla digits).

#### Signature

```typescript
static isBanglaDateString(value: unknown): value is string
```

#### Example

```typescript
BanglaCalendar.isBanglaDateString('১৪৩০-০১-০১'); // true
BanglaCalendar.isBanglaDateString('1430-01-01'); // false (Latin digits)
BanglaCalendar.isBanglaDateString('১৪৩০-১৩-০১'); // false (invalid month)
```

#### Remarks

- Accepts both zero-padded and non-padded Bangla digits
- Validates year, month, and date components separately

---

### [Symbol.toPrimitive]

Converts the `BanglaCalendar` instance to a primitive value based on the provided hint.

#### Signature

```typescript
[Symbol.toPrimitive](hint: string): string | number
```

#### Parameters

- `hint`: The conversion hint - either `'number'` or `'string'` (defaults to `'string'`)

#### Return Value

- If `hint` is `'number'`: Returns the timestamp (same as [valueOf()](#valueof))
- Otherwise: Returns the ISO-like Bangla date string (same as [toJSON()](#tojson))

#### Behavior

- **`hint === 'number'`**: Returns numeric timestamp via [valueOf()](#valueof)
- **`hint === 'string'` or any other hint**: Returns formatted string via [toJSON()](#tojson)

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১');

// String context (default)
String(bnCal); // "১৪৩০-০১-০১"
`${bnCal}`;    // "১৪৩০-০১-০১"

// Numeric context
+bunCal;        // 1681430400000
bnCal * 1;      // 1681430400000

// Using explicit hint
bnCal[Symbol.toPrimitive]('number');  // 1681430400000
bnCal[Symbol.toPrimitive]('string');  // "১৪৩০-০১-০১"
bnCal[Symbol.toPrimitive]('default'); // "১৪৩০-০১-০১"
```

#### Remarks

- This method enables implicit type conversion in JavaScript/TypeScript
- Follows standard JavaScript object-to-primitive conversion protocol
- Ensures predictable behavior in arithmetic operations and string concatenation

---

### [Symbol.toStringTag]

Provides a string tag used by `Object.prototype.toString()`.

#### Signature

```typescript
get [Symbol.toStringTag](): string
```

#### Return Value

ISO-like Bangla date string in the format `"YYYY-MM-DD"` with Bangla digits.

#### Example

```typescript
const bnCal = new BanglaCalendar('১৪৩০', '১', '১');

console.log(bnCal);
// BanglaCalendar [১৪৩০-০১-০১] {
//   variant: 'revised-2019',
//   year: { bn: '১৪৩০', en: 1430 },
//   month: { bn: '১', en: 1 },
//   date: { bn: '১', en: 1 },
//   gregorian: { year: 2023, month: 4, date: 14 },
//   weekDay: 5,
//   isoWeekDay: 5
// }

Object.prototype.toString.call(bnCal); // "[object ১৪৩০-০১-০১]"

bnCal[Symbol.toStringTag];            // "১৪৩০-০১-০১"
```

#### Remarks

- Returns the same value as [toJSON()](#tojson) method
- Used by `Object.prototype.toString()` to identify the object type
- Provides a human-readable representation in debugging contexts

---

### Type Definitions

#### LocaleCode

```typescript
type $BnEn = 'bn' | 'en'
```

Supported locale codes for Bangla calendar output.

#### BanglaYear

```typescript
type BanglaYear = BanglaDigit | `${$BnOnes}${BanglaDigit}` | `${$BnOnes}${BanglaDigit}${BanglaDigit}` | Repeat<BanglaDigit, 4>
```

Bangla year from `০-৯৯৯৯`.

#### BanglaMonth

```typescript
type BanglaMonth = $BnOnes | $BnOnesPadded | '১০' | '১১' | '১২'
```

Bangla month from `১-১২`.

#### BanglaDate

```typescript
type BanglaDate = $BnOnes | $BnOnesPadded | `১${BanglaDigit}` | `২${BanglaDigit}` | '৩০' | '৩১'
```

Bangla date of month from `১-৩১`.

#### BnCalendarVariant

```typescript
type BnCalendarVariant = 'revised-2019' | 'revised-1966'
```

Calendar variant types.

#### BnCalendarConfig

```typescript
interface BnCalendarConfig {
  variant?: BnCalendarVariant;
}
```

Configuration object for Bangla Calendar system.

#### BanglaDateFormat

```typescript
type BanglaDateFormat = LooseLiteral<DateFormatToken | DateWithSeasonToken>
```

Format tokens for Bangla date formatting.

---

## See Also

- [**Chronos**](Chronos) for complete date/time solution.
- Implementation of Bangla date system in `Chronos` via [**banglaPlugin**](/docs/classes/Chronos/bangla-plugin).
- [**Date/time utilities**](/docs/utilities/date) for simple date/time manipulation.
