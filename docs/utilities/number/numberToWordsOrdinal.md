---
id: numberToWordsOrdinal
title: Number to Ordinal Words
---

## numberToWordsOrdinal

Converts a number, numeric string, or cardinal word string into its **ordinal word** representation (e.g. `"first"`, `"twenty-third"` etc.).

---

### Function Signature

```ts
numberToWordsOrdinal(number: Numeric | string): string
```

---

### Parameters

| Name     | Type       | Description                                           |
| -------- | ---------- | ----------------------------------------------------- |
| `number` | `Numeric`  | A number (e.g. `42`) ot numeric string (e.g. `"42"`). |
| `number` | `string`   | A cardinal word (e.g. `"forty-two"`).                 |

---

### Return Value

| Type     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| `string` | The ordinal word version of the input, always in lowercase.     |

:::caution[Warning]

- **Supports only values up to `10e19` (`10^20`) (one hundred quintillion).**
- **Decimal values are **ignored**; Only the integer part is processed.**

:::

---

### Example Usage

```ts
import { numberToWordsOrdinal } from 'nhb-toolbox';

numberToWordsOrdinal(1);              // "first"
numberToWordsOrdinal("23");           // "twenty-third"
numberToWordsOrdinal("twenty-three"); // "twenty-third"
```

---

### Notes

- Accepts inputs as numbers, numeric strings, or cardinal words.
- Case-insensitive input handling (`"Twenty-Three"` also works).
- The result is always returned in lowercase.
- Internally uses [numberToWords](numberToWords) to convert a numeric value to (cardinal) words.
- For reverse process please refer to [wordsToNumber](wordsToNumber).

---

### Aliases

`numberToWordsOrdinal` can also be imported as following aliases:

- `cardinalWordsToOrdinal`
- `convertNumberToWordsOrdinal`

---

### Conclusion

Use `numberToWordsOrdinal` when you need a clean and readable ordinal representation of a number or cardinal string, such as for UI labels, reports, or voice responses.
