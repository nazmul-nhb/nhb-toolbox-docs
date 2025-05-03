---
id: extractNumbers
title: Extract Numbers
---

## extractNumbersFromString

Extracts all numeric substrings from a given string and returns them as an array of numbers. Only integer-like digits are matched.

### Function Signature

```ts
export const extractNumbersFromString = (input: string): number[] => {
  return (input.match(/\d+/g) || []).map(Number);
};
```

### Parameters

| Name    | Description                              |
|---------|------------------------------------------|
| `input` | The string to extract numbers from.      |

### Returns

An array of numbers extracted from the input string. If no numbers are found, returns an empty array.

### Example

```ts
extractNumbersFromString('There are 3 cats and 25 dogs'); // [3, 25]
extractNumbersFromString('100 apples, zero oranges');     // [100]
extractNumbersFromString('No digits here.');              // []
```

### Aliases

- `extractNumbers`: Alias for `extractNumbersFromString`
- `parseNumbersFromText`: Alias for `extractNumbersFromString`

### Notes

- This function does **not** extract floating-point numbers or negative numbers—only unsigned integers.
- Use a more specific regex pattern if floats or signed numbers are needed.

### Conclusion

Use `extractNumbersFromString` when you need to quickly pull out whole numbers from text for numeric analysis or validation.
