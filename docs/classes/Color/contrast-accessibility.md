---
id: contrast-accessibility
title: Contrast & Accessibility Methods
---

<!-- markdownlint-disable-file MD024 -->

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

```typescript
isLightColor(): boolean
```  

#### Return Type

`boolean` – `true` if the color is light (perceived brightness > 50%).  

#### Example

```ts
new Color("#ffffff").isLightColor(); // true
new Color("#000000").isLightColor(); // false
```  
