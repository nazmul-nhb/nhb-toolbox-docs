---
id: random-color  
title: Generate Random Color  
---

<!-- markdownlint-disable-file MD024 -->

## generateRandomHSLColor

Generates a unique random color in HSL format, ensuring it's visually distinct from recently generated colors.

### Function Signature

```typescript
generateRandomHSLColor(maxColors?: number): HSL;
```

### Parameters

- **`maxColors`** (optional): Maximum number of recent colors to track (default: `16`)

### Example

```typescript
import { generateRandomHSLColor } from 'nhb-toolbox';

const randomHsl = generateRandomHSLColor();
// "hsl(42, 85%, 65%)"
```

### Notes

- Tracks generated colors to prevent duplicates
- Ensures visual distinctness from recently generated colors
- Maintains a rolling window of recent colors (default 16)
- Uses HSL color space for better perceptual randomness

### Aliases

`generateRandomHSLColor` can also be imported using aliases:

- `generateRandomHSL`
- `getRandomHSL`

---

## generateRandomColor

Generates a random unique color in one of three formats: `Hex6`, `RGB`, or `HSL`.

### Function Signature

```typescript
generateRandomColor<C extends $ColorType | undefined = undefined>(
    options?: RandomColorOptions<C>
): RandomColor<C>;
```

### Parameters

- **`options`** (optional): Configuration options for random color generation
  - **`colorType`**: The type of expected return type of color: `'hex'`, `'rgb'` or `'hsl'`. Default is `'hex'`.
  - **`maxColors`**: The maximum number of recent colors to store in memory. Default is `16`.

### Example

```typescript
import { generateRandomColor } from 'nhb-toolbox';

// Default behavior (returns Hex6)
const hexColor = generateRandomColor();
// "#34E2EF"

// Specify RGB format
const rgbColor = generateRandomColor({ colorType: 'rgb' });
// "rgb(235, 159, 45)"

// Specify HSL format with custom maxColors
const hslColor = generateRandomColor({ 
    colorType: 'hsl', 
    maxColors: 32 
});
// "hsl(223, 96%, 53%)"
```

### Notes

- If no `options` or `colorType` is provided, defaults to returning `Hex6` format
- Uses the same uniqueness guarantees as [`generateRandomHSLColor`](#generaterandomhslcolor)
- Provides type inference based on the `colorType` parameter
- Maintains memory efficiency with configurable color history
- Internally uses HSL color space for perceptual distinctness

### Alias

`generateRandomColor` can also be imported using the alias:

- `getRandomColor`

### Type Behavior

- `colorType: 'hex'` → returns `Hex6` type
- `colorType: 'rgb'` → returns `RGB` type  
- `colorType: 'hsl'` → returns `HSL` type
- No `colorType` → returns `Hex6` type (default)

---

## generateRandomColorInHexRGB

:::caution[Deprecated]
This utility has been deprecated! Consider using more optimized and flexible [**generateRandomColor**](#generaterandomcolor)
:::

Generates a unique random color and returns it in both HEX and RGB formats.

### Function Signature

```typescript
generateRandomColorInHexRGB(maxColors?: number): RandomHexRGB;
```

### Parameters

- **`maxColors`** (optional): Maximum number of recent colors to track (default: `16`)

### Example

```typescript
import { generateRandomColorInHexRGB } from 'nhb-toolbox';

const randomColor = generateRandomColorInHexRGB();
// {
//   hex: "#F2C14E",
//   rgb: "rgb(242, 193, 78)"
// }
```

### Notes

- Internally uses [`generateRandomHSLColor`](#generaterandomhslcolor)
- Converts result to both HEX and RGB formats
- Shares the same color uniqueness guarantees
- Useful when multiple format representations are needed

---

## Behavior Characteristics

### 1. **Uniqueness**

- Tracks all previously generated colors
- Ensures no exact duplicates are returned

### 2. **Visual Distinctness**

- Compares against recent colors using perceptual metrics
- Maintains minimum visual difference threshold

### 3. **Performance**

- Limits tracked history to prevent memory bloat
- Uses efficient color space conversions

## Use Cases

- Data visualization color schemes
- UI element coloring
- Avatar/placeholder generation
- Design system utilities
- Game development assets

## Limitations

- Default 16-color history window may need adjustment for:
  - Very large color sets
  - Specialized color requirements
- HSL space may produce brighter colors than desired

## Type Definitions

```typescript
type Hex = `#${string}`;
type Hex6 = Branded<`#${string}`, 'Hex6'>;
type RGB = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)` | `hsl(${number},${number}%,${number}%)`;

/** Basic color type: `hex`, `rgb` or `hsl`. */
type $ColorType = 'hex' | 'rgb' | 'hsl';

/** Options for random color generation. */
interface RandomColorOptions<C extends $ColorType | undefined> {
 /** The type of expected return type of color: `hex`, `rgb` or `hsl`. Default is `'hex'`. */
 colorType?: C;
 /** The maximum number of recent colors to store in memory. Default is `16`. */
 maxColors?: number;
}

/** Infers random color type (`Hex6`, `RGB`, or `HSL`) based on the provided color type `C`. */
type RandomColor<C extends $ColorType | undefined = undefined> =
 C extends undefined | 'hex' ? Hex6
 : C extends 'hsl' ? HSL
 : C extends 'rgb' ? RGB
 : Hex6;

/** Represents an object with `hex` (`hex6`) and `rgb` color */
type RandomHexRGB = {
    /** Represents a hexadecimal color code. */
    hex: Hex6;
    /** Represents an RGB color string. */
    rgb: RGB;
};
```

## Conclusion

The random color generators provide:

1. **Perceptually distinct** color generation
2. **Format flexibility** (HSL, HEX, RGB)
3. **Memory-efficient** tracking
4. **Deterministic uniqueness** guarantees

Ideal for applications requiring:

- Distinct visual elements
- Dynamic color schemes
- Non-repeating color sequences
- Design system utilities

> For more powerful color manipulation, consider using the [`Color`](/docs/classes/Color) class.
