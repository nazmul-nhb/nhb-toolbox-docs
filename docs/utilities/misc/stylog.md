---
id: stylog
title: Stylog - Style Console/Shell Output
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- markdownlint-disable-file MD024 -->

## `Stylog`

The **`Stylog`** is a **chainable wrapper** around the [`LogStyler`](/docs/classes/LogStyler) class that provides a fluent API for styling console output. It supports method chaining with style properties for all available colors and text effects.

:::tip[**When to Use**]

- **Use this when you want fluent, chainable styling**
- Perfect for one-off styled console messages
- Great for quick debugging with colored output
- If you need custom reusable style configurations, use [`LogStyler`](#-need-more-control) directly

:::

---

### ✨ Features

- ✅ **Fluent chainable API** - `Stylog.red.bold.bgBlue.log()`
- ✅ **Type-safe** autocomplete for all styles
- ✅ **Cross-platform** (Node.js `ANSI` + Browser `CSS`)
- ✅ **Multiple color formats** - `ANSI-16`, `HEX`, `RGB`, `HSL`
- ✅ **No configuration needed** - just import and use

---

### 📦 Import

```ts
import { Stylog } from 'nhb-toolbox/stylog';
```

---

### 🚀 Quick Usage

<Tabs>
<TabItem value="simple" label="Simple Usage">

```ts
// Basic coloring
Stylog.red.log('Error message');
Stylog.green.log('Success message');
Stylog.blue.log('Info message');
```

</TabItem>
<TabItem value="complex" label="Complex Styling">

```ts
// Multiple styles
Stylog.red.bold.bgYellow.log('Warning!');

// With object stringification
Stylog.green.italic.log({ data: 'value' }, true);

// Advanced color formats
Stylog.hex('#FF5733').bgRGB(50, 100, 150).bold.log('Custom colors');
```

</TabItem>
<TabItem value="reusable" label="Reusable Bases">

```ts
// Create reusable style bases
const error = Stylog.red.bold;
const warning = Stylog.yellow.bgDark.italic;
const success = Stylog.green.bold;

error.log('Database connection failed');
warning.log('API response slow');
success.log('Operation completed');

// Custom color bases
const brandColor = Stylog.hex('#1E88E5');
brandColor.log('Brand colored message');
```

</TabItem>
</Tabs>

---

### 🎨 Available Style Properties

#### Foreground Colors

All CSS color names as properties: `.red`, `.blue`, `.green`, `.yellow`, `.purple`, `.aqua`, `.cornflowerblue`, etc.

:::note
Please refer to [`CSS_COLORS`](/docs/types/constants#available-constants) in the list for more details
:::

#### Background Colors

Prefixed with `bg`: `.bgRed`, `.bgBlue`, `.bgGreen`, `.bgYellow`, `.bgDark`, etc.

#### Text Effects

- `.bold`, `.bolder` - Bold text
- `.dim` - Dimmed text
- `.italic` - Italic text
- `.underline` - Underlined text
- `.strikethrough` - Strikethrough text
- `.inverse` - Inverted colors

---

### 🔧 Methods

#### `.style(style)`

Add a style and return a new `LogStyler` instance for chaining.

```ts
const newStyler = Stylog.style('blue').style('italic');
```

:::info[Notes]

- When chaining similar styles, only the last one(s) takes effect.
- All colors applied through `style()` method are `truecolor` in form, to apply `ANSI-16` colors, use `ansi16()` method.

:::

---

#### `.ansi16(color)`

Apply `ANSI 16-color` styling to the text.

##### Parameters

| Property    | Type          | Description                                        |
| ----------- | ------------- | -------------------------------------------------- |
| **`color`** | `Ansi16Color` | `ANSI 16-color` name (e.g., `'red'`, `'cyanBright'`) |

##### Returns

`StylogChain` - A new chainable instance with the `ANSI 16-color` style applied

:::info[Notes]

- Only one argument (color) can be passed on a single call
- Color applied through `ansi16()` method is truecolor in form
- For background ANSI colors, use `bg` prefix (e.g., 'bgRed')

:::

##### Examples

```ts
// Basic usage
Stylog.ansi16('red').log('Error message');
Stylog.ansi16('greenBright').log('Success message');

// Background colors
Stylog.ansi16('bgRed').log('Red background');
Stylog.ansi16('bgGreenBright').log('Bright green background');

// Chaining with other styles
Stylog.ansi16('redBright').bold.italic.log('Bright red bold italic');
```

---

#### `.hex(code)`

Apply a HEX color to the text foreground.

##### Parameters

| Property   | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| **`code`** | `string` | HEX color string (e.g., `'#4682B4'` or `'4682B4'`) |

##### Returns

`StylogChain` - A new chainable instance with the HEX color applied

:::info[Notes]

- Accepts both formats: with hash prefix (`#4682B4`) or without (`4682B4`)
- Invalid HEX codes will be ignored (no error thrown)

:::

##### Examples

```ts
// With hash prefix
Stylog.hex('#4682B4').log('Steel blue text');
Stylog.hex('#FF0000').bold.log('Red bold text');

// Without hash prefix
Stylog.hex('4682B4').log('Steel blue text');
Stylog.hex('00FF00').underline.log('Green underlined text');
```

---

#### `.bgHex(code)`

Apply a HEX color to the text background.

##### Parameters

| Property   | Type     | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| **`code`** | `string` | HEX color string (e.g., `'#4682B4'` or `'4682B4'`) |

##### Returns

`StylogChain` - A new chainable instance with the HEX background color applied

:::info[Notes]

- Accepts both formats: with hash prefix (`#4682B4`) or without (`4682B4`)
- Invalid HEX codes will be ignored (no error thrown)

:::

##### Examples

```ts
// With hash prefix
Stylog.bgHex('#4682B4').log('Steel blue background');
Stylog.white.bgHex('#000000').log('White text on black background');

// Without hash prefix
Stylog.bgHex('4682B4').log('Steel blue background');
Stylog.bgHex('FF0000').bold.log('Bold text on red background');
```

---

#### `.rgb(code)` | `.rgb(red, green, blue)`

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

:::info[Notes]

- Accepts multiple formats: full `rgb()` syntax or comma-separated values
- Invalid RGB values will be ignored (no error thrown)

:::

##### Examples

```ts
// Full rgb() syntax
Stylog.rgb('rgb(11, 45, 1)').log('Dark green text');
Stylog.rgb('rgb(255, 0, 0)').bold.log('Red bold text');

// Comma-separated values
Stylog.rgb('11, 45, 1').log('Dark green text');
Stylog.rgb('255, 0, 0').bold.log('Red bold text');

// Individual components
Stylog.rgb(255, 0, 0).log('Red text');
Stylog.rgb(0, 255, 0).underline.log('Green underlined text');
```

---

#### `.bgRGB(code)` | `.bgRGB(red, green, blue)`

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

:::info[Notes]

- Accepts multiple formats: full `rgb()` syntax or comma-separated values
- Invalid RGB values will be ignored (no error thrown)

:::

##### Examples

```ts
// Full rgb() syntax
Stylog.bgRGB('rgb(225, 169, 196)').log('Pink background');
Stylog.bgRGB('rgb(0, 0, 255)').bold.log('Bold text on blue background');

// Comma-separated values
Stylog.bgRGB('225, 169, 196').log('Pink background');
Stylog.bgRGB('0, 0, 255').bold.log('Bold text on blue background');

// Individual components
Stylog.bgRGB(0, 0, 255).log('Blue background');
Stylog.black.bgRGB(255, 255, 255).log('Black text on white background');
```

---

#### `.hsl(code)` | `.hsl(hue, saturation, lightness)`

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

:::info[Notes]

- Accepts multiple formats: standard HSL syntax or comma-separated values
- Internally converts HSL to RGB for rendering
- Invalid HSL values will be ignored (no error thrown)

:::

##### Examples

```ts
// Standard HSL syntax
Stylog.hsl('hsl(50 80.5% 40%)').log('Gold text');
Stylog.hsl('hsl(120, 100%, 50%)').italic.log('Green italic text');

// With commas
Stylog.hsl('50, 80.5%, 40%').log('Gold text');
Stylog.hsl('120, 100%, 50%').italic.log('Green italic text');

// Individual components
Stylog.hsl(0, 100, 50).log('Red text');
Stylog.hsl(240, 100, 50).log('Blue text');
```

---

#### `.bgHSL(code)` | `.bgHSL(hue, saturation, lightness)`

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

:::info[Notes]

- Accepts multiple formats: standard HSL syntax or comma-separated values
- Internally converts HSL to RGB for rendering
- Invalid HSL values will be ignored (no error thrown)

:::

##### Examples

```ts
// Standard HSL syntax
Stylog.bgHSL('hsl(50 80.5% 40%)').log('Gold background');
Stylog.bgHSL('hsl(0, 100%, 50%)').bold.log('Bold text on red background');

// With commas
Stylog.bgHSL('50, 80.5%, 40%').log('Gold background');
Stylog.bgHSL('0, 100%, 50%').bold.log('Bold text on red background');

// Individual components
Stylog.bgHSL(120, 100, 50).log('Green background');
Stylog.white.bgHSL(0, 100, 50).log('White text on red background');
```

---

#### `.toANSI(input, stringify?)`

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
const dataText = Stylog.green.toANSI({ value: 42 }, true);
const errorMessage = Stylog.red.bold.toANSI('Error occurred, using Stylog');
// Returns: "\x1b[31m\x1b[1mError occurred, using Stylog\xx1b[22m\x1b[39m"

// Use in console (terminal or modern browser consoles)
console.error(errorMessage);
console.info(Stylog.red.bold.toANSI('I support ANSI!'));

// With custom color formats
const hexMessage = Stylog.hex('#FF5733').toANSI('Custom hex color');
const rgbMessage = Stylog.rgb(255, 100, 50).toANSI('Custom RGB color');
```

:::info[Note]
The `.toANSI()` method always returns ANSI-formatted strings, making it suitable for contexts where you need the styled string rather than console output.
:::

---

#### `.toCSS(input, stringify?)`

Chainable method that returns styled tuple `[format, cssList]` for browser environments.

```ts
const [format, styles] = Stylog.red.bold.toCSS('Error');
```

##### Parameters

| Property        | Type      | Description                                       |
| --------------- | --------- | ------------------------------------------------- |
| **`input`**     | `unknown` | Input to style before printing in the console     |
| **`stringify`** | `boolean` | Whether to stringify objects. Defaults to `false` |

##### Returns

`[string, string[]]` - Tuple with formatted string and CSS styles

:::info[When to Use]
Use this method for browser-specific styling needs, UI framework integration, or custom output handling.
:::

##### Examples

```ts
// Basic usage in browser
const styler = Stylog.red.bold;
const [format, cssList] = styler.toCSS('Error message');
// format: "%cError message"
// cssList: ["color: #FF0000", "font-weight: bold"]

// Custom browser output handling
const styled = Stylog.blue.bgYellow.italic;
const [format, styles] = styled.toCSS('Warning', true);

// Use with custom logging function
function customLog(formatted: string, styles: string[]) {
  const styleString = styles.join('; ');
  console.log(formatted, styleString);
}

customLog(format, styles);

// With object stringification
const dataOutput = Stylog.green.toCSS({ id: 123 }, true);
// format: "%c{\"id\":123}"
// cssList: ["color: #008000"]

// With custom color formats
const hexOutput = Stylog.hex('#FF5733').toCSS('Custom hex color');
const rgbOutput = Stylog.rgb(255, 100, 50).toCSS('Custom RGB color');
```

---

#### `.log(input, stringify?)`

Print the styled message to console.

```ts
Stylog.red.bold.log('Error!');
Stylog.blue.log({ data: 'value' }, true); // Stringify objects
```

##### Parameters

| Property        | Type      | Description                                                              |
| --------------- | --------- | ------------------------------------------------------------------------ |
| **`input`**     | `unknown` | Value to print to console/shell                                          |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before printing. Defaults to `false` |

##### Examples

```ts
// Basic usage
Stylog.red.bold.log('Error message');

// With object stringification
Stylog.green.log({ data: 'value' }, true);

// With custom color formats
Stylog.hex('#FF5733').log('Custom hex color');
Stylog.rgb(255, 100, 50).log('Custom RGB color');
Stylog.hsl(120, 100, 50).log('Custom HSL color');

// Complex combinations
Stylog.hex('#FF5733').bgRGB(50, 100, 150).bold.italic.log('Complex styling');
```

---

### 🌐 Cross-Platform Support

<Tabs>
<TabItem value="node" label="Node.js">

```ts
// Uses ANSI escape codes for true-color support
Stylog.red.bold.log('Node.js styled output');
// Output: \x1b[31m\x1b[1mNode.js styled output\x1b[22m\x1b[39m

// Custom color formats also work
Stylog.hex('#FF5733').log('Custom hex in Node.js');
Stylog.rgb(255, 100, 50).log('Custom RGB in Node.js');
```

</TabItem>
<TabItem value="browser" label="Browser">

```ts
// Uses CSS styles via %c formatting
Stylog.red.bold.log('Browser styled output');
// Output: %cBrowser styled output, "color: #FF0000; font-weight: bold"

// Custom color formats also work
Stylog.hex('#FF5733').log('Custom hex in browser');
Stylog.rgb(255, 100, 50).log('Custom RGB in browser');
```

</TabItem>
</Tabs>

---

### 🏗 Need more control?

If you need programmatic control or isolated instances, use the `LogStyler` class directly:

```ts
import { LogStyler } from 'nhb-toolbox/stylog';

const customStyler = new LogStyler(['customColor', 'bold']);
// Add custom styles or configurations

// You can also use the advanced color methods
customStyler.hex('#FF5733').bgRGB(50, 100, 150).log('Custom styling');
```

See the [`LogStyler` class docs](/docs/classes/LogStyler) for full details.

---

### See also

- [**LogStyler class**](/docs/classes/LogStyler) - Low-level API for custom instances
- [**Style Utilities**](/docs/utilities/misc/stylog-utils) - Helper functions for style validation
- [**Color Conversion**](/docs/utilities/color/convertColorCode) - Functions for color format conversion

---

### Summary

- Use `Stylog` for **quick, chainable styling** of console output with support for multiple color formats (ANSI-16, HEX, RGB, HSL).  
- Use [`LogStyler`](/docs/classes/LogStyler) for **programmatic control** or **custom configurations**.
