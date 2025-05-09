---
id: createFormData  
title: Create Controlled FormData  
---

## createControlledFormData

A utility function that converts JavaScript objects into FormData with extensive configuration options for handling nested structures, file uploads, and data transformations.

### Function Signature

```typescript
function createControlledFormData<T extends GenericObject>(
  data: T,
  configs?: FormDataConfigs<T>
): FormData
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `T` | The source object to convert to FormData |
| `configs` | `FormDataConfigs<T>` | Configuration options (see below) |

### Configuration Options

#### Data Handling Options

| Option | Type | Description |
|--------|------|-------------|
| `ignoreKeys` | `DotNotationKey<T>[]` | Keys to exclude from FormData |
| `requiredKeys` | `'*' \| DotNotationKey<T>[]` | Keys to include even with empty values |
| `trimStrings` | `boolean` | Whether to trim string values |

#### Formatting Options

| Option | Type | Description |
|--------|------|-------------|
| `lowerCaseKeys` | `'*' \| DotNotationKey<T>[]` | Keys to convert to lowercase |
| `lowerCaseValues` | `'*' \| NestedKeyString<T>[]` | String values to convert to lowercase |

#### Nested Data Options

| Option | Type | Description |
|--------|------|-------------|
| `dotNotateNested` | `'*' \| KeyForObject<T>[]` | Object keys to preserve in dot notation |
| `stringifyNested` | `'*' \| KeyForObject<T>[]` | Object keys to stringify (default: `'*'`) |
| `breakArray` | `'*' \| KeyForArray<T>[]` | Array keys to break into indexed fields |

### Features

1. **Deep Object Handling**
   - Supports nested objects and arrays
   - Configurable dot notation or JSON stringification
   - Recursive cleaning of nested structures

2. **File Upload Support**
   - Handles native `File` and `Blob` objects
   - Supports different UI Component Libraries' (like Ant Design) `File Upload` format
   - Processes file arrays and `FileList` objects

3. **Data Transformation**
   - Key case conversion (lowercase)
   - Value trimming and case conversion
   - Conditional inclusion based on value presence

4. **Type Safety**
   - Strict type checking for configuration options
   - Dot notation path validation
   - Array/object key discrimination

### Example Usage

```typescript
import { createControlledFormData } from 'nhb-toolbox';

const formData = createControlledFormData({
  user: {
    name: ' John Doe ',
    age: 30,
    preferences: { theme: 'dark' }
  },
  files: [file1, file2]
}, {
  trimStrings: true,
  lowerCaseKeys: ['user.name'],
  dotNotateNested: ['user.preferences'],
  breakArray: ['files']
});

// Resulting FormData:
// user.name=john doe
// user.age=30
// user.preferences.theme=dark
// files[0]=[File1]
// files[1]=[File2]
```

### Aliases

- `createFormData`
- `convertIntoFormData`

### Type Definitions

#### FormDataConfigs Interface

```typescript
/** - Configuration options to control FormData generation behavior. */
export interface FormDataConfigs<T> {
 /**
  * * An array of dot-notation keys to exclude from processing.
  * * Ignored keys are omitted entirely, even if included in other options.
  */
 ignoreKeys?: DotNotationKey<T>[];

 /**
  * * Specifies which keys should be included even if their values are falsy.
  * * Use `*` to preserve all keys.
  */
 requiredKeys?: '*' | DotNotationKey<T>[];

 /**
  * * Defines which keys should be converted to lowercase.
  * * Use `*` to apply to all keys.
  */
 lowerCaseKeys?: '*' | DotNotationKey<T>[];

 /**
  * * Defines which values should be converted to lowercase.
  * * Use `*` to apply to all keys.
  */
 lowerCaseValues?: '*' | NestedKeyString<T>[];

 /**
  * * An array of keys (values must be object) to preserve in their original structure.
  * - Use `*` to preserve all keys with object values in their dot-notation format.
  * - If a key exists in both `dotNotateNested` and `stringifyNested`, `dotNotateNested` takes precedence.
  */
 dotNotateNested?: '*' | KeyForObject<T>[];

 /**
  * * Specifies which keys (values must be objects) should be stringified instead of being dot-notated.
  * - Defaults to `*`, meaning all keys with object values will be stringified. Which is standard in modern form submissions.
  * - Use `*` to stringify all nested objects.
  * - If a key exists in both `dotNotateNested` and `stringifyNested`, `dotNotateNested` takes precedence.
  */
 stringifyNested?: '*' | KeyForObject<T>[];

 /**
  * * Controls how arrays should be serialized in FormData.
  * - If a key is included, the array will be broken into individual key-value pairs (`key[0]: value, key[1]: value`).
  * - Use `*` to apply this behavior to all array keys.
  */
 breakArray?: '*' | KeyForArray<T>[];

 /** - Enables automatic trimming of string values before appending them to FormData. */
 trimStrings?: boolean;
}
```

### Behavior Details

1. **Key Processing**
   - Keys are transformed according to `lowerCaseKeys` config
   - Dot notation is applied based on `dotNotateNested`
   - Arrays are handled according to `breakArray` config

2. **Value Processing**
   - Strings are trimmed if `trimStrings` is true
   - Values are lowercased based on `lowerCaseValues`
   - Objects are stringified or dot-notated based on config

3. **Special Cases**
   - File upload objects are processed recursively
   - Empty values are preserved if marked as required
   - Ignored keys are completely omitted

### Edge Cases

- Empty objects/arrays are included if marked as required
- Null/undefined values are included if marked as required
- Date-like objects such as native `Date`, [Chronos](../../classes/Chronos.md), `Dayjs` or `Moment.js` are serialized in ISO string format (either in UTC or in local)
- File upload components are deeply inspected
- Circular references may cause issues (not handled)

### SSR Note

⚠️ **Server-Side Rendering Warning**:  
This utility may not work as expected in SSR environments (like Next.js Server Components) due to FormData limitations.

### Conclusion

The `createControlledFormData` function provides:

1. **Comprehensive** object-to-FormData conversion
2. **Fine-grained control** over data formatting
3. **Robust handling** of complex structures
4. **Type-safe** configuration options

Ideal for applications requiring:

- Complex form submissions
- File upload handling
- API request preparation
- Data transformation pipelines
