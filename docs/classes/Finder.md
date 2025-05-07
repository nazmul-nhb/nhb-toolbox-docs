---
id: Finder
title: Finder
---

Optimized searching utility with support for binary search, fuzzy matching, and smart caching.

## Import

```typescript
import { Finder } from 'nhb-toolbox';
```

## Type Definitions

```typescript
interface FindOptions<T = unknown> {
  fuzzy?: boolean;          // Enable fuzzy matching
  cacheKey?: string;        // Custom cache key
  forceBinary?: boolean;    // Force binary search
  caseInsensitive?: boolean;// Case-insensitive search
  needSorting?: boolean;    // Auto-sort data
  data?: T[] | (() => T[]); // Alternate data source
}

type KeySelector<T> = Extract<OwnKeys<T>, string | number> | ((item: T) => string | number);

type OwnKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K;}[keyof T];
```

## Constructor

```typescript
constructor(data: T[] | (() => T[]), ttl?: number)
```

## Parameters

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `data` | `T[] \| (() => T[])` | Dataset or provider function | - |
| `ttl` | `number` | Cache duration in milliseconds | `300000` (5 min) |

## Available Methods

1. [findAll](Finder/findAll)  - Returns all items matching criteria  
2. [findOne](Finder/findOne) - Returns first item matching criteria  
3. [findOneAsync](Finder/findOneAsync) - Async version of `findOne`  
4. [findAllAsync](Finder/findAllAsync) - Async version of `findAll`  
5. [binarySearch](Finder/binarySearch) - Performs binary search on sorted array  
6. [fuzzySearch](Finder/fuzzySearch) - Performs fuzzy string search  
7. [clearCache](Finder/clearCache) - Clears cached search results  

## Notes

- All methods support caching with configurable TTL
- Search operations are optimized for performance
- Supports both exact and fuzzy matching
- Thread-safe implementation

## See Also

- [Array.search](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/find) - Native array search
