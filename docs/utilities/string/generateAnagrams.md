---
id: generateAnagrams
title: Generate Anagrams
---

## generateAnagrams

The `generateAnagrams` function generates unique anagrams of a given word. It returns an array of lowercase anagrams, with the original word (lowercased) as the first element. You can control the output using the `options` object, including setting a limit or providing a custom dictionary for valid anagrams.

### Function Signature

```ts
generateAnagrams(word: string, options?: AnagramOptions): Lowercase<string>[]
```

### Parameters

- **word** (`string`):
  The word for which anagrams will be generated. Internally converted to lowercase.

- **options** (`object`, optional):
  Controls the output limit and optional dictionary lookup.

  - **limit** (`number | 'all'`, optional):
    Maximum number of anagrams to generate. Defaults to `100`.

    - `'all'` returns all possible unique anagrams.
  - **dictionary** (`string[] | false`, optional):
    If provided as an array, only anagrams found in the dictionary will be returned. Case-insensitive lookup. Defaults to `false` (no dictionary filtering).

#### `AnagramOptions` Definition

```ts
/** - Options for generating anagrams. */
interface AnagramOptions {
 /**
  * Maximum number of anagrams to generate.
  * Defaults to `100`. Pass `"all"` to return all possible anagrams.
  */
 limit?: number | 'all';

 /**
  * Optional dictionary array of strings for validating anagrams.
  * - Pass `false` (default) to skip dictionary lookup.
  * - Pass an array of strings to include only anagrams present in that array.
  * - Dictionary lookup is case-insensitive; internally, a cached lowercase `Set` is used for performance.
  * - Duplicate entries in the dictionary are ignored.
  */
 dictionary?: false | string[];
}
```

### Returns

- **Lowercase\<string\>[]**:
  An array of unique, lowercase anagrams generated from the input word. The original word (lowercased) is always included as the first element.

### Behavior

- **Anagram Generation**:
  Generates all unique permutations of the input word while skipping repeated anagrams at each recursive level.
- **Limit**:
  Stops generating once the `limit` is reached for efficiency.
- **Dictionary Lookup**:
  If a dictionary is provided, only anagrams present in the dictionary (case-insensitive) are included. The dictionary is cached internally using a `WeakMap` to improve performance without mutating the original array.

### Example Usage

#### Import

```ts
import { generateAnagrams } from 'nhb-toolbox';
```

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
const anagrams = generateAnagrams(word, { limit: 'all' });
console.log(anagrams);
// Output: ['cat', 'act', 'tac', 'atc', 'cta', 'tca']
```

#### Generate Dictionary-Filtered Anagrams

```ts
const word = 'tone';
const anagrams = generateAnagrams(word, {
  dictionary: ['tone', 'note', 'one'],
  limit: 'all',
});
console.log(anagrams);
// Output: ['tone', 'note']
```

### Edge Cases

- **Single Character Word**:  
  If the input word has only one character, the result will be the input word itself in lowercase.

```ts
generateAnagrams('A');
// Output: ['a']
```

- **Empty String**:  
  If the input word is an empty string, the result will be an empty array.

```ts
generateAnagrams('');
// Output: []
```

### Notes

- The original word is always included as the first element.
- Dictionary lookup is case-insensitive and cached for repeated calls with the same array.
- Duplicate entries in the dictionary are ignored.
- Using a dictionary does **not** mutate the provided array.
- Generating all permutations of a word can be expensive for long words; use `limit` to control performance.

### Limitations

- Dictionary-based filtering only includes exact matches; partial matches are ignored.
- For built-in dictionary-based anagrams, use the dedicated package [`nhb-anagram-generator`](https://www.npmjs.com/package/nhb-anagram-generator), which specifically returns valid words (optional all words) using a built-in json dictionary.
