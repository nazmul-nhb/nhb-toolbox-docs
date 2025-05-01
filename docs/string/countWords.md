---
id: countWords
title: Count Words in String
---

## countWords

Counts the number of words in a string, supporting multiple languages and scripts. This function uses a Unicode-aware regular expression to accurately identify words across different writing systems.

### Function Signature

```ts
export function countWords(text: string): number
```

### Parameters

| Name   | Description                          |
|--------|--------------------------------------|
| `text` | The input string to count words from. |

### Returns

Returns the number of word-like tokens found in the string.

### Example

```ts
countWords('Hello world!'); // 2
countWords('これはテストです'); // 1
countWords('123 apples, 456 oranges'); // 4
```

### Aliases

- `countWordsInString`: Alias for `countWords`
- `wordCount`: Alias for `countWords`

### Notes

- This function is Unicode-aware and supports letters with diacritics, punctuation like apostrophes, and hyphenated words.
- Numbers are counted as words.

### Conclusion

Use `countWords` to accurately determine word count in multilingual or mixed-content strings. Ideal for input validation, content analysis, and linguistic metrics.
