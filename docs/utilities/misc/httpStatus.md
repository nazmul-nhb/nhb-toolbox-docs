---
id: httpStatus
title: HTTP Status Codes Utility
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## `httpStatus`

The **`httpStatus`** is a **default shared instance** of the [`HttpStatus`](/docs/classes/HttpStatus) class.  
It comes **preloaded with all standard HTTP status codes** and their metadata from MDN documentation.

:::info[Data Source]
This utility includes all standard HTTP status codes with metadata adapted from MDN documentation.

- Each entry includes: code, name, readable name, description, and category
- Categories are pre-grouped for easy filtering (informational, success, redirection, clientError, serverError)

:::

:::tip[**When to Use**]

- **Use this instance when you don't need multiple configurations**  
- If you need isolated or custom status codes, create your own [`HttpStatus`](#-need-your-own-configuration) instance
- For status codes use [constant](/docs/types/constants#available-constants) `HTTP_STATUS_CODES` instead.

:::

---

### ✨ Features

- ✅ Lookup status codes by number or name (both `SOME_NAME` and `Some Name` formats)
- ✅ Built-in **standard HTTP status codes** from MDN
- ✅ Modify status codes dynamically:
  - `addCode()` - Add custom status codes
  - `setMessage()` - Override default messages
- ✅ Pre-grouped categories for quick filtering
- ✅ Fully typed for TypeScript users

---

### 📦 Import

```ts
import { httpStatus } from 'nhb-toolbox';
```

---

### 🚀 Quick Usage

<Tabs>
<TabItem value="lookup" label="Lookup">

```ts
// By code
httpStatus.getByCode(404)?.readableName; // "Not Found"

// By name
httpStatus.getByName('NOT_FOUND')?.code; // 404
httpStatus.getByName('Not Found')?.code; // 404
```

</TabItem>
<TabItem value="list" label="List">

```ts
// All status codes
httpStatus.list();

// Only server errors
httpStatus.list('serverError');
```

</TabItem>
<TabItem value="modify" label="Modify">

```ts
// Override a message
httpStatus.setMessage(404, 'This page is gone');

// Add custom code
httpStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});
```

</TabItem>
</Tabs>

---

### 🔧 Extending Status Codes

Since `httpStatus` is an actual instance of [`HttpStatus`](/docs/classes/HttpStatus),
you can **extend or modify** it at runtime:

```ts
// Add a custom status code
httpStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});

// Override a message
httpStatus.setMessage(404, 'This page is gone');
```

These modifications affect all consumers of the shared instance.

---

### 🏗 Need your own configuration?

If you want an isolated instance with its own status codes, instantiate the class directly:

```ts
import { HttpStatus } from 'nhb-toolbox';

const myHttpStatus = new HttpStatus();
myHttpStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});

console.log(myHttpStatus.getByCode(799)?.readableName); // "Custom Error"
```

See the [`HttpStatus` class docs](/docs/classes/HttpStatus) for full details.

---

### See also

- For status codes use [constant](/docs/types/constants#available-constants) `HTTP_STATUS_CODES` instead.
- [**HttpStatus class**](/docs/classes/HttpStatus) — low-level API for custom instances
- [**HTTP Status Codes Reference**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - MDN documentation

---

### Summary

- Use `httpStatus` for common use-cases.  
- Create `new HttpStatus()` for isolated/custom status codes.
