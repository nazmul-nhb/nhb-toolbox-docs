---
id: getCountryByPhone
title: Country Details By Phone
---

## getCountryByPhone

Gets country details by matching the country code in the given phone number.

:::info
This function help identify countries from phone numbers using the built-in countries database.
:::

### Import

```ts
import { getCountryByPhone } from 'nhb-toolbox';
```

---

### Function Signature

```ts
getCountryByPhone(phone: number | string): CountryDetails[]
```

| Parameter | Type                 | Description                                             |
| --------- | -------------------- | ------------------------------------------------------- |
| `phone`   | `number` \| `string` | The phone number to look up. Can be a string or number. |

**Returns:** `CountryDetails[]` — Array of matching country details. Returns empty array if no match found or input is invalid.

### Features

- Automatically normalizes phone numbers by removing all non-digit characters
- Matches against country codes from the built-in `COUNTRIES` [constant](/docs/types/constants)
- Handles both string and number inputs
- Returns all matching countries when multiple share the same country code
- Returns empty array for invalid inputs (empty string, non-finite numbers)

### CountryDetails Type

```ts
type CountryDetails = Readonly<{
  /** Full country name (e.g., 'Bangladesh') */
  country_name: string;
  /** Country dialing code (e.g., '880') */
  country_code: string;
  /** Two-letter ISO code (e.g., 'BD') */
  iso_code_short: string;
  /** Three-letter ISO code (e.g., 'BGD') */
  iso_code: string;
}>;
```

### Examples

#### Basic Usage

```typescript
const countries = getCountryByPhone('+8801623732187');
// [
//   {
//     country_name: 'Bangladesh',
//     country_code: '880',
//     iso_code_short: 'BD',
//     iso_code: 'BGD'
//   }
// ]
```

#### Number Input

```typescript
const countries = getCountryByPhone(8801623732187);
// Returns same result as string input with '+'
```

#### Multiple Matches (Shared Country Code)

```typescript
// Some country codes are shared (e.g., '1' for US, Canada, etc.)
const countries = getCountryByPhone('+1-555-123-4567');
// Returns all countries with country code '1':
// [
//   {
//     country_name: 'Canada',
//     country_code: '1',
//     iso_code_short: 'CA',
//     iso_code: 'CAN'
//   },
//   {
//     country_name: 'United States',
//     country_code: '1',
//     iso_code_short: 'US',
//     iso_code: 'USA'
//   }
// ]
```

#### Local Number (No Country Code)

```typescript
const countries0 = getCountryByPhone('01623732187');
// Returns [] — cannot determine country without country code

const countries1 = getCountryByPhone('1623732187');
// Will return USA and Canada as they both share country code '1' and the given number matches with it
```

### Normalization Behavior

The function removes all non-digit characters before matching:

```typescript
// All of these produce the same normalized string '8801623732187'
getCountryByPhone('+880 1623-732187');
getCountryByPhone('8801623732187');
getCountryByPhone('+88-01623-732187');
getCountryByPhone(8801623732187);
```

### Country Code Matching

Country codes in the database may contain hyphens (e.g., `'1-242'` for Bahamas). The function removes hyphens before matching:

```typescript
// Bahamas country code is stored as '1-242'
getCountryByPhone('+1242...'); // Removes hyphens, matches '1242'
getCountryByPhone('+1-242...'); // Also matches
```

### Invalid Input Handling

```typescript
// Empty string
getCountryByPhone('');     // Returns []

// Non-finite numbers
getCountryByPhone(NaN);    // Returns []
getCountryByPhone(Infinity); // Returns []

// Non-string, non-number (TypeScript prevents at compile time)
getCountryByPhone(null);   // TypeScript error
getCountryByPhone({});     // TypeScript error
```

---

## Common Workflows

### Phone Number Validation by Country

```typescript
import { getCountryByPhone } from 'nhb-toolbox';

function validatePhoneNumber(phone: string, expectedCountry: string): boolean {
  const countries = getCountryByPhone(phone);
  return countries.some(c => c.country_name === expectedCountry);
}

validatePhoneNumber('+8801623732187', 'Bangladesh'); // true
```

### Country Code Extraction

```typescript
function getCountryCodeFromPhone(phone: string): string | null {
  const countries = getCountryByPhone(phone);
  if (countries.length === 0) return null;
  
  // Return the shortest matching country code (most specific)
  return countries.reduce((shortest, current) => 
    current.country_code.length < shortest.length ? current.country_code : shortest
  , countries[0].country_code);
}
```

### Format Phone Number with Country Info

```typescript
function formatPhoneWithCountry(phone: string): string {
  const countries = getCountryByPhone(phone);
  if (countries.length === 0) return phone;
  
  // Use the first matching country
  const country = countries[0];
  const normalized = phone.replace(/\D/g, '');
  const localNumber = normalized.slice(country.country_code.replace(/-/g, '').length);
  
  return `${country.country_name} (${country.iso_code_short}): +${country.country_code} ${localNumber}`;
}

formatPhoneWithCountry('+8801623732187');
// "Bangladesh (BD): +880 1623732187"
```

### Multi-country Support Display

```typescript
function getPossibleCountries(phone: string): string[] {
  return getCountryByPhone(phone).map(c => c.country_name);
}

// For ambiguous country codes
getPossibleCountries('+15551234567'); // ['United States', 'Canada', ...]
```

---

## Performance Notes

- **O(n)** time complexity where n is the number of countries in the constants database
- Country database is statically defined and immutable
- Normalization uses `replace(/\D/g, '')` which is efficient for typical phone number lengths
- Returns immediately on invalid input without processing

## Edge Cases

| Input                                       | Behavior                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| Empty string `''`                           | Returns `[]`                                                                      |
| `NaN`, `Infinity`                           | Returns `[]`                                                                      |
| Local number without country code           | Returns `[]`, but may return wrong country details if matches with a country code |
| Phone with spaces, hyphens, parentheses     | Normalized by removing all non-digits                                             |
| Country code with hyphens (e.g., `'1-242'`) | Hyphens removed before matching                                                   |
| Multiple countries sharing same code        | All matching countries returned                                                   |
| Phone shorter than any country code         | Returns `[]`                                                                      |

## Related Functions

- [**isNonEmptyString**](/docs/guards/primitive-guards#isnonemptystring) - Validation guard used internally
- [**isNumber**](/docs/guards/primitive-guards#isnumber) - Number validation guard used internally
- [**isString**](/docs/guards/primitive-guards#isstring) - String type guard used internally
