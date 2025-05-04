---
id: local-storage
title: Local Storage Utilities
---
<!-- markdownlint-disable-file MD024 -->
A simple set of utilities to interact safely and conveniently with the browser's [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Handles storing, retrieving, and removing typed items.

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Import

```typescript
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage
} from 'nhb-toolbox';
```

---

## getFromLocalStorage

**Type-safe getter for items stored in local storage.**

```typescript
function getFromLocalStorage<T>(key: string): T | null
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
<TabItem value="Not found" label="Nonexistent Key">

```typescript
const value = getFromLocalStorage<string>('nonexistent');
// Returns: null
```

</TabItem>
</Tabs>

### Parameters

| Name | Type | Description                                  |
|------|------|----------------------------------------------|
| key  | string | The key for the local storage item.        |

### Returns

- The parsed value if it exists and can be parsed from JSON.
- `null` if the key does not exist.

---

## saveToLocalStorage

**Stores values in local storage as JSON.**

```typescript
function saveToLocalStorage<T>(key: string, value: T): void
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
</Tabs>

### Parameters

| Name  | Type   | Description                                               |
|-------|--------|-----------------------------------------------------------|
| key   | string | The key under which to store the value.                   |
| value | T      | The value to store (can be any JSON-safe object or type). |

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

| Name | Type   | Description                              |
|------|--------|------------------------------------------|
| key  | string | The key to remove from local storage.    |

---

## Key Features

1. **Type Safety:** Always get the type you expect by passing a generic.
2. **Consistent JSON Handling:** All data is serialized/deserialized automatically.
3. **Convenient:** One-line store/retrieve/delete for component state, settings, and more.

## Limitations

1. **JSON Only:** Only serializable values are supported.
2. **No Expiry:** There is no built-in expiry/timeout mechanism.
3. **Browser Environment:** Only works in browsers where `localStorage` is available.
4. **No Error Catching:** No error handling for quota exceeded/invalid JSON/etc.

## Notes

- Use try/catch if you expect data may not be valid JSON (e.g., overwritten by non-toolbox code).
- Items not found return `null` to distinguish from a stored `undefined`.
- For complex objects, ensure stable shape between saving and reading.

## Recommended Use Cases

- Persisting user preferences (theme, language, etc.).
- Storing session/user tokens and lightweight user data.
- Retaining form state or temporary selections.
- Simple caching in single-page applications.

---

**Conclusion:**  
These utilities provide a safe, typed, and reliable way to store, retrieve, and remove data in the browser’s local storage—ideal for modern web apps needing persistence with minimal code.
