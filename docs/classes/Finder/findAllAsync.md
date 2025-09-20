---
id: findAllAsync
title: Find All Async
---

## findAllAsync()

Asynchronously retrieves all items matching the specified criteria, supporting the same search strategies as `findAll`.

### Signature

```typescript
async findAllAsync(
  supplier: () => Promise<T[]>,
  matcher: string | number,
  keySelector: KeySelector<T>,
  options?: Omit<FindOptions<T>, 'data'>
): Promise<T[]>
```

### Parameters

| Parameter     | Type                           | Description                                    |
| ------------- | ------------------------------ | ---------------------------------------------- |
| `supplier`    | `() => Promise<T[]>`           | Async function providing the dataset           |
| `matcher`     | `string \| number`             | Value to match against                         |
| `keySelector` | `KeySelector<T>`               | Property or function to extract comparison key |
| `options`     | `Omit<FindOptions<T>, 'data'>` | Search configuration (excluding `data` field)  |

### Returns

`Promise<T[]>` - Array of all matching items (empty if none found)

### Description

This method provides an asynchronous interface to `findAll`, with identical search behavior but with support for:

- Promise-based data loading
- Dynamic dataset updates
- Asynchronous data sources

### Examples

#### Basic Usage

```typescript
const products = await productFinder.findAllAsync(
  () => fetchProductsFromAPI(),
  'laptop',
  'category'
);
```

#### With Custom Options

```typescript
const users = await userFinder.findAllAsync(
  async () => getUsersFromDatabase(),
  'admin',
  'role',
  {
    fuzzy: true,
    cacheKey: 'admin-users'
  }
);
```

### Behavior

1. **Data Loading**: First awaits the supplier function
2. **Search Execution**: Delegates to `findAll` with the resolved data
3. **Result Handling**: Returns all matches (empty array if none)

### Notes

- Inherits all search behavior from `findAll`
- Supports the same caching and matching options
- Automatically handles promise resolution
- Rejects if supplier throws an error

### See Also

- [findAll](findAll) - Synchronous version
- [findOneAsync](findOneAsync) - Async single-item search
- [Finder](../Finder) - Class documentation
