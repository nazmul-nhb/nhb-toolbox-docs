---
id: strings
title: String Methods
---

<!-- markdownlint-disable-file MD024 -->

---

## toISOString()

Returns a date as a string value in ISO format (UTC).

### Signature

```typescript
toISOString(): string
```

### Return Type

`string` - Standard ISO 8601 string

### Notes

- Always returns UTC time
- Consistent with native `Date` behavior

### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toISOString();
// "2025-01-01T05:00:00.000Z"
```

---

## toLocalISOString()

Returns ISO time string in appropriate time zone with offset.

### Signature

```typescript
toLocalISOString(): string
```

### Return Type

`string` - ISO string with time zone offset

### Notes

- Similar to [`toISOString()`](#toisostring) but preserves time zone offset

### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toLocalISOString();
// "2025-01-01T00:00:00.000-05:00"
```

---

## toLocaleString()

Wrapper over native `Date` object's `toLocaleString` method with improved type system.

### Signature

```typescript
toLocaleString(locales?: LocalesArguments, options?: DateTimeFormatOptions): string
```

### Parameters

- `locale`: Locale string(s)
- `options`: Enhanced Intl.DateTimeFormat options

#### Type Definitions

```ts
/** Locale arguments for `toLocaleString` method. Includes `BCP47` tags and `Intl.Locale`. */
type LocalesArguments = LocaleCode | Intl.Locale | Array<LocaleCode | Intl.Locale>;

/** Format options for `toLocaleString` method. Extends `Intl.DateTimeFormatOptions `to update `timeZone` option. */
interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
 timeZone?: $TimeZoneIdentifier;
}
```

### Return Type

`string` - Localized date string

### Notes

- Wrapper around native [`Date.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

### Example

```javascript
new Chronos('2025-01-15').toLocaleString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
// "Wednesday, January 15, 2025"
```

---

## toString()

Returns a string representation of a date.

### Signature

```typescript
toString(): string
```

### Return Type

`string` - Date string

### Notes

- Returns localized string representation.
- Includes timezone information when relevant.

### Example

```javascript
new Chronos('2025-01-15').toString();
// "Sun Jan 15 2025 00:00:00 GMT-0500 (Eastern Standard Time)"
```

---

## toJSON()

Enables `JSON.stringify` to show readable output. Calls [**toLocalISOString**](#tolocalisostring) method.

### Signature

```typescript
toJSON(): string
```

### Return Type

`string` - ISO string

### Notes

- Used by `JSON.stringify()`
- Same as `toLocalISOString()`

### Example

```javascript
JSON.stringify({ date: new Chronos('2025-01-15') });
// '{"date":"2025-01-15T06:00:00.000+06:00"}'
```

---

## inspect()

Returns a debug-friendly string for `console.log` or `util.inspect`.

### Signature

```typescript
inspect(): string
```

### Return Type

`string` - Debug-friendly string

### Notes

- Used by `Node.js` `util.inspect`
- Includes `Chronos` prefix

### Example

```javascript
new Chronos('2025-01-15').inspect();
// "[Chronos 2025-01-15T00:00:00.000-05:00]"
```
