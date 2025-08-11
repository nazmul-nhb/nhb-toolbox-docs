---
id: HttpStatus
title: HttpStatus - Manage HTTP Status Codes
---

## `HttpStatus`

The **`HttpStatus`** class provides a comprehensive API to manage and retrieve HTTP status codes with rich metadata.  
It supports **lookup by code or name**, **custom status codes**, and allows you to **extend or customize** the behavior by adding new status codes or overriding messages.

:::info[Data Source]
This utility includes all standard HTTP status codes with metadata adapted from MDN documentation.

- Each entry includes: code, name, readable name, description, and category
- Categories are pre-grouped for easy filtering (informational, success, redirection, clientError, serverError)

:::

:::tip[**When to Use**]

- You need **multiple independent configurations** of status codes
- You want to **add custom status codes** without affecting the shared [`httpStatus`](/docs/utilities/misc/httpStatus) instance
- You need to **override messages** for specific status codes in your application

:::

---

### ✨ Features

- ✅ Lookup status codes by number or name (both `SOME_NAME` and `Some Name` formats)
- ✅ Built-in **standard HTTP status codes** loaded on construction
- ✅ Manage status codes dynamically:
  - `addCode()` - Add custom status codes
  - `setMessage()` - Override default messages
- ✅ Pre-grouped categories for quick filtering
- ✅ Fully typed for TypeScript users

---

### 📦 Import

```ts
import { HttpStatus } from 'nhb-toolbox';
```

---

### 🚀 Usage

```ts
const customStatus = new HttpStatus();

// Lookup by code
customStatus.getByCode(404)?.readableName; // "Not Found"

// Lookup by name
customStatus.getByName('NOT_FOUND')?.message; // "Not Found"
customStatus.getByName('Not Found')?.code; // 404

// List all client errors
customStatus.list('clientError');
```

---

### 🔧 Extending Status Codes

You can modify your instance without affecting others:

```ts
// Add a custom status code
customStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});

// Override a message
customStatus.setMessage(404, 'This page is gone');
```

---

### 🛠️ API Overview

#### `constructor()`

Initializes with all standard HTTP status codes parsed from MDN documentation.

---

#### `getByCode(code)`

Get status entry by numeric HTTP code.

```ts
const status = customStatus.getByCode(404);
// Returns:
// {
//   code: 404,
//   name: 'NOT_FOUND',
//   readableName: 'Not Found',
//   message: 'Not Found',
//   description: 'The server cannot find the requested resource...',
//   category: 'clientError'
// }
```

---

#### `getByName(name)`

Get status entry by name (either `SOME_NAME` or `Some Name` format).

```ts
customStatus.getByName('NOT_FOUND')?.code; // 404
customStatus.getByName('Not Found')?.code; // 404
```

---

#### `setMessage(code, newMessage)`

Override the short message of an existing code.

```ts
customStatus.setMessage(404, 'This page is gone');
customStatus.getByCode(404)?.message; // "This page is gone"
```

---

#### `addCode(...entries)`

Add one or more new HTTP status code entries.

```ts
customStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});
```

---

#### `list(category?)`

List all codes, optionally filtered by category.

```ts
// Get all status codes
customStatus.list();

// Get only client errors
customStatus.list('clientError');
```

---

#### `Groups` (Static Property)

Pre-grouped HTTP status codes by category for quick reference:

```ts
HttpStatus.Groups: {
  informational: StatusCode[],
  success: StatusCode[],
  redirection: StatusCode[],
  clientError: StatusCode[],
  serverError: StatusCode[]
}
```

##### Categories

| Category        | Description      | Example Codes      |
| --------------- | ---------------- | ------------------ |
| `informational` | 1xx status codes | 100, 101, 102, 103 |
| `success`       | 2xx status codes | 200, 201, 202, 204 |
| `redirection`   | 3xx status codes | 301, 302, 303, 304 |
| `clientError`   | 4xx status codes | 400, 401, 403, 404 |
| `serverError`   | 5xx status codes | 500, 501, 502, 503 |

##### Example Usage

```ts
// Get all success status codes
const successCodes = HttpStatus.Groups.success; // [200, 201, 202, ...]

// Check if a code is a server error
if (HttpStatus.Groups.serverError.includes(502)) {
  console.log('This is a server error');
}
```

---

### See also

- For status codes use [constant](/docs/types/constants#available-constants) `HTTP_STATUS_CODES` instead.
- [**httpStatus (default instance)**](/docs/utilities/misc/httpStatus) — shared instance of `HttpStatus`
- [**HTTP Status Codes Reference**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - MDN documentation

---

### Summary

- Use the `HttpStatus` class for **custom status codes and isolated configurations**.  
- Use the [`httpStatus`](/docs/utilities/misc/httpStatus) instance for **quick, standard use-cases**.
