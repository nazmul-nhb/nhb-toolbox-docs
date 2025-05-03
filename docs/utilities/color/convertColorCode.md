---
id: convertColorCode  
title: Convert Color Code  
---

## convertColorCode

Converts between color formats (HEX, RGB, HSL) and their alpha-channel variants (HEX8, RGBA, HSLA). Returns an object with all equivalent color representations `excluding` the input format.

### Function Signatures

#### Hex6 Conversion

```typescript
function convertColorCode(color: Hex6): { rgb: RGB; hsl: HSL };
```

#### RGB Conversion

```typescript
function convertColorCode(color: RGB): { hex: Hex6; hsl: HSL };
```

#### HSL Conversion

```typescript
function convertColorCode(color: HSL): { hex: Hex6; rgb: RGB };
```

#### Hex8 Conversion

```typescript
function convertColorCode(color: Hex8): { rgba: RGBA; hsla: HSLA };
```

#### RGBA Conversion

```typescript
function convertColorCode(color: RGBA): { hex8: Hex8; hsla: HSLA };
```

#### HSLA Conversion

```typescript
function convertColorCode(color: HSLA): { hex8: Hex8; rgba: RGBA };
```

### Type Definitions

#### Color Types

```typescript
type ColorTypeSolid = Hex6 | RGB | HSL;
type ColorTypeAlpha = Hex8 | RGBA | HSLA;
type ColorType = Hex | Hex6 | RGB | HSL | Hex8 | RGBA | HSLA;
```

#### ConvertedColors Interface

```typescript
interface ConvertedColors<T extends ColorType> {
  hex: T extends Hex6 | ColorTypeAlpha ? never : Hex6;
  rgb: T extends RGB | ColorTypeAlpha ? never : RGB;
  hsl: T extends HSL | ColorTypeAlpha ? never : HSL;
  hex8: T extends Hex8 | ColorTypeSolid ? never : Hex8;
  rgba: T extends RGBA | ColorTypeSolid ? never : RGBA;
  hsla: T extends HSLA | ColorTypeSolid ? never : HSLA;
}
```

### Examples

#### Hex6 to RGB/HSL

```typescript
import { convertColorCode } from 'nhb-toolbox';

const result = convertColorCode('#3C6945' as Hex6);
// {
//   rgb: "rgb(60, 105, 69)",
//   hsl: "hsl(130, 27%, 32%)"
// }
```

#### RGB to Hex/HSL

```typescript
const result = convertColorCode('rgb(60, 105, 69)');
// {
//   hex: "#3C6945",
//   hsl: "hsl(130, 27%, 32%)"
// }
```

#### HSL to Hex/RGB

```typescript
const result = convertColorCode('hsl(130, 27%, 32%)');
// {
//   hex: "#3C6945",
//   rgb: "rgb(60, 105, 69)"
// }
```

#### Hex8 to RGBA/HSLA

```typescript
const result = convertColorCode('#3C694580' as Hex8);
// {
//   rgba: "rgba(60, 105, 69, 0.5)",
//   hsla: "hsla(130, 27%, 32%, 0.5)"
// }
```

#### RGBA to Hex8/HSLA

```typescript
const result = convertColorCode('rgba(60, 105, 69, 0.5)');
// {
//   hex8: "#3C694580",
//   hsla: "hsla(130, 27%, 32%, 0.5)"
// }
```

#### HSLA to Hex8/RGBA

```typescript
const result = convertColorCode('hsla(130, 27%, 32%, 0.5)');
// {
//   hex8: "#3C694580",
//   rgba: "rgba(60, 105, 69, 0.5)"
// }
```

### Notes

1. **Type Safety**:
   - Requires type assertion for Hex6/Hex8 inputs (`as Hex6`/`as Hex8`)
   - Returns only relevant conversions (excludes input format)

2. **Alpha Handling**:
   - Maintains alpha channel in conversions
   - Automatically converts between opacity representations

3. **Error Handling**:
   - Throws error for unrecognized formats
   - Validates all input values

### Use Cases

- Color system normalization
- Theme configuration
- Dynamic color manipulation
- Cross-format compatibility
- Color palette generation

### Conclusion

The `convertColorCode` function provides:

1. **Comprehensive** color format conversion
2. **Type-safe** operations with clear return types  
3. **Consistent** behavior across all color spaces
4. **Alpha channel** preservation

Ideal for applications requiring:

- Flexible color systems
- Theme management
- Design system utilities
- Color manipulation tools
