---
id: sortAnArray
title: Sort An Array
---

## sortAnArray

The `sortAnArray` function sorts an array of various data types (strings, numbers, booleans, or objects) based on the provided sorting options.

### Function Signatures

```typescript
function sortAnArray<T extends GenericObject>(array: T[], options: SortByOption<T>): T[];
function sortAnArray<T extends string | number | boolean>(array: T[], options?: OrderOption): T[];
```

### Parameters

- **`array`**: The array to sort, which can contain:
  - Strings
  - Numbers
  - Booleans
  - Objects (with specified fields for sorting)

- **`options`**: Sorting options (optional). The available options are:
  - `sortOrder` (optional): Defines the order to sort the array:
    - `'asc'` (default): Sort in ascending order.
    - `'desc'`: Sort in descending order.
  - `sortByField` (optional for object arrays): The field of the object to sort by.

### Return Value

Returns the sorted array, depending on the element type:

- If the array contains strings, it sorts them alphabetically.
- If the array contains numbers, it sorts them numerically.
- If the array contains booleans, it sorts them by their boolean value (`false` < `true`).
- If the array contains objects, it sorts them by the specified field.

### Example Usage

#### Sorting Strings

```typescript
import { sortAnArray } from 'nhb-toolbox';

const strings = ['banana', 'apple', 'cherry'];
const sortedStrings = sortAnArray(strings, { sortOrder: 'asc' });
console.log(sortedStrings); // Output: ['apple', 'banana', 'cherry']
```

#### Sorting Numbers

```typescript
import { sortAnArray } from 'nhb-toolbox';

const numbers = [5, 3, 8, 1];
const sortedNumbers = sortAnArray(numbers, { sortOrder: 'desc' });
console.log(sortedNumbers); // Output: [8, 5, 3, 1]
```

#### Sorting Booleans

```typescript
import { sortAnArray } from 'nhb-toolbox';

const booleans = [true, false, true];
const sortedBooleans = sortAnArray(booleans, { sortOrder: 'asc' });
console.log(sortedBooleans); // Output: [false, true, true]
```

#### Sorting Objects

```typescript
import { sortAnArray } from 'nhb-toolbox';

const objects = [
  { id: 2, name: 'Item B' },
  { id: 1, name: 'Item A' },
  { id: 3, name: 'Item C' },
];

const sortedObjects = sortAnArray(objects, { sortByField: 'name', sortOrder: 'asc' });
console.log(sortedObjects);
// Output: [{ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }, { id: 3, name: 'Item C' }]
```

### Error Handling

- If the array is empty or not an array, the function will return the array unchanged.
- When sorting objects, ensure the `sortByField` option is provided. If the field is invalid, an error will be thrown.
- If any array element is of an unsupported type (non-string, non-number, non-boolean), an error will be thrown when sorting objects.

### Notes

- The function handles various array types (strings, numbers, booleans, and objects).
- For objects, sorting works based on the specified field (`sortByField`), which can be a string, number, or boolean.
- A shallow copy of the input array is created to ensure the original array remains unmodified.
- The function sorts strings using a natural sorting order. **See [Natural Sort](naturalSort).**

### Types

#### `OrderOption`

```typescript
interface OrderOption {
  sortOrder?: 'asc' | 'desc';
}
```

#### `SortByOption<T>`

```typescript
interface SortByOption<T extends GenericObject> extends OrderOption {
  sortByField: NestedPrimitiveKey<T>;
}
```

#### `SortOptions<T>`

```typescript
type SortOptions<T> = T extends GenericObject ? SortByOption<T> : OrderOption;
```

#### `GenericObject`

```typescript
type GenericObject = Record<string, any>
```

### Conclusion

The `sortAnArray` function provides a flexible way to sort arrays of various types, with options for ascending or descending order, and for sorting object arrays by a specific field.
