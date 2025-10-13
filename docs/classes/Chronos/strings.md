---
id: strings
title: String Methods
---

<!-- markdownlint-disable-file MD024 -->

---

## toLocalISOString()

### Signature

```typescript
toLocalISOString(): string
```

### Return Type

`string` - ISO string with local offset

### Notes

- Similar to native `toISOString()` but preserves local timezone

### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toLocalISOString();
// "2025-01-01T00:00:00.000-05:00"
```

---

## toISOString()

### Signature

```typescript
toISOString(): string
```

### Return Type

`string` - Standard ISO 8601 string

### Notes

- Always returns UTC time
- Consistent with native Date behavior

### Example

```javascript
new Chronos('2025-01-01T00:00:00-05:00').toISOString();
// "2025-01-01T05:00:00.000Z"
```

---

## toLocaleString()

### Signature

```typescript
toLocaleString(
  locale?: LocaleCode | Intl.Locale | (LocaleCode | Intl.Locale)[],
  options?: Intl.DateTimeFormatOptions
): string
```

### Parameters

- `locale`: Locale string(s)
- `options`: Intl.DateTimeFormat options

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

### Signature

```typescript
toString(): string
```

### Return Type

`string` - Date string

### Notes

- Returns localized string representation.
- Includes timezone information when relevant.
- *If any UTC method is applied before calling this method*, instead of timezone information it will output: `(Coordinated Universal Time)`.

### Example

```javascript
new Chronos('2025-01-15').toString();
// "Sun Jan 15 2025 00:00:00 GMT-0500 (Eastern Standard Time)"
```

---

## toJSON()

### Signature

```typescript
toJSON(): string
```

### Return Type

`string` - ISO string

### Notes

- Used by `JSON.stringify()`
- Same as `toISOString()`

### Example

```javascript
JSON.stringify({ date: new Chronos('2025-01-15') });
// '{"date":"2025-01-15T00:00:00.000Z"}'
```

---

## inspect()

### Signature

```typescript
inspect(): string
```

### Return Type

`string` - Debug-friendly string

### Notes

- Used by Node.js `util.inspect`
- Includes Chronos prefix

### Example

```javascript
new Chronos('2025-01-15').inspect();
// "[Chronos 2025-01-15T00:00:00.000-05:00]"
```
