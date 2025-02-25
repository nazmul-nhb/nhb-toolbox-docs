---
id: sortAnArray
title: `sortAnArray` Function
---

## sortAnArray

The `sortAnArray` function sorts an array of different data types (strings, numbers, booleans, or objects) based on the provided sorting options.

## Function Signature

```typescript
export function sortAnArray(array: string[], options?: OrderOption): string[];
export function sortAnArray(array: number[], options?: OrderOption): number[];
export function sortAnArray(array: boolean[], options?: OrderOption): boolean[];
export function sortAnArray<T extends InputObject>(array: T[], options: SortOptions<T>): T[];
export function sortAnArray<T extends InputObject>(array: (number | string | boolean | T)[], options?: SortOptions<T>): (number | string | boolean | T)[];
```

### Parameters

- **`array`**: The array to sort. It can be an array of:
  - Strings
  - Numbers
  - Booleans
  - Objects (with specified fields for sorting)
  
- **`options`**: Sorting options (optional). The available options are:
  - `sortOrder` (optional): Defines the order in which to sort the array:
    - `'asc'` (default): Sort in ascending order.
    - `'desc'`: Sort in descending order.
  - `sortByField` (optional for object arrays): The field of the object to sort by.

### Return Value

Returns the sorted array based on the type of the elements in the array:

- If the array contains strings, it will sort them alphabetically.
- If the array contains numbers, it will sort them numerically.
- If the array contains booleans, it will sort them by their boolean value (`false` < `true`).
- If the array contains objects, it will sort them by the specified field.

### Example Usage

#### Sorting Strings

```typescript
const strings = ['banana', 'apple', 'cherry'];
const sortedStrings = sortAnArray(strings, { sortOrder: 'asc' });
console.log(sortedStrings); // Output: ['apple', 'banana', 'cherry']
```

#### Sorting Numbers

```typescript
const numbers = [5, 3, 8, 1];
const sortedNumbers = sortAnArray(numbers, { sortOrder: 'desc' });
console.log(sortedNumbers); // Output: [8, 5, 3, 1]
```

#### Sorting Booleans

```typescript
const booleans = [true, false, true];
const sortedBooleans = sortAnArray(booleans, { sortOrder: 'asc' });
console.log(sortedBooleans); // Output: [false, true, true]
```

#### Sorting Objects

```typescript
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
- If sorting objects, ensure the `sortByField` option is provided. If the field is not valid, the function will throw an error.
- If any array element is of an unsupported type (non-string, non-number, non-boolean), an error will be thrown when sorting objects.

### Notes

- The function is designed to handle various array types (strings, numbers, booleans, and objects).
- For objects, the sorting will work based on the provided field (`sortByField`). It will sort based on the field's value, which can be a string, number, or boolean.
- The function creates a shallow copy of the input array to ensure that the original array remains unmodified.

### Types

#### `OrderOption`

```typescript
interface OrderOption {
  sortOrder?: 'asc' | 'desc';
}
```

#### `SortOptions<T>`

```typescript
interface SortOptions<T> {
  sortOrder?: 'asc' | 'desc';
  sortByField: keyof T;
}
```

#### `InputObject`

```typescript
interface InputObject {
  [key: string]: string | number | boolean;
}
```

### Conclusion

The `sortAnArray` function provides a flexible way to sort arrays of various types, with options for ascending or descending order, and for sorting object arrays by a specific field.
