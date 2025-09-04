---
id: LogStyler
title: LogStyler - Style Console Output
---

<!-- markdownlint-disable-file MD024 -->

## `LogStyler`

The `LogStyler` class provides a low-level API to style console output with **ANSI escape codes** (Node.js) or **CSS styles** (browser). It supports foreground colors, background colors, text styles, and multiple color formats (HEX, RGB, HSL), allowing you to create customized console output.

:::tip[**When to Use**]

- Use this class if you need **custom reusable style configurations**
- Use [`Stylog`](/docs/utilities/misc/stylog) when you want **fluent, chainable styling** with *zero* configuration

:::

---

### ✨ Features

- ✅ *Style console outputs* with **colors**, **backgrounds**, and **text effects**
- ✅ **Multiple color formats**: `ANSI-16`, `HEX`, `RGB`, `HSL`
- ✅ **Cross-platform** support: `ANSI` for `Node.js`, `CSS` for browsers
- ✅ **Chainable API** for building complex styles (returns `StylogChain`)
- ✅ **Type-safe** style definitions

---

### 📦 Import

```ts
import { LogStyler } from 'nhb-toolbox/stylog';
```

---

### 🚀 Usage

```ts
// Simple usage
const styler = new LogStyler(['red', 'bold']);
styler.log('Error message');

// Complex chaining (returns StylogChain for further chaining)
const warningStyler = new LogStyler().style('yellow', 'bgDark', 'bold', 'italic');

warningStyler.log('Warning: Proceed with caution');

// Advanced color formats
const customStyler = new LogStyler().hex('#FF5733').bgRGB(50, 100, 150).bold;

customStyler.log('Custom styled message');
```

---

### 🔧 API Overview

#### `constructor(styles?)`

Initializes with optional array of initial styles.

```ts
const styler = new LogStyler(['red', 'bold']);
```

---

#### `style(...style)`

Add one or more styles and return a new `StylogChain` instance for chaining.

```ts
const newStyler = styler.style('blue').style('italic');
const multiStyle = styler.style('red', 'bold', 'underline');
```

:::info[Notes]

- When chaining similar styles, only the last one(s) takes effect.
- All colors applied through `style()` method are `truecolor` in form, to apply `ANSI-16` colors, use `ansi16()` method.

:::

---

#### `ansi16(color)`

Apply `ANSI 16-color` styling to the text.

##### Parameters

| Property    | Type          | Description                                        |
| ----------- | ------------- | -------------------------------------------------- |
| **`color`** | `Ansi16Color` | `ANSI 16-color` name (e.g., `'red'`, `'cyanBright'`) |

##### Returns

`StylogChain` - A new chainable instance with the `ANSI 16-color` style applied

##### Examples

```ts
const styler = new LogStyler();
styler.ansi16('red').log('Error message');
styler.ansi16('bgRed').log('Red background');
styler.ansi16('redBright').bold.italic.log('Bright red bold italic');
```

:::info[Notes]

- Only one argument (color) can be passed on a single call
- Color applied through `ansi16()` method is truecolor in form
- For background ANSI colors, use `bg` prefix (e.g., 'bgRed')

:::
---

#### `hex(code)`

Apply a HEX color to the text foreground.

##### Parameters

| Property   | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| **`code`** | `string` | HEX color string (e.g., `'#4682B4'` or `'4682B4'`) |

##### Returns

`StylogChain` - A new chainable instance with the HEX color applied

##### Examples

```ts
const styler = new LogStyler();
styler.hex('#4682B4').log('Steel blue text');
styler.hex('FF0000').bold.log('Red bold text');
```

---

#### `bgHex(code)`

Apply a HEX color to the text background.

##### Parameters

| Property   | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| **`code`** | `string` | HEX color string (e.g., `'#4682B4'` or `'4682B4'`) |

##### Returns

`StylogChain` - A new chainable instance with the HEX background color applied

##### Examples

```ts
const styler = new LogStyler();
styler.bgHex('#4682B4').log('Steel blue background');
styler.white.bgHex('#000000').log('White text on black background');
```

---

#### `rgb(code)` | `rgb(red, green, blue)`

Apply an RGB color to the text foreground.

