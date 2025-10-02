---
id: color-converters  
title: Color Converters  
---

<!-- markdownlint-disable-file MD024 -->
## Overview

The color converter utilities provide comprehensive tools for converting between various color formats including HEX, RGB, HSL, and their alpha-channel variants (HEX8, RGBA, HSLA). All functions maintain color accuracy during conversions and include proper type safety.

## convertHslToRgb

Converts HSL values to RGB format string.

### Function Signature

```typescript
convertHslToRgb(h: number, s: number, l: number): RGB;
```

### Parameters

- **`h`**: Hue (0-360 degrees)
- **`s`**: Saturation (0-100%)
- **`l`**: Lightness (0-100%)

### Example

```typescript
import { convertHslToRgb } from 'nhb-toolbox';

convertHslToRgb(130, 27, 32); // "rgb(60, 105, 69)"
```

---

## convertRgbToHsl

Converts RGB values to HSL format string.

### Function Signature

```typescript
convertRgbToHsl(r: number, g: number, b: number): HSL;
```

### Parameters

- **`r`**: Red (0-255)
- **`g`**: Green (0-255)
- **`b`**: Blue (0-255)

### Example

```typescript
import { convertRgbToHsl } from 'nhb-toolbox';

convertRgbToHsl(60, 105, 69); // "hsl(130, 27%, 32%)"
```

---

## convertHslToHex

Converts HSL values to Hex6 format.

### Function Signature

```typescript
convertHslToHex(h: number, s: number, l: number): Hex6;
```

### Example

```typescript
import { convertHslToHex } from 'nhb-toolbox';

convertHslToHex(130, 27, 32); // "#3C6945"
```

---

## convertHexToHsl

Converts Hex string to HSL format.

### Function Signature

```typescript
convertHexToHsl(hex: Hex6 | Hex): HSL;
```

### Example

```typescript
import { convertHexToHsl } from 'nhb-toolbox';

convertHexToHsl('#3C6945'); // "hsl(130, 27%, 32%)"
```

---

## convertRgbToHex

Converts RGB values to Hex6 format.

### Function Signature

```typescript
convertRgbToHex(r: number, g: number, b: number): Hex6;
```

### Example

```typescript
import { convertRgbToHex } from 'nhb-toolbox';

convertRgbToHex(60, 105, 69); // "#3C6945"
```

---

## convertHexToRgb

Converts Hex string to RGB format.

### Function Signature

```typescript
convertHexToRgb(hex: Hex6 | Hex): RGB;
```

### Example

```typescript
import { convertHexToRgb } from 'nhb-toolbox';

convertHexToRgb('#3C6945'); // "rgb(60, 105, 69)"
```

---

## convertRgbToRgba

Converts RGB to RGBA format with opacity.

### Function Signature

```typescript
convertRgbToRgba(r: number, g: number, b: number, a?: number): RGBA;
```

### Example

```typescript
import { convertRgbToRgba } from 'nhb-toolbox';

convertRgbToRgba(60, 105, 69, 0.5); // "rgba(60, 105, 69, 0.5)"
```

---

## convertRgbaToHex8

Converts RGBA values to Hex8 format.

### Function Signature

```typescript
convertRgbaToHex8(r: number, g: number, b: number, a?: number): Hex8;
```

### Example

```typescript
import { convertRgbaToHex8 } from 'nhb-toolbox';

convertRgbaToHex8(60, 105, 69, 0.5); // "#3C694580"
```

---

## convertHex8ToRgba

Converts Hex8 string to RGBA format.

### Function Signature

```typescript
convertHex8ToRgba(hex8: Hex8): RGBA;
```

### Example

```typescript
import { convertHex8ToRgba } from 'nhb-toolbox';

convertHex8ToRgba('#3C694580' as Hex8); // "rgba(60, 105, 69, 0.5)"
```

---

## convertHslaToRgba

Converts HSLA values to RGBA format.

### Function Signature

```typescript
convertHslaToRgba(h: number, s: number, l: number, a?: number): RGBA;
```

### Example

```typescript
import { convertHslaToRgba } from 'nhb-toolbox';

convertHslaToRgba(130, 27, 32, 0.5); // "rgba(60, 105, 69, 0.5)"
```

---

## convertRgbaToHsla

Converts RGBA values to HSLA format.

### Function Signature

