---
id: constants
title: Ready to Use Constants
---

<!-- markdownlint-disable-file MD024 -->

Along with utilities, classes and types, `nhb-toolbox` exports a collection of ready-to-use constants for common development needs.

### 📦 Import

All constants can be imported using this pattern:

```ts
import { CONSTANT_NAME } from 'nhb-toolbox/constants';
```

---

### Available Constants

| Constant                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `WEEK_DAYS`              | Array of weekday names (Sunday-Saturday)                                 |
| `MONTHS`                 | Array of month names (January-December)                                  |
| `TIME_ZONES`             | Standard timezone identifiers                                            |
| `TIME_ZONE_LABELS`       | Human-readable timezone labels                                           |
| `VEDIC_ZODIAC_SIGNS`     | Traditional Indian/Vedic zodiac signs                                    |
| `WESTERN_ZODIAC_SIGNS`   | Western astrology zodiac signs                                           |
| `AUSTRALIA_SEASONS`      | Seasonal definitions for Australia                                       |
| `BANGLADESH_SEASONS`     | Seasonal definitions for Bangladesh                                      |
| `ETHIOPIA_SEASONS`       | Seasonal definitions for Ethiopia                                        |
| `INDIA_IMD_SEASONS`      | Indian Meteorological Department seasons                                 |
| `INDIA_TAMIL_SEASONS`    | Traditional Tamil seasonal calendar                                      |
| `INDIA_VEDIC_SEASONS`    | Ancient Vedic seasonal divisions                                         |
| `JAPAN_SEASONS`          | Traditional Japanese seasons                                             |
| `PHILIPPINES_SEASONS`    | Seasonal patterns for the Philippines                                    |
| `SEASON_PRESETS`         | Collection of all seasonal definitions                                   |
| `US_ACADEMIC_SEASONS`    | U.S. academic season names                                               |
| `WESTERN_SEASONS`        | Standard four-season model (Spring, Summer, Fall, Winter)                |
| `ALPHABET_COLOR_PALETTE` | Color palette mapped to letters A-Z                                      |
| `NUMBER_COLOR_PALETTE`   | Color palette mapped to numbers 0-9                                      |
| `CSS_COLORS`             | Standard CSS color names and hex values                                  |
| `CURRENCY_CODES`         | ISO 4217 currency codes (e.g., USD, EUR)                                 |
| `CURRENCY_LOCALES`       | Default locales for currency formatting                                  |
| `FRANKFURTER_CURRENCIES` | Currencies supported by Frankfurter API                                  |
| `LOCALE_CODES`           | Standard locale identifiers (e.g., en-US, fr-FR)                         |
| `LOWERCASED_WORDS`       | Common lowercase words (articles, prepositions etc.) for text processing |
| `HTTP_STATUS_CODES`      | Complete set of HTTP status codes with with jsdoc                        |
| `HTTP_STATUS`            | Alias for HTTP_STATUS_CODES                                              |
| `HTTP_CODES`             | Alias for HTTP_STATUS_CODES                                              |
| `STATUS_CODES`           | Alias for HTTP_STATUS_CODES                                              |

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
