---
id: findOneAsync
title: Find One Async
---

## findOneAsync()

Asynchronously finds the first matching item using the same search strategies as `findOne()`.

### Signature

```ts
async findOneAsync(
  supplier: () => Promise<T[]>,
  matcher: string | number,
  keySelector: KeySelector<T>,
  options?: Omit<FindOptions<T>, 'data'>
): Promise<T | undefined>
```

### Parameters

| Parameter     | Type                           | Description                       |
| ------------- | ------------------------------ | --------------------------------- |
| `supplier`    | `() => Promise<T[]>`           | Async function providing the data |
| `matcher`     | `string \| number`             | Value to match against            |
| `keySelector` | `KeySelector<T>`               | Property name or value extractor  |
| `options`     | `Omit<FindOptions<T>, 'data'>` | Search configuration              |

### Returns

`Promise<T | undefined>` - First matching item or undefined

### Description

This method provides an async interface to `findOne()`, useful when:

- Data needs to be loaded asynchronously
- Working with dynamic datasets
- Integrating with async data sources

### Examples

#### Basic Async Search

```ts
const result = await finder.findOneAsync(
  () => fetchUsersFromAPI(),
  'admin',
  'role'
);
```

#### With Caching

```ts
const user = await finder.findOneAsync(
  () => db.query('SELECT * FROM users'),
  'john@example.com',
  'email',
  { cacheKey: 'john-search' }
);
```

### Notes

- Inherits all search behaviors from `findOne()`
- Supports same caching and matching options
- Automatically awaits data before searching
- Rejects if supplier throws an error

### See Also

- [findOne](findOne) - Synchronous version
- [findAllAsync](findAllAsync) - Find all matches async
- [Finder](../Finder) - Class overview
