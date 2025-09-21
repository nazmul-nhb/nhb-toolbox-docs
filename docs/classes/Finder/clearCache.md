---
id: clearCache
title: Clear Cache
---

## clearCache()

Manages the internal cache of search results by either clearing a specific cache entry or purging all cached data.

### Signature

```typescript
clearCache(key?: string): void
```

### Description

The `clearCache` method provides precise control over the Finder instance's caching mechanism. It allows you to:

- Clear all cached search results (global cache clearance)
- Remove a specific cache entry by its key (targeted clearance)
- Maintain optimal memory usage by removing stale cache entries

Cache management is particularly useful when:

- The underlying dataset changes and cached results become invalid
- You need to free up memory by removing cached data
- Implementing time-sensitive data updates

### Parameters

| Name  | Type     | Required    | Description                                                                |
| ----- | -------- | ----------- | -------------------------------------------------------------------------- |
| `key` | `string` | ❌ Optional | The specific cache key to remove. When omitted, clears all cached results. |

### Examples

#### Clearing All Cached Results

```typescript
const productFinder = new Finder(products);
// ... perform several searches ...

// Clear entire cache when products update
productFinder.clearCache();
```

#### Removing Specific Cache Entry

```typescript
const userFinder = new Finder(users);

// Search with specific cache key
userFinder.findAll('admin', 'role', { cacheKey: 'admin-users' });

// Later, clear just this cached result
userFinder.clearCache('admin-users');
```

#### Cache Management Pattern

```typescript
class DataService {
  private finder = new Finder(data);
  
  async refreshData() {
    // Clear cache before updating
    this.finder.clearCache();
    const newData = await fetchLatestData();
    this.finder = new Finder(newData);
  }
}
```

### Performance Notes

1. **Operation Speed**:
   - Clearing by key: O(1) operation
   - Clearing all: O(n) operation (where n is number of cache entries)

2. **Memory Impact**:
   - Immediately frees memory used by cleared cache entries
   - No impact on original dataset

3. **Thread Safety**:
   - Cache operations are synchronous and thread-safe
   - Concurrent calls are automatically queued

### Best Practices

1. Use specific cache keys when you need granular control over cache invalidation
2. Prefer targeted clearance over global clearance when possible
3. Consider automatic cache clearing when underlying data changes
4. For long-running applications, implement periodic cache clearance

### See Also

- [Finder](../Finder#constructor) - Cache TTL configuration
- [findAll](findAll) - Caching search results
- [findOne](findOne) - Cached single-result search
