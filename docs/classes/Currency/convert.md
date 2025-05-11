---
id: convert
title: Convert Currency
---

<!-- markdownlint-disable-file MD024 -->
## convert()

Converts currency to target currency using live exchange rates from `Frankfurter API`.

### Signature

```typescript
async convert(to: SupportedCurrency | CurrencyCode, options?: ConvertOptions): Promise<number>
```

### Parameters

- `to`: Target currency code
- `options`: Optional conversion settings
  - `fallbackRate`: Manual rate if API fails
  - `forceRefresh`: Bypass cache

### Return Value

Converted amount as number

### Supported Currencies

AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, SEK, SGD, THB, TRY, USD, ZAR

### Example

```javascript
await new Currency(100, 'USD').convert('EUR');
```

## Type Definitions

### CurrencyCode

```typescript
type CurrencyCode = keyof typeof CURRENCY_LOCALES | (typeof CURRENCY_CODES)[number]
```

Union of supported currency codes including ISO 4217 codes.

### SupportedCurrency

```typescript
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]
```

Fiat currencies supported by Frankfurter API.

### ConvertOptions

```typescript
interface ConvertOptions {
  fallbackRate?: number;
  forceRefresh?: boolean;
}
```

Options for currency conversion.
