---
id: convertStringCase
title: Convert String Case to Various Formats
---

## convertStringCase

The `convertStringCase` function allows you to convert a string to various case formats, including camelCase, snake_case, kebab-case, PascalCase, Title Case, lowercase, and UPPERCASE.

This function also handles non-alphanumeric characters as delimiters (such as spaces, hyphens, and underscores) to split words. For Title Case, common prepositions, articles, conjunctions, and auxiliary verbs are not capitalized unless they appear at the start of the string.

### Function Signature

```typescript
function convertStringCase(string: string, format: CaseFormat): string;
```

### Parameters

| Parameter | Type               | Description |
|-----------|--------------------|-------------|
| `string`  | `string`           | The input string to be converted. The string should have words separated by non-alphanumeric characters (e.g., spaces, hyphens, underscores, etc.). |
| `format`  | `CaseFormat`       | The format to convert the string to. The available formats are: |
|           |                    | `'camelCase'`: Converts to camelCase (e.g., `myVariableName`). |
|           |                    | `'snake_case'`: Converts to snake_case (e.g., `my_variable_name`). |
|           |                    | `'kebab-case'`: Converts to kebab-case (e.g., `my-variable-name`). |
|           |                    | `'PascalCase'`: Converts to PascalCase (e.g., `MyVariableName`). |
|           |                    | `'Title Case'`: Converts to Title Case (e.g., `My Variable Name`). |
|           |                    | `'lowercase'`: Converts to all lowercase characters. |
|           |                    | `'UPPERCASE'`: Converts to all uppercase characters. |

### Return Value

Returns the string formatted in the specified case format.

---

### Example Usage

#### Import

```ts
import { convertStringCase } from 'nhb-toolbox';
```

#### Converting to camelCase

```typescript
convertStringCase('my-example_string', 'camelCase');
// Output: 'myExampleString'
```

#### Converting to snake_case

```typescript
convertStringCase('my-example_string', 'snake_case');
// Output: 'my_example_string'
```

#### Converting to kebab-case

```typescript
convertStringCase('my-example_string', 'kebab-case');
// Output: 'my-example-string'
```

#### Converting to PascalCase

```typescript
convertStringCase('my-example_string', 'PascalCase');
// Output: 'MyExampleString'
```

#### Converting to Title Case

```typescript
convertStringCase('my example string', 'Title Case');
// Output: 'My Example String'
```

#### Converting to lowercase

```typescript
convertStringCase('MY EXAMPLE STRING', 'lowercase');
// Output: 'my example string'
```

#### Converting to UPPERCASE

```typescript
convertStringCase('my example string', 'UPPERCASE');
// Output: 'MY EXAMPLE STRING'
```

---

### CaseFormat Type

The `CaseFormat` type defines the available formats for string conversion.

```typescript
export type CaseFormat =
 | 'camelCase'
 | 'snake_case'
 | 'kebab-case'
 | 'PascalCase'
 | 'Title Case'
 | 'UPPERCASE'
 | 'lowercase';
```
