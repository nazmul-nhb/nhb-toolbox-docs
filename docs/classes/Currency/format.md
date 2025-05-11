---
id: format
title: Format Currency
---

<!-- markdownlint-disable-file MD024 -->
## format()

Formats the currency amount according to specified locale rules.

### Signature

```typescript
format(locale?: LocaleCode): string
```

### Parameters

- `locale`: Optional BCP 47 locale code (e.g., 'de-DE')

### Return Value

Formatted currency string

### Example

```javascript
new Currency(1000, 'EUR').format('de-DE'); // "1.000,00 €"
```

## Type Definitions

### LocaleCode

```typescript
type LocaleCode = (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES] | (typeof LOCALE_CODES)[number]
```

Supported BCP 47 locale codes for formatting.
