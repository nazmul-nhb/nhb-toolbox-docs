---
id: convertArrayToString
title: Convert Array to String
---

## convertArrayToString

Joins elements of an array into a single string, using a custom separator.

## Import

```typescript
import { convertArrayToString } from 'nhb-toolbox';
```

## Function Signature

```typescript
function convertArrayToString<T>(array: T[],  separator?: string): string
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Default Separator" label="Default Separator">

```typescript
convertArrayToString(['a', 'b', 'c']);
// Returns: "a,b,c"
```

</TabItem>
<TabItem value="Custom Separator" label="Custom Separator">

```typescript
convertArrayToString([1, 2, 3], ' - ');
// Returns: "1 - 2 - 3"
```

</TabItem>
<TabItem value="Pipe Separator" label="Pipe Separator">

```typescript
convertArrayToString(['JS', 'TS', 'React'], '|');
// Returns: "JS|TS|React"
```

</TabItem>
<TabItem value="Empty Array" label="Empty Array">

```typescript
convertArrayToString([], ';');
// Returns: ""
```

</TabItem>
</Tabs>

## API Reference

### Parameters

| Name      | Type     | Description                                                    |
|-----------|----------|----------------------------------------------------------------|
| array     | T[]      | Array to convert to a string                                   |
| separator | string   | Optional. Separator for elements (default: `","`)              |

### Returns

A string of array elements joined by the specified separator.

## Key Features

1. **Custom Separator:** Use any string as a separator (comma, dash, pipe, etc.).
2. **Type Support:** Works with any array element type (stringified as needed).
3. **Simple API:** One line for most use cases.
4. **Handles Empty Array:** Returns an empty string for empty input arrays.

## Limitations

1. **Invalid Input:** Throws an error if the input is not a valid array.
2. **No Deep Serialization:** Elements are joined using their string representation. Objects will become `"[object Object]"` unless you stringify them manually.
3. **No Filtering:** Does not remove falsy or empty values automatically.

## Notes

- Always ensure the input is a valid array.
- If array elements are objects, consider `array.map(obj => JSON.stringify(obj))` before passing to this function.

## Recommended Use Cases

- Building display strings from lists (tags, categories, items, etc.).
- Exporting arrays to CSV-like formats or quick string storage.
- Creating readable strings for logging, tooltips, or input fields.

---

**Conclusion:**  
`convertArrayToString` makes joining arrays readable, flexible, and easy—perfect for tags, logs, labels, and more. Just supply your array and desired separator!
