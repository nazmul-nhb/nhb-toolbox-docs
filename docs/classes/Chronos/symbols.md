---
id: symbols
title: Symbol Methods
---

<!-- markdownlint-disable-file MD024 -->

## [Symbol.toPrimitive]

### Signature

```ts
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

```ts
+new Chronos(); // timestamp 1746866213184
`${new Chronos()}`; // ISO string 2025-05-10T14:37:20.105+06:00
```

---

## [Symbol.toStringTag]

### Signature

```ts
get [Symbol.toStringTag](): string
```

### Return Type

`string` - String tag

### Notes

- Used by `Object.prototype.toString()`

### Example

```ts
Object.prototype.toString.call(new Chronos()); // [object 2025-05-10T14:34:55.615+06:00]
```

---

## [Symbol.iterator]

### Signature

```ts
*[Symbol.iterator](): IterableIterator<[string, number]>
```

### Return Type

`IterableIterator<[string, number]>` - Date components

### Notes

- Allows destructuring and iteration

### Example

```ts
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

---

## [Symbol.isConcatSpreadable]

### Signature

```typescript
get [Symbol.isConcatSpreadable](): boolean
```

### Return Type

`boolean` - Always returns `true`

### Behavior

- Enables the `Chronos` instance to be spread when used with the spread operator `...`
- Allows `Chronos` objects to be iterated and spread into arrays

### Example

```ts
const chronosInstance = new Chronos('2023-12-31');
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Chronos instance will be spread into the resulting array
console.info([...array1, ...array2, ...chronosInstance]);
// Result: [1, 2, 3, 4, 5, 6, ['year', 2023], ['month', 12], ['date', 31], ...date components]
```

### Notes

- This allows `Chronos` objects to be destructured and spread like arrays
- Useful for extracting all date components into an array
- Returns key-value pairs `[property, value]` for each date component

---

## [Symbol.match]

### Signature

```typescript
[Symbol.match](string: string): RegExpMatchArray | null
```

### Parameters

- `string`: The string to search for date patterns

### Return Type

`RegExpMatchArray | null` - Match result or null if no match found

### Behavior

- Enables `Chronos` instances to be used as regex patterns in string matching
- Supports fuzzy matching of various date and time formats
- Automatically handles both date-only and datetime patterns

### Supported Formats

**Date Formats:**

- `2025-09-01` (standard hyphenated)
- `2025/09/01` (slash separated)
- `20250901` (compact)

**Time Formats:**

- `13:26:00` (colon separated)
- `13.26.00` (dot separated)  
- `132600` (compact)

**Separators:**

- `T` (ISO standard)
- Space
- No separator

### Example

```ts
const chronosInstance = new Chronos('2025-09-01T13:26:00');

// Match various date formats
const text1 = 'Meeting on 2025-09-01';
const text2 = 'Meeting on 2025/09/01';
const text3 = 'Meeting on 20250901';
const text4 = 'Meeting at 2025-09-01T13:26:00';
const text5 = 'Meeting at 2025/09/01 13.26.00';

text1.match(chronosInstance); // ✅ ["2025-09-01"]
text2.match(chronosInstance); // ✅ ["2025/09/01"]  
text3.match(chronosInstance); // ✅ ["20250901"]
text4.match(chronosInstance); // ✅ ["2025-09-01T13:26:00"]
text5.match(chronosInstance); // ✅ ["2025/09/01 13.26.00"]
```

### Notes

- Perfect for log analysis, text processing, and date extraction from strings
- Automatically adapts to match either full datetime or date-only patterns
- Returns `null` if no matching date pattern is found in the string

---
