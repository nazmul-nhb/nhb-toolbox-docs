---
id: getQueryParams
title: Get Query Parameters as Object
---

## getQueryParams

Retrieves URL query parameters and converts them into a standard JavaScript object with string keys and values.

## Import

```typescript
import { getQueryParams } from 'nhb-toolbox';
```

## Function Signature

```typescript
function getQueryParams(): Record<string, string>
```

## Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic Usage">

```typescript
// If the current URL is: https://example.com/?user=alex&role=admin

const params = getQueryParams();
// Returns: { user: "alex", role: "admin" }
```

</TabItem>
<TabItem value="No Params" label="No Query Parameters">

```typescript
// If the current URL is: https://example.com/

const params = getQueryParams();
// Returns: {}
```

</TabItem>
<TabItem value="URL Encoded" label="URL Encoded Values">

```typescript
// If the current URL is: https://example.com/?q=hello%20world

const params = getQueryParams();
// Returns: { q: "hello world" }
```

</TabItem>
</Tabs>

## API Reference

### Parameters

| Name | Type | Description |
|------|------|-------------|
| *(none)* | *(none)* | No arguments required; uses `window.location.search` |

### Returns

A plain object (`Record<string, string>`) mapping query parameter names to their string values.

## Key Features

1. **Automatic Extraction**: Reads directly from the current URL without manual input.
2. **URL Decoding**: Automatically decodes parameter values.
3. **Simple Interface**: No configuration or arguments required.

## Limitations

1. **Browser-only**: Requires a `window` environment. Not suitable for Node.js/server-side use.
2. **Only First Values**: If a key appears multiple times, only the last value is kept.
3. **String Values Only**: All returned values are strings, not numbers or booleans.
4. **Single-level**: Does not parse nested or structured parameters.

## Notes

- Updating the URL (e.g., via History API) will affect the result on the next call.
- Empty query strings will return an empty object `{}`.
- Keys and values are automatically decoded.

## Recommended Use Cases

- Reading filters, search terms, or IDs from URLs in single-page applications.
- Prefilling form fields or search boxes based on current URL parameters.
- Logging or analytics of URL parameter usage.

---

**Conclusion:**  
`getQueryParams` is a lightweight utility for extracting URL query parameters in the browser. It’s most useful for simple scenarios where you need a quick object view of the current URL’s query string.
