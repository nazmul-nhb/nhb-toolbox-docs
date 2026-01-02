---
id: scheme-generation
title: Color Scheme Methods
---

<!-- markdownlint-disable-file MD024 -->

## Available Methods

### `getComplementaryColor()`

#### Signature

```typescript
getComplementaryColor(): Color
```  

#### Return Type

`Color` – The complementary color (180° rotation in HSL).  

#### Example

```ts
const yellow = new Color("#ffff00");
const complementary = yellow.getComplementaryColor();
console.log(complementary.hex); // "#0000FF" (blue)
```  

---

### `getAnalogousColors()`

#### Signature

```typescript
getAnalogousColors(): Analogous
```  

#### Return Type

`[Color, Color, Color]` – The base color + two analogous colors (±30° in HSL).  

#### Example

```ts
const orange = new Color("#ffa500");
const analogous = orange.getAnalogousColors();
console.log(analogous.map(c => c.hex)); // [ '#FFA500', '#FF2600', '#D9FF00' ]
```  

---

### `getTriadColors()`

#### Signature

```typescript
getTriadColors(): Triad
```  

#### Return Type

`[Color, Color, Color]` – The base color + two triadic colors (120° apart).  

#### Example

```ts
const red = new Color("#ff0000");
const triad = red.getTriadColors();
console.log(triad.map(c => c.hex)); // [ '#FF0000', '#00FF00', '#0000FF' ]
```  

---

### `getTetradColors()`

#### Signature

```typescript
getTetradColors(): Tetrad
```  

#### Return Type

`[Color, Color, Color, Color]` – The base color + three tetradic colors (90° apart).  

#### Example

```ts
const teal = new Color("#008080");
const tetrad = teal.getTetradColors();
console.log(tetrad.map(c => c.hex)); // [ '#008080', '#400080', '#800000', '#408000' ]
```  
