---
id: names
title: Name Getter Methods
---

<!-- markdownlint-disable-file MD024 -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Get Names of the Parts of Date, e.g. `Day`, `Month`, `Season`, `Zodiac Signs` etc.

---

## day()

Get the name of a weekday

### Signature

```ts
day(index?: Enumerate<7>): WeekDay
```

### Parameter

- `index` *(optional)*: A number from `0` to `6` representing the day of the week, where `0` is Sunday and `6` is Saturday. If omitted, it defaults to the current day from the `Chronos` instance.

### Return Value

- `WeekDay` — The full name of the corresponding weekday (`"Sunday"`, `"Monday"`, ..., `"Saturday"`).

### Example Usage

```ts
new Chronos('2025-05-29').day(); // "Thursday"
new Chronos().day(0);            // "Sunday"
```

:::info

- This method supports overriding the current day with a specific index.
- Internally, it maps indices `0–6` to the English names of the weekdays.

:::

---

## monthName()

Get the name of a month

### Signature

```ts
monthName(index?: Enumerate<12>): MonthName
```

### Parameters

- `index` *(optional)*: A number from `0` to `11` representing the month, where `0` is January and `11` is December. If omitted, it defaults to the current month from the `Chronos` instance.

### Return Value

- `MonthName` — The full name of the month (`"January"`, `"February"`, ..., `"December"`).

### Example Usage

```ts
new Chronos('2025-05-29').monthName(); // "May"
new Chronos().monthName(11);           // "December"
```

:::info

- This method supports overriding the current month with a specific index.
- Internally, it maps indices `0–11` to the English names of the months.

:::

---

## season()

### Signature

```typescript
season(options?: SeasonOptions): string
```

### Overview

The `season()` method determines the current season based on either predefined regional presets or custom season definitions. It supports both month-based and exact date-based season boundaries.

:::danger[Note]
This method is provided by `seasonPlugin`. You must register it using `Chronos.use(seasonPlugin)` before calling `.season()`. Once registered, all Chronos instances will have access to the `.season()` method.
:::

### Usage

```typescript
import { Chronos } from 'nhb-toolbox';
import { seasonPlugin } from 'nhb-toolbox/plugins/season';

Chronos.use(seasonPlugin)

// Using default preset (Western seasons)
const now = new Chronos();
console.log(now.season()); // "Spring" (if between March-May)

// Using a specific preset
console.log(now.season({ preset: 'japan' }));

// Custom seasons
const customSeasons = [
  { name: 'Peak Time', boundary: { startDate: '11-20', endDate: '01-10' } }
];
console.log(now.season({ seasons: customSeasons }));
```

### Configuration

#### SeasonOptions

```typescript
interface SeasonOptions {
  seasons?: SeasonDefinition[];
  preset?: SeasonPreset;
}
```

- `seasons`: Custom array of season definitions (overrides preset if provided)
- `preset`: Name of predefined season configuration (default: `'default'` - Western Seasons)

#### SeasonDefinition

```typescript
interface SeasonDefinition {
  name: string;
  boundary: MonthBoundary | DateBoundary;
}
```

Boundary can be either:

- **Month-based**: `{ startMonth: 0-11, endMonth: 0-11 }` (0=January)
- **Date-based**: `{ startDate: 'MM-DD', endDate: 'MM-DD' }`

:::caution[Boundary Handling]

- Supports wrap-around seasons (e.g., Winter: Dec-Feb)
- Boundaries are inclusive
- Returns `'Unknown'` if no season matches

:::

### Available Presets

<Tabs>
<TabItem value="default" label={ <span style={{ whiteSpace: 'nowrap' }}>Default (Western)</span> }>

```typescript
[
  { name: 'Spring', boundary: { startMonth: 2, endMonth: 4 } },  // Mar-May
  { name: 'Summer', boundary: { startMonth: 5, endMonth: 7 } },  // Jun-Aug
  { name: 'Autumn', boundary: { startMonth: 8, endMonth: 10 } }, // Sep-Nov
  { name: 'Winter', boundary: { startMonth: 11, endMonth: 1 } }  // Dec-Feb
]
```

