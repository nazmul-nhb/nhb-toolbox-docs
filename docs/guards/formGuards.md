---
id: form-guards
title: Form Guards
---

<!-- markdownlint-disable-file MD024 -->
## isValidFormData

Checks if a value is a valid non-empty `FormData` instance.

### Function Signature

```typescript
function isValidFormData(value: unknown): value is FormData
```

### Parameters

- `value`: The value to check

### Returns

`true` if:

- Value is a FormData instance
- Has entries (not empty)
- Supports .entries() method

### Example

```typescript
const formData = new FormData();
formData.append('name', 'John');

isValidFormData(formData); // true
isValidFormData({}); // false
```

### SSR Note

⚠️ May not work in SSR environments like Next.js Server Components

---

## isOriginFileObj

Checks if a value is an `OriginFileObj` (extended `File` with UID). For `Ant-Design Upload` component.

### Function Signature

```typescript
function isOriginFileObj(value: unknown): value is OriginFileObj
```

### Type Definition

```typescript
/** * Represents the original file object before any modifications. */
interface OriginFileObj extends File {
 /** Unique identifier for the original file. */
 uid: string;
}
```

### Validation Rules

- Must be an object
- Must have string `uid` property
- Inherits all File properties

### Example

```typescript
const file = new File([], 'test.txt');
const originFile = Object.assign(file, { uid: '123' });

isOriginFileObj(originFile); // true
isOriginFileObj(file); // false
```

---

## isCustomFile

Checks if a value is a `CustomFile` object.

### Function Signature

```typescript
function isCustomFile(value: unknown): value is CustomFile
```

### Type Definition

```typescript
/** * Represents a custom file structure used in file upload components. */
interface CustomFile {
 /** Unique identifier for the file. */
 uid: string;
 /** The timestamp (milliseconds) when the file was last modified. */
 lastModified: number;
 /** A string representation of the last modified date. */
 lastModifiedDate: Date;
 /** The name of the file. */
 name: string;
 /** The size of the file in bytes. */
 size: number;
 /** The MIME type of the file. */
 type: string;
 /** Upload progress percentage (0-100). */
 percent: number;
 /** The original file object before any transformations. */
 originFileObj: OriginFileObj;
 /** The URL for a thumbnail preview of the file. */
 thumbUrl: string;
 /** Optional error information if the upload fails. */
 error?: FileError;
 /** Optional server response after a successful upload. */
 response?: string;
 /** Optional status of the file upload (e.g., "uploading", "done", "error"). */
 status?: string;
}

/** * Represents an error that occurs during a file upload. */
interface FileError extends Error {
 /** HTTP status code of the error. */
 status: number;
 /** The HTTP method used for the request (e.g., "POST", "PUT"). */
 method: string;
 /** The URL where the upload was attempted. */
 url: string;
}
```

### Validation Rules

- Must be an object
- Must have `originFileObj` property that passes `isOriginFileObj`
- Contains all required CustomFile properties

### Example

```typescript
const customFile = {
  uid: '123',
  name: 'file.txt',
  originFileObj: originFile, // from previous example
  // ...other required properties
};

isCustomFile(customFile); // true
```

---

## isCustomFileArray

Checks if a value is an array of CustomFile objects.

### Function Signature

```typescript
function isCustomFileArray(value: unknown): value is CustomFile[]
```

### Validation Rules

- Must be non-empty array
- Every element must pass `isCustomFile`

### Example

```typescript
const files = [customFile1, customFile2]; 
isCustomFileArray(files); // true
```

---

## isFileArray

Checks if a value is an array of native File objects.

### Function Signature

```typescript
function isFileArray(value: unknown): value is File[]
```

### Validation Rules

- Must be non-empty array
- Every element must be File instance

### Example

```typescript
const files = [new File([], 'test.txt')];
isFileArray(files); // true
```

---

## isFileList

Checks if a value is a FileList instance.

### Function Signature

```typescript
function isFileList(value: unknown): value is FileList
```

### Validation Rules

- Must be FileList instance
- Available in browser environments

### Example

```typescript
const fileInput = document.querySelector('input[type="file"]');
isFileList(fileInput.files); // true
```

---

## isFileUpload

Checks if a value is a FileUpload object.

### Function Signature

```typescript
function isFileUpload(value: unknown): value is FileUpload
```

### Type Definition

```typescript
/** * Represents a file upload operation, commonly used in libraries like `FilePond` or `Ant Design Upload`. */
interface FileUpload {
 /** The primary file being uploaded. */
 file: File | CustomFile;
 /** The list of files associated with the upload. */
 fileList: CustomFile[];
}
```

### Validation Rules

- Must be an object
- Must have either:
  - `file` property that is File or CustomFile
  - `fileList` property that is CustomFile[]

### Example

```typescript
const upload = {
  file: customFile,
  fileList: [customFile1, customFile2]
};
isFileUpload(upload); // true
```
