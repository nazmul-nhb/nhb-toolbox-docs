---
id: manipulation
title: Color Manipulation Methods
---

<!-- markdownlint-disable-file MD024 -->

### `applyOpacity()`

#### Signature

```typescript
applyOpacity(opacity: Percent): Color
```  

#### Parameters

- `opacity` (`0–100`): The opacity percentage to apply.  

#### Return Type

`Color` – A new `Color` instance with the modified opacity.  

#### Behavior

- If the original color has no alpha, it adds it.  
- If it already has alpha, it updates it.  

#### Example

```javascript
const red = new Color("#ff0000");
const semiTransparentRed = red.applyOpacity(50); // 50% opacity
console.log(semiTransparentRed.rgba); // "rgba(255, 0, 0, 0.5)"
```  

---

### `applyDarkness()`

#### Signature

```typescript
applyDarkness(percent: Percent): Color
```  

#### Parameters

- `percent` (`0–100`): How much to darken the color.  

#### Return Type

`Color` – A new darkened `Color` instance.  

#### Behavior

- Reduces lightness in HSL space.  
- Clamps to `0%` if the result would be negative.  

#### Example

```javascript
const blue = new Color("#0000ff");
const darkerBlue = blue.applyDarkness(20); // 20% darker
console.log(darkerBlue.hsl); // "hsl(240, 100%, 40%)" (was 50%)
```  

---

### `applyBrightness()`

#### Signature

```typescript
applyBrightness(percent: Percent): Color
```  

#### Parameters

- `percent` (`0–100`): How much to lighten the color.  

#### Return Type

`Color` – A new lightened `Color` instance.  

#### Behavior

- Increases lightness in HSL space.  
- Clamps to `100%` if the result exceeds it.  

#### Example

```javascript
const green = new Color("#008000");
const lighterGreen = green.applyBrightness(30); // 30% lighter
console.log(lighterGreen.hsl); // "hsl(120, 100%, 65%)" (was 25%)
```  

---

### `applyDullness()`

#### Signature

```typescript
applyDullness(percent: Percent): Color
```  

#### Parameters

- `percent` (`0–100`): How much to desaturate the color.  

#### Return Type

`Color` – A new desaturated `Color` instance.  

#### Behavior

- Reduces saturation in HSL space.  
- Clamps to `0%` if the result would be negative.  

#### Example

```javascript
const pink = new Color("#ff69b4");
const dullPink = pink.applyDullness(50); // 50% less saturated
console.log(dullPink.hsl); // "hsl(330, 50%, 70%)" (was 100%)
```  

---

### `applyWhiteShade()`

#### Signature

```typescript
applyWhiteShade(percent: Percent): Color
```  

#### Parameters

- `percent` (`0–100`): How much to soften toward white.  

#### Return Type

`Color` – A new softened `Color` instance.  

#### Behavior

- Reduces saturation and increases lightness.  
- Creates a "pastel" effect.  

#### Example

```javascript
const purple = new Color("#800080");
const softPurple = purple.applyWhiteShade(40); // 40% softer
console.log(softPurple.hsl); // "hsl(300, 60%, 84%)" (was 50%)
```  

---

### `blendWith()`

#### Signature

```typescript
blendWith(other: ColorType | CSSColor, weight?: number): Color
```  

#### Parameters

- `other`: The color to blend with.  
- `weight` (`0–1`, default `0.5`): The influence of the other color.  

#### Return Type

`Color` – A new blended `Color` instance.  

#### Behavior

- `weight = 0` → Original color.  
- `weight = 1` → Other color.  
- `weight = 0.5` → Equal mix.  

#### Example

```javascript
const red = new Color("#ff0000");
const blue = new Color("#0000ff");
const purple = red.blendWith(blue); // Equal blend
console.log(purple.hex); // "#800080" (purple)
```  
