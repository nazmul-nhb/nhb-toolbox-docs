---
id: instance-methods
title: Instance Unit Methods
---

<!-- markdownlint-disable-file MD024 -->
### toString()

#### Signature

```typescript
toString(): string
```

#### Return Type

`string` - Formatted "value unit" string

#### Notes

- Omits unit if not provided in constructor

#### Example

```javascript
new Unit(100, 'kg').toString(); // "100 kg"
new Unit(100).toString();       // "100"
```

### convertByPrefix()

#### Signature

```typescript
convertByPrefix(fromPrefix: SIPrefix, toPrefix: SIPrefix): number
```

#### Parameters

- `fromPrefix`: Source SI prefix (e.g., 'k', 'm')
- `toPrefix`: Target SI prefix (e.g., 'M', '')

#### Return Type

`number` - Converted value

#### Example

```javascript
new Unit(1000).convertByPrefix('', 'k'); // 1 (1000 → 1k)
```

### convertFromTo()

#### Signature

```typescript
convertFromTo(from: string, to: string): number
```

#### Parameters

- `from`: Source unit with prefix (e.g., 'kg', 'cm')
- `to`: Target unit with prefix (e.g., 'g', 'm')

#### Return Type

`number` - Converted value

#### Notes

- Units must be of same type (e.g., both length)

#### Example

```javascript
new Unit(1).convertFromTo('km', 'm'); // 1000
```

### convert()

#### Signature

```typescript
convert(methodName: UnitNumberMethods): number
```

#### Parameters

- `methodName`: Name of static conversion method

#### Return Type

`number` - Converted value

#### Notes

- Provides type-safe method selection

#### Example

```javascript
new Unit(100, 'kg').convert('kgToLbs'); // 220.462
```
