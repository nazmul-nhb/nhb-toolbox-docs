---
id: session-storage
title: Session Storage Utilities
---

<!-- markdownlint-disable-file MD024 -->

Convenient utilities to safely interact with the browser's [Session Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Store, retrieve, and remove typed items for per-tab and per-session persistence with custom serialization support.

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Import

```typescript
import { getFromSessionStorage, saveToSessionStorage, removeFromSessionStorage } from 'nhb-toolbox';
```

---

## getFromSessionStorage

**Type-safe getter for items stored in session storage with custom deserialization support.**

```typescript
function getFromSessionStorage<T>(key: string, deserialize?: Deserializer<T>): T | null
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
<TabItem value="Custom Deserializer" label="Custom Deserialization">

```typescript
// Handle complex objects with custom parsing
const session = getFromSessionStorage<{ 
  token: string; 
  expiresAt: Date 
}>(
  'auth-session',
  (value: string) => {
    const parsed = JSON.parse(value);
    return {
      ...parsed,
      expiresAt: new Date(parsed.expiresAt)
    };
  }
);
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

| Name        | Type              | Description                                                                            |
| ----------- | ----------------- | -------------------------------------------------------------------------------------- |
| key         | `string`          | The key for the session storage item.                                                  |
| deserialize | `Deserializer<T>` | Optional function to convert stored string back to type `T`. Defaults to `JSON.parse`. |

### Returns

- The parsed value (`T`) if it exists and can be parsed.
- `null` if the key does not exist or parsing fails.

---

## saveToSessionStorage

**Stores values in session storage with custom serialization support.**

```typescript
function saveToSessionStorage<T>(key: string, value: T, serialize?: Serializer<T>): void
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
<TabItem value="Custom Serializer" label="Custom Serialization">

```typescript
// Handle special types like Date objects
saveToSessionStorage(
  'session-data',
  { 
    userId: 123, 
    loginTime: new Date(),
    permissions: new Set(['read', 'write'])
  },
  (value) => JSON.stringify({
    ...value,
    loginTime: value.loginTime.toISOString(),
    permissions: Array.from(value.permissions)
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

| Name | Type     | Description                             |
| ---- | -------- | --------------------------------------- |
| key  | `string` | The key to remove from session storage. |

---

## Advanced Serialization Examples

### Authentication Session Data

```typescript
interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  scopes: Set<string>;
}

// Save authentication data
saveToSessionStorage<AuthSession>(
  'auth',
  authData,
  (value) => JSON.stringify({
    ...value,
    expiresAt: value.expiresAt.toISOString(),
    scopes: [...value.scopes].join(','),
  })
);

// Retrieve with proper type reconstruction
const session = getFromSessionStorage<AuthSession>(
  'auth',
  (value) => {
    const parsed = JSON.parse(value);

    return {
      ...parsed,
      expiresAt: new Date(parsed.expiresAt),
      scopes: new Set(parsed.scopes.split(',')),
    };
  }
);
```

### Form Wizard State

```typescript
// Multi-step form with progress tracking
saveToSessionStorage(
  'signup-wizard',
  {
    currentStep: 2,
    completedSteps: [1, 2],
    userData: { name: 'John', email: 'john@example.com' },
    startedAt: new Date()
  },
  (value) => JSON.stringify({
    ...value,
    startedAt: value.startedAt.toISOString()
  })
);
```

---

## Key Features

1. **Type Safety:** You get the right type back, thanks to generic inference.
2. **Flexible Serialization:** Support for custom serialization and deserialization functions.
3. **Consistent JSON Handling:** Storage is always as stringified JSON with sensible defaults.
4. **Per-Tab Session:** Data is unique per browser tab or window session.
5. **Error Handling:** Gracefully handles common storage errors with console warnings.
6. **Simple and Fast:** Easy, one-liner API for all value types.

## Limitations

1. **Session Scope:** Data persists only until the tab or window is closed.
2. **Storage Limits:** Subject to browser storage quotas (typically 5-10MB).
3. **Browser Only:** Not available server-side, and may be disabled in some contexts (incognito, etc).
4. **Synchronous:** All operations are synchronous and may block the main thread with large data.

## Best Practices

- Use custom serialization for complex objects containing Dates, Maps, Sets, or other non-JSON-native types.
- Clear sensitive session data on logout or when no longer needed.
- For large datasets, consider compression or alternative storage solutions.
- Always use matching serialization/deserialization functions for consistent data handling.

## Recommended Use Cases

- Storing tab-specific state (temporary settings, form progress, etc.)
- Multi-step workflows, cart/session caching
- UI state, selections, or navigation history per session/tab
- Authentication tokens and temporary user sessions
- Unsaved form data and draft content

### See Also

- [**Local Storage Utilities**](./local-storage) for similar functionality scoped to the browser's persistent storage.
- For React apps, consider using [**useStorage**](https://github.com/nazmul-nhb/nhb-hooks?tab=readme-ov-file#usestorage) hook from [**nhb-hooks**](https://www.npmjs.com/package/nhb-hooks) package for seamless integration.
