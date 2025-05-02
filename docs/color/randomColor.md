---
id: random-color  
title: Generate Random Color  
---

<!-- markdownlint-disable-file MD024 -->
## generateRandomHSLColor

Generates a unique random color in HSL format, ensuring it's visually distinct from recently generated colors.

### Function Signature

```typescript
function generateRandomHSLColor(maxColors?: number): HSL;
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

---

## generateRandomColorInHexRGB

Generates a unique random color and returns it in both HEX and RGB formats.

### Function Signature

```typescript
function generateRandomColorInHexRGB(maxColors?: number): {
  hex: Hex6;
  rgb: RGB;
};
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

- Internally uses `generateRandomHSLColor`
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
type RGB = `rgb(${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
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