</TabItem>
<TabItem value="bangladesh" label="Bangladesh">

```typescript
[
 { name: 'Grisma (Summer)', boundary: { startDate: '04-15', endDate: '06-14' } },
 { name: 'Barsa (Monsoon)', boundary: { startDate: '06-15', endDate: '08-14' } },
 { name: 'Sarat (Autumn)', boundary: { startDate: '08-15', endDate: '10-14' } },
 { name: 'Hemanta (Late-Autumn)', boundary: { startDate: '10-15', endDate: '12-14' } },
 { name: 'Shhit (Winter)', boundary: { startDate: '12-15', endDate: '02-14' } },
 { name: 'Basanta (Spring)', boundary: { startDate: '02-15', endDate: '04-14' } }
]
```

</TabItem>
<TabItem value="vedic" label="Vedic">

```typescript
[
  { name: 'Shishir (Winter)', boundary: { startDate: '12-15', endDate: '02-14' } },
  { name: 'Vasanta (Spring)', boundary: { startDate: '02-15', endDate: '04-14' } },
  { name: 'Grishma (Summer)', boundary: { startDate: '04-15', endDate: '06-14' } },
  { name: 'Varsha (Monsoon)', boundary: { startDate: '06-15', endDate: '08-14' } },
  { name: 'Sharad (Autumn)', boundary: { startDate: '08-15', endDate: '10-14' } },
  { name: 'Hemant (Late-Autumn)', boundary: { startDate: '10-15', endDate: '12-14' } }
]
```

</TabItem>
<TabItem value="tamil" label="Tamil">

```typescript
[
  { name: 'Ilavenil (Mid-Summer)', boundary: { startMonth: 4, endMonth: 5 } },   // May-Jun
  { name: 'Mutuvenil (Peak-Summer)', boundary: { startMonth: 6, endMonth: 7 } }, // Jul-Aug
  { name: 'Kaar (Monsoon)', boundary: { startMonth: 7, endMonth: 9 } },          // Aug-Oct
  { name: 'Koothir (Autumn)', boundary: { startMonth: 9, endMonth: 10 } },       // Oct-Nov
  { name: 'Munpani (Early-Winter)', boundary: { startMonth: 10, endMonth: 0 } }, // Nov-Jan
  { name: 'Pinpani (Late-Winter)', boundary: { startMonth: 0, endMonth: 2 } }    // Jan-Mar
]
```

</TabItem>
<TabItem value="india" label={ <span style={{ whiteSpace: 'nowrap' }}>India (IMD)</span> }>

```typescript
[
  { name: 'Winter', boundary: { startMonth: 0, endMonth: 1 } },       // Jan-Feb
  { name: 'Pre-Monsoon', boundary: { startMonth: 2, endMonth: 4 } },  // Mar-May
  { name: 'Monsoon', boundary: { startMonth: 5, endMonth: 8 } },      // Jun-Sep
  { name: 'Post-Monsoon', boundary: { startMonth: 9, endMonth: 10 } },// Oct-Nov
  { name: 'Cool Season', boundary: { startMonth: 11, endMonth: 11 } } // Dec
]
```

</TabItem>
<TabItem value="philippines" label="Philippines">

```typescript
[
  { name: 'Dry Season', boundary: { startMonth: 11, endMonth: 4 } }, // Dec-May
  { name: 'Wet Season', boundary: { startMonth: 5, endMonth: 10 } }  // Jun-Nov
]
```

</TabItem>
<TabItem value="academic_us" label={ <span style={{ whiteSpace: 'nowrap' }}>US Academic</span> } >

```typescript
[
  { name: 'Spring', boundary: { startDate: '01-10', endDate: '05-15' } },
  { name: 'Summer', boundary: { startDate: '05-16', endDate: '08-15' } },
  { name: 'Fall', boundary: { startDate: '08-16', endDate: '12-20' } },
  { name: 'Winter Break', boundary: { startDate: '12-21', endDate: '01-09' } }
]
```

