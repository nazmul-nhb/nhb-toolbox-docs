---
id: optionsArray
title: Create Options Array
---

## createOptionsArray

The `createOptionsArray` function converts an array of objects into a formatted array of options, which can be used in select dropdowns or other UI elements.

### Function Signature

```typescript
export const createOptionsArray = <
  T extends OptionInput,
  K1 extends string = 'value',
  K2 extends string = 'label'
>(
  data: T[],
  config: OptionsConfig<T, K1, K2>
): { [P in K1 | K2]: string }[];
```

### Parameters

- **`data`**: An array of objects that will be converted into options.
- **`config`**: The configuration object specifying:
  - `firstFieldKey`: The key to use for the value field.
  - `secondFieldKey`: The key to use for the label field.
  - `firstFieldName` (optional): The name for the value field (default is `'value'`).
  - `secondFieldName` (optional): The name for the label field (default is `'label'`).

### Return Value

Returns an array of options, where each option contains a `value` and `label` field. The names of these fields can be customized using the `firstFieldName` and `secondFieldName` options in the configuration.

### Example Usage

#### Example 1: Basic Usage

```typescript
const data = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
];

const config = { firstFieldKey: 'id', secondFieldKey: 'name' };

const options = createOptionsArray(data, config);
console.log(options);
// Output: [
//   { value: '1', label: 'Option 1' },
//   { value: '2', label: 'Option 2' },
// ]
```

#### Example 2: Custom Field Names

```typescript
const data = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
];

const config = {
  firstFieldKey: 'id',
  secondFieldKey: 'name',
  firstFieldName: 'customValue',
  secondFieldName: 'customLabel',
};

const options = createOptionsArray(data, config);
console.log(options);
// Output: [
//   { customValue: '1', customLabel: 'Option 1' },
//   { customValue: '2', customLabel: 'Option 2' },
// ]
```

### Notes

- If the `data` array is empty or `null`, the function returns an empty array.
- If any of the specified keys are missing from the objects in the `data` array, they will default to an empty string.

### Types

#### `OptionInput`

```typescript
interface OptionInput {
  [key: string]: string | number;
}
```

#### `OptionsConfig<T, K1, K2>`

```typescript
interface OptionsConfig<T, K1 extends string, K2 extends string> {
  firstFieldKey: keyof T;
  secondFieldKey: keyof T;
  firstFieldName?: K1;
  secondFieldName?: K2;
}
```
