---
id: stylog-utils
title: Stylog Utilities - Style Helpers
---

<!-- markdownlint-disable-file MD024 -->

## Style Utilities

The **style utilities** provide helper functions for working with styling, including color conversion, validation, type checking, and color support detection. These utilities are internally used in [`LogStyler`](/docs/classes/LogStyler) and [`Stylog`](/docs/utilities/misc/stylog) but can also be used directly for custom styling needs.

---

### 📦 Import

```ts
import { 
  hexToAnsi, 
  rgbToAnsi, 
  isCSSColor, 
  isBGColor, 
  isTextStyle, 
  detectColorSupport
} from 'nhb-toolbox/stylog';
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

#### `rgbToAnsi(r, g, b, isBg?)`

Convert RGB color components to ANSI escape sequences.

```ts
const [open, close] = rgbToAnsi(255, 0, 0); // red foreground
const [bgOpen, bgClose] = rgbToAnsi(0, 0, 255, true); // blue background
```

##### Parameters

| Property   | Type      | Description                                             |
| ---------- | --------- | ------------------------------------------------------- |
| **`r`**    | `number`  | Red component (0-255)                                   |
| **`g`**    | `number`  | Green component (0-255)                                 |
| **`b`**    | `number`  | Blue component (0-255)                                  |
| **`isBg`** | `boolean` | Whether to create background color. Defaults to `false` |

##### Returns

`[string, string]` - Tuple with opening and closing ANSI sequences

---

#### `detectColorSupport()`

Detects color support level of the current terminal/shell.

```ts
const supportLevel = detectColorSupport();
// 0 = none, 1 = basic (16 colors), 2 = 256 colors, 3 = truecolor
```

##### Returns

`0 | 1 | 2 | 3` - Color support level:

- `0`: No color support
- `1`: Basic 16-color support
- `2`: 256-color support  
- `3`: Truecolor (24-bit) support

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

#### `Ansi16Color`

Represents `ANSI 16-color` names (e.g., `'red'`, `'greenBright'`, `'bgRed'`).

#### `CSS16Color`

Represents CSS16 color names (against `Ansi16Color`) with `css-` prefix (e.g., `'css-red'`, `'css-bgRed'`).

#### `Ansi16Value`

Represents the value of `ANSI 16-color` codes as number tuples.

#### `AnsiSequence`

Represents ANSI escape code sequences as string tuples.

#### `Styles`

Union type of all available styles: `CSSColor | BGColor | TextStyle`

---

### 📋 Examples

```ts
import { 
  hexToAnsi, 
  rgbToAnsi, 
  isCSSColor, 
  isBGColor, 
  isTextStyle, 
  detectColorSupport 
} from 'nhb-toolbox/stylog';

// Color conversion
const [redOpen, redClose] = hexToAnsi('#FF0000');
const [rgbOpen, rgbClose] = rgbToAnsi(255, 100, 50);
console.log(redOpen + 'Red text' + redClose);
console.log(rgbOpen + 'RGB text' + rgbClose);

// Color support detection
const support = detectColorSupport();
console.log(`Terminal color support level: ${support}`);

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

// Custom styling implementation
function createCustomStyledMessage(message: string, color: string) {
  if (isCSSColor(color)) {
    const [open, close] = hexToAnsi(CSS_COLORS[color]);
    return open + message + close;
  }
  return message;
}
```

---

### See also

- [**LogStyler class**](/docs/classes/LogStyler) - Console styling class
- [**Stylog**](/docs/utilities/misc/stylog) - Chainable `LogStyler` wrapper
- [**Color Conversion**](/docs/utilities/color/convertColorCode) - Additional color utilities

---

### Summary

Use these utilities for **color conversion**, **style validation**, and **terminal support detection** when working with console output styling or building custom styling solutions.
