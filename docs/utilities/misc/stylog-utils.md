---
id: stylog-utils
title: Stylog Utilities - Style Helpers
---

<!-- markdownlint-disable-file MD024 -->

## Style Utilities

The **style utilities** provide helper functions for working with styling, including color conversion, validation, and type checking. These utilities are internally used in [`LogStyler`](/docs/classes/LogStyler) and [`Stylog`](/docs/utilities/misc/stylog)

---

### 📦 Import

```ts
import { hexToAnsi, isCSSColor, isBGColor, isTextStyle } from 'nhb-toolbox/stylog';
```

---

### 🔧 API Overview

---

#### `hexToAnsi(hex, isBg?)`

Convert a HEX color to ANSI escape sequences.

```ts
const [open, close] = hexToAnsi('#FF0000'); // red foreground
const [bgOpen, bgClose] = hexToAnsi('#0000FF', true); // blue background
```

##### Parameters

| Property   | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| **`hex`**  | `Hex`     | HEX color string (e.g., `#FF0000`)                    |
| **`isBg`** | `boolean` | Whether to create background color. Defaults to `false` |

##### Returns

`[string, string]` - Tuple with opening and closing ANSI sequences

---

#### `isCSSColor(value)`

Check if a string is a valid CSS color name.

```ts
isCSSColor('red'); // true
isCSSColor('invalidColor'); // false
```

##### Parameters

| Property    | Type     | Description     |
| ----------- | -------- | --------------- |
| **`value`** | `string` | String to check |

##### Returns

`boolean` - Whether the string is a valid CSS color

---

#### `isBGColor(value)`

Check if a string is a valid background color (starts with "bg" + valid CSS color).

```ts
isBGColor('bgRed'); // true
isBGColor('red'); // false (missing bg prefix)
isBGColor('bgInvalid'); // false (invalid color)
```

##### Parameters

| Property    | Type     | Description     |
| ----------- | -------- | --------------- |
| **`value`** | `string` | String to check |

##### Returns

`boolean` - Whether the string is a valid background color

---

#### `isTextStyle(value)`

Check if a string is a valid text style.

```ts
isTextStyle('bold'); // true
isTextStyle('invalidStyle'); // false
```

##### Parameters

| Property    | Type     | Description     |
| ----------- | -------- | --------------- |
| **`value`** | `string` | String to check |

##### Returns

`boolean` - Whether the string is a valid text style

---

### 🎨 Type Definitions

#### `CSSColor`

Represents a valid CSS color name (e.g., `'red'`, `'blue'`, `'cornflowerblue'`).

#### `BGColor`  

Represents a background color prefixed with `bg` (e.g., `'bgRed'`, `'bgBlue'`).

#### `TextStyle`

Represents text effects:

- `'bold'`, `'bolder'` - Bold text
- `'dim'` - Dimmed text  
- `'italic'` - Italic text
- `'underline'` - Underlined text
- `'strikethrough'` - Strikethrough text
- `'inverse'` - Inverted colors

#### `Styles`

Union type of all available styles: `CSSColor | BGColor | TextStyle`

---

### 📋 Examples

```ts
import { hexToAnsi, isCSSColor, isBGColor, isTextStyle } from 'nhb-toolbox/stylog';

// Color conversion
const [redOpen, redClose] = hexToAnsi('#FF0000');
console.log(redOpen + 'Red text' + redClose);

// Style validation
if (isCSSColor('cornflowerblue')) {
  console.log('Valid color');
}

if (isBGColor('bgRed')) {
  console.log('Valid background color');
}

if (isTextStyle('bold')) {
  console.log('Valid text style');
}
```

---

### See also

- [**LogStyler class**](/docs/classes/LogStyler) - Console styling class
- [**Stylog**](/docs/utilities/misc/stylog) - Chainable `LogStyler` wrapper

---

### Summary

Use these utilities for **color conversion** and **style validation** when working with console output styling or wherever you need.
