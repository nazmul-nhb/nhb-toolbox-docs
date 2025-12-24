---
id: bangla-plugin
title: Bangla Calendar Integration
---

<!-- markdownlint-disable-file MD024 -->
<!-- markdownlint-disable-file MD060 -->

import Copy from '@site/src/components/Copy';

## `banglaPlugin`

### 📦 Import & Usage

:::tip
To use the Bangla Plugin, import it and register it with Chronos:

<Copy
    message="Import Statement Copied!"
    afterCopy="Import Statement Copied!"
    text="import { banglaPlugin } from 'nhb-toolbox/plugins/banglaPlugin';"
/>
:::

```typescript
import { Chronos, chronos } from 'nhb-toolbox';
import { banglaPlugin } from 'nhb-toolbox/plugins/banglaPlugin';

// Register the plugin globally
Chronos.use(banglaPlugin);
// or
chronos.use(banglaPlugin);
// or
Chronos.register(banglaPlugin);
// or
chronos.register(banglaPlugin);

// Now use Bangla calendar methods
const c = new Chronos('2023-04-14');
const banglaDate = c.toBangla(); // Get complete Bangla date object
```

---

### 📋 Overview

The `banglaPlugin` adds comprehensive Bengali calendar functionality to `Chronos`, enabling:

- Conversion between Gregorian and Bengali calendar dates
- Bengali date formatting with customizable tokens
- Access to Bengali year, month, day names, and seasons
- Support for two calendar variants: `'revised-2019'` (default) and `'revised-1966'`
- Multi-locale output (Bangla digits/names or Latin equivalents)

---

### 🎯 Methods Added by This Plugin

