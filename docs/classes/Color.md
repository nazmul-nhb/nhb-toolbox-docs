---
id: Color
title: Color - Play with Colors Convert, blend, manipulate and do more
---

<!-- markdownlint-disable-file MD024 -->
## `Color`

The `Color` class provides a robust way to work with colors in various formats (i.e. Hex, Hex8, RGB, HSL, RGBA, HSLA) and includes methods for color manipulation, blending, and accessibility checks.  

---

### Table of Contents

- [Color Manipulation Methods](Color/manipulation)
- [Color Scheme Generation](Color/scheme-generation)
- [Accessibility & Contrast Methods](Color/contrast-accessibility)
- [Static Validation Methods](Color/static-validation)

---

### Import

```ts
import { Color } from 'nhb-toolbox';
// or
import { Color } from 'nhb-toolbox/color';
```

---

### Type Definitions

#### Hex

```typescript
type Hex = `#${string}`; // Format: #3C6945
```

#### Hex6

```typescript
type Hex6 = Branded<`#${string}`, 'Hex6'>; // Format: #3C6945
```

#### Hex8

```typescript
type Hex8 = Branded<`#${string}`, 'Hex8'>; // Format: #3C6945FF (with alpha)
```

#### RGB

```typescript
type RGB = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`; // Format: rgb(R, G, B)
```

#### RGBA

```typescript
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})` | `rgba(${number},${number},${number},${number})`; // With alpha
```

#### HSL

```typescript
type HSL = `hsl(${number}, ${number}%, ${number}%)` | `hsl(${number},${number}%,${number}%)`; // Format: hsl(H, S%, L%)
```

#### HSLA

```typescript
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})` | `hsla(${number},${number}%,${number}%,${number})`; // With alpha
```

#### ColorType

```typescript
// Union of Alpha & Solid `Hex`, `RGB` and `HSL`
type ColorType = Hex | Hex6 | RGB | HSL | Hex8 | RGBA | HSLA;
```

#### CSSColor

```typescript
type CSSColor = "black" | "silver" | "gray" | "white" | "maroon" | "red" | "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow" | "navy" | "blue" | "teal" | "aqua" | "aliceblue" | "antiquewhite" | "aquamarine" | "azure" | "beige" | "bisque" | "blanchedalmond" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | ... 112 more ... | "error"; // All valid (150+) CSS color names
```

#### Percent

```typescript
type Percent = 0 | 1 | 2 | ... | 100; // 0-100
```