##### Parameters (String version)

| Property   | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| **`code`** | `string` | RGB color string (e.g., `'rgb(11, 45, 1)'` or `'11, 45, 1'`) |

##### Parameters (Component version)

| Property    | Type     | Description               |
| ----------- | -------- | ------------------------- |
| **`red`**   | `number` | Red component (`0-255`)   |
| **`green`** | `number` | Green component (`0-255`) |
| **`blue`**  | `number` | Blue component (`0-255`)  |

##### Returns

`StylogChain` - A new chainable instance with the RGB color applied

##### Examples

```ts
const styler = new LogStyler();
styler.rgb('rgb(11, 45, 1)').log('Dark green text');
styler.rgb('255, 0, 0').bold.log('Red bold text');
styler.rgb(255, 0, 0).log('Red text');
```

---

#### `bgRGB(code)` / `bgRGB(red, green, blue)`

Apply an RGB color to the text background.

##### Parameters (String version)

| Property   | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| **`code`** | `string` | RGB color string (e.g., `'rgb(225, 169, 196)'` or `'225, 169, 196'`) |

##### Parameters (Component version)

| Property    | Type     | Description               |
| ----------- | -------- | ------------------------- |
| **`red`**   | `number` | Red component (`0-255`)   |
| **`green`** | `number` | Green component (`0-255`) |
| **`blue`**  | `number` | Blue component (`0-255`)  |

##### Returns

`StylogChain` - A new chainable instance with the RGB background color applied

##### Examples

```ts
const styler = new LogStyler();
styler.bgRGB('rgb(225, 169, 196)').log('Pink background');
styler.bgRGB(0, 0, 255).log('Blue background');
styler.black.bgRGB(255, 255, 255).log('Black text on white background');
```

---

#### `hsl(code)` | `hsl(hue, saturation, lightness)`

Apply an HSL color to the text foreground.

##### Parameters (String version)

| Property   | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| **`code`** | `string` | HSL color string (e.g., `'hsl(50 80.5% 40%)'` or `'50, 80.5%, 40%'`) |

##### Parameters (Component version)

| Property         | Type     | Description                              |
| ---------------- | -------- | ---------------------------------------- |
| **`hue`**        | `number` | Hue component (`0-360`)                  |
| **`saturation`** | `number` | Saturation component (`0-100 or 0-100%`) |
| **`lightness`**  | `number` | Lightness component (`0-100 or 0-100%`)  |

##### Returns

`StylogChain` - A new chainable instance with the HSL color applied

##### Examples

```ts
const styler = new LogStyler();
styler.hsl('hsl(50 80.5% 40%)').log('Gold text');
styler.hsl('120, 100%, 50%').italic.log('Green italic text');
styler.hsl(0, 100, 50).log('Red text');
```

---

#### `bgHSL(code)` / `bgHSL(hue, saturation, lightness)`

Apply an HSL color to the text background.

##### Parameters (String version)

| Property   | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| **`code`** | `string` | HSL color string (e.g., `'hsl(50 80.5% 40%)'` or `'50, 80.5%, 40%'`) |

##### Parameters (Component version)

| Property         | Type     | Description                              |
| ---------------- | -------- | ---------------------------------------- |
| **`hue`**        | `number` | Hue component (`0-360`)                  |
| **`saturation`** | `number` | Saturation component (`0-100 or 0-100%`) |
| **`lightness`**  | `number` | Lightness component (`0-100 or 0-100%`)  |

##### Returns

`StylogChain` - A new chainable instance with the HSL background color applied

##### Examples

```ts
const styler = new LogStyler();
styler.bgHSL('hsl(50 80.5% 40%)').log('Gold background');
styler.bgHSL(120, 100, 50).log('Green background');
styler.white.bgHSL(0, 100, 50).log('White text on red background');
```

---

#### `toANSI(input, stringify?)`

Returns the input as a styled string with ANSI escape codes.

##### Parameters

| Property        | Type      | Description                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **`input`**     | `unknown` | Input to style before printing in the shell                             |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before styling. Defaults to `false` |

##### Returns

`string` - The styled string with ANSI escape codes

##### Examples