| Method                                                  | Description                             | Returns              |
| ------------------------------------------------------- | --------------------------------------- | -------------------- |
| [`toBangla()`](#tobangla)                               | Converts to complete Bangla date object | `BanglaDateObject`   |
| [`formatBangla()`](#formatbangla)                       | Formats date using Bengali tokens       | `string`             |
| [`getBanglaYear()`](#getbanglayear)                     | Gets Bengali year                       | `string` or `number` |
| [`getBanglaMonth()`](#getbanglamonth)                   | Gets Bengali month                      | `string` or `number` |
| [`getBanglaDay()`](#getbangladay)                       | Gets Bengali day of month               | `string` or `number` |
| [`getBanglaDayName()`](#getbangladayname)               | Gets Bengali weekday name               | `string`             |
| [`getBanglaMonthName()`](#getbanglamonthname)           | Gets Bengali month name                 | `string`             |
| [`getBanglaSeasonName()`](#getbanglaseasonname)         | Gets Bengali season name                | `string`             |
| [`configureBanglaCalendar()`](#configurebanglacalendar) | Sets default calendar variant globally  | `void`               |

---

### 📚 API Reference

#### toBangla()

Converts the current date to a complete Bangla calendar date object.

##### Signature

```typescript
toBangla<Locale extends $BnEn = 'bn'>(
  options?: BanglaDateOptions<Locale>
): BanglaDateObject<Locale>
```

##### Parameters

- `options`: Optional configuration including:
  - `locale`: `'bn'` (default) for Bengali output, `'en'` for English/Latin output
  - `variant`: Calendar variant (`'revised-2019'` or `'revised-1966'`)

##### Return Value

Complete Bangla date object containing:

```typescript
{
  year: string | number,      // Bengali year
  month: string | number,     // Bengali month (1-12)
  date: string | number,      // Bengali day of month (1-31)
  monthName: string,          // Bengali month name
  dayName: string,            // Bengali weekday name
  seasonName: string,         // Bengali season name
  isLeapYear: boolean         // Whether it's a leap year
}
```

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
const banglaDate = chronos.toBangla();
// Returns: {
//   year: '১৪৩০',
//   month: '১',
//   date: '১',
//   monthName: 'বৈশাখ',
//   dayName: 'শুক্রবার',
//   seasonName: 'গ্রীষ্ম',
//   isLeapYear: false
// }

const banglaDateEn = chronos.toBangla({ locale: 'en' });
// Returns: {
//   year: 1430,
//   month: 1,
//   date: 1,
//   monthName: 'Boishakh',
//   dayName: 'Shukrobar (Friday)',
//   seasonName: 'Grisma (Summer)',
//   isLeapYear: false
// }
```

##### Remarks

- Uses the default calendar variant (`'revised-2019'`) unless specified
- The locale determines output format (Bangla vs Latin)
- Year `0` corresponds to 593 CE in the Gregorian calendar

---

#### formatBangla()

Formats the current date as a Bangla calendar date string using customizable tokens.

##### Signature

```typescript
formatBangla(format?: StrictFormat, options?: BnCalendarConfig): string
```

##### Parameters

- `format`: Format string using tokens (default: `'ddd, DD mmmm (SS), YYYY বঙ্গাব্দ - hh:mm:ss (A)'`)
- `options`: Calendar configuration with `variant` property

##### Return Value

Formatted Bangla date string according to the specified format.

##### Format Tokens

| Token         | Description                      | Example                  |
| ------------- | -------------------------------- | ------------------------ |
| `YYYY`        | Full year (Bangla digits)        | `১৪৩০`                   |
| `YY`          | Last 2 digits of year            | `৩০`                     |
| `M` or `MM`   | Month (non-padded/padded)        | `১` or `০১`              |
| `mmm`         | Short month name                 | `বৈ`                     |
| `mmmm`        | Full month name                  | `বৈশাখ`                  |
| `D` or `DD`   | Day of month (non-padded/padded) | `১` or `০১`              |
| `Do`          | Cardinal day (same as `D`)       | `১`                      |
| `d`           | Short weekday                    | `র`                      |
| `dd`          | Weekday without `'বার'`          | `রবি`                    |
| `ddd`         | Full weekday                     | `রবিবার`                 |
| `H` or `HH`   | 24-hour (non-padded/padded)      | `২` or `০২`              |
| `h` or `hh`   | 12-hour (non-padded/padded)      | `৭` or `০৭`              |
| `m` or `mm`   | Minute (non-padded/padded)       | `৯` or `০৯`              |
| `s` or `ss`   | Second (non-padded/padded)       | `৫` or `০৫`              |
| `ms` or `mss` | Millisecond (non-padded/padded)  | `২৩` or `০২৩`            |
| `a` or `A`    | AM/PM indicator                  | `পূর্বাহ্ণ` or `অপরাহ্ণ` |
| `Z` or `ZZ`   | UTC offset                       | `+০৬:০০`                 |
| `S`           | Season name                      | `গ্রীষ্ম`                |
| `SS`          | Season with `'কাল'` suffix       | `গ্রীষ্মকাল`             |

##### Escaping Text

To output raw text (not interpreted as a token), wrap it in square brackets:

- `[আজ] ddd` → `আজ রবিবার`
- `[year ]YYYY` → `year ২০২৫`

##### Examples

```typescript
const chronos = new Chronos('2023-04-14 14:30:00');

chronos.formatBangla();
// Returns: 'শুক্রবার, বৈশাখ ০১ (গ্রীষ্মকাল), ১৪৩০ বঙ্গাব্দ - ০২:৩০:০০ (অপরাহ্ণ)'

chronos.formatBangla('YYYY-MM-DD');
// Returns: '১৪৩০-০১-০১'

chronos.formatBangla('mmmm DD, YYYY');
// Returns: 'বৈশাখ ০১, ১৪৩০'

chronos.formatBangla('hh:mm:ss A');
// Returns: '০২:৩০:০০ অপরাহ্ণ'

chronos.formatBangla('[আজ] ddd, DD mmmm');
// Returns: 'আজ শুক্রবার, ০১ বৈশাখ'
```

---

#### getBanglaYear()

Gets the Bangla calendar year for the current date.

##### Signature

```typescript
getBanglaYear<Locale extends $BnEn = 'bn'>(locale?: Locale): $BanglaYear<Locale>
```

##### Parameters

- `locale`: `'bn'` (default) for Bangla digits, `'en'` for Latin digits

##### Return Value

Bangla year in the specified locale format.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
chronos.getBanglaYear(); // Returns: '১৪৩০'
chronos.getBanglaYear('en'); // Returns: 1430
```

##### Remarks

- The Bangla year starts on April 14th in the Gregorian calendar
- Year 0 corresponds to 593 CE

---

#### getBanglaMonth()

Gets the Bangla calendar month for the current date.

##### Signature

```typescript
getBanglaMonth<Locale extends $BnEn = 'bn'>(
  options?: BanglaDateOptions<Locale>
): $BanglaMonth<Locale>
```

##### Parameters

- `options`: Optional configuration with `locale` and `variant`

##### Return Value

Bangla month (1-12) in the specified locale format.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
chronos.getBanglaMonth(); // Returns: '১' (বৈশাখ)
chronos.getBanglaMonth({ locale: 'en' }); // Returns: 1
chronos.getBanglaMonth({ variant: 'revised-1966' }); // Uses 1966 variant
```

##### Remarks

- Month 1 corresponds to বৈশাখ (mid-April to mid-May)
- Results may vary between calendar variants near month boundaries

---

#### getBanglaDay()

Gets the Bangla calendar day of the month for the current date.

##### Signature

```typescript
getBanglaDay<Locale extends $BnEn = 'bn'>(
  options?: BanglaDateOptions<Locale>
): $BanglaMonthDate<Locale>
```

##### Parameters

- `options`: Optional configuration with `locale` and `variant`

##### Return Value

Bangla day of month (1-31) in the specified locale format.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
chronos.getBanglaDay(); // Returns: '১'
chronos.getBanglaDay({ locale: 'en' }); // Returns: 1
chronos.getBanglaDay({ variant: 'revised-1966' }); // Uses 1966 variant
```

##### Remarks

- The day number is 1-based (১ = first day of the month)
- Different variants may have different month lengths for leap years

---

#### getBanglaDayName()

Gets the Bangla name of the weekday for the current date.

##### Signature

```typescript
getBanglaDayName<Locale extends $BnEn = 'bn'>(locale?: Locale): BanglaDayName<Locale>
```

##### Parameters

- `locale`: `'bn'` (default) for Bengali, `'en'` for English

##### Return Value

Name of the weekday in the specified locale.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14'); // Friday
chronos.getBanglaDayName(); // Returns: 'শুক্রবার'
chronos.getBanglaDayName('en'); // Returns: 'Shukrobar (Friday)'
```

##### Remarks

- Weekday names follow standard Bengali naming convention ending with `'বার'`
- English names include transliteration and standard English name

---

#### getBanglaMonthName()

Gets the Bangla name of the month for the current date.

##### Signature

```typescript
getBanglaMonthName<Locale extends $BnEn = 'bn'>(
  options?: BanglaDateOptions<Locale>
): BanglaMonthName<Locale>
```

##### Parameters

- `options`: Optional configuration with `locale` and `variant`

##### Return Value

Name of the month in the specified locale.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
chronos.getBanglaMonthName(); // Returns: 'বৈশাখ'
chronos.getBanglaMonthName({ locale: 'en' }); // Returns: 'Boishakh'
chronos.getBanglaMonthName({ variant: 'revised-1966' }); // Uses 1966 variant
```

##### Remarks

- Month names follow traditional Bengali naming conventions
- English names are transliterations of Bengali names

---

#### getBanglaSeasonName()

Gets the Bangla season name for the current date.

##### Signature

```typescript
getBanglaSeasonName<Locale extends $BnEn = 'bn'>(
  options?: BanglaDateOptions<Locale>
): BanglaSeasonName<Locale>
```

##### Parameters

- `options`: Optional configuration with `locale` and `variant`

##### Return Value

Name of the season in the specified locale.

##### Examples

```typescript
const chronos = new Chronos('2023-04-14');
chronos.getBanglaSeasonName(); // Returns: 'গ্রীষ্ম'
chronos.getBanglaSeasonName({ locale: 'en' }); // Returns: 'Grisma (Summer)'
```

##### Bengali Seasons (ঋতু)

| Season (Bangla) | English               | Period                       |
| --------------- | --------------------- | ---------------------------- |
| গ্রীষ্ম             | Grisma (Summer)       | Mid-April to Mid-June        |
| বর্ষা              | Barsa (Monsoon)       | Mid-June to Mid-August       |
| শরৎ             | Sarat (Autumn)        | Mid-August to Mid-October    |
| হেমন্ত            | Hemanta (Late Autumn) | Mid-October to Mid-December  |
| শীত             | Shhit (Winter)        | Mid-December to Mid-February |
| বসন্ত            | Basanta (Spring)      | Mid-February to Mid-April    |

---

#### configureBanglaCalendar()

Sets the default Bangla calendar variant globally for all `Chronos` instances.

##### Signature

```typescript
configureBanglaCalendar(options: BnCalendarConfig): void
```

##### Parameters

- `options`: Configuration with `variant` property (`'revised-2019'` or `'revised-1966'`)

##### Behavior

- Sets the global default variant for all Bangla-related methods
- Affects all existing and future `Chronos` instances
- Can be overridden per-call using the `variant` option in individual methods

##### Examples

```typescript
const c1 = new Chronos();
const c2 = new Chronos();

// Default is 'revised-2019'
c1.getBanglaMonth(); // uses 'revised-2019'

// Set global default to 1966 variant
c1.configureBanglaCalendar({ variant: 'revised-1966' });

c1.getBanglaMonth(); // now uses 'revised-1966'
c2.getBanglaMonth(); // also uses 'revised-1966'

// Per-call override still works
c1.getBanglaMonth({ variant: 'revised-2019' }); // uses 'revised-2019' for this call only
```

##### Important Notes

- This method **does not modify the instance**, only sets global configuration
- If never called, default is `'revised-2019'`
- Valid variants: `'revised-1966'` and `'revised-2019'`

---

### 🗂️ Type Definitions

#### BanglaDateObject

```typescript
type BanglaDateObject<Locale extends $BnEn = 'bn'> = {
  year: $BanglaYear<Locale>;          // Bengali year
  month: $BanglaMonth<Locale>;        // Bengali month (1-12)
  date: $BanglaMonthDate<Locale>;     // Bengali day of month (1-31)
  dayName: BanglaDayName<Locale>;     // Bengali weekday name
  monthName: BanglaMonthName<Locale>; // Bengali month name
  seasonName: BanglaSeasonName<Locale>; // Bengali season name
  isLeapYear: boolean;                // Leap year status
};
```

#### BanglaDateOptions

```typescript
interface BanglaDateOptions<Locale extends $BnEn> extends BnCalendarConfig {
  locale?: Locale | $BnEn;  // 'bn' or 'en'
}

interface BnCalendarConfig {
  variant?: BnCalendarVariant;  // 'revised-2019' or 'revised-1966'
}
```

#### Calendar Variants

```typescript
type BnCalendarVariant = 'revised-2019' | 'revised-1966';
```

---

### 💡 Complete Example

```typescript
import { Chronos } from 'nhb-toolbox';
import { banglaPlugin } from 'nhb-toolbox/plugins/banglaPlugin';

// Register plugin
Chronos.use(banglaPlugin);

// Create a date (April 14, 2023 = 1st Boishakh, 1430)
const chronos = new Chronos('2023-04-14 14:30:00');

// Get complete Bangla date object
const banglaDate = chronos.toBangla();
console.log(banglaDate);
// {
//   year: '১৪৩০',
//   month: '১',
//   date: '১',
//   monthName: 'বৈশাখ',
//   dayName: 'শুক্রবার',
//   seasonName: 'গ্রীষ্ম',
//   isLeapYear: false
// }

// Format in Bengali
console.log(chronos.formatBangla());
// শুক্রবার, বৈশাখ ০১ (গ্রীষ্মকাল), ১৪৩০ বঙ্গাব্দ - ০২:৩০:০০ (অপরাহ্ণ)

// Format with custom pattern
console.log(chronos.formatBangla('DD mmmm, YYYY'));
// ০১ বৈশাখ, ১৪৩০

// Get individual components
console.log(chronos.getBanglaYear()); // '১৪৩০'
console.log(chronos.getBanglaMonthName()); // 'বৈশাখ'
console.log(chronos.getBanglaSeasonName()); // 'গ্রীষ্ম'
console.log(chronos.getBanglaDayName('en')); // 'Shukrobar (Friday)'

// Switch to 1966 variant
chronos.configureBanglaCalendar({ variant: 'revised-1966' });
console.log(chronos.getBanglaMonth({ variant: 'revised-1966' })); // '১' (using 1966 variant)
```

---

### See Also

- Dedicated class: [**BanglaCalendar**](/docs/classes/BanglaCalendar) for Bangla date manipulation without using [**Chronos**](/docs/classes/Chronos)
