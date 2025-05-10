---
id: symbols
title: Symbol Methods
---

<!-- markdownlint-disable-file MD024 -->
## Symbol Methods

### [Symbol.toPrimitive]

#### Signature

```typescript
[Symbol.toPrimitive](hint: string): string | number
```

#### Parameters

- `hint`: Conversion hint ('number' or 'string')

#### Return Type

`string | number` - Primitive value

#### Behavior

- `number` hint: Returns timestamp
- Other hints: Returns ISO string

#### Example

```javascript
+new Chronos(); // timestamp
`${new Chronos()}`; // ISO string
```

### [Symbol.toStringTag]

#### Signature

```typescript
get [Symbol.toStringTag](): string
```

#### Return Type

`string` - String tag

#### Notes

- Used by `Object.prototype.toString()`

#### Example

```javascript
Object.prototype.toString.call(new Chronos()); // "[object Chronos]"
```

### [Symbol.iterator]

#### Signature

```typescript
*[Symbol.iterator](): IterableIterator<[string, number]>
```

#### Return Type

`IterableIterator<[string, number]>` - Date components

#### Notes

- Allows destructuring and iteration

#### Example

```javascript
for (const [key, value] of new Chronos()) {
  console.log(key, value);
}
// "year" 2025
// "month" 0
// ...
```
