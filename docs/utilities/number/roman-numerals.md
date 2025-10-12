---
id: roman-numerals
title: Handle Roman Numerals  
---

<!-- markdownlint-disable-file MD024 -->

## convertToRomanNumerals

:::info
**Converts an integer into its equivalent Roman numeral representation.**
:::

Converts any valid number from `1` to `3999` into a Roman numeral.

### Function Signature

```ts
convertToRomanNumerals(value: Numeric): RomanNumeralCap;
```

### Parameters

- `value` — The numeric input (either `number` or numeric string) to be converted.

### Returns

- A `RomanNumeralCap` representing the Roman numeral form of the number. Type `RomanNumeralCap` represents up to 5 characters in *Roman* and does not enforce valid Roman numeral formation.

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

`convertToRomanNumerals` can also be imported via the following aliases:

- `toRoman`
- `numberToRoman`
- `arabicToRoman`
- `integerToRoman`
- `numericToRoman`
- `toRomanNumeral`

---

### Notes

- Roman numerals were used in ancient Rome for counting and notation. This implementation supports only traditional Roman numerals (`1``–3999`).
- The conversion follows standard subtractive notation rules: e.g., `4 = IV`, `9 = IX`, `40 = XL`, `90 = XC`.
- This function does not support numbers ≥ 4000 due to limitations in classical Roman numeral representation.

---

### Conclusion

Use `convertToRomanNumerals` when you need to represent numbers in Roman format — useful for page numbers, date stylization, clocks, or decorative number displays.

---

## romanToInteger

:::info
**Converts a Roman numeral into its equivalent Arabic integer representation.**
:::

Converts any valid Roman numeral from `I` to `MMMCMXCIX` (1 to 3999) into an integer.

### Function Signature

```ts
romanToInteger(roman: RomanNumeral): number;
```

### Parameters

- `roman` — The Roman numeral input (*case-insensitive* string) to be converted. Type `RomanNumeral` represents up to 5 characters (*case-insensitive*) in *Roman* and any other string.

### Returns

- A `number` representing the integer form of the Roman numeral.

### Throws

- `TypeError` — If the input is not a non-empty string.
- `Error` — If the Roman numeral contains invalid characters or is malformed.
- `RangeError` — If the resulting number is less than `1` or greater than `3999`.

---

### Examples

```ts
romanToInteger("XXIX"); // 29
romanToInteger("MCMLXXXVII"); // 1987
romanToInteger("MMMCMXCIX"); // 3999
romanToInteger(""); // throws TypeError
romanToInteger("ABC"); // throws Error: Invalid Roman numeral character
```

---

### Aliases

`romanToInteger` can also be imported via the following aliases:

- `romanToArabic`
- `romanToNumeric`
- `convertRomanToArabic`
- `convertRomanToNumeric`
- `convertRomanToInteger`

---

### Notes

- This function validates the input Roman numeral by:
  1. Checking for invalid characters
  2. Ensuring proper subtractive notation rules are followed
  3. Reconverting the result back to Roman numerals to verify correctness
- The function is case-insensitive but will normalize input to uppercase.
- Only supports traditional Roman numerals in the range `1`–`3999`.

---

### Conclusion

Use `romanToInteger` when you need to convert Roman numerals back to standard Arabic numbers — useful for parsing historical documents, clock faces, or any application that displays numbers in Roman format.
