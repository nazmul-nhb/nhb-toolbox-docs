---
id: serializeForm  
title: Serialize Form  
---

## serializeForm

Converts HTML form elements into structured JavaScript objects or query strings, handling both single and multiple values.

### Function Signature

```typescript
serializeForm<T extends boolean = false>(
  form: HTMLFormElement,
  toQueryString?: T
): SerializedForm<T>
```

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `form` | `HTMLFormElement` | The form element to serialize | - |
| `toQueryString` | `boolean` | Return as query string instead of object | `false` |

### Returns

`SerializedForm<T>` - Either:

- An object with string/string[] values (default), or
- A URL-encoded query string when `toQueryString=true`

### Features

1. **Form Element Support**
   - Handles all standard form controls
   - Preserves multiple selections as arrays
   - Automatically converts values to strings

2. **Output Formats**
   - Object format for easy JavaScript access
   - Query string format for URL usage
   - Type-safe return based on parameters

3. **Value Handling**
   - Single values as strings
   - Multiple values as arrays
   - Proper URL encoding for query strings

### Example Usage

#### Basic Usage (Object Output)

```typescript
import { serializeForm } from 'nhb-toolbox';

const form = document.getElementById('myForm') as HTMLFormElement;
const data = serializeForm(form);
// { name: 'John', hobbies: ['reading', 'coding'] }
```

#### Query String Output

```typescript
const query = serializeForm(form, true);
// "name=John&hobbies=reading&hobbies=coding"
```

#### With Type Safety

```typescript
// Return type is automatically inferred
const objData = serializeForm(form);  // Record<string, string | string[]>
const strData = serializeForm(form, true);  // string
```

### Type Definitions

#### Return Type

```typescript
type SerializedForm<T extends boolean> =
  T extends false ? Record<string, string | string[]> : QueryString;
```

### Behavior Details

1. **Multiple Values**
   - Checkboxes with same name → array
   - Multi-select elements → array
   - Repeated fields → array

2. **Value Conversion**
   - All values converted to strings
   - File inputs included (as filename strings)
   - Empty values preserved

3. **Query String Specifics**
   - URL-encoded output
   - Array values as repeated params
   - Maintains proper parameter ordering

### SSR Note

⚠️ **Server-Side Rendering Warning**:  
This utility may not work as expected in SSR environments (like Next.js Server Components) due to FormData/DOM limitations.

### Comparison with Native FormData

| Feature | Native FormData | serializeForm |
|---------|----------------|---------------|
| Output format | FormData | Object/QueryString |
| Multiple values | .getAll() | Automatic arrays |
| Type safety | Limited | Strongly typed |
| Query strings | Manual conversion | Built-in support |
| File handling | Preserved | Filename strings |

### Use Cases

- Form validation
- AJAX form submissions
- State management
- URL parameter generation
- Form data persistence

### Conclusion

The `serializeForm` function provides:

1. **Simple conversion** from forms to usable data
2. **Flexible output formats**
3. **Automatic array handling**
4. **Type-safe returns**

Ideal for applications requiring:

- Form processing
- Client-side form handling
- URL parameter generation
- Data serialization
