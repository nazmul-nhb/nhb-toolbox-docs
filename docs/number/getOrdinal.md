---
id: getOrdinal  
title: Get Ordinal  
---

## getOrdinal  

The `getOrdinal` function returns the ordinal suffix (e.g., `'st'`, `'nd'`, `'rd'`, `'th'`) for a given number or numeric string. It optionally prefixes the suffix with the original number (e.g., `"1st"` or `"st"`).  

### Function Signature  

```typescript  
function getOrdinal(num: Numeric, withNumber?: boolean): string;  
```  

### Parameters  

- **`num`** (`Numeric`): The number (or numeric string) to derive the ordinal suffix from.  
- **`withNumber`** (optional, `boolean`): If `true`, returns the number with its ordinal suffix (e.g., `"3rd"`). If `false`, returns only the suffix (e.g., `"rd"`). Defaults to `true`.  

### Type: `Numeric`  

A union type representing either a `number` or a numeric string (e.g., `"42"`):  

```typescript  
type Numeric = number | `${number}`;  
```  

### Return Value  

Returns:  

- The number concatenated with its ordinal suffix (e.g., `"1st"`, `"2nd"`) if `withNumber` is `true`.  
- Only the suffix (e.g., `"th"`, `"nd"`) if `withNumber` is `false`.  

### Example Usage  

#### With Number (Default)  

```typescript  
import { getOrdinal } from 'nhb-toolbox';  

console.log(getOrdinal(1));        // "1st"  
console.log(getOrdinal("22"));      // "22nd"  
console.log(getOrdinal(13, true));  // "13th"  
```  

#### Without Number  

```typescript  
import { getOrdinal } from 'nhb-toolbox';  

console.log(getOrdinal(3, false));   // "rd"  
console.log(getOrdinal("11", false)); // "th"  
```  

### Notes  

- Handles special cases for numbers ending in `11`, `12`, or `13` (all use `'th'`).  
- Accepts both numbers and numeric strings (e.g., `42` or `"42"`).  
- Negative numbers are treated as their absolute values (e.g., `-5` → `"5th"`).  

### Aliases  

- `cardinalToOrdinal`: Alias for `getOrdinal`.  
- `convertNumberToOrdinal`: Alias for `getOrdinal`.  
- `convertToOrdinal`: Alias for `getOrdinal`.  
- `getOrdinalNumber`: Alias for `getOrdinal`.  
- `numberToOrdinal`: Alias for `getOrdinal`.  

### Conclusion  

The `getOrdinal` function simplifies displaying numbers in their ordinal form (e.g., rankings, dates), supporting flexible output with or without the base number. Its aliases provide contextual naming for broader use cases.
