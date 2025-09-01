---
id: LogStyler
title: LogStyler - Style Console Output
---

<!-- markdownlint-disable-file MD024 -->

## `LogStyler`

The **`LogStyler`** class provides a low-level API to style console output with **ANSI escape codes** (Node.js) or **CSS styles** (browser). It supports foreground colors, background colors, and text styles, allowing you to create customized console output.

:::tip[**When to Use**]

- Use this class if you need **custom reusable style configurations**
- Use [`Stylog`](/docs/utilities/misc/stylog) when you want **fluent, chainable styling** with *zero* configuration

:::

---

### ✨ Features

- ✅ *Style console outputs* with **colors**, **backgrounds**, and **text effects**
- ✅ **Cross-platform** support: `ANSI` for `Node.js`, `CSS` for browsers
- ✅ **Chainable API** for building complex styles
- ✅ **Type-safe** style definitions

---

### 📦 Import

```ts
import { LogStyler } from 'nhb-toolbox/stylog';
```

---

### 🚀 Usage

```ts
const styler = new LogStyler(['error', 'bold']);
styler.log('Error message');

// Or chain styles
new LogStyler()
  .style('blue')
  .style('bgYellow')
  .style('underline')
  .log('Styled message');
```

---

### 🔧 API Overview

#### `constructor(styles?)`

Initializes with optional array of initial styles.

```ts
const styler = new LogStyler(['red', 'bold']);
```

---

#### `style(style)`

Add a style and return a new `LogStyler` instance for chaining.

```ts
const newStyler = styler.style('blue').style('italic');
```

---

#### `string(input, stringify?)`

Returns the input as a styled string with ANSI escape codes.

##### Parameters

| Property        | Type      | Description                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **`input`**     | `any`     | Value to style                                                          |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before styling. Defaults to `false` |

##### Returns

`string` - The styled string with ANSI escape codes

##### Examples

```ts
const styler = new LogStyler(['red', 'bold']);

const styledObject = styler.string({ data: 'value' }, true);b

const errorMessage = styler.string('Error occurred, using LogStyler');
// Returns: "\x1b[31m\x1b[1mError occurred, using LogStyler\xx1b[22m\x1b[39m"

// Use in console (terminal or modern browser consoles)
console.error(errorMessage);
```

:::info[Note]
This method always returns ANSI-formatted strings, making it suitable for contexts where you need the styled string rather than console output.
:::

---

#### `applyStyles(input, stringify?)`

Returns styled tuple `[format, cssList]` for browser environments.

```ts
const [format, cssList] = styler.applyStyles('Text');
console.log(format, cssList.join('; '));
```

##### Parameters

| Property        | Type      | Description                                       |
| --------------- | --------- | ------------------------------------------------- |
| **`input`**     | `any`     | Value to style                                    |
| **`stringify`** | `boolean` | Whether to stringify objects. Defaults to `false` |

##### Returns

`[string, string[]]` - Tuple with formatted string and CSS styles

:::info[When to Use]
Use this method when you need direct access to CSS styling for custom browser output or integration with UI frameworks.
:::

##### Examples

```ts
// Basic usage in browser
const styler = new LogStyler(['red', 'bold']);
const [format, cssList] = styler.applyStyles('Error message');
// format: "%cError message"
// cssList: ["color: #FF0000", "font-weight: bold"]

// Custom browser output handling
const styled = new LogStyler(['blue', 'bgYellow', 'italic']);
const [format, styles] = styled.applyStyles('Warning', true);

// Use with custom logging function
function customLog(formatted: string, styles: string[]) {
  const styleString = styles.join('; ');
  console.log(formatted, styleString);
}
customLog(format, styles);

// With object stringification
const dataOutput = new LogStyler(['green']).applyStyles({ id: 123 }, true);
// format: "%c{\"id\":123}"
// cssList: ["color: #008000"]
```

---

#### `log(input, stringify?)`

Print styled input to the console.

```ts
styler.log('Hello World');
styler.log({ data: 'value' }, true); // Stringify objects
```

##### Parameters

| Property        | Type      | Description                                                              |
| --------------- | --------- | ------------------------------------------------------------------------ |
| **`input`**     | `any`     | Value to print to console                                                |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before printing. Defaults to `false` |

---

### 🎨 Available Styles

#### Foreground Colors

All standard CSS color names: `red`, `blue`, `green`, `yellow`, `purple`, `aqua`, etc.

:::note
Please refer to [`CSS_COLORS`](/docs/types/constants#available-constants) in the list for more details
:::

#### Background Colors

Prefixed with `bg`: `bgRed`, `bgBlue`, `bgGreen`, `bgYellow`, etc.

#### Text Styles

- `bold`, `bolder` - Bold text
- `dim` - Dimmed text
- `italic` - Italic text
- `underline` - Underlined text
- `strikethrough` - Strikethrough text
- `inverse` - Inverted colors

---

### 🌐 Cross-Platform Behavior

- **Node.js**: Uses *ANSI escape codes* for `true-color` support
- **Browsers**: Uses CSS styles via `%c` formatting (for `.log()` method)
- **`.string()` method**: Always returns ANSI escape codes regardless of environment
- **Unsupported styles**: Gracefully fall back to unstyled output

---

### 📋 Examples

```ts
// Simple error styling
const errorStyler = new LogStyler(['red', 'bold']);
errorStyler.log('Critical error occurred!');

// Complex chaining
const warningStyler = new LogStyler()
  .style('yellow')
  .style('bgDark')
  .style('bold')
  .style('italic');

warningStyler.log('Warning: Proceed with caution');
```

---

### See also

- [**Stylog**](/docs/utilities/misc/stylog) - Chainable wrapper for `LogStyler`
- [**Style Utilities**](/docs/utilities/misc/stylog-utils) - Helper functions for style validation

---

### Summary

Use the `LogStyler` class for **programmatic control** over console styling or when you need **isolated style configurations**.
