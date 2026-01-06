---
id: contrast-accessibility
title: Contrast & Accessibility
---

<!-- markdownlint-disable-file MD024 -->

## Available Methods

### `contrastRatio()`

#### Signature

```typescript
contrastRatio(other: ColorType | CSSColor): number
```  

#### Parameters

- `other`: The color to compare against.  

#### Return Type

`number` – The WCAG contrast ratio (rounded to 2 decimal places).  

#### Notes

- `1` = No contrast.  
- `21` = Maximum contrast (black vs. white).  

#### Example

```ts
const black = new Color("#000000");
const white = "#ffffff";
console.log(black.contrastRatio(white)); // 21
```  

---

### `getWCAGRating()`

#### Signature

```typescript
getWCAGRating(other: ColorType | CSSColor): 'Fail' | 'AA' | 'AAA'
```  

#### Parameters

- `other`: The color to test against.  

#### Return Type

- `"Fail"` (Ratio < 4.5)  
- `"AA"` (Ratio ≥ 4.5)  
- `"AAA"` (Ratio ≥ 7)  

#### Example

```ts
const text = "#333333";
const background = new Color("#f0f0f0");
console.log(background.getWCAGRating(text)); // "AAA"
```  

---

### `isLightColor()`

#### Signature

```ts
isLightColor(threshold?: number): boolean
```

#### Parameters

- `threshold` *(optional)* — Brightness cutoff value in the range `0–255`.
  Defaults to `127.5` if not provided. Values outside the range are clamped.

#### Return Type

`boolean` — `true` if the perceived brightness exceeds the `threshold`; otherwise `false`.

#### Example

```ts
new Color("#ffffff").isLightColor();        // true
new Color("#000000").isLightColor();        // false
new Color("#888888").isLightColor(140);     // false

// Invalid thresholds are safely clamped
new Color("#ffffff").isLightColor(999);     // false  (treated as 255)
new Color("#000000").isLightColor(-50);     // false (treated as 0)
```
