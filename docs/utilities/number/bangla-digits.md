---
id: bangla-digits
title: Handle Bangla Digits
---

<!-- markdownlint-disable-file MD024 -->

## Overview

The digit conversion utilities provide seamless conversion between Bangla (Bengali) digits (`০-৯`) and Latin (Arabic) digits (`0-9`). These functions are essential for applications that need to handle multilingual numeric representations, particularly in Bengali-language interfaces.

---

## banglaToDigit()

Converts Bangla digits to Latin digits with flexible output options.

### Signature

```typescript
banglaToDigit<Force extends boolean = true>(bnDigit: string, forceNumber?: Force): BnDigitResult<Force>
```

### Parameters

- `bnDigit`: A string containing Bangla digits (`০-৯`)
- `forceNumber`:
  - `true` (default): Returns a `number` (strips non-digit characters)
  - `false`: Returns a `string` (preserves non-digit characters)

### Return Value

- When `forceNumber = true`: `number` (or `0` or `NaN` if no digits found)
- When `forceNumber = false`: `string`

### Behavior

| Input                       | `forceNumber = true`         | `forceNumber = false`                |
| --------------------------- | ---------------------------- | ------------------------------------ |
| Contains only Bangla digits | Returns converted number     | Returns converted string             |
| Contains mixed characters   | Returns number (digits only) | Returns string with converted digits |
| Empty string                | Returns `NaN`                | Returns empty string                 |
| No digits in string         | Returns `0` or `NaN`         | Returns the input string             |

### Examples

```typescript
// Default behavior (forceNumber = true)
banglaToDigit('১২৩');        // 123
banglaToDigit('৪৫৬৭');      // 4567
banglaToDigit('১২৩abc');     // 123 (non-digits stripped)
banglaToDigit('abc');        // 0 (no digits)
banglaToDigit('');           // NaN

// Force string output (forceNumber = false)
banglaToDigit('১২৩', false);        // "123"
banglaToDigit('১২৩abc', false);     // "123abc" (preserves non-digits)
banglaToDigit('৪৫৬৭', false);       // "4567"
banglaToDigit('abc', false);        // "abc" (empty string)
banglaToDigit('', false);           // "" (empty string)

// Complex examples
banglaToDigit('আমার বয়স ২৫ বছর');      // 25
banglaToDigit('ফোন: ০১৭১২৩৪৫৬৭৮', false); // "ফোন: 01712345678"
```

### Use Cases

- Parsing numeric input from Bengali users
- Converting database values stored in Bangla digits to numbers for calculations
- Processing multilingual forms that accept Bangla numbers
- Localization utilities for Bengali applications

---

## digitToBangla()

Converts Latin digits to Bangla digits with optional non-digit preservation.

### Signature

```typescript
digitToBangla(digit: number | string, preserveNonDigit = true): string
```

### Parameters

- `digit`: A number or string containing Latin digits (0-9)
- `preserveNonDigit`:
  - `true` (default): Preserves non-digit characters in output
  - `false`: Strips non-numeric characters from output

### Return Value

`string` - Converted Bangla digit string (or empty string for invalid input)

### Behavior

| Input                        | `preserveNonDigit = true`         | `preserveNonDigit = false`     |
| ---------------------------- | --------------------------------- | ------------------------------ |
| Number                       | Returns Bangla digits             | Returns Bangla digits          |
| String with only digits      | Returns Bangla digits             | Returns Bangla digits          |
| String with mixed characters | Converts digits, preserves others | Converts digits, strips others |
| Empty string                 | Returns empty string              | Returns empty string           |
| Non-numeric string           | Returns original string           | Returns empty string           |

### Examples

```typescript
// Default behavior (preserveNonDigit = true)
digitToBangla(123);                 // "১২৩"
digitToBangla(4567);                // "৪৫৬৭"
digitToBangla('123');               // "১২৩"
digitToBangla('12ab34');            // "১২ab৩৪"
digitToBangla('abc');               // "abc"
digitToBangla('');                  // ""

// Strip non-digits (preserveNonDigit = false)
digitToBangla('12ab34', false);     // "১২৩৪" (non-digits removed)
digitToBangla('abc', false);        // "" (no digits)
digitToBangla('১২৩', false);        // "১২৩" (already Bangla digits)
digitToBangla('', false);           // ""

// Complex examples
digitToBangla('Phone: 01712345678');
// "Phone: ০১৭১২৩৪৫৬৭৮"

digitToBangla('আমার বয়স 25 বছর');
// "আমার বয়স ২৫ বছর"

digitToBangla('Price: $99.99', false);
// "৯৯৯৯" (strips all non-digits)
```

### Use Cases

- Displaying numbers in Bengali interfaces
- Formatting prices, quantities, and measurements in Bengali
- Generating multilingual receipts and invoices
- Localizing numeric data for Bengali users

---

## Type Definitions

### BanglaDigit

```typescript
type BanglaDigit = '০' | '১' | '২' | '৩' | '৪' | '৫' | '৬' | '৭' | '৮' | '৯';
```

### BnDigitResult

```typescript
type BnDigitResult<Force extends boolean> = Force extends true ? number : string;
```

---

## Complete Examples

### Example 1: Form Processing

```typescript
// User inputs Bangla digits in a form
const userInput = '২৫০০';
const numericValue = banglaToDigit(userInput); // 2500

// Process the number
const discounted = numericValue * 0.9; // 2250

// Display result in Bangla
const displayValue = digitToBangla(discounted); // "২২৫০"
```

### Example 2: Multilingual Price Display

```typescript
function formatPrice(price: number, locale: 'bn' | 'en' = 'en'): string {
  if (locale === 'bn') {
    const banglaPrice = digitToBangla(price);
    return `৳${banglaPrice}`;
  }
  return `$${price.toFixed(2)}`;
}

formatPrice(1250, 'bn'); // "৳১২৫০"
formatPrice(1250, 'en'); // "$1250.00"
```

### Example 3: Phone Number Formatting

```typescript
// Standardize phone number input
function formatPhoneNumber(phone: string): string {
  // Convert any Bangla digits to Latin
  const latinPhone = banglaToDigit(phone, false); // "01712345678"
  
  // Format with hyphens
  return `${latinPhone.slice(0, 3)}-${latinPhone.slice(3, 6)}-${latinPhone.slice(6)}`;
}

formatPhoneNumber('০১৭১২৩৪৫৬৭৮'); // "017-123-45678"
```

---

:::tip[Best Practices]

- **Use `banglaToDigit()` with `forceNumber = true`** when you need to perform calculations
- **Use `banglaToDigit()` with `forceNumber = false`** when you need to preserve text formatting
- **Use `digitToBangla()` with `preserveNonDigit = true`** for displaying formatted text
- **Use `digitToBangla()` with `preserveNonDigit = false`** for generating clean numeric strings
- **Always validate input** before conversion to handle edge cases

:::

---

## Related Utilities

- [`isNumericString()`](/docs/guards/mixed-guards#isnumericstring) - Check if a string contains only digits
- [`isNonEmptyString()`](/docs/guards/primitive-guards#isnonemptystring) - Check if a string is not empty
