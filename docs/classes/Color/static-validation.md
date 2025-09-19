---
id: static-validation
title: Static Validation Checks
---

<!-- markdownlint-disable-file MD024 -->

:::info[Note]
Please refer to the color types here: [`Color Types`](/docs/classes/Color#type-definitions) to understand the color types used in the examples below.
:::

### `isHex6()`

#### Signature

```typescript
static isHex6(color: string): color is Hex6
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid Hex6.  

#### Example

```ts
Color.isHex6("#ff5733"); // true
Color.isHex6("#ff573"); // false
```  

---

### `isHex8()`

#### Signature

```typescript
static isHex8(color: string): color is Hex8
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid Hex8.  

#### Example

```ts
Color.isHex8("#ff573380"); // true
Color.isHex8("#ff5733"); // false
```  

---

### `isRGB()`

#### Signature

```typescript
static isRGB(color: string): color is RGB
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid RGB.  

#### Example

```ts
Color.isRGB("rgb(255, 87, 51)"); // true
Color.isRGB("rgb(256, 87, 51)"); // false (invalid red value)
```  

---

### `isRGBA()`

#### Signature

```typescript
static isRGBA(color: string): color is RGBA
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid RGBA.  

#### Example

```ts
Color.isRGBA("rgba(255, 87, 51, 0.5)"); // true
Color.isRGBA("rgba(255, 87, 51, 1.5)"); // false (invalid alpha)
```  

---

### `isHSL()`

#### Signature

```typescript
static isHSL(color: string): color is HSL
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid HSL.  

#### Example

```ts
Color.isHSL("hsl(14, 100%, 60%)"); // true
Color.isHSL("hsl(14, 150%, 60%)"); // false (invalid saturation)
```  

---

### `isHSLA()`

#### Signature

```typescript
static isHSLA(color: string): color is HSLA
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if valid HSLA.  

#### Example

```ts
Color.isHSLA("hsla(14, 100%, 60%, 0.5)"); // true
Color.isHSLA("hsla(14, 100%, 60%, 2)"); // false (invalid alpha)
```  

---

### `isCSSColor()`

#### Signature

```typescript
static isCSSColor(color: string): color is CSSColor
```  

#### Parameters

- `color`: The string to validate.  

#### Return Type

`boolean` – `true` if a valid CSS color name.  

#### Example

```ts
Color.isCSSColor("rebeccapurple"); // true
Color.isCSSColor("#ff5733"); // false
```  
