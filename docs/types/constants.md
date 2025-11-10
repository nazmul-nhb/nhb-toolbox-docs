---
id: constants
title: Ready to Use Constants
---

<!-- markdownlint-disable-file MD024 -->

Along with utilities, classes and types, `nhb-toolbox` exports a collection of ready-to-use constants for common development needs.

### 📦 Import

All (25+) constants can be imported using this pattern:

```ts
import { CONSTANT_NAME } from 'nhb-toolbox/constants';
```

---

### Available Constants

| Constant                 | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `WEEK_DAYS`              | Array of weekday names (Sunday-Saturday)                                                   |
| `MONTHS`                 | Array of month names (January-December)                                                    |
| `TIME_ZONES`             | Record of time-zones (abbreviation of timezone names from [**time zone abbreviations on Wikipedia**](https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations)) with respective time-zone offsets and full timezone names. |
| `TIME_ZONE_IDS`          | Record of timezone identifiers (from [**IANA TZ Database on Wikipedia**](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) against their corresponding UTC offsets and full timezone names.                       |
| `TIME_ZONE_LABELS`       | Record of unique standard time-zone labels/names for their corresponding UTC offsets as (`{ UTCOffset: timeZoneName }`). |
| `VEDIC_ZODIAC_SIGNS`     | Traditional Indian/Vedic zodiac signs                                                      |
| `WESTERN_ZODIAC_SIGNS`   | Western astrology zodiac signs                                                             |
| `AUSTRALIA_SEASONS`      | Seasonal definitions for Australia                                                         |
| `BANGLADESH_SEASONS`     | Seasonal definitions for Bangladesh                                                        |
| `ETHIOPIA_SEASONS`       | Seasonal definitions for Ethiopia                                                          |
| `INDIA_IMD_SEASONS`      | Indian Meteorological Department seasons                                                   |
| `INDIA_TAMIL_SEASONS`    | Traditional Tamil seasonal calendar                                                        |
| `INDIA_VEDIC_SEASONS`    | Ancient Vedic seasonal divisions                                                           |
| `JAPAN_SEASONS`          | Traditional Japanese seasons                                                               |
| `PHILIPPINES_SEASONS`    | Seasonal patterns for the Philippines                                                      |
| `SEASON_PRESETS`         | Collection of all seasonal definitions                                                     |
| `US_ACADEMIC_SEASONS`    | U.S. academic season names                                                                 |
| `WESTERN_SEASONS`        | Standard four-season model (Spring, Summer, Fall, Winter)                                  |
| `ALPHABET_COLOR_PALETTE` | Color palette mapped to letters A-Z                                                        |
| `NUMBER_COLOR_PALETTE`   | Color palette mapped to numbers 0-9                                                        |
| `CSS_COLORS`             | [**Standard CSS color names**](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color#value) and hex values |
| `COUNTRIES`              | [**List of countries**](https://countrycode.org/) with full-name, country code and ISO country code (both 2 & 3 character) |
| `CURRENCY_CODES`         | ISO 4217 currency codes (e.g., USD, EUR)                                                   |
| `CURRENCY_LOCALES`       | Default locales for currency formatting                                                    |
| `FRANKFURTER_CURRENCIES` | Currencies supported by Frankfurter API                                                    |
| `LOCALE_CODES`           | Standard locale identifiers (e.g., en-US, fr-FR)                                           |
| `LOWERCASED_WORDS`       | Common lowercase words (articles, prepositions etc.) for text processing                   |
| `HTTP_STATUS_CODES`      | Complete set of [**HTTP status codes**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) with with js/tsdoc                                           |
| `HTTP_STATUS`            | Alias for HTTP_STATUS_CODES                                                                |
| `HTTP_CODES`             | Alias for HTTP_STATUS_CODES                                                                |
| `STATUS_CODES`           | Alias for HTTP_STATUS_CODES                                                                |
| `GENERAL_UNITS`          | Units used in [**Unit**](/docs/classes/Unit) class                                                 |
| `CATEGORIZED_UNITS`      | Units used in [**Converter**](/docs/classes/Converter) classes                                          |

---

### Usage Examples

```ts
import { MONTHS, CSS_COLORS, HTTP_STATUS_CODES } from 'nhb-toolbox/constants';

console.log(MONTHS[0]); // "January"
console.log(CSS_COLORS.white); // "#FFFFFF"
console.log(HTTP_STATUS_CODES.NOT_FOUND); // 404
```

:::tip
All constants are fully typed and include IntelliSense support in TypeScript-enabled editors.
:::
