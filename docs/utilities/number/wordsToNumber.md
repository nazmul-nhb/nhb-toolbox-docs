---
id: wordsToNumber
title: Convert Words to Number
---

## wordsToNumber

Converts an English cardinal or ordinal word string into its numeric value.  
> Supports hyphenated words, "and", ordinals (first, second, etc.), negatives, and large scales (thousand, million, etc.) up to 10^20 (one hundred quintillion).

---

### Function Signature

```ts
function wordsToNumber(word: string): number;
```

### Parameters

- `word` — The English word representation of a number to convert (can be cardinal or ordinal).

### Returns

- A `number` containing the numeric value of the input.
- Returns `NaN` if the input cannot be parsed.

:::caution[Warning]

- **For very large numbers (quintillion and beyond), results may not always be correct.**
- **Mixed words with non-numeric tokens (e.g., "seventy-seven cats") will return NaN.**

:::

### Examples

```ts
import { wordsToNumber } from 'nhb-toolbox';

wordsToNumber('forty-two'); 
// 42

wordsToNumber('one hundred and seven'); 
// 107

wordsToNumber('two thousand three hundred'); 
// 2300

wordsToNumber('twenty-first'); 
// 21

wordsToNumber('negative five'); 
// -5

wordsToNumber('one hundred quintillion'); 
// 1e20

wordsToNumber('one zillion'); 
// NaN
```

### Supported Features

- **Cardinal numbers:** "one", "two", ..., "one hundred", etc.
- **Ordinal numbers:** "first", "second", ..., "twenty-first", etc.
- **Large scales:** "thousand", "million", ..., "quintillion" (up to 10^20).
- **Negative numbers:** "minus five", "negative forty-two".
- **Hyphenated or spaced numbers:** "forty-two" or "forty two".
- **"And" in numbers:** "one hundred and one".
- **Numeric strings:** "1,234", "042", "3.14".

---

### Notes

- The function uses predefined constants for **ones**, **teens**, **tens**, and **thousands** scales to parse the word form.
- Leading/trailing/multiple spaces are normalized during processing.
- Negative numbers are correctly converted to negative numeric values.
- For converting numbers to their _cardinal_ word representation, refer to [numberToWords](numberToWords).
- For converting numbers to their _ordinal_ word representation, refer to [numberToWordsOrdinal](numberToWordsOrdinal).

---

### Edge Cases

- Empty strings or strings with only whitespace return `NaN`.
- Mixed words with non-numeric tokens (e.g., "seventy-seven cats") return `NaN`.
- Unsupported scales (e.g., "sextillion") return `NaN`.
- Commas are only allowed in numeric strings (e.g., "1,234"), not in word forms.

---

### Conclusion

Use `wordsToNumber` to convert English word representations of numbers into numeric values. Ideal for processing user input, natural language parsing, or accessibility features where numeric interpretation of words is required.
