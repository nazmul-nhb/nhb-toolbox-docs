---
id: parseFormData  
title: Parse Form Data  
---

## parseFormData

Converts FormData or query strings into structured JavaScript objects, with optional primitive value parsing.

### Function Signature

```typescript
parseFormData<T extends FormData | string>(
  data: T,
  parsePrimitives?: boolean
): ParsedFormData<T>
```

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `data` | `FormData \| string` | Input data to parse | - |
| `parsePrimitives` | `boolean` | Whether to convert string values to primitives | `true` |

### Returns

`ParsedFormData<T>` - A structured object with:

- String values for single entries
- Arrays for multiple entries
- File objects preserved when input is FormData
- Parsed primitives (when enabled)

### Features

1. **Dual Input Support**
   - Handles both `FormData` objects and query strings
   - Preserves File objects from FormData
   - Automatically handles URL-encoded data

2. **Value Parsing**
   - Converts strings to booleans, numbers, arrays, objects
   - Maintains original strings when parsing is disabled
   - Handles repeated fields as arrays

3. **Type Safety**
   - Different return types for string vs FormData inputs
   - Preserves File objects in type definitions
   - Generic return type based on input

### Example Usage

#### Basic Usage

```typescript
import { parseFormData } from 'nhb-toolbox';

// From FormData
const formData = new FormData();
formData.append('name', 'John');
formData.append('age', '30');
const parsed1 = parseFormData(formData);
// { name: 'John', age: 30 }

// From query string
const query = 'name=John&age=30&active=true';
const parsed2 = parseFormData(query);
// { name: 'John', age: 30, active: true }
```

#### With Files

```typescript
const formData = new FormData();
formData.append('avatar', file);
formData.append('tags', 'js');
formData.append('tags', 'ts');
const parsed = parseFormData(formData, false);
// {
//   avatar: File,
//   tags: ['js', 'ts']
// }
```

### Type Definitions

#### Return Type

```typescript
type ParsedFormData<T> =
  T extends string ? Record<string, string | string[]>
    : Record<string, string | string[] | File | File[]>;
```

### Behavior Details

1. **Array Handling**
   - Repeated keys become arrays
   - Mixes of Files and strings are supported
   - Preserves original order of values

2. **Primitive Parsing** (when enabled)
   - `"true"`/`"false"` → boolean
   - Numeric strings → number
   - JSON strings → objects/arrays
   - Other strings remain unchanged

3. **File Handling**
   - Preserves File objects from FormData
   - Multiple files become arrays
   - Never converts Files to strings

### Edge Cases

- Empty strings remain strings
- Invalid JSON remains strings
- FormData entries with same key become arrays
- Non-File FormData entries become strings

### Comparison with Native FormData

| Feature | Native FormData | parseFormData |
|---------|----------------|---------------|
| Access values | .get()/.getAll() | Direct property access |
| Files | Preserved | Preserved |
| Primitives | All strings | Auto-converted |
| Arrays | Manual handling | Automatic |
| Nested data | Not supported | Partial support |

### Use Cases

- Form submission handling
- API request processing
- Query string parsing
- File upload processing
- Data transformation pipelines

### Conclusion

The `parseFormData` function provides:

1. **Simplified access** to form data
2. **Automatic type conversion** of values
3. **Consistent handling** of arrays
4. **File object preservation**

Ideal for applications requiring:

- Form processing
- API integrations
- Data normalization
- File upload handling
