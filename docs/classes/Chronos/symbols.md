---
id: symbols
title: Symbol Methods
---

<!-- markdownlint-disable-file MD024 -->
> Symbol Methods

## [Symbol.toPrimitive]

### Signature

```typescript
[Symbol.toPrimitive](hint: string): string | number
```

### Parameters

- `hint`: Conversion hint ('number' or 'string')

### Return Type

`string | number` - Primitive value

### Behavior

- `number` hint: Returns timestamp
- Other hints: Returns ISO string

### Example

```javascript
+new Chronos(); // timestamp 1746866213184
`${new Chronos()}`; // ISO string 2025-05-10T14:37:20.105+06:00
```

---

## [Symbol.toStringTag]

### Signature

```typescript
get [Symbol.toStringTag](): string
```

### Return Type

`string` - String tag

### Notes

- Used by `Object.prototype.toString()`

### Example

```javascript
Object.prototype.toString.call(new Chronos()); // [object 2025-05-10T14:34:55.615+06:00]
```

---

## [Symbol.iterator]

### Signature

```typescript
*[Symbol.iterator](): IterableIterator<[string, number]>
```

### Return Type

`IterableIterator<[string, number]>` - Date components

### Notes

- Allows destructuring and iteration

### Example

```javascript
for (const [key, value] of new Chronos()) {
  console.log(key, value);
}
// year 2025
// month 4
// isoMonth 5
// date 10
// weekDay 6
// isoWeekDay 7
// hour 14
// minute 38
// second 9
// millisecond 329
// timestamp 1746866289329
// unix 1746866289
```
