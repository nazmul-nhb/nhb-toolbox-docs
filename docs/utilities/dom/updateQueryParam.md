---
id: updateQueryParam
title: Update Query Parameter in URL
---

## updateQueryParam

Updates a query parameter in the browser's current URL without reloading the page, using the History API.

## Import

```typescript
import { updateQueryParam } from 'nhb-toolbox';
```

## Function Signature

```typescript
updateQueryParam(key: string, value: string): void
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic Update">

```typescript
// Current URL: https://example.com/?user=alex&role=admin

updateQueryParam('user', 'sam');

// Now, the browser URL becomes: https://example.com/?user=sam&role=admin
```

</TabItem>
<TabItem value="Add New Param" label="Adding New Parameter">

```typescript
// Current URL: https://example.com/?a=1

updateQueryParam('mode', 'edit');

// URL updates to: https://example.com/?a=1&mode=edit
```

</TabItem>
<TabItem value="Overwrite" label="Overwrite Value">

```typescript
// Current URL: https://example.com/?id=5

updateQueryParam('id', '10');

// URL updates to: https://example.com/?id=10
```

</TabItem>
</Tabs>

## API Reference

### Parameters

| Name  | Type   | Description                              |
|-------|--------|------------------------------------------|
| key   | string | The query parameter key to update or add. |
| value | string | The value to set for the provided key.    |

### Returns

This function does not return anything (`void`). It immediately updates the browser's URL.

## Key Features

1. **Non-Reloading**: Updates URL with no page reload.
2. **History API**: Uses `window.history.replaceState` for seamless navigation.
3. **Safe & Idempotent**: Replaces only the specified key, leaves others untouched.

## Limitations

1. **Browser-Only**: Not available in server-side rendering or Node.js environments.
2. **No Value Removal**: Setting an empty value will keep the key with an empty string; it does not remove the parameter.
3. **String Values Only**: Both key and value must be strings.
4. **No Multi-Value Support**: Overwrites any existing values; doesn't allow duplicate values for a key.

## Notes

- Best used for updating filter, pagination, or UI state in single-page applications.
- Does not add a new browser history entry, so the Back button remains unaffected.
- To completely remove a parameter, use `URLSearchParams.delete` or a similar utility function.

## Recommended Use Cases

- Dynamically updating UI state in the URL (e.g., filters, sort order, pagination).
- Keeping shareable URLs in sync with application state.
- Integrating with search/filter panels in dashboards or admin panels.

---

**Conclusion:**  
Use `updateQueryParam` to keep your app URL in sync with user interactions—fast, seamless, and without reloads.

---

Let me know if you need a companion remove/delete query param utility as well!
