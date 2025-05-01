---
id: convertToRoman
title: Convert to Roman Numerals  
---

**Converts an integer into its equivalent Roman numeral representation.**

---

## `convertToRomanNumerals`

Converts any valid number from `1` to `3999` into a Roman numeral.

### Function Signature

```ts
function convertToRomanNumerals(num: Numeric): string;
```

### Parameters

- `num` — The numeric input (either number or numeric string) to be converted.

### Returns

- A `string` representing the Roman numeral form of the number.

### Throws

- `RangeError` — If the number is less than `1` or greater than `3999`.

---

### Examples

```ts
convertToRomanNumerals(29); // "XXIX"
convertToRomanNumerals("1987"); // "MCMLXXXVII"
convertToRomanNumerals(3999); // "MMMCMXCIX"
convertToRomanNumerals(0); // throws RangeError
```

---

### Aliases

- toRoman,
- numberToRoman,
- integerToRoman,
- toRomanNumeral
- numericToRoman

---

### Notes

- Roman numerals were used in ancient Rome for counting and notation. This implementation supports only traditional Roman numerals (1–3999).
- The conversion follows standard subtractive notation rules: e.g., `4 = IV`, `9 = IX`, `40 = XL`, `90 = XC`.
- This function does not support numbers ≥ 4000 due to limitations in classical Roman numeral representation.

---

### Conclusion

Use `convertToRomanNumerals` when you need to represent numbers in Roman format — useful for page numbers, date stylization, clocks, or decorative number displays.
