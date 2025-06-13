---
id: Currency
title: Currency - Format and convert currencies
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

## Available Methods

- Static Methods
  - [clearRateCache](Currency/clearRateCache)

- Instance Methods
  - [format](Currency/format)
  - [convert](Currency/convert#convert)
  - [convertSync](Currency/convert#convertsync)

## Properties

### currency

```typescript
readonly currency: string
```

Pre-formatted currency string using `'en-US'` locale.

## Examples

### Basic Usage

```javascript
const usd = new Currency(100, 'USD');
console.log(usd.currency); // "$100.00"
console.log(usd.format('ja-JP', 'JPY')); // "￥ 100"
```

### Currency Conversion

```javascript
const converted = await new Currency(100, 'USD').convert('EUR', {
  fallbackRate: 0.85
});
console.log(converted.currency); // Current EUR equivalent
```

### Error Handling

```javascript
try {
  const converted = await new Currency(100, 'USD').convert('XYZ');
} catch (error) {
  console.error('Conversion failed:', error.message);
}
```
