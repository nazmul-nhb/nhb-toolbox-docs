---
id: temperature-conversions
title: Temperature Conversion Methods
---

<!-- markdownlint-disable-file MD024 -->
## celsiusToFahrenheit()

### Signature

```typescript
static celsiusToFahrenheit(c: number): number
```

### Return Type

`number` - Fahrenheit equivalent

### Formula

`(c * 9/5) + 32`

### Example

```javascript
Unit.celsiusToFahrenheit(0); // 32
```

## fahrenheitToCelsius()

### Signature

```typescript
static fahrenheitToCelsius(f: number): number
```

### Return Type

`number` - Celsius equivalent

### Formula

`(f - 32) * 5/9`

### Example

```javascript
Unit.fahrenheitToCelsius(32); // 0
```

## celsiusToKelvin()

### Signature

```typescript
static celsiusToKelvin(c: number): number
```

### Return Type

`number` - Kelvin equivalent

### Formula

`c + 273.15`

### Example

```javascript
Unit.celsiusToKelvin(0); // 273.15
```

## kelvinToCelsius()

### Signature

```typescript
static kelvinToCelsius(k: number): number
```

### Return Type

`number` - Celsius equivalent

### Formula

`k - 273.15`

### Example

```javascript
Unit.kelvinToCelsius(273.15); // 0
```

## fahrenheitToKelvin()

### Signature

```typescript
static fahrenheitToKelvin(f: number): number
```

### Return Type

`number` - Kelvin equivalent

### Formula

`((f - 32) * 5/9) + 273.15`

### Example

```javascript
Unit.fahrenheitToKelvin(32); // 273.15
```

## kelvinToFahrenheit()

### Signature

```typescript
static kelvinToFahrenheit(k: number): number
```

### Return Type

`number` - Fahrenheit equivalent

### Formula

`((k - 273.15) * 9/5) + 32`

### Example

```javascript
Unit.kelvinToFahrenheit(273.15); // 32
```
