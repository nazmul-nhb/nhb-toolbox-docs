---
id: Converter
title: Unit Converter - Comprehensive Measurement Conversion
---

## `Converter` & Unit Conversion Classes

The **Unit Converter** system provides a comprehensive solution for converting values between different measurement units across multiple categories including **time**, **length**, **data**, **temperature**, **mass**, **area**, and **volume**.

The system consists of a main `Converter` function and specialized converter classes that automatically handle unit detection and provide type-safe conversion methods.

---

### ✨ Features

- ✅ **Automatic unit detection** based on input unit
- ✅ **Type-safe conversions** with full TypeScript support
- ✅ **Multiple output formats**: compact, scientific, and pluralized
- ✅ **Mathematical operations**: add, subtract, multiply, divide
- ✅ **Batch conversions** with `.toAll()` method
- ✅ **Custom formatting** with decimal control
- ✅ **Comprehensive unit support** across 7 categories
- ✅ **Easy-to-use API** with intuitive methods
- ✅ **Extensible architecture** for future unit categories *(More to come!)*

> More categories and units may be added in future releases based on requirements.

---

### 📦 Import

```ts
// from main package path
import { 
  Converter, 
  converter, // Alias for Converter
  TimeConverter,
  LengthConverter, 
  DataConverter,
  TemperatureConverter,
  MassConverter,
  AreaConverter,
  VolumeConverter
 } from 'nhb-toolbox';

// or from package subpath
import { 
  Converter, 
  converter, // Alias for Converter
  TimeConverter,
  LengthConverter, 
  DataConverter,
  TemperatureConverter,
  MassConverter,
  AreaConverter,
  VolumeConverter
} from 'nhb-toolbox/converter';
```

---

### 🚀 Usage Examples

```ts
// Automatic unit detection
const time = Converter(90, 'minute');
time.to('hour'); // 1.5

const length = Converter(5, 'kilometer');
length.to('mile'); // 3.10686

const temp = Converter(25, 'celsius');
temp.to('fahrenheit'); // 77

// Using the alias
const data = converter(1024, 'megabyte');
data.to('gigabyte'); // 1
```

---

## `Converter` Function

### `Converter(value, unit?)`

The main converter function that automatically detects the unit category and returns the appropriate converter instance.

```ts
function Converter<U extends $Unit>(value: Numeric, unit?: U): Converted<U>
```

#### Parameters

- **`value`** (`Numeric`): The numeric value to convert (number or numeric string)
- **`unit`** (`$Unit`): The source unit (optional for base converter)

#### Returns