</TabItem>
<TabItem value="japan" label="Japan">

```typescript
[
  { name: 'Haru (Spring)', boundary: { startDate: '03-01', endDate: '05-31' } },
  { name: 'Natsu (Summer)', boundary: { startDate: '06-01', endDate: '08-31' } },
  { name: 'Aki (Autumn)', boundary: { startDate: '09-01', endDate: '11-30' } },
  { name: 'Fuyu (Winter)', boundary: { startDate: '12-01', endDate: '02-28' } }
]
```

</TabItem>
<TabItem value="australia" label="Australia">

```typescript
[
  { name: 'Summer', boundary: { startMonth: 11, endMonth: 1 } }, // Dec-Feb
  { name: 'Autumn', boundary: { startMonth: 2, endMonth: 4 } },  // Mar-May
  { name: 'Winter', boundary: { startMonth: 5, endMonth: 7 } },  // Jun-Aug
  { name: 'Spring', boundary: { startMonth: 8, endMonth: 10 } }  // Sep-Nov
]
```

</TabItem>
<TabItem value="ethiopia" label="Ethiopia">

```typescript
[
  { name: 'Bega (Dry)', boundary: { startMonth: 10, endMonth: 1 } },       // Nov-Feb
  { name: 'Belg (Short Rain)', boundary: { startMonth: 2, endMonth: 4 } }, // Mar-May
  { name: 'Kiremt (Main Rain)', boundary: { startMonth: 5, endMonth: 9 } } // Jun-Oct
]
```

</TabItem>
</Tabs>

:::tip[Custom Seasons]
You can create completely custom season configurations by providing your own array of `SeasonDefinition` objects:

```typescript
const gamingSeasons = [
  { name: 'Pre-Season', boundary: { startMonth: 0, endMonth: 2 } },
  { name: 'Competitive', boundary: { startDate: '03-01', endDate: '09-30' } },
  { name: 'Off-Season', boundary: { startMonth: 10, endMonth: 11 } }
];

const currentSeason = new Chronos().season({ seasons: gamingSeasons });
```

:::

### Type Definitions

```typescript
type SeasonPreset = 
  | 'default'
  | 'bangladesh'
  | 'india'
  | 'tamil'
  | 'vedic'
  | 'philippines'
  | 'academic_us'
  | 'japan'
  | 'australia'
  | 'ethiopia';

type MonthDateString = `${MonthString}-${DateString}`; // 'MM-DD' format

interface DateBoundary {
  startDate: MonthDateString;
  endDate: MonthDateString;
}

interface MonthBoundary {
  startMonth: number; // 0-11 (0=January)
  endMonth: number;   // 0-11
}
```

:::danger[Note]
When using month-based boundaries (`MonthBoundary`), the season calculation only considers the month component and ignores specific dates within the month.
:::

---

## getZodiacSign()

### Signature

```typescript
getZodiacSign(options?: ZodiacOptions): ZodiacSign
```

### Overview

The `getZodiacSign()` method determines the zodiac sign based on either predefined presets (Western or Vedic) or custom zodiac definitions. It supports both instance date and custom birthdate inputs.

:::danger[Note]
This method is provided by `zodiacPlugin`. You must register it using `Chronos.use(zodiacPlugin)` before calling `.getZodiacSign()`. Once registered, all Chronos instances will have access to the `.getZodiacSign()` method.
:::

### Usage

```typescript
import { Chronos } from 'nhb-toolbox';
import { zodiacPlugin } from 'nhb-toolbox/plugins/zodiac';

Chronos.use(zodiacPlugin)

// Using default preset (Western)
const now = new Chronos();
console.log(now.getZodiacSign()); // "Leo" (if between Jul 23-Aug 22)

// Using Vedic preset
console.log(now.getZodiacSign({ preset: 'vedic' }));

// Custom birthdate
console.log(now.getZodiacSign({ birthDate: '05-21' })); // "Gemini"

// Custom zodiac definitions
const customZodiac = [
  ['Aries', [3, 21]],
  ['Taurus', [4, 20]],
  // ...other signs
];
console.log(now.getZodiacSign({ custom: customZodiac }));
```