```typescript
convertRgbaToHsla(r: number, g: number, b: number, a?: number): HSLA;
```

### Example

```typescript
import { convertRgbaToHsla } from 'nhb-toolbox';

convertRgbaToHsla(60, 105, 69, 0.5); // "hsla(130, 27%, 32%, 0.5)"
```

---

## convertHslaToHex8

Converts HSLA values to Hex8 format.

### Function Signature

```typescript
convertHslaToHex8(h: number, s: number, l: number, a?: number): Hex8;
```

### Example

```typescript
import { convertHslaToHex8 } from 'nhb-toolbox';

convertHslaToHex8(130, 27, 32, 0.5); // "#3C694580"
```

---

## convertHex8ToHsla

Converts Hex8 string to HSLA format.

### Function Signature

```typescript
convertHex8ToHsla(hex8: Hex8): HSLA;
```

### Example

```typescript
import { convertHex8ToHsla } from 'nhb-toolbox';

convertHex8ToHsla('#3C694580' as Hex8); // "hsla(130, 27%, 32%, 0.5)"
```

## Type Definitions

```typescript
type Hex = `#${string}`;
type Hex6 = Branded<`#${string}`, 'Hex6'>;
type Hex8 = Branded<`#${string}`, 'Hex8'>;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
```

## Color Types Explained

### Solid Color Formats

| Type   | Format           | Example              |
| ------ | ---------------- | -------------------- |
| `Hex6` | `#RRGGBB`        | `#3C6945`            |
| `RGB`  | `rgb(R, G, B)`   | `rgb(60, 105, 69)`   |
| `HSL`  | `hsl(H, S%, L%)` | `hsl(130, 27%, 32%)` |

### Alpha Channel Formats

| Type   | Format               | Example                  |
| ------ | -------------------- | ------------------------ |
| `Hex8` | `#RRGGBBAA`          | `#3C6945FF`              |
| `RGBA` | `rgba(R, G, B, A)`   | `rgba(60, 105, 69, 1)`   |
| `HSLA` | `hsla(H, S%, L%, A)` | `hsla(130, 27%, 32%, 1)` |

## Usage Examples

### Basic Conversion

```typescript
// Convert RGB to HEX
const hexColor = convertRgbToHex(255, 0, 0); // "#FF0000"

// Convert HEX to HSL
const hslColor = convertHexToHsl('#FF0000'); // "hsl(0, 100%, 50%)"
```

### With Opacity

```typescript
// Create semi-transparent color
const rgbaColor = convertRgbToRgba(255, 0, 0, 0.5); // "rgba(255, 0, 0, 0.5)"

// Convert to HEX8
const hex8Color = convertRgbaToHex8(255, 0, 0, 0.5); // "#FF000080"
```

### Full Workflow

```typescript
// Start with HSL, convert to other formats
const hsl = 'hsl(210, 100%, 50%)';
const rgb = convertHslToRgb(210, 100, 50); // "rgb(0, 149, 255)"
const hex = convertRgbToHex(0, 149, 255); // "#0095FF"
const rgba = convertRgbToRgba(0, 149, 255, 0.7); // "rgba(0, 149, 255, 0.7)"
```

## Notes

### 1. **Alpha Channel Handling**

- Alpha values are clamped between 0-1
- Invalid values default to 1 (fully opaque)
- HEX8 uses last two digits for alpha (00-FF)

### 2. **Input Validation**

- All functions validate input ranges
- HEX values must be 3, 6, or 8 characters (with #)
- RGB values must be 0-255
- HSL values: Hue 0-360, Saturation/Lightness 0-100%

### 3. **Performance**

- Conversions are optimized for speed
- No unnecessary string operations
- Minimal object creation

## Limitations

### 1. **Color Space**

- Uses sRGB color space for conversions
- No support for wider gamut spaces

### 2. **Precision**

- HSL conversions may have slight rounding differences
- Alpha values are rounded to 1 decimal place

### 3. **Browser Support**

- All modern browsers supported
- IE11 requires polyfills for some color formats

## Conclusion

The color converter utilities provide:

1. **Comprehensive** coverage of major color formats
2. **Accurate** (almost) color space conversions
3. **Type-safe** operations with branded types
4. **Flexible** alpha channel support

Ideal for applications requiring:

- Dynamic color theming
- Color manipulation
- Cross-format compatibility
- Accessible color systems
