---
id: local-storage
title: Local Storage Utilities
---

<!-- markdownlint-disable-file MD024 -->

A simple set of utilities to interact safely and conveniently with the browser's [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Handles storing, retrieving, and removing typed items with support for custom serialization.

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Import

```typescript
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from 'nhb-toolbox';
```

---

## getFromLocalStorage

**Type-safe getter for items stored in local storage with custom deserialization support.**

```typescript
function getFromLocalStorage<T>(key: string, deserialize?: Deserializer<T>): T | null
```

### Usage Examples

<Tabs>
<TabItem value="Basic String" label="String Value">

```typescript
// Given: localStorage.setItem('theme', JSON.stringify('dark'))
const theme = getFromLocalStorage<string>('theme');
// Returns: 'dark'
```

</TabItem>
<TabItem value="Object" label="Object Value">

```typescript
// Given: localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Jane'}))
const user = getFromLocalStorage<{ id: number; name: string }>('user');
// Returns: { id: 1, name: 'Jane' }
```

</TabItem>
<TabItem value="Custom Deserializer" label="Custom Deserialization">

```typescript
// Handle Date objects properly
const user = getFromLocalStorage<{ name: string; createdAt: Date }>(
  'user',
  (value: string) => {
    const parsed = JSON.parse(value);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt)
    };
  }
);
```

</TabItem>
<TabItem value="Not found" label="Nonexistent Key">

```typescript
const value = getFromLocalStorage<string>('nonexistent');
// Returns: null
```

</TabItem>
</Tabs>

### Parameters

| Name        | Type              | Description                                                                            |
| ----------- | ----------------- | -------------------------------------------------------------------------------------- |
| key         | `string`          | The key for the local storage item.                                                    |
| deserialize | `Deserializer<T>` | Optional function to convert stored string back to type `T`. Defaults to `JSON.parse`. |

### Returns

- The parsed value if it exists and can be parsed.
- `null` if the key does not exist or parsing fails.

---

## saveToLocalStorage

**Stores values in local storage with custom serialization support.**

```typescript
function saveToLocalStorage<T>(key: string, value: T, serialize?: Serializer<T>): void
```

### Usage Examples

<Tabs>
<TabItem value="Basic" label="Store Primitive">

```typescript
saveToLocalStorage('count', 5);
// localStorage entry: { count: "5" }
```

</TabItem>
<TabItem value="Object" label="Store Object">

```typescript
saveToLocalStorage('session', { token: 'abc', expires: 123456 });
// localStorage entry: { session: '{"token":"abc","expires":123456}' }
```

</TabItem>
<TabItem value="Custom Serializer" label="Custom Serialization">

```typescript
// Handle Date objects and custom formatting
saveToLocalStorage(
  'user',
  { name: 'John', createdAt: new Date('2023-01-01') },
  (value) => JSON.stringify({
    ...value,
    createdAt: value.createdAt.toISOString() // Convert Date to ISO string
  })
);
```

</TabItem>
</Tabs>

### Parameters

| Name      | Type            | Description                                                                 |
| --------- | --------------- | --------------------------------------------------------------------------- |
| key       | `string`        | The key under which to store the value.                                     |
| value     | `T`             | The value to store.                                                         |
| serialize | `Serializer<T>` | Optional function to convert value to string. Defaults to `JSON.stringify`. |

---

## removeFromLocalStorage

**Removes an item from local storage.**

```typescript
function removeFromLocalStorage(key: string): void
```

### Usage Examples

```typescript
removeFromLocalStorage('theme');
// Removes 'theme' from local storage. No effect if not existing.
```

### Parameters

| Name | Type   | Description                           |
| ---- | ------ | ------------------------------------- |
| key  | string | The key to remove from local storage. |

---

## Advanced Serialization Examples

### Complex Object with Dates

```typescript
interface User {
  id: number;
  name: string;
  createdAt: Date;
  preferences: Map<string, boolean>;
}

// Save with custom serialization
saveToLocalStorage<User>(
  'current-user',
  user,
  (value) => JSON.stringify({
    ...value,
    createdAt: value.createdAt.toISOString(),
    preferences: Array.from(value.preferences.entries())
  })
);

// Retrieve with custom deserialization
const savedUser = getFromLocalStorage<User>(
  'current-user',
  (value) => {
    const parsed = JSON.parse(value);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      preferences: new Map(parsed.preferences)
    };
  }
);
```

### Custom Data Format

```typescript
// Save as CSV-like format
saveToLocalStorage<number[]>(
  'scores',
  [95, 87, 92],
  (value) => value.join(',')
);

// Parse CSV-like format
const scores = getFromLocalStorage<number[]>(
  'scores',
  (value) => value.split(',').map(Number)
);
```

---

## Key Features

1. **Type Safety:** Always get the type you expect by passing a generic.
2. **Flexible Serialization:** Support for custom serialization and deserialization functions.
3. **Consistent JSON Handling:** All data is serialized/deserialized automatically with sensible defaults.
4. **Error Handling:** Gracefully handles common storage errors with console warnings.
5. **Convenient:** One-line store/retrieve/delete for component state, settings, and more.

## Limitations

1. **Browser Environment:** Only works in browsers where `localStorage` is available.
2. **Storage Limits:** Subject to browser storage quotas (typically 5-10MB).
3. **Synchronous:** All operations are synchronous and may block the main thread with large data.

## Best Practices

- Use custom serialization for complex objects containing Dates, Maps, Sets, or other non-JSON-native types.
- For large datasets, consider compression or alternative storage solutions.
- Always use the same serialization/deserialization functions for the same data.

## Recommended Use Cases

- Persisting user preferences (theme, language, etc.)
- Storing session/user tokens and lightweight user data
- Retaining form state or temporary selections
- Simple caching in single-page applications
- Application settings and configuration

### See Also

- [**Session Storage Utilities**](./session-storage) for similar functionality scoped to the browser session.
- For React apps, consider using [**useStorage**](https://www.npmjs.com/package/nhb-hooks#usestorage) hook for seamless integration.
