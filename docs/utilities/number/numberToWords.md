---
id: numberToWords
title: Number to Words (Cardinal)
---

## numberToWords

Converts a numeric value into its English word representation.  
**Supports up to `10e19` or `10^20` (one hundred quintillion)**. Decimal fractions are ignored.

---

### Function Signature

```ts
function numberToWords(number: Numeric): string;
```

### Parameters

- `number` — The numeric value (integer or numeric string) to convert.

### Returns

- A `string` containing the English word representation of the integer portion of the input.

:::caution[Warning]

- **Supports only values up to `10e19` (`10^20`) (one hundred quintillion).**
- **Decimal values are **ignored**; Only the integer part is processed.**

:::

---

### Examples

```ts
import { convertToWords } from 'nhb-toolbox';

numberToWords(42);
// "forty-two"

numberToWords(-1506);
// "minus one thousand five hundred and six"

numberToWords("123456789");
// "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"

numberToWords(0.987);
// "zero"

numberToWords(1e21);
// "Number exceeds supported range (max is 10e19 aka 10^20)"
```

---

### Aliases

`numberToWords` can also be imported as following alias:

- `convertNumberToWords`

---

### Notes

- The function uses predefined constants for **ones**, **teens**, **tens**, and **thousands** to construct the word form.
- Leading/trailing/multiple spaces are trimmed to return a clean result.
- Negative numbers are correctly prefixed with `"minus"`.
- For ordinal word representation of a numeric value please refer to [numberToWordsOrdinal](numberToWordsOrdinal).
- For reverse process please refer to [wordsToNumber](wordsToNumber).

---

### Conclusion

Use `numberToWords` to convert integers (up to 20-digit length) into human-readable English. Ideal for financial reports, invoices, or accessibility features where spoken representation of numbers is required.
