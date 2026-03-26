---
id: string-diff
title: String Diff Utilities
---

<!-- markdownlint-disable-file MD024 -->

Line-based and character-level text diffing utilities for comparing strings and highlighting differences.

:::info
These functions provide both line-level diffs (similar to `git diff`) and character-level highlighting for granular change visualization.
:::

## Imports

```ts
import { computeTextDiff, getCharacterDifferences } from 'nhb-toolbox';
```

---

## computeTextDiff

Computes a line-based text diff between two strings using the Longest Common Subsequence (LCS) algorithm.

### Function Signature

```ts
computeTextDiff(originalText: string, modifiedText: string): DiffResult
```

| Parameter      | Type     | Description                |
| -------------- | -------- | -------------------------- |
| `originalText` | `string` | The original (before) text |
| `modifiedText` | `string` | The modified (after) text  |

**Returns:** [`DiffResult`](#diffresult) containing the list of diff lines and summary statistics

### Features

- Lines are classified as `added`, `removed`, `modified`, or `unchanged`
- Detects and pairs similar `removed` and `added` lines as `modified` when similarity exceeds 60%
- Similarity calculated using Levenshtein edit distance
- Line numbers are preserved (1-based indexing)

### Examples

```typescript
const result = computeTextDiff('hello\nworld', 'hello\nearth');
// {
//   lines: [
//     {
//       type: 'unchanged',
//       original: 'hello',
//       modified: 'hello',
//       originalLineNum: 1,
//       modifiedLineNum: 1
//     },
//     { type: 'removed', original: 'world', originalLineNum: 2 },
//     { type: 'added', modified: 'earth', modifiedLineNum: 2 }
//   ],
//   stats: {
//     linesAdded: 1,
//     linesRemoved: 1,
//     linesChanged: 0,
//     linesUnchanged: 1
//   }
// }
```

```typescript
const result = computeTextDiff('foo\nbar\nbaz', 'foo\nqux');
// {
//   lines: [
//     {
//       type: 'unchanged',
//       original: 'foo',
//       modified: 'foo',
//       originalLineNum: 1,
//       modifiedLineNum: 1
//     },
//     { type: 'removed', original: 'bar', originalLineNum: 2 },
//     { type: 'removed', original: 'baz', originalLineNum: 3 },
//     { type: 'added', modified: 'qux', modifiedLineNum: 2 }
//   ],
//   stats: {
//     linesAdded: 1,
//     linesRemoved: 2,
//     linesChanged: 0,
//     linesUnchanged: 1
//   }
// }
```

### Algorithm

1. Splits input strings into lines
2. Builds LCS table comparing lines exactly
3. Backtracks to identify added, removed, and unchanged lines
4. Post-processes to pair similar removed/added lines as `modified` when similarity ≥ 0.6

### Similarity Threshold

Lines are considered `modified` (rather than separate removed + added) when their character-level similarity score is ≥ 0.6. The similarity score is calculated as:

```text
similarity = 1 - (editDistance / max(stringLengths))
```

Where `editDistance` is the Levenshtein distance between the two strings.

---

## getCharacterDifferences

Highlights character-level differences between two strings using the LCS algorithm.

### Function Signature

```ts
getCharacterDifferences(original: string, modified: string): CharDiffResult
```

| Parameter  | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| `original` | `string` | The original string to compare from |
| `modified` | `string` | The modified string to compare to   |

**Returns:** [`CharDiffResult`](#chardiffresult) with annotated character arrays for both strings

### Features

- Each character in both strings is annotated with a `highlighted` flag
- `highlighted: true` indicates the character differs from the other string
- Handles empty strings gracefully
- Based on Longest Common Subsequence (LCS) algorithm

### Examples

```typescript
const diff = getCharacterDifferences('cat', 'car');
// {
//   original: [
//     { text: 'c', highlighted: false },
//     { text: 'a', highlighted: false },
//     { text: 't', highlighted: true }
//   ],
//   modified: [
//     { text: 'c', highlighted: false },
//     { text: 'a', highlighted: false },
//     { text: 'r', highlighted: true }
//   ]
// }
```

```typescript
// When one string is empty, all characters in the other are highlighted
const diff = getCharacterDifferences('', 'hi');
// {
//   original: [],
//   modified: [
//     { text: 'h', highlighted: true },
//     { text: 'i', highlighted: true }
//   ]
// }
```

```typescript
const diff = getCharacterDifferences('hello world', 'hello earth');
// {
//   original: [
//     { text: 'h', highlighted: false },
//     { text: 'e', highlighted: false },
//     { text: 'l', highlighted: false },
//     { text: 'l', highlighted: false },
//     { text: 'o', highlighted: false },
//     { text: ' ', highlighted: false },
//     { text: 'w', highlighted: true },
//     { text: 'o', highlighted: true },
//     { text: 'r', highlighted: false },
//     { text: 'l', highlighted: true },
//     { text: 'd', highlighted: true }
//   ],
//   modified: [
//     { text: 'h', highlighted: false },
//     { text: 'e', highlighted: false },
//     { text: 'l', highlighted: false },
//     { text: 'l', highlighted: false },
//     { text: 'o', highlighted: false },
//     { text: ' ', highlighted: false },
//     { text: 'e', highlighted: true },
//     { text: 'a', highlighted: true },
//     { text: 'r', highlighted: false },
//     { text: 't', highlighted: true },
//     { text: 'h', highlighted: true }
//   ]
// }
```

### Algorithm

1. Builds LCS table for character-level matching
2. Backtracks to identify matched character indices
3. Marks unmatched characters as `highlighted: true`

---

## Types

### DiffResult

The result of a line-level diff operation.

```ts
interface DiffResult {
  /** An array of line differences */
  lines: DiffLine[];
  /** Summary statistics */
  stats: {
    /** Total number of lines that were added */
    linesAdded: number;
    /** Total number of lines that were removed */
    linesRemoved: number;
    /** Total number of lines that were modified (changed content) */
    linesChanged: number;
    /** Total number of lines that remained unchanged */
    linesUnchanged: number;
  };
}
```

### DiffLine

A single line difference between two strings.

```ts
interface DiffLine {
  /** The type of difference */
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  /** The content of the original line (undefined for added lines) */
  original?: string;
  /** The content of the modified line (undefined for removed lines) */
  modified?: string;
  /** The line number in the original string, 1-based (undefined for added lines) */
  originalLineNum?: number;
  /** The line number in the modified string, 1-based (undefined for removed lines) */
  modifiedLineNum?: number;
}
```

### CharDiffResult

Result of a character-level diff.

```ts
interface CharDiffResult {
  /** An array of characters from the original string, each with a highlighted flag */
  original: HighlightedText[];
  /** An array of characters from the modified string, each with a highlighted flag */
  modified: HighlightedText[];
}

type HighlightedText = {
  /** The character text */
  text: string;
  /** Whether this character differs from the other string */
  highlighted: boolean;
};
```

---

## Common Workflows

### Displaying Line Diff

```typescript
const result = computeTextDiff(originalCode, modifiedCode);

for (const line of result.lines) {
  switch (line.type) {
    case 'added':
      console.log(`+ ${line.modified}`);
      break;
    case 'removed':
      console.log(`- ${line.original}`);
      break;
    case 'modified':
      console.log(`- ${line.original}`);
      console.log(`+ ${line.modified}`);
      break;
    case 'unchanged':
      console.log(`  ${line.original}`);
      break;
  }
}
```

### Inline Character Highlighting

```typescript
const diff = getCharacterDifferences('old text', 'new text');

function renderHighlighted(chars: HighlightedText[]): string {
  return chars
    .map(char => char.highlighted ? `<mark>${char.text}</mark>` : char.text)
    .join('');
}

const originalHtml = renderHighlighted(diff.original);
const modifiedHtml = renderHighlighted(diff.modified);
```

### Comparing JSON Objects

```typescript
const original = JSON.stringify({ name: 'John', age: 30 }, null, 2);
const modified = JSON.stringify({ name: 'Jane', age: 30 }, null, 2);

const diff = computeTextDiff(original, modified);
console.log(`Changed lines: ${diff.stats.linesChanged}`);
```

### Change Summary

```typescript
const diff = computeTextDiff(before, after);
const { linesAdded, linesRemoved, linesChanged, linesUnchanged } = diff.stats;

console.log(`Summary:
  Added: ${linesAdded}
  Removed: ${linesRemoved}
  Modified: ${linesChanged}
  Unchanged: ${linesUnchanged}
  Total lines: ${linesAdded + linesRemoved + linesChanged + linesUnchanged}`);
```

---

## Performance Notes

- **Line-based diff**: O(mn) time complexity where m and n are line counts. Suitable for typical text files (up to thousands of lines).
- **Character diff**: O(n²) where n is string length. Best for short strings or individual lines.
- **Modified line detection**: Uses Levenshtein distance (O(mn) per candidate pair), only applied to adjacent removed/added line pairs.
- **Pure implementation**: No external dependencies, works in any JavaScript environment.

<!-- 
## Edge Cases

```typescript
// Empty strings
computeTextDiff('', ''); // { lines: [], stats: { linesAdded: 0, linesRemoved: 0, linesChanged: 0, linesUnchanged: 0 } }

// Single line with no changes
computeTextDiff('hello', 'hello'); // { lines: [{ type: 'unchanged', ... }], stats: { linesUnchanged: 1 } }

// Single line with changes (no similarity pairing because only one line)
computeTextDiff('hello', 'world'); // { lines: [{ type: 'removed' }, { type: 'added' }], stats: { linesAdded: 1, linesRemoved: 1 } }

// Empty string in character diff
getCharacterDifferences('', ''); // { original: [], modified: [] }
getCharacterDifferences('abc', ''); // All characters in original are highlighted, modified empty
```
-->
