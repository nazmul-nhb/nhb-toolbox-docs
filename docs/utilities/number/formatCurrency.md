---
id: formatCurrency  
title: Format Currency  
---

## formatCurrency  

The `formatCurrency` function formats a number or numeric string as a locale-aware currency string, automatically handling symbol placement, decimal separators, and grouping. It uses the browser's built-in `Intl.NumberFormat` API for accurate localization.

### Function Signature  

```typescript
formatCurrency( value: Numeric,  currency?: CurrencyCode,  locale?: LocaleCode ): string;
```

### Parameters  

- **`value`** (`Numeric`): The number or numeric string to format (e.g., `42` or `"42.50"`).  
- **`currency`** (optional, `CurrencyCode`): ISO 4217 currency code (default: `'USD'`).  
- **`locale`** (optional, `LocaleCode`): BCP 47 locale code (default: auto-detected based on currency).  

### Types  

#### `Numeric`  

Union type accepting numbers or numeric strings:  

```typescript
type Numeric = number | `${number}`;
```

#### `CurrencyCode`  

All supported ISO 4217 currency codes (e.g., `'USD'`, `'EUR'`, `'JPY'`):  

```typescript
type CurrencyCode = keyof typeof CURRENCY_LOCALES | (typeof CURRENCY_CODES)[number];
```

#### `LocaleCode`  

Supported BCP 47 locale codes (e.g., `'en-US'`, `'fr-FR'`, `'ja-JP'`):  

```typescript
type LocaleCode = (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES] | (typeof LOCALE_CODES)[number];
```

### Return Value  

Returns a formatted currency string with:  

- Localized symbol/number placement  
- Correct decimal/grouping separators  
- Currency symbol or code  

### Example Usage  

#### Basic Usage (USD Default)  

```typescript
import { formatCurrency } from 'nhb-toolbox';

console.log(formatCurrency(1234.56)); // "$1,234.56" (en-US locale)
```

#### Specific Currency  

```typescript
console.log(formatCurrency(99.99, 'EUR')); // "99,99 €"
console.log(formatCurrency("5000", 'JPY')); // "￥5,000" (ja-JP locale)
console.log(formatCurrency("5000", 'BDT')); // "৫,০০০.০০৳" (bn-BD locale)
```

#### Custom Locale Override  

```typescript
console.log(formatCurrency(1500, 'EUR', 'fr-FR')); // "1 500,00 €" 
console.log(formatCurrency(1500, 'EUR', 'de-DE')); // "1.500,00 €"
console.log(formatCurrency(1500, 'BDT', 'en-US')); // "BDT 1,500.00"
```

### Notes  

- **Automatic Locale Detection**: If no locale is provided, uses `CURRENCY_LOCALES` mapping (e.g., `USD` → `en-US`, `EUR` → `de-DE`).  
- **Negative Values**: Formats negative numbers according to locale (e.g., `-42` → `-$42.00` or `($42.00)`).  
- **Numeric Strings**: Accepts strings like `"42.5"` (converted to numbers internally).  
- **Browser Support**: Relies on `Intl.NumberFormat` (supported in all modern browsers).  

### Supported Currencies & Locales  

Full lists are available in the package as:  

- `CURRENCY_CODES`: Array of all ISO 4217 currency codes  
- `LOCALE_CODES`: Array of all BCP 47 locale codes  
- `CURRENCY_LOCALES`: Mapping of currencies to their default locales  

### Aliases  

- `convertNumberToCurrency`: Alias for `formatCurrency`.  

### Conclusion  

`formatCurrency` provides robust international currency formatting with minimal configuration, ideal for e-commerce, financial apps, and multi-regional dashboards. The extensive currency/locale support ensures accurate formatting for global audiences.  