- Returns a specialized converter instance based on the unit category:
  - [`$Time`](#timeconverter) for time units
  - [`$Length`](#lengthconverter) for length/distance units  
  - [`$Data`](#dataconverter) for data storage units
  - [`$Temperature`](#temperatureconverter) for temperature units
  - [`$Mass`](#massconverter) for mass/weight units
  - [`$Area`](#areaconverter) for area units
  - [`$Volume`](#volumeconverter) for volume units
  - [`$BaseConverter`](#common-methods-all-converters) for unknown or no units

#### Example

```ts
const timeConv = Converter(3600, 'second');
const lengthConv = Converter(100, 'meter');
const tempConv = Converter(32, 'fahrenheit');

timeConv.to('hour'); // 1
lengthConv.to('kilometer'); // 0.1
tempConv.to('celsius'); // 0
```

---

## Converter Classes

All converter classes share common methods from the base class and provide category-specific conversion capabilities.

### Available Classes

- **`TimeConverter`** - Time units (seconds, minutes, hours, days, etc.)
- **`LengthConverter`** - Length/distance units (meters, feet, miles, etc.)
- **`DataConverter`** - Data storage units (bytes, kilobytes, megabytes, etc.)
- **`TemperatureConverter`** - Temperature units (celsius, fahrenheit, kelvin)
- **`MassConverter`** - Mass/weight units (grams, kilograms, pounds, etc.)
- **`AreaConverter`** - Area units (square meters, acres, hectares, etc.)
- **`VolumeConverter`** - Volume units (liters, gallons, cubic meters, etc.)

---

## Common Methods (All Converters)

All converter instances inherit these methods from the base class:

### `to(targetUnit)`

Convert to a specific target unit.

:::danger[Warning]
Not available in `$BaseConverter`
:::

```ts
Converter(60, 'minute').to('hour'); // 1
Converter(1000, 'meter').to('kilometer'); // 1
Converter(1024, 'kilobyte').to('megabyte'); // 1
```

### `toAll()`

Convert to all available units in the category.

:::danger[Warning]
Not available in `$BaseConverter`
:::

```ts
const time = Converter(90, 'minute');
const all = time.toAll();
// {
//   nanosecond: 5400000000000,
//   microsecond: 5400000000,
//   millisecond: 5400000,
//   second: 5400,
//   minute: 90,
//   hour: 1.5,
//   // ... and more
// }
```

### `formatTo(targetUnit, options?)`

:::danger[Warning]
Not available in `$BaseConverter`
:::

Format the converted value with various styling options.

```ts
const length = Converter(5.25, 'kilometer');

length.formatTo('mile'); // "3.26 miles"
length.formatTo('mile', { style: 'compact' }); // "3.26mi"
length.formatTo('mile', { style: 'scientific', decimals: 4 }); //  "3.2622e+0 mile"
```

#### `FormatToOptions`

| Property       | Type                                    | Description              | Default    |
| -------------- | --------------------------------------- | ------------------------ | ---------- |
| **`style`**    | `'compact' \| 'scientific' \| 'plural'` | Output style             | `'plural'` |
| **`decimals`** | `number`                                | Number of decimal places | `2`        |

### `valueOf()` / `getValue()`

Get the raw numeric value.

:::tip
Internally used by JS engines to coerce to number
:::

```ts
const conv = Converter(5, 'hour');
conv.valueOf(); // 5
conv.getValue(); // 5
```

### `getUnit()`

Get the current unit.

```ts
Converter(5, 'hour').getUnit(); // "hour"
```

### `toString()`

Get formatted string with pluralization.

:::tip
Internally used by JS engines to coerce to string
:::

```ts
Converter(2.5, 'hour').toString(); // "2.5 hours"
Converter(1, 'minute').toString(); // "1 minute"
```

### `format(decimals?)`

Format the current value with pluralization.

```ts
Converter(2.567, 'hour').format(1); // "2.6 hours"
```

### `supportedUnits(category?)`

Get all supported units, optionally filtered by category.

```ts
Converter(1, 'hour').supportedUnits(); // All units across all categories as array
Converter(1, 'hour').supportedUnits('time'); // Only tuple time units
```

### `toObject()`

Get object representation.

```ts
Converter(2.5, 'hour').toObject(); // { value: 2.5, unit: "hour" }
```

### `toJSON()`

Get JSON string representation.

:::tip
Internally used by JS engines to for JSON serialization
:::

```ts
Converter(2.5, 'hour').toJSON(); // '{"value":2.5,"unit":"hour"}'
```

### Mathematical Operations

All converters support mathematical operations that return new instances:

```ts
const time = Converter(1, 'hour');

time.add(30).toString(); // "31 hours" (assumes same unit)
time.subtract(15).toString(); // "14 hours"
time.multiply(2).toString(); // "2 hours"  
time.divide(4).toString(); // "0.25 hours"
```

#### `abs()`

Get absolute value.

```ts
Converter(-5, 'hour').abs().toString(); // "5 hours"
```

#### `round(decimals?)`

Round to specified decimal places.

```ts
Converter(1.2345, 'hour').round(2).toString(); // "1.23 hours"
```

### Comparison Methods

```ts
const time = Converter(2, 'hour');

time.gt(1); // true
time.lt(3); // true  
time.eq(2); // true
```

---

## Category-Specific Details

### `TimeConverter`

**Units**: `nanosecond`, `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `decade`, `century`, `millennium`

**Base Unit**: `second`

```ts
const time = Converter(90, 'minute');
time.to('hour'); // 1.5
time.formatTo('day', { style: 'compact' }); // "0.06d"
```

### `LengthConverter`

**Units**: `millimeter`, `centimeter`, `meter`, `kilometer`, `inch`, `foot`, `yard`, `mile`, `nautical-mile`, `light-year` (both US and UK spellings)

**Base Unit**: `meter`

```ts
const length = Converter(5, 'kilometer');
length.to('mile'); // 3.1068559611866697
length.formatTo('foot', { style: 'plural' }); // "16404.2 feet"
```

### `DataConverter`

**Units**: `bit`, `byte`, `kilobit`, `kilobyte`, `megabit`, `megabyte`, `gigabit`, `gigabyte`, `terabit`, `terabyte`, `petabit`, `petabyte`

**Base Unit**: `byte`

```ts
const data = Converter(1024, 'kilobyte');
data.to('megabyte'); // 1
data.formatTo('gigabyte', { style: 'compact' }); // "0GB"
```

### `TemperatureConverter`

**Units**: `celsius`, `fahrenheit`, `kelvin`

**Special Notes**: Temperature conversions use specific formulas rather than multiplication factors.

```ts
const temp = Converter(25, 'celsius');
temp.to('fahrenheit'); // 77
temp.to('kelvin'); // 298.15
temp.formatTo('fahrenheit', { style: 'compact' }); // "77°F"
```

### `MassConverter`

**Units**: `microgram`, `milligram`, `gram`, `kilogram`, `tonne`, `ounce`, `pound`, `stone`, `short-ton`, `long-ton`

**Base Unit**: `kilogram`

```ts
const mass = Converter(1, 'kilogram');
mass.to('pound'); // 2.2046226218487757
mass.formatTo('ounce', { decimals: 0 }); // "35 ounces"
```

### `AreaConverter`

**Units**: `square-millimeter`, `square-centimeter`, `square-meter`, `square-kilometer`, `square-inch`, `square-foot`, `square-yard`, `square-mile`, `hectare`, `acre` (both US and UK spellings)

**Base Unit**: `square-meter`

```ts
const area = Converter(1, 'hectare');
area.to('acre'); // 2.471053814671653
area.formatTo('square-meter', { style: 'scientific' }); // "1.00e+4 square-meter"
```

### `VolumeConverter`

**Units**: `cubic-millimeter`, `cubic-centimeter`, `cubic-meter`, `cubic-kilometer`, `cubic-inch`, `cubic-foot`, `cubic-yard`, `liter`, `milliliter`, `gallon`, `quart`, `pint`, `cup`, `tablespoon`, `teaspoon` (both US and UK spellings)

**Base Unit**: `cubic-meter`

```ts
const volume = Converter(1, 'liter');
volume.to('gallon'); // 0.2641720523581484
volume.formatTo('milliliter', { style: 'compact' }); // "1000mL"
```

---

## Type Definitions

```ts
/** - Type for Record of Units */ 
type UnitsRecord = typeof UNITS;

/** * Category of units supported by the converter. */
type Category = keyof UnitsRecord;

/** * Map of unit categories to their respective units. */
type UnitMap = {
 [Key in Category]: UnitsRecord[Key][number];
};

/** * Union type of all supported units. May include any other strings. */
type $Unit = LooseLiteral<UnitMap[Category]>;

/** * Type for array of all Units */
type Units = Array<UnitMap[Category]>;

/** * Tuple type for Units in a specific Category */
type UnitsTuple<Cat extends Category> = Mutable<UnitsRecord[Cat]>;

/** * Infer the category of a given unit type `U`. */
type InferCategory<U extends $Unit> = {
 [K in Category]: U extends UnitMap[K] ? K : never;
}[Category];

/** * Infer Units belong to a specific Category */
type CategoryUnits<Cat extends Category> = UnitMap[Cat];

/** * Type for the returned converter instance based on the provided unit `U`. */
type Converted<U extends $Unit> =
 InferCategory<U> extends never ? $BaseConverter<U>
 : InferCategory<U> extends 'area' ? $Area
 : InferCategory<U> extends 'time' ? $Time
 : InferCategory<U> extends 'length' ? $Length
 : InferCategory<U> extends 'mass' ? $Mass
 : InferCategory<U> extends 'data' ? $Data
 : InferCategory<U> extends 'temp' ? $Temperature
 : InferCategory<U> extends 'volume' ? $Volume
 : $BaseConverter<U>;

/** * Options for formatting converted values for unit converter method(s). */
type FormatToOptions = {
 /** Style of formatting. Default is `'plural'`. */
 style?: 'compact' | 'scientific' | 'plural';
 /** Number of decimal places to include. Default is `2`. */
 decimals?: number;
};

/** Union type for all the area units */
type $AreaUnit = UnitMap['area'];
/** Union type for all the data units */
type $DataUnit = UnitMap['data'];
/** Union type for all the length/distance units */
type $LengthUnit = UnitMap['length'];
/** Union type for all the mass units */
type $MassUnit = UnitMap['mass'];
/** Union type for all the temperature units */
type $TempUnit = UnitMap['temp'];
/** Union type for all the time units */
type $TimeUnit = UnitMap['time'];
/** Union type for all the volume units */
type $VolumeUnit = UnitMap['volume'];
```

---

## Notes & Limitations

### ⚠️ Important Notes

1. **Unit Detection**: The converter automatically detects the category based on the provided unit string. Unknown units will use the base converter.

2. **Mathematical Operations**: Operations like `add()`, `subtract()`, etc. assume the same unit and return new instances rather than modifying the original.

3. **Pluralization**: The automatic pluralization adds `"s"` for values > 1. For complex pluralization needs, consider using the shared [`pluralizer`](/docs/utilities/string/pluralizer) instance of/or [`Pluralizer`](/docs/classes/Pluralizer) class.

4. **Temperature Conversions**: Temperature uses special conversion formulas rather than multiplicative factors due to the different scales.

5. **Precision**: Conversions may have minor precision limitations in few cases with very large or very small values due to floating-point arithmetic.

### 💡 Best Practices

- Use TypeScript for full type safety and autocomplete support
- Chain operations for complex calculations:

  ```ts
  Converter('90', 'minute').add('30').to('hour'); // 2
  ```

- Use `.toAll()` when you need multiple conversions for display purposes
- Prefer `.formatTo()` for user-facing outputs with proper labeling

### 🛡️ Error Handling

- Invalid numeric values will be converted to `NaN`
- Unknown units will use the base converter with limited functionality
- Mathematical operations on `NaN` values will propagate the `NaN`

---

## Summary

The **Unit Converter** system provides a robust, type-safe solution for measurement conversions across multiple categories. Use the main `Converter` function for automatic unit detection or *instantiate specific converter classes directly* when you know the category in advance.
