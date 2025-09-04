---
id: stylog
title: Stylog - Style Console Output
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
- ✅ **Cross-platform** (Node.js ANSI + Browser CSS)
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

### 🔧 Method

#### `.style(style)`

Add a style and return a new `LogStyler` instance for chaining.

```ts
const newStyler = Stylog.style('blue').style('italic');
```

---

#### `.toANSI(input, stringify?)`

Returns the input as a styled string with ANSI escape codes.

##### Parameters

| Property        | Type      | Description                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **`input`**     | `unknown` | Value to style                                                          |
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
| **`input`**     | `any`     | Value to style                                    |
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
| **`input`**     | `any`     | Value to print to console                                                |
| **`stringify`** | `boolean` | Whether to apply `JSON.stringify()` before printing. Defaults to `false` |

---

### 🌐 Cross-Platform Support

<Tabs>
<TabItem value="node" label="Node.js">

```ts
// Uses ANSI escape codes for true-color support
Stylog.red.bold.log('Node.js styled output');
// Output: \x1b[31m\x1b[1mNode.js styled output\x1b[22m\x1b[39m
```

</TabItem>
<TabItem value="browser" label="Browser">

```ts
// Uses CSS styles via %c formatting
Stylog.red.bold.log('Browser styled output');
// Output: %cBrowser styled output, "color: #FF0000; font-weight: bold"
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
```

See the [`LogStyler` class docs](/docs/classes/LogStyler) for full details.

---

### See also

- [**LogStyler class**](/docs/classes/LogStyler) - Low-level API for custom instances
- [**Style Utilities**](/docs/utilities/misc/stylog-utils) - Helper functions for style validation

---

### Summary

Use `Stylog` for **quick, chainable styling** of console output.  
Use [`LogStyler`](/docs/classes/LogStyler) for **programmatic control** or **custom configurations**.
