---
id: session-storage
title: Session Storage Utilities
---
<!-- markdownlint-disable-file MD024 -->
Convenient utilities to safely interact with the browser's [Session Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Store, retrieve, and remove typed items for per-tab and per-session persistence.

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Import

```typescript
import {
  getFromSessionStorage,
  saveToSessionStorage,
  removeFromSessionStorage,
} from 'nhb-toolbox';
```

---

## getFromSessionStorage

**Type-safe getter for items stored in session storage.**

```typescript
function getFromSessionStorage<T>(key: string): T | null
```

### Usage Examples

<Tabs>
<TabItem value="String" label="String Value">

```typescript
// Given: sessionStorage.setItem('color', JSON.stringify('blue'))
const color = getFromSessionStorage<string>('color');
// Returns: 'blue'
```

</TabItem>
<TabItem value="Object" label="Object Value">

```typescript
// Given: sessionStorage.setItem('cart', JSON.stringify({ total: 30, items: 4 }))
const cart = getFromSessionStorage<{ total: number; items: number }>('cart');
// Returns: { total: 30, items: 4 }
```

</TabItem>
<TabItem value="Not Found" label="Nonexistent Key">

```typescript
const missing = getFromSessionStorage<string>('notfound');
// Returns: null
```

</TabItem>
</Tabs>

### Parameters

| Name | Type   | Description                            |
|------|--------|----------------------------------------|
| key  | string | The key for the session storage item.  |

### Returns

- The parsed value (`T`) if it exists and can be parsed from JSON.
- `null` if the key does not exist.

---

## saveToSessionStorage

**Stores values in session storage as JSON.**

```typescript
function saveToSessionStorage<T>(key: string, value: T): void
```

### Usage Examples

<Tabs>
<TabItem value="Number" label="Primitive/Number">

```typescript
saveToSessionStorage('count', 10);
// sessionStorage entry: { count: "10" }
```

</TabItem>
<TabItem value="Complex Object" label="Object">

```typescript
saveToSessionStorage('profile', {
  id: 7,
  username: 'user7',
  online: true
});
// sessionStorage entry: { profile: '{"id":7,"username":"user7","online":true}' }
```

</TabItem>
</Tabs>

### Parameters

| Name  | Type   | Description                                |
|-------|--------|--------------------------------------------|
| key   | string | The key under which to store the value.    |
| value | T      | The value to store (any JSON-safe type).   |

---

## removeFromSessionStorage

**Removes an item from session storage.**

```typescript
function removeFromSessionStorage(key: string): void
```

### Usage Example

```typescript
removeFromSessionStorage('cart');
// Removes 'cart' from session storage. No effect if not found.
```

### Parameters

| Name | Type   | Description                          |
|------|--------|--------------------------------------|
| key  | string | The key to remove from session storage. |

---

## Key Features

1. **Type Safety:** You get the right type back, thanks to generic inference.
2. **Consistent JSON Handling:** Storage is always as stringified JSON.
3. **Per-Tab Session:** Data is unique per browser tab or window session.
4. **Simple and Fast:** Easy, one-liner API for all value types.

## Limitations

1. **JSON Only:** Only serializable values are supported.
2. **Session Scope:** Data persists only until the tab or window is closed.
3. **No Expiry:** No built-in expiration or time-to-live.
4. **Browser Only:** Not available server-side, and may be disabled in some contexts (incognito, etc).
5. **No Error Catching:** No handling of quota issues or deserialization errors.

## Notes

- Use for temporary state, like wizard steps, auth, or UI state per tab.
- Keys not found return `null`, distinguishing from `undefined` or other falsey values.
- Clear session storage for security-sensitive data on logout or navigation.

## Recommended Use Cases

- Storing tab-specific state (temporary settings, form progress, etc.).
- Multi-step workflows, wizard data, cart/session caching.
- UI state, selections, or navigation history per session/tab.

---

**Conclusion:**  
These utilities make working with session storage type-safe, reliable, and convenient—perfect for browser apps needing quick tab/session-scoped persistence.
