---
id: Currency
title: Currency - Format & Convert Currencies
---

<!-- markdownlint-disable-file MD024 -->

## `Currency`

The `Currency` class provides utilities for handling currency operations including formatting and conversion. It supports locale-specific formatting and uses the Frankfurter API for currency conversion with automatic rate caching.

### Constructor

Creates a new Currency instance with specified amount and currency code.

#### Signature

```typescript
constructor<Code extends CurrencyCode>(amount: Numeric, code: Code): Currency<Code>
```

#### Parameters

- `amount`: Numeric value (number or string) representing the currency amount
- `code`: ISO 4217 currency code (e.g., 'USD', 'EUR')

#### Behavior

- Converts amount to number
- Stores formatted currency string using 'en-US' locale

#### Example

```ts
new Currency(100, 'USD'); // $100.00
```

---

### Available Methods

- Static Methods
  - [clearRateCache](#clearratecache)

- Instance Methods
  - [format](#format)
  - [convert](#convert)
  - [convertSync](#convertsync)

---

### Properties

#### currency

```typescript
readonly currency: string
```

Pre-formatted currency string using `'en-US'` locale.

---

### Examples

#### Basic Usage

```ts
const usd = new Currency(100, 'USD');
console.log(usd.currency); // "$100.00"
console.log(usd.format('ja-JP', 'JPY')); // "￥ 100"
```

#### Currency Conversion

```ts
const converted = await new Currency(100, 'USD').convert('EUR', {
  fallbackRate: 0.85
});
console.log(converted.currency); // Current EUR equivalent
```

#### Error Handling

```ts
try {
  const converted = await new Currency(100, 'USD').convert('XYZ');
} catch (error) {
  console.error('Conversion failed:', error.message);
}
```

---

## API Reference for Currency

### format()

Formats the currency amount according to specified locale rules.

#### Signature

```ts
format(locale?: LocaleCode, code?: CurrencyCode): string
```

#### Parameters

- `locale`: Optional BCP 47 locale code (e.g., 'de-DE')
- `code`: Optional ISO 4217 currency code (e.g., `'USD'`, `'EUR'`) used solely for formatting purposes. _This does not alter the internal currency code set during instantiation._

#### Return Value

Formatted currency string

#### Example

```ts
new Currency(1000, 'EUR').format('de-DE', ); // "1.000,00 €"
new Currency(1000, 'EUR').format('de-DE', 'GBP'); // "1.000,00 £"
```

---

### convert()

Converts the current currency amount to a target currency using **real-time exchange rates** from [api.frankfurter.app](https://api.frankfurter.app/latest).  
Includes automatic caching, error fallback handling, and support for manually defined rates. Please refer to [convertSync](#convertsync) for synchronous and network independent solution with manual exchange rate.

#### Signature

```ts
async convert<To extends FrankFurterCurrency>(to: To, options?: ConvertOptions): Promise<Currency<To>>
```

#### Parameters

- `to`:
  Target currency code to convert to. Must be a valid [Supported Currency](#supported-currencies), e.g., `'EUR'`, `'USD'` etc.

- `options` _(optional)_:

  - `fallbackRate`:
    A manual exchange rate to use if the API call fails or the currency is not supported.
  - `forceRefresh`:
    If `true`, forces a fresh fetch from the API, ignoring cached rates.

#### Return Value

A **new [`Currency`](../Currency)** instance containing the converted amount in the target currency.

#### Throws

Throws an `error` if:

- The API call fails **and**
- No `fallbackRate` is provided in `options`.

#### Behavior Details

- Caches conversion rates internally to avoid redundant API requests.
- Respects `forceRefresh` to bypass the cache when needed.
- Falls back to the provided `fallbackRate` if the live API fails or the currency is unsupported.
- Logs a warning in the console when falling back to a manual rate.

#### Supported Currencies

Only the following fiat currencies are supported by the live API:

```text
AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF,
IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN,
RON, SEK, SGD, THB, TRY, USD, ZAR
```

:::info
Use [convertSync](#convertsync) method to convert to other currencies using custom exchange rate.
:::

#### Example

```ts
const usd = new Currency(100, 'USD');

// Convert to EUR using live rates
const eur = await usd.convert('EUR');

// Convert with fallback if API fails
const inr = await usd.convert('INR', {
  fallbackRate: 83.12,
});
```

---

### convertSync()

Converts currency _synchronously_ using either a cached rate or a manually provided exchange rate.
_No network requests are made._

#### Signature

```ts
convertSync<To extends CurrencyCode>(to: To, rate: number): Currency<To>
```

#### Parameters

- `to`: Target currency code
- `rate`: Manual exchange rate to use if no cached rate is available

#### Return Value

- A new `Currency` instance with the converted amount.
- If no cached rate is found, the given manual rate is used.
- If no exchange rate is valid, returns the original currency instance.

#### Example

```ts
const eur = new Currency(100, 'USD').convertSync('EUR', 0.92);
```

---

### clearRateCache()

Clears all cached exchange rates to force fresh API calls.

#### Signature

```ts
static clearRateCache(): void
```

#### Example

```ts
Currency.clearRateCache();
```

---

### Type Definitions

#### LocaleCode

```ts
type LocaleCode = (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES] | (typeof LOCALE_CODES)[number]
```

Supported BCP 47 locale codes for formatting.

#### CurrencyCode

```ts
type CurrencyCode = "BDT" | "TMT" | "WST" | "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BGN" | "BHD" | "BIF" | "BMD" ... | 'USD' // etc.
```

Union of all supported currency codes in your system, including ISO 4217 and custom mappings.

#### FrankFurterCurrency

```ts
type FrankFurterCurrency = "USD" | "AUD" | "BGN" | "BRL" | "CAD" | "CHF" | "CNY" | "CZK" | "DKK" | "EUR" | "GBP" | "HKD" | "HUF" | "IDR" | "ILS" | "INR" | "ISK" | "JPY" | "KRW" | "MXN" | "MYR" | "NOK" | "NZD" | "PHP" | "PLN" | "RON" | "SEK" | "SGD" | "THB" | "TRY" | "ZAR"
```

Subset of `CurrencyCode` that are officially supported by the Frankfurter API. See [Supported currency list](#supported-currencies)

#### ConvertOptions

```ts
interface ConvertOptions {
  fallbackRate?: number;
  forceRefresh?: boolean;
}
```

Optional configuration object for the [convert()](#convert) method.
