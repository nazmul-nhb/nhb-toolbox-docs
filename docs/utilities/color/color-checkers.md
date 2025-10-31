---
id: color-checkers
title: Color Format Checkers
---

<!-- markdownlint-disable-file MD024 -->

## Overview

A collection of utility functions to validate and check color formats. These functions verify if a given string matches specific color formats (`Hex6`, `Hex8`, `RGB`, `RGBA`, `HSL`, `HSLA`) and validate that the color values are within acceptable ranges.

---

## isHex6

Checks if a color is in `Hex6` format.

### Function Signature

```typescript
isHex6(color: string): color is Hex6
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `Hex6` color, `false` if not

### Example

```typescript
import { isHex6 } from 'nhb-toolbox';

isHex6('#FF5733');    // true
isHex6('#FF573');     // false (5 characters)
isHex6('#FF57333');   // false (7 characters)
isHex6('rgb(255,0,0)'); // false (wrong format)
```

---

## isHex8

Checks if a color is in `Hex8` format (includes alpha channel).

### Function Signature

```typescript
isHex8(color: string): color is Hex8
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `Hex8` color, `false` if not

### Example

```typescript
import { isHex8 } from 'nhb-toolbox';

isHex8('#FF573380');    // true
isHex8('#FF5733');      // false (6 characters)
isHex8('#FF573330');    // false (9 characters)
isHex8('rgba(255,0,0,0.5)'); // false (wrong format)
```

---

## isRGB

Checks if a color is in `RGB` format and within valid ranges.

### Function Signature

```typescript
isRGB(color: string): color is RGB
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `RGB` color, `false` if not

### Example

```typescript
import { isRGB } from 'nhb-toolbox';

isRGB('rgb(255, 87, 51)');     // true
isRGB('rgb(255, 87, 51, 0.5)');  // false (includes alpha)
isRGB('rgb(300, 87, 51)');       // false (value out of range)
isRGB('#FF5733');            // false (wrong format)
```

---

## isRGBA

Checks if a color is in `RGBA` format and within valid ranges.

### Function Signature

```typescript
isRGBA(color: string): color is RGBA
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `RGBA` color, `false` if not

### Example

```typescript
import { isRGBA } from 'nhb-toolbox';

isRGBA('rgba(255, 87, 51, 0.5)');  // true
isRGBA('rgba(255, 87, 51, 1)');    // true
isRGBA('rgba(255, 87, 51)');         // false (missing alpha)
isRGBA('rgba(255, 87, 51, 1.5)');    // false (alpha out of range)
```

---

## isHSL

Checks if a color is in `HSL` format and within valid ranges.

### Function Signature

```typescript
isHSL(color: string): color is HSL
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `HSL` color, `false` if not

### Example

```typescript
import { isHSL } from 'nhb-toolbox';

isHSL('hsl(120, 100%, 50%)');    // true
isHSL('hsl(120, 100%, 50%, 0.5)'); // false (includes alpha)
isHSL('hsl(400, 100%, 50%)');      // false (hue out of range)
isHSL('hsl(120, 150%, 50%)');      // false (saturation out of range)
```

---

## isHSLA

Checks if a color is in `HSLA` format and within valid ranges.

### Function Signature

```typescript
isHSLA(color: string): color is HSLA
```

### Parameters

- **`color`**: Color string to check

### Returns

- `boolean`: `true` if it's a valid `HSLA` color, `false` if not

### Example

```typescript
import { isHSLA } from 'nhb-toolbox';

isHSLA('hsla(120, 100%, 50%, 0.5)');  // true
isHSLA('hsla(120, 100%, 50%, 1)');    // true
isHSLA('hsla(120, 100%, 50%)');         // false (missing alpha)
isHSLA('hsla(120, 100%, 50%, 1.5)');    // false (alpha out of range)
```

---

## Validation Rules

### Hex Formats

- **Hex6**: Exactly 6 hexadecimal characters after `#`
- **Hex8**: Exactly 8 hexadecimal characters after `#` (includes alpha)

### RGB/RGBA Formats

- **Red, Green, Blue**: Must be between 0-255 (inclusive)
- **Alpha**: Must be between 0-1 (inclusive)

### HSL/HSLA Formats

- **Hue**: Must be between 0-360 (inclusive)
- **Saturation**: Must be between 0-100% (inclusive)
- **Lightness**: Must be between 0-100% (inclusive)
- **Alpha**: Must be between 0-1 (inclusive)

---

## Type Guards

All checker functions are implemented as **type guards**, enabling TypeScript to narrow the type automatically:

```typescript
const color: string = getUserInput();

if (isHex6(color)) {
    // TypeScript now knows `color` is of type Hex6
    const hexColor: Hex6 = color; // No type error
}

if (isRGB(color)) {
    // TypeScript now knows `color` is of type RGB
    const rgbColor: RGB = color; // No type error
}
```

---

## Use Cases

- **Form validation** for color inputs
- **Data sanitization** before color processing
- **Type narrowing** in TypeScript applications
- **API input validation** for color parameters
- **Color format detection** in dynamic applications

## Related Utilities

These checkers work well with:

- Color conversion utilities
- Color manipulation functions
- Design system validators
- Input validation pipelines

> For comprehensive color manipulation, consider using the [`Color`](/docs/classes/Color) class. These checkers are also available as [static methods in `Color` class](/docs/classes/Color/static-validation).
