---
id: Currency
title: Currency - Format and convert currencies.
---

<!-- markdownlint-disable-file MD024 -->
## Overview

The `Currency` class provides utilities for handling currency operations including formatting and conversion. It supports locale-specific formatting and uses the Frankfurter API for currency conversion with automatic rate caching.

## Constructor

Creates a new Currency instance with specified amount and currency code.

### Signature

```typescript
constructor(amount: Numeric, code: CurrencyCode)
```

### Parameters

- `amount`: Numeric value (number or string) representing the currency amount
- `code`: ISO 4217 currency code (e.g., 'USD', 'EUR')

### Behavior

- Converts amount to number
- Stores formatted currency string using 'en-US' locale

### Example

```javascript
new Currency(100, 'USD'); // $100.00
```

## Static Methods

### clearRateCache()

Clears all cached exchange rates to force fresh API calls.

#### Signature

```typescript
static clearRateCache(): void
```

#### Example

```javascript
Currency.clearRateCache();
```

## Instance Methods

### format()

Formats the currency amount according to specified locale rules.

#### Signature

```typescript
format(locale?: LocaleCode): string
```

#### Parameters

- `locale`: Optional BCP 47 locale code (e.g., 'de-DE')

#### Return Value

Formatted currency string

#### Example

```javascript
new Currency(1000, 'EUR').format('de-DE'); // "1.000,00 €"
```

### convert()

Converts currency to target currency using live exchange rates from `Frankfurter API`.

#### Signature

```typescript
async convert(to: SupportedCurrency | CurrencyCode, options?: ConvertOptions): Promise<number>
```

#### Parameters

- `to`: Target currency code
- `options`: Optional conversion settings
  - `fallbackRate`: Manual rate if API fails
  - `forceRefresh`: Bypass cache

#### Return Value

Converted amount as number

#### Supported Currencies

AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, SEK, SGD, THB, TRY, USD, ZAR

#### Example

```javascript
await new Currency(100, 'USD').convert('EUR');
```

## Type Definitions

### CurrencyCode

```typescript
type CurrencyCode = keyof typeof CURRENCY_LOCALES | (typeof CURRENCY_CODES)[number]
```

Union of supported currency codes including ISO 4217 codes.

### LocaleCode

```typescript
type LocaleCode = (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES] | (typeof LOCALE_CODES)[number]
```

Supported BCP 47 locale codes for formatting.

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

### FrankFurter

```typescript
interface FrankFurter {
  amount: number;
  base: CurrencyCode;
  date: string;
  rates: Record<CurrencyCode, number>;
}
```

Response structure from Frankfurter API.

## Properties

### currency

```typescript
readonly currency: string
```

Pre-formatted currency string using 'en-US' locale.

## Examples

### Basic Usage

```javascript
const usd = new Currency(100, 'USD');
console.log(usd.currency); // "$100.00"
console.log(usd.format('ja-JP')); // "￥100"
```

### Currency Conversion

```javascript
const amount = await new Currency(100, 'USD').convert('EUR', {
  fallbackRate: 0.85
});
console.log(amount); // Current EUR equivalent
```

### Error Handling

```javascript
try {
  const amount = await new Currency(100, 'USD').convert('XYZ');
} catch (error) {
  console.error('Conversion failed:', error.message);
}
```
