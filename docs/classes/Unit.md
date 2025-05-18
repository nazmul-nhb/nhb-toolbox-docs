---
id: Unit
title: Unit - Convert between units
---

<!-- markdownlint-disable-file MD024 -->
## API Reference for Unit

This documentation provides complete coverage of the Unit class, a comprehensive unit conversion utility that supports conversions between various measurement systems.

## Table of Contents

- [Constructor](#constructor)
- [Instance Methods](Unit/instance-methods)
- Static Conversion Methods
  - [Length Conversions](Unit/length-conversions)
  - [Mass/Weight Conversions](Unit/mass-weight)
  - [Temperature Conversions](Unit/temperature-conversions)
  - [Volume Conversions](Unit/volume-conversions)
  - [Area Conversions](Unit/area-conversions)
  - [Speed Conversions](Unit/speed-conversions)
  - [Time Conversions](Unit/time-conversions)
  - [Digital Storage Conversions](Unit/digital-storage)
  - [Power Conversions](Unit/power-conversions)
  - [Energy Conversions](Unit/energy-conversions)
  - [Pressure Conversions](Unit/pressure-conversions)
  - [Frequency Conversions](Unit/frequency-conversions)
- [Type Definitions](#type-definitions)

---

## Constructor

### Signature

```typescript
constructor(value: number, unit?: UnitKey)
```

### Parameters

- `value`: Numeric value to convert
- `unit`: Optional unit type (e.g., 'kg', 'm', 'kb')

### Behavior

- Stores value and unit for instance methods
- Unit parameter is optional for generic conversions

### Example

```javascript
new Unit(100, 'kg'); // 100 kilograms
new Unit(32, 'F');   // 32 degrees Fahrenheit
```

---

## Type Definitions

### UnitKey

```typescript
type UnitKey = keyof typeof UNITS;
```

Supported unit abbreviations (e.g., 'kg', 'm', 'F')

### UnitLabel

```typescript
type UnitLabel = (typeof UNITS)[UnitKey];
```

Full names of units (e.g., 'Kilogram', 'Meter')

### SIPrefix

```typescript
type SIPrefix = keyof typeof PREFIX_MULTIPLIERS;
```

Scientific prefixes (e.g., 'k', 'm', 'M')

### UnitNumberMethods

```typescript
type UnitNumberMethods = {
  [K in keyof typeof Unit]: (typeof Unit)[K] extends (
    (value: number) => number
  ) ? K : never;
}[keyof typeof Unit];
```

Type-safe names of static conversion methods

### UNITS

```typescript
const UNITS = {
  // Length
  m: 'Meter',
  km: 'Kilometer',
  // ...etc
};
```

Mapping of unit abbreviations to full names

### PREFIX_MULTIPLIERS

```typescript
const PREFIX_MULTIPLIERS = {
  y: 1e-24,
  z: 1e-21,
  // ...etc
};
```

Scientific prefix multipliers
