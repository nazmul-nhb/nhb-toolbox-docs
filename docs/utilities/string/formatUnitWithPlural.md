---
id: formatUnitWithPlural  
title: Format Unit With Plural  
---

## formatUnitWithPlural

The `formatUnitWithPlural` function returns a grammatically correct unit string based on the numeric value provided. It optionally prefixes the unit with the number.

### Function Signature

```typescript
function formatUnitWithPlural(count: number, unit: string, withNumber?: boolean): string;
```

### Parameters

- **`count`**: The numeric value used to determine whether the unit should be singular or plural.
- **`unit`**: The base unit string (e.g., `"day"`, `"hour"`, `"month"`).
- **`withNumber`** (optional): Whether to include the number before the unit. Defaults to `true`.

### Return Value

Returns a properly formatted unit string, such as:

- `"1 day"` or `"2 days"` if `withNumber` is `true`.
- `"day"` or `"days"` if `withNumber` is `false`.

### Example Usage

#### With Number

```typescript
import { formatUnitWithPlural } from 'nhb-toolbox';

console.log(formatUnitWithPlural(1, 'hour')); // "1 hour"
console.log(formatUnitWithPlural(3, 'day'));  // "3 days"
```

#### Without Number

```typescript
import { formatUnitWithPlural } from 'nhb-toolbox';

console.log(formatUnitWithPlural(1, 'minute', false)); // "minute"
console.log(formatUnitWithPlural(5, 'month', false));  // "months"
```

### Notes

- Automatically pluralizes the unit if the absolute count is not `1`.
- Accepts both positive and negative numbers (e.g., `-1` is treated like `1` for pluralization).
- Does not handle irregular plurals like `child` -> `children` instead it does return unit with `s`. Future update will ensure custom plural form of the unit to pass.

### Aliases

- `formatNumberWithPluralUnit`: Alias for `formatUnitWithPlural`.
- `formatWithPlural`: Alias for `formatUnitWithPlural`.

### Conclusion

The `formatUnitWithPlural` function is useful for displaying human-readable units based on dynamic counts, supporting singular and plural forms with or without the numeric prefix.
