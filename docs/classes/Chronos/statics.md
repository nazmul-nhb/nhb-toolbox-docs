---
id: statics
title: Static Methods
---

<!-- markdownlint-disable-file MD024 -->
## parse()

### Signature

```typescript
static parse(dateStr: string, format: string): Chronos
```

### Parameters

- `dateStr`: Date string to parse
- `format`: Format string

### Return Type

`Chronos` - Parsed date

### Supported Tokens

- `YYYY`, `YY` - Year
- `MM`, `M` - Month
- `DD`, `D` - Day
- `HH`, `H` - Hour
- `mm`, `m` - Minute
- `ss`, `s` - Second

### Example

```javascript
Chronos.parse('15-01-2025', 'DD-MM-YYYY'); // Jan 15 2025
```

---

## today()

### Signature

```typescript
static today(options?: FormatOptions): string
```

### Parameters

- `options`: Formatting options

```typescript
interface FormatOptions {
  format?: string;
  useUTC?: boolean;
}
```

### Return Type

`string` - Formatted current date

### Example

```javascript
Chronos.today({format: 'YYYY-MM-DD'}); // "2025-07-20"
```

## yesterday()

### Signature

```typescript
static yesterday(): Chronos
```

### Return Type

`Chronos` - Yesterday's date

### Example

```javascript
Chronos.yesterday(); // Chronos instance for yesterday
```

---

## tomorrow()

### Signature

```typescript
static tomorrow(): Chronos
```

### Return Type

`Chronos` - Tomorrow's date

### Example

```javascript
Chronos.tomorrow(); // Chronos instance for tomorrow
```

---

## now()

### Signature

```typescript
static now(): number
```

### Return Type

`number` - Current timestamp

### Notes

- Same as `Date.now()`

### Example

```javascript
Chronos.now(); // 1689876543210
```

---

## utc()

### Signature

```typescript
static utc(dateLike: ChronosInput): Chronos
```

### Parameters

- `dateLike`: Date input

### Return Type

`Chronos` - UTC instance

### Example

```javascript
Chronos.utc('2025-01-15'); // UTC instance
```

---

## formatTimePart()

### Signature

 ```ts
static formatTimePart(time: string, format?: TimeParts): string

```

### Parameters

- `time`: Time string to be formatted.Supported formats include:

- `HH:mm` → e.g., `'14:50'`
- `HH:mm:ss` → e.g., `'14:50:00'`
- `HH:mm:ss.mss` → e.g., `'14:50:00.800'`
- `HH:mm+TimeZoneOffset(HH)` → e.g., `'14:50-06'`
- `HH:mm:ss+TimeZoneOffset(HH)` → e.g., `'14:50:00+06'`
- `HH:mm:ss.mss+TimeZoneOffset(HH)` → e.g., `'14:50:00.800-06'`
- `HH:mm+TimeZoneOffset(HH:mm)` → e.g., `'14:50+06:00'`
- `HH:mm:ss+TimeZoneOffset(HH:mm)` → e.g., `'14:50:00+05:30'`
- `HH:mm:ss.mss+TimeZoneOffset(HH:mm)` → e.g., `'14:50:00.800+06:30'`

>*If no offset is provided with time string, local (system) timezone will be used. The current date will be used as the base date for the time internally.*

- `format`: Format string accepted by the `formatStrict()` method for `TimeParts`.
  **Default**: `'hh:mm:ss a'` → e.g., `"02:33:36 pm"`

### Return Type

`string` – Formatted time string in local system time.

### Example

 ```ts
Chronos.formatTimePart('14:50'); 
// "02:50:00 pm"

Chronos.formatTimePart('14:50:00.800+05:30', 'HH:mm:ss');
// "14:50:00"
```

---

## min()

### Signature

```typescript
static min(...dates: ChronosInput[]): Chronos
```

### Parameters

- `dates`: Dates to compare

### Return Type

`Chronos` - Earliest date

### Example

```javascript
Chronos.min('2025-01-01', '2025-02-01'); // Jan 1
```

---

## max()

### Signature

```typescript
static max(...dates: ChronosInput[]): Chronos
```

### Parameters

- `dates`: Dates to compare

### Return Type

`Chronos` - Latest date

### Example

```javascript
Chronos.max('2025-01-01', '2025-02-01'); // Feb 1
```

---

## isLeapYear()

### Signature

```typescript
static isLeapYear(date: ChronosInput): boolean
```

### Parameters

- `date`: Date to check

### Return Type

`boolean` - Whether year is leap

### Example

```javascript
Chronos.isLeapYear(2024); // true
```

---

## isValidDate()

### Signature

```typescript
static isValidDate(value: unknown): value is Date
```

### Parameters

- `value`: Value to check

### Return Type

`boolean` - Whether valid Date

### Example

```javascript
Chronos.isValidDate(new Date()); // true
```

---

## isDateString()

### Signature

```typescript
static isDateString(value: unknown): value is string
```

### Parameters

- `value`: Value to check

### Return Type

`boolean` - Whether valid date string

### Example

```javascript
Chronos.isDateString('2025-01-01'); // true
```

---

## isValidChronos()

### Signature

```typescript
static isValidChronos(value: unknown): value is Chronos
```

### Parameters

- `value`: Value to check

### Return Type

`boolean` - Whether Chronos instance

### Example

```javascript
Chronos.isValidChronos(new Chronos()); // true
```
