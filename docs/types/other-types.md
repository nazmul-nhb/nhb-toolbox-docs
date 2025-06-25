---
id: common-types  
title: Common Type Definitions  
sidebar_label: Common Types  
---

## Primitive Types

### `Any`  

```ts
let dynamicValue: Any = "can be anything";  
```  

- Escape hatch type equivalent to `any`  

### `Numeric`  

```ts
const num: Numeric = 42;       // Valid  
const strNum: Numeric = "42";  // Also valid  
```  

- Represents numbers or numeric strings

### `Percent`

```ts
const percent: Percent = 50 // only 0-100
```

- Number value in percentage `(0% - 100%)` without `%` symbol.

### `Primitive`  

```ts
type AllPrimitives = string | number | boolean | symbol | bigint | null | undefined;  
```  

- Union of all JavaScript primitive types  

### `NormalPrimitive`  

```ts
type BasicTypes = string | number | boolean | null | undefined;  
```  

- Common primitives excluding symbols and bigints  

### `FalsyPrimitive`  

```ts
const falsyValues: FalsyPrimitive[] = [false, 0, "", null, undefined];  
```  

- All falsy primitive values  

## Function Types  

### `Constructor`  

```ts
class User {}  
type UserConstructor = Constructor<User>;  
```  

- Represents class constructor signature  

### `GenericFn`  

```ts
const callback: GenericFn = (a, b) => console.log(a, b);  
```  

- Generic function signature  

### `VoidFunction`  

```ts
const onClick: VoidFunction = () => console.log("Clicked");  
```  

- Function that returns void  

### `AsyncFunction<T>`  

```ts
const fetchData: AsyncFunction<User[]> = async () => [];  
```  

- Async function returning Promise

## Time & Date Types  

### `ClockHour`, `ClockMinute`, `ClockSecond`  

```ts
const hour: ClockHour = "23";    // "00" to "23"  
const minute: ClockMinute = "59"; // "00" to "59"  
```  

- Strictly typed time components  

### `ClockTime`  

```ts
const meetingTime: ClockTime = "14:30";  
```  

- Time in "HH:MM" format  

### `TimeUnit`  

```ts
const unit: TimeUnit = "hour";  // "year" | "month" | "day" etc.  
```  

- Valid time measurement units  

### `ChronosInput`  

```ts
const inputs: ChronosInput[] = [new Date(), "2023-01-01", 1672531200000];  
```  

- Valid input types for Chronos constructor  

## Color Types  

### `Hex`, `Hex6`, `Hex8`  

```ts
const primary: Hex6 = "#3C6945";  
const translucent: Hex8 = "#3C6945AA";  
```  

- Hexadecimal color formats  

### `RGB`, `RGBA`  

```ts
const red: RGB = "rgb(255, 0, 0)";  
const semiRed: RGBA = "rgba(255, 0, 0, 0.5)";  
```  

- Red-Green-Blue color formats  

### `HSL`, `HSLA`  

```ts
const blue: HSL = "hsl(240, 100%, 50%)";  
const semiBlue: HSLA = "hsla(240, 100%, 50%, 0.5)";  
```  

- Hue-Saturation-Lightness formats  

### `ColorType`  

```ts
const colors: ColorType[] = ["#FFFFFF", "rgb(255,255,255)", "hsl(0,0%,100%)"];  
```  

- Union of all color formats  

### `CSSColor`

CSS named color, also includes different response colors

```ts
"black" | "silver" | "gray" | "white" | "maroon" | "red" | "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow" | "navy" | "blue" | "teal" | "aqua" | "aliceblue" | "antiquewhite" | ... | "error" // etc.
```

## Internationalization  

### `CurrencyCode`  

```ts
const currencies: CurrencyCode[] = ["USD", "EUR", "JPY"];  
```  

- ISO 4217 currency codes  

### `LocaleCode`  

```ts
const locales: LocaleCode[] = ["en-US", "fr-FR", "ja-JP"];  
```  

- BCP 47 locale codes  

## Utility Object Types  

### `StrictObject`, `GenericObject`  

```ts
const strict: StrictObject = { id: 123 }; // Unknown values  
const generic: GenericObject = { id: 123 }; // Any values  
```  

- Typed vs untyped object records  

### `QueryObject`  

```ts
const query: QueryObject = {  
  name: "John",  
  filters: ["active", "verified"]  
};  
```  

- Nested query parameter structure