```ts
const styler = new LogStyler(['red', 'bold']);

const styledObject = styler.toANSI({ data: 'value' }, true);
const errorMessage = styler.toANSI('Error occurred, using LogStyler');
// Returns: "\x1b[31m\x1b[1mError occurred, using LogStyler\xx1b[22m\x1b[39m"

// Use in console (terminal or modern browser consoles)
console.error(errorMessage);

// With custom color formats
const hexMessage = new LogStyler().hex('#FF5733').toANSI('Custom hex color');
const rgbMessage = new LogStyler().rgb(255, 100, 50).toANSI('Custom RGB color');
```

:::info[Note]
This method always returns ANSI-formatted strings, making it suitable for contexts where you need the styled string rather than console output.
:::

---

#### `toCSS(input, stringify?)`

Returns styled tuple `[format, cssList]` for browser environments.

```ts
const [format, cssList] = styler.toCSS('Text');
console.log(format, cssList.join('; '));
```

##### Parameters

| Property        | Type      | Description                                       |
| --------------- | --------- | ------------------------------------------------- |
| **`input`**     | `unknown` | Input to style before printing in the console     |
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
const [format, cssList] = styler.toCSS('Error message');
// format: "%cError message"
// cssList: ["color: #FF0000", "font-weight: bold"]

// Custom browser output handling
const styled = new LogStyler(['blue', 'bgYellow', 'italic']);
const [format, styles] = styled.toCSS('Warning', true);

// Use with custom logging function
function customLog(formatted: string, styles: string[]) {
  const styleString = styles.join('; ');
  console.log(formatted, styleString);
}
customLog(format, styles);

// With custom color formats
const hexOutput = new LogStyler().hex('#FF5733').toCSS('Custom hex color');
const rgbOutput = new LogStyler().rgb(255, 100, 50).toCSS('Custom RGB color');
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
| **`input`**     | `unknown` | Value to print to console/shell                                          |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before printing. Defaults to `false` |

##### Examples

```ts
const styler = new LogStyler(['red', 'bold']);
styler.log('Error message');

// With object stringification
styler.log({ data: 'value' }, true);

// With custom color formats
new LogStyler().hex('#FF5733').log('Custom hex color');
new LogStyler().rgb(255, 100, 50).log('Custom RGB color');
new LogStyler().hsl(120, 100, 50).log('Custom HSL color');
```

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

#### Advanced Color Formats

- `ansi16()` - `ANSI 16-color` codes
- `hex()` / `bgHex()` - HEX color codes
- `rgb()` / `bgRGB()` - RGB color values
- `hsl()` / `bgHSL()` - HSL color values

---

### 🌐 Cross-Platform Behavior

- **Node.js**: Uses *ANSI escape codes* for `true-color` support
- **Browsers**: Uses CSS styles via `%c` formatting (for `.log()` method)
- **`.toANSI()` method**: Always returns ANSI escape codes regardless of environment
- **`.toCSS()` method**: Returns CSS styling tuples for browser environments
- **Unsupported styles**: Gracefully fall back to unstyled output

---

### 📋 Examples

```ts
// Simple error styling
const errorStyler = new LogStyler(['red', 'bold']);
errorStyler.log('Critical error occurred!');

// Complex chaining with custom colors
const warningStyler = new LogStyler()
  .hex('#FFA500')
  .bgHex('#2C2C2C')
  .bold()
  .italic();

warningStyler.log('Warning: Proceed with caution');

// RGB and HSL examples
const successStyler = new LogStyler().rgb(0, 128, 0).bold;
successStyler.log('Operation successful');

const infoStyler = new LogStyler().hsl(240, 100, 50).italic;
infoStyler.log('Information message');
```

---

### See also

- [**Stylog**](/docs/utilities/misc/stylog) - Chainable wrapper for `LogStyler`
- [**Style Utilities**](/docs/utilities/misc/stylog-utils) - Helper functions for style validation
- [**Color Conversion**](/docs/utilities/colors/convert) - Functions for color format conversion

---

### Summary

Use the `LogStyler` class for **programmatic control** over console styling or when you need **isolated style configurations** with support for multiple color formats. All style methods return `StylogChain` instances for fluent chaining.
