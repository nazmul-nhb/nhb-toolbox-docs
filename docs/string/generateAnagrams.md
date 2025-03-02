---
id: generateAnagrams
title: Generate Anagrams
---

## generateAnagrams

The `generateAnagrams` function generates unique anagrams of a given word. It returns an array of anagrams, with the original word as the first element. You can specify a limit on the number of anagrams returned or request all possible anagrams.

### Function Signature

```ts
generateAnagrams(word: string, limit: number | 'all' = 100): string[]
```

### Parameters

- **word** (`string`):  
  The word for which anagrams will be generated.

- **limit** (`number | 'all'`):  
  The maximum number of anagrams to generate.  
  - If set to `'all'`, all possible anagrams are generated.  
  - If a number is provided, it limits the number of anagrams returned. The default is `100`.

### Returns

- **string[]**:  
  An array of unique anagrams generated from the input word. The original word is always the first element in the array.

### Behavior

- **Anagram Generation**:  
  The function generates all unique permutations of the input word, ensuring that the same anagram is not repeated.

- **Limit**:  
  You can control the number of anagrams returned by specifying a `limit`. If `'all'` is passed, it will return all possible unique anagrams.

- **Efficiency**:  
  The function terminates early if the `limit` is reached, ensuring that no more anagrams are generated once the limit is met.

### Example Usage

#### Generate Anagrams with Default Limit

```ts
const word = 'cat';
const anagrams = generateAnagrams(word);
console.log(anagrams);
// Output: ['cat', 'act', 'tac', 'atc', 'cta', 'tca']
```

#### Generate All Anagrams

```ts
const word = 'cat';
const anagrams = generateAnagrams(word, 'all');
console.log(anagrams);
// Output: ['cat', 'act', 'tac', 'atc', 'cta', 'tca']
```

#### Generate a Limited Number of Anagrams

```ts
const word = 'dog';
const anagrams = generateAnagrams(word, 2);
console.log(anagrams);
// Output: ['dog', 'odg']
```

### Edge Cases

- **Single Character Word**:  
  If the input word has only one character, the result will be the input word itself.

```ts
const word = 'a';
const anagrams = generateAnagrams(word);
console.log(anagrams);
// Output: ['a']
```

- **Empty String**:  
  If the input word is an empty string, the result will be an empty array.

```ts
const word = '';
const anagrams = generateAnagrams(word);
console.log(anagrams);
// Output: []
```

### Options Interface: AnagramOptions

The `AnagramOptions` interface allows for additional configuration when generating anagrams.

```ts
interface AnagramOptions {
  /** Limit the anagrams output. Default is `100`. */
  limit?: number | 'all';
  /** Whether to lookup in the dictionary. Default is `false`. */
  validWords?: boolean;
}
```

- **limit**:  
  Specifies the maximum number of anagrams to generate. Defaults to `100`. Pass `'all'` to generate all anagrams.

- **validWords**:  
  If set to `true`, the function will filter out non-dictionary words. This feature is optional and is not enabled by default.

### Notes

- The function generates anagrams based on the input word and handles both single-character and multi-character words.
- The default limit for the number of anagrams returned is `100`, but you can adjust this using the `limit` parameter.
- The original word will always appear as the first element in the returned array of anagrams.

### Limitations  

- This function generates all possible permutations of the given word but does not filter for valid dictionary words.  
- For dictionary-based anagrams, use the dedicated package [nhb-anagram-generator](https://www.npmjs.com/package/nhb-anagram-generator), which specifically returns valid words (optional all words).
