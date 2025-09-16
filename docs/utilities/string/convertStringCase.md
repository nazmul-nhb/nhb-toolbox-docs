---
id: convertStringCase
title: Convert String Cases
---

## convertStringCase

The `convertStringCase` function converts a string into common case styles and includes advanced handling for:

- *Unicode-aware* tokenization (letters from any script are treated as letters).
- Preservation of leading and trailing *punctuation* (non-letter/non-number characters, excluding spaces).
- Optional *preservation of acronyms* (e.g., `API`, `HTTP` etc.) when requested.
- *Title Case with small-word rules* (articles, prepositions, conjunctions, auxiliary verbs are lowercased unless they appear at the start or end).
- For **Title Case only**, internal dashes (`-`) are treated as part of words (so `xml-http_request` → `Xml-http Request`), while underscores and other separators remain word boundaries.

### Function Signature & Types

```ts
function convertStringCase(value: string, format: CaseFormat, options?: StringCaseOptions): string;

/** Supported output case formats. */
export type CaseFormat =
  | 'camelCase'
  | 'snake_case'
  | 'kebab-case'
  | 'PascalCase'
  | 'Title Case'
  | 'UPPERCASE'
  | 'lowercase';

/** Options for convertStringCase. */
export interface StringCaseOptions {
  /**
   * Preserve uppercase acronyms (tokens with ≥2 uppercase letters) in
   * camelCase / PascalCase / Title Case where applicable.
   * - camelCase: first-token acronyms become lowercase (API -> api), internal acronyms preserved (getAPIData).
   * - PascalCase: acronyms preserved (API -> API).
   * - Title Case: acronyms preserved (API).
   *
   * Default: `false`
   */
  preserveAcronyms?: boolean;
}
```

### Parameters

| Parameter | Type                           | Description                                                                                                                                                                                                        |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`   | `string`                       | The input string to convert. May include letters (any script), digits, spaces, underscores, dashes, punctuation, and leading/trailing punctuation. If empty or not a string, the function returns an empty string. |
| `format`  | `CaseFormat`                   | The target case format. See the `CaseFormat` type above for allowed values.                                                                                                                                        |
|           |                    | `'camelCase'`: Converts to camelCase (e.g., `myVariableName`). |
|           |                    | `'snake_case'`: Converts to snake_case (e.g., `my_variable_name`). |
|           |                    | `'kebab-case'`: Converts to kebab-case (e.g., `my-variable-name`). |
|           |                    | `'PascalCase'`: Converts to PascalCase (e.g., `MyVariableName`). |
|           |                    | `'Title Case'`: Converts to Title Case (e.g., `My Variable Name`). |
|           |                    | `'lowercase'`: Converts to all lowercase characters. |
|           |                    | `'UPPERCASE'`: Converts to all uppercase characters. |
| `options` | `StringCaseOptions` (optional) | Optional settings. Currently supports `preserveAcronyms?: boolean`. When `true`, the function preserves acronym-like tokens (e.g., `API`) in appropriate outputs.                                                  |

:::info[Notes on Tokenization]

- The function first trims and extracts leading/trailing punctuation (non-letter/number characters, excluding spaces). That punctuation is re-attached to the returned value.
- Word tokens are formed by splitting on non-alphanumeric separators (spaces, underscores, most punctuation). If no separators are present, the algorithm attempts to split `camel`/`Pascal` boundaries and letter↔number boundaries (for example, `v2Api` → `['v2','Api']`).
- For the `Title Case` format, dashes (`-`) are treated as part of the word token, not as a separator; this preserves constructs like `xml-http` as a single token for capitalization.

:::

### Return Value & Behavior

- Returns a `string` formatted according to `format`, with leading and trailing punctuation preserved exactly as in the input.
- **Unicode-aware**: the implementation uses Unicode property escapes to recognize letters/digits from any script (`\p{L}` and `\p{N}`), so characters like `ü`, `漢`, `д` are treated as letters and handled correctly.
- **Acronym detection**: tokens consisting of **two or more uppercase letters** are treated as acronyms. `preserveAcronyms` toggles whether those are preserved in the output or normalized (e.g., `API` → `Api` in PascalCase when `preserveAcronyms` is `false`).
- **Title Case** small words: common short words (articles, prepositions, conjunctions, and common auxiliary verbs) are left lowercase unless they appear as the first or last token of the *Title Case* string. The list of these words is defined by `LOWERCASE` in the library. Refer to the constant: [`LOWERCASED_WORDS`](/docs/types/constants#available-constants).
- **Dashes** in `Title Case`: for `Title Case` only, internal dashes (`-`) are **retained** within tokens. Example: `xml-http_request` → tokens `['xml-http', 'request']` → `Xml-http Request`.

#### Edge cases

- Empty input (`''`) returns `''`.
- Input containing only punctuation returns the same punctuation string (e.g., `++--` → `++--`).
- For `snake_case` / `kebab-case`, all tokens are lowercased and separators are normalized to `'_’` and `'-'` respectively—acronyms become lowercase in those formats regardless of `preserveAcronyms`.

---

### Example Usage

```ts
import { convertStringCase } from 'nhb-toolbox';

/* Basic conversions */
convertStringCase('my-example_string', 'camelCase');
// => 'myExampleString'

convertStringCase('my-example_string', 'snake_case');
// => 'my_example_string'

convertStringCase('my-example_string', 'kebab-case');
// => 'my-example-string'

convertStringCase('my-example_string', 'PascalCase');
// => 'MyExampleString'

/* Title Case (basic) */
convertStringCase('my example string', 'Title Case');
// => 'My Example String'

/* Title Case: dash preservation */
convertStringCase('xml-http_request', 'Title Case');
// => 'Xml-http Request'

/* Acronym preservation */
convertStringCase('get API response', 'camelCase', { preserveAcronyms: true });
// => 'getAPIResponse'

convertStringCase('get API response', 'camelCase', { preserveAcronyms: false });
// => 'getApiResponse'

convertStringCase('get API response', 'PascalCase', { preserveAcronyms: true });
// => 'GetAPIResponse'

convertStringCase('XML-HTTP_request', 'Title Case', { preserveAcronyms: true });
// => 'XML-HTTP Request'

/* snake/kebab force lowercase */
convertStringCase('XMLHttpRequest', 'snake_case', { preserveAcronyms: true });
// => 'xml_http_request'

convertStringCase('XMLHttpRequest', 'kebab-case', { preserveAcronyms: true });
// => 'xml-http-request'

/* Leading/trailing punctuation preserved */
convertStringCase('++hello_world++', 'PascalCase');
// => '++HelloWorld++'

/* Empty input */
convertStringCase('', 'camelCase');
// => ''
```

---

### See also

- [capitalizeString](capitalizeString) only for capitalization purpose.

---

### Implementation Notes

- This function relies on modern JavaScript `RegExp` features (`\p{...}` Unicode property escapes). Ensure your Node or target runtime supports `ES2018+` (`Node 12+` for `u` with `\p{}`), or transpile accordingly.
