---
id: convert
title: Convert Currency
---

## convert()

Converts the current currency amount to a target currency using **real-time exchange rates** from [api.frankfurter.app](https://api.frankfurter.app/).  
Includes automatic caching, error fallback handling, and support for manually defined rates.

---

### Signature

```ts
async convert(to: SupportedCurrency | CurrencyCode, options?: ConvertOptions): Promise<Currency>
```

---

### Parameters

* `to`:
  Target currency code to convert to. Must be a valid [Supported Currency](#supported-currencies), e.g., `'EUR'`, `'USD'`.

* `options` _(optional)_:

  * `fallbackRate`:
    A manual exchange rate to use if the API call fails or the currency is not supported.
  * `forceRefresh`:
    If `true`, forces a fresh fetch from the API, ignoring cached rates.

---

### Return Value

A **new [`Currency`](../Currency)** instance containing the converted amount in the target currency.

---

### Throws

Throws an `error` if:

* The API call fails **and**
* No `fallbackRate` is provided in `options`.

---

### Behavior Details

* Caches conversion rates internally to avoid redundant API requests.
* Respects `forceRefresh` to bypass the cache when needed.
* Falls back to the provided `fallbackRate` if the live API fails or the currency is unsupported.
* Logs a warning in the console when falling back to a manual rate.

---

### Supported Currencies

Only the following fiat currencies are supported by the live API:

```text
AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF,
IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN,
RON, SEK, SGD, THB, TRY, USD, ZAR
```

---

### Example

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

## Type Definitions

### CurrencyCode

```ts
type CurrencyCode = keyof typeof CURRENCY_LOCALES | (typeof CURRENCY_CODES)[number]
```

Union of all supported currency codes in your system, including ISO 4217 and custom mappings.

---

### SupportedCurrency

```ts
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]
```

Subset of `CurrencyCode` that are officially supported by the Frankfurter API.

---

### ConvertOptions

```ts
interface ConvertOptions {
  fallbackRate?: number;
  forceRefresh?: boolean;
}
```

Optional configuration object for the `convert()` method.
