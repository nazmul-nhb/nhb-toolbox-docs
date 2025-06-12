---
id: format
title: Format Currency
---

<!-- markdownlint-disable-file MD024 -->
## format()

Formats the currency amount according to specified locale rules.

### Signature

```typescript
format(locale?: LocaleCode, code?: CurrencyCode): string
```

### Parameters

- `locale`: Optional BCP 47 locale code (e.g., 'de-DE')
- `code`: Optional ISO 4217 currency code (e.g., `'USD'`, `'EUR'`) used solely for formatting purposes. _This does not alter the internal currency code set during instantiation._

### Return Value

Formatted currency string

### Example

```javascript
new Currency(1000, 'EUR').format('de-DE', ); // "1.000,00 €"
new Currency(1000, 'EUR').format('de-DE', 'GBP'); // "1.000,00 £"
```

## Type Definitions

### LocaleCode

```typescript
type LocaleCode = (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES] | (typeof LOCALE_CODES)[number]
```

Supported BCP 47 locale codes for formatting.
