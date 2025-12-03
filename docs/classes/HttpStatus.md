---
id: HttpStatus
title: HttpStatus - Manage HTTP Status Codes
---

<!-- markdownlint-disable-file MD024 -->

## `HttpStatus`

The **`HttpStatus`** class provides a comprehensive, type-safe API for managing HTTP status codes with rich metadata. It supports lookup by code or name, custom status code registration, message overriding, and category-based filtering.

:::info[Data Source]
This utility includes all standard HTTP status codes with metadata adapted from [**MDN documentation**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status).

- Each entry includes: `code`, `name`, `readableName`, `description`, `message`, `category` and optional `link`
- Categories are pre-grouped for easy filtering: `informational`, `success`, `redirection`, `clientError`, `serverError`

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
- ✅ Manage status codes dynamically with [`addCode()`](#addcode), [`setMessage()`](#setmessage), and [`addOrOverrideCode()`](#addoroverridecode)
- ✅ Pre-grouped categories for quick filtering
- ✅ Fully typed for TypeScript with comprehensive utility types
- ✅ Isolated instances for different configurations

---

### 📦 Import

```ts
import { HttpStatus } from 'nhb-toolbox';
// or
import { HttpStatus } from 'nhb-toolbox/http-status';
```

---

### 🚀 Basic Usage

```ts
const customStatus = new HttpStatus();

// Lookup by code
customStatus.getByCode(404)?.readableName; // "Not Found"

// Lookup by name
customStatus.getByName('NOT_FOUND')?.message; // "Not Found"
customStatus.getByName('Not Found')?.code; // 404

// List all client errors
customStatus.list('clientError');

// Get all success status codes
const successCodes = HttpStatus.Groups.success; // [200, 201, 202, ...]
```

---

### 📋 Type Definitions

The `HttpStatus` class works with the following TypeScript types:

#### Core Types

```ts
/** HTTP status name variants: `name` or `readableName` */
type $StatusNameVar = 'name' | 'readableName';

/** HTTP status category */
type StatusCategory = 'informational' | 'success' | 'redirection' | 'clientError' | 'serverError';

/** HTTP status code (standard or custom) */
type StatusCode =LooseLiteral<HttpStatusCode>;

/** HTTP status name (standard or custom) */
type StatusName =  LooseLiteral<HttpStatusName>;

/** HTTP status name (`CONSTANT_CASE`) */
type EntryStatusName = LooseLiteral<HttpStatusName<'name'>>;

/** HTTP status name (`Title Case`) */
type EntryReadableName = LooseLiteral<HttpStatusName<'readableName'>>;

/** Shape of an HTTP status entry */
interface StatusEntry {
  code: StatusCode;
  name: EntryStatusName;
  readableName: EntryReadableName;
  link?: string;
  message: string;
  description: string;
  category: StatusCategory;
}
```

#### Utility Types

Two key utility types are provided for type-safe operations:

1. **`HttpStatusCode<Category>`**  
   Extracts standard HTTP status codes filtered by category.  

   ```ts
   type SuccessCodes = HttpStatusCode<'success'>; // 200 | 201 | 202 | ...
   type ClientErrors = HttpStatusCode<'clientError'>; // 400 | 401 | 403 | 404 | ...
   ```

2. **`HttpStatusName<Name, Category>`**  
   Extracts standard HTTP status names filtered by variant and category.  

   ```ts
   type ConstantNames = HttpStatusName<'name'>; // "OK" | "CREATED" | "NOT_FOUND" | ...
   type ReadableNames = HttpStatusName<'readableName'>; // "OK" | "Created" | "Not Found" | ...
   type SuccessReadableNames = HttpStatusName<'readableName', 'success'>; // "OK" | "Created" | "Accepted" | ...
   ```

These types enable compile-time validation of status codes and names throughout your application.

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

// Add or override multiple codes
customStatus.addOrOverrideCode(
  {
    code: 799,
    name: 'CUSTOM_ERROR',
    readableName: 'Custom Error',
    message: 'Custom error message',
    description: 'Custom description',
    category: 'clientError'
  },
  {
    code: 899,
    name: 'ANOTHER_CUSTOM',
    readableName: 'Another Custom',
    message: 'Another custom message',
    description: 'Another custom description',
    category: 'serverError'
  }
);
```

---

## 🛠️ API Reference

### Constructor

Initializes a new `HttpStatus` instance with all standard HTTP status codes.

### getByCode()

Get status entry by numeric HTTP code.

#### Signatures

```ts
getByCode(code: HttpStatusCode): StatusEntry;
getByCode(code: StatusCode): StatusEntry | undefined;
```

#### Example

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

### getByName()

Get status entry by name (either `SOME_NAME` or `Some Name` format).

#### Signatures

```ts
getByName(name: HttpStatusName): StatusEntry;
getByName(name: StatusName): StatusEntry | undefined;
```

#### Example

```ts
customStatus.getByName('NOT_FOUND')?.code; // 404
customStatus.getByName('Not Found')?.code; // 404
```

### setMessage()

Override the short message of an existing code.

#### Signatures

```ts
setMessage(code: StatusCode, newMessage: string): boolean
```

#### Example

```ts
customStatus.setMessage(404, 'This page is gone');
customStatus.getByCode(404)?.message; // "This page is gone"
```

### addCode()

Add one or more new HTTP status code entries.

#### Signatures

```ts
(...entries: StatusEntry[]): boolean
```

:::tip[Remarks]

- New entries are compared **by their `code` value** to determine uniqueness
- If a code already exists, it will be skipped and not overwritten
- Returns `true` if at least one code was successfully added
- Returns `false` if all provided codes already exist

:::

#### Example

```ts
const wasAdded = customStatus.addCode({
  code: 799,
  name: 'CUSTOM_ERROR',
  readableName: 'Custom Error',
  message: 'Something custom happened',
  description: 'Example of user-defined HTTP status',
  category: 'clientError'
});
```

### addOrOverrideCode()

Add or override one or more HTTP status code entries.

#### Signatures

```ts
addOrOverrideCode(...entries: StatusEntry[]): HttpStatus
```

:::tip[Remarks]

- New entries use their `code` value as the comparison key and will overwrite existing ones
- Returns the modified instance for method chaining

:::

#### Example

```ts
customStatus
  .addOrOverrideCode({
    code: 799,
    name: 'CUSTOM_ERROR',
    readableName: 'Custom Error',
    message: 'Something custom happened',
    description: 'User-defined status',
    category: 'clientError'
  })
  .setMessage(404, 'Custom 404 message');
```

### list()

List all codes, optionally filtered by category.

#### Signatures

```ts
list(category?: StatusCategory): StatusEntry[]
```

#### Example

```ts
// Get all status codes
customStatus.list();

// Get only client errors
customStatus.list('clientError');
```

---

### `Groups` (Static Property)

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

#### Categories

| Category        | Description      | Example Codes      |
| --------------- | ---------------- | ------------------ |
| `informational` | 1xx status codes | 100, 101, 102, 103 |
| `success`       | 2xx status codes | 200, 201, 202, 204 |
| `redirection`   | 3xx status codes | 301, 302, 303, 304 |
| `clientError`   | 4xx status codes | 400, 401, 403, 404 |
| `serverError`   | 5xx status codes | 500, 501, 502, 503 |

#### Example Usage

```ts
// Get all success status codes
const successCodes = HttpStatus.Groups.success; // [200, 201, 202, ...]

// Check if a code is a server error
if (HttpStatus.Groups.serverError.includes(502)) {
  console.log('This is a server error');
}
```

---

### See Also

- [**httpStatus (default instance)**](/docs/utilities/misc/httpStatus) — shared instance of `HttpStatus` for standard use cases
- [**HTTP Status Codes Reference**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - MDN documentation
- For status code constants, use `HTTP_STATUS_CODES` from the constants module

---

### Summary

- Use the `HttpStatus` class when you need **custom status codes and isolated configurations**
- Use the [`httpStatus`](/docs/utilities/misc/httpStatus) instance for **quick, standard use-cases**
- Leverage the **utility types** (`HttpStatusCode` and `HttpStatusName`) for type-safe operations
- Create multiple instances for different parts of your application that need separate status code registries
