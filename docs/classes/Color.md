---
id: Color
title: Color - Play with Colors - Convert, blend, manipulate and do more.
---

<!-- markdownlint-disable-file MD024 -->
## Comprehensive API Reference  

The `Color` class provides a robust way to work with colors in various formats (i.e. Hex, Hex8, RGB, HSL, RGBA, HSLA) and includes methods for color manipulation, blending, and accessibility checks.  

---

## Table of Contents

- [Color Manipulation Methods](./Color/manipulation)
- [Color Scheme Generation](./Color/scheme-generation)
- [Accessibility & Contrast Methods](./Color/contrast-accessibility)
- [Static Validation Methods](./Color/static-validation)

---

## Type Definitions

### Hex

```typescript
type Hex = `#${string}`; // Format: #3C6945
```

### Hex6

```typescript
type Hex6 = Branded<`#${string}`, 'Hex6'>; // Format: #3C6945
```

### Hex8

```typescript
type Hex8 = Branded<`#${string}`, 'Hex8'>; // Format: #3C6945FF (with alpha)
```

### RGB

```typescript
type RGB = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`; // Format: rgb(R, G, B)
```

### RGBA

```typescript
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})` | `rgba(${number},${number},${number},${number})`; // With alpha
```

### HSL

```typescript
type HSL = `hsl(${number}, ${number}%, ${number}%)` | `hsl(${number},${number}%,${number}%)`; // Format: hsl(H, S%, L%)
```

### HSLA

```typescript
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})` | `hsla(${number},${number}%,${number}%,${number})`; // With alpha
```

### CSSColor

```typescript
type CSSColor = keyof typeof CSS_COLORS; // All valid CSS color names
```

### Percent

```typescript
type type Percent = (typeof PERCENT_VALUES)[number]; // 0-100
```