### Configuration

#### ZodiacOptions

```typescript
interface ZodiacOptions {
  birthDate?: MonthDateString; // 'MM-DD' format (1-based month)
  preset?: ZodiacPreset;       // 'western' | 'vedic' | 'tropical' | 'sidereal'
  custom?: ZodiacArray;        // Custom zodiac definitions
}
```

- `birthDate`: Optional date in 'MM-DD' format to use instead of instance date
- `preset`: Name of predefined zodiac configuration (default: `'western'`)
- `custom`: Custom array of zodiac definitions (overrides preset if provided)

### Available Presets

<Tabs>
<TabItem value="western" label="Western/Tropical">

```typescript
[
  ['Capricorn', [12, 22]],
  ['Aquarius', [1, 20]],
  ['Pisces', [2, 19]],
  ['Aries', [3, 21]],
  ['Taurus', [4, 20]],
  ['Gemini', [5, 21]],
  ['Cancer', [6, 21]],
  ['Leo', [7, 23]],
  ['Virgo', [8, 23]],
  ['Libra', [9, 23]],
  ['Scorpio', [10, 23]],
  ['Sagittarius', [11, 22]],
  ['Capricorn', [12, 22]]
]
```

</TabItem>
<TabItem value="vedic" label="Vedic/Sidereal">

```typescript
[
  ['Capricorn', [1, 14]],
  ['Aquarius', [2, 13]],
  ['Pisces', [3, 14]],
  ['Aries', [4, 13]],
  ['Taurus', [5, 14]],
  ['Gemini', [6, 14]],
  ['Cancer', [7, 16]],
  ['Leo', [8, 16]],
  ['Virgo', [9, 16]],
  ['Libra', [10, 16]],
  ['Scorpio', [11, 15]],
  ['Sagittarius', [12, 15]],
  ['Capricorn', [1, 14]]
]
```

</TabItem>
</Tabs>

:::tip[Custom Zodiac]
You can create custom zodiac configurations by providing your own array of zodiac definitions but must use the 12 existing zodiac sign names, **only date ranges are customizable**:

```typescript
const customZodiac = [
  ['Capricorn', [1, 1]], 
  ['Sagittarius', [2, 1]],
  // ...other signs
];

const currentSign = new Chronos().getZodiacSign({ custom: customZodiac });
```

:::

### Type Definitions

```typescript
type ZodiacPreset = 'western' | 'vedic' | 'tropical' | 'sidereal';
type ZodiacSign = 'Aries' | 'Taurus' | ...; // All zodiac sign names
type ZodiacArray = Array<[ZodiacSign, [month: 1 | 2 | ... | 12, day: 1 | 2 | ... | 31]]>;
```

:::info[Date Handling]

- Month values are 1-based (1 = January)
- Supports both instance date and custom birthdate input
- Returns the first sign if no matches found (shouldn't occur with proper definitions)

:::

## getPartOfDay()

:::danger[Note]
This method is provided by `dayPartPlugin`. You must register it using `Chronos.use(dayPartPlugin)` before calling `.getPartOfDay()`. Once registered, all Chronos instances will have access to the `.getPartOfDay()` method.
:::

### Signature

```typescript
getPartOfDay(config?: Partial<DayPartConfig>): DayPart
```

### Parameters

- `config`: Custom day part ranges

### Return Type

`DayPart` - Current part of day

### Default Ranges

| Part      | Range       |
|-----------|-------------|
| midnight  | 00:00-01:00 |
| lateNight | 02:00-04:00 |
| morning   | 05:00-11:00 |
| afternoon | 12:00-16:00 |
| evening   | 17:00-20:00 |
| night     | 21:00-23:00 |

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { dayPartPlugin } from 'nhb-toolbox/plugins/day-part';

Chronos.use(dayPartPlugin)

new Chronos('2025-01-15T09:00:00').getPartOfDay(); // "morning"
```
