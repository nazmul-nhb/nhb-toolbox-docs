---
id: createOptionsArray
title: Create Options Array
---

## `createOptionsArray`

Converts an array of objects into a formatted array of options.

### Function Signature

```typescript
export const createOptionsArray = <
  T extends GenericObject,
  K1 extends string = 'value',
  K2 extends string = 'label',
>(
  data: T[],
  config: OptionsConfig<T, K1, K2>
): { [P in K1 | K2]: string }[];
```

### Parameters

- **`data`** (`T[]`): An array of objects to convert into options.
- **`config`** (`OptionsConfig<T, K1, K2>`): The configuration object to specify which keys to use for the `value` and `label` fields, and rename them as needed.
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

This `createOptionsArray` function is versatile and can be used in various scenarios where you need to format an array of objects into options. Common use cases include:

- **UI Libraries**: You can use the resulting array of options for form controls like `<Select>` in various UI libraries, such as:
  - **Ant Design**: The `Select` component can utilize this formatted options array for easy selection options.
  - **Material UI (MUI)**: You can pass the options array to the `MenuItem` components inside a `Select` field.
  - **Mantine**: The `Select` component in Mantine can accept this array as input for rendering options.

- **Custom Forms**: Use the formatted options for custom form fields like dropdowns or multi-select fields, where each option needs a `value` and `label` key.

- **Dynamic Lists**: You can utilize this function when rendering dynamic lists or radio button groups, where you need to generate option elements from an array of objects.

- **API Data Transformation**: If your API returns raw data, you can use this function to format the data into a form that’s usable by your front-end components, particularly for components expecting `value` and `label` pairs.

- **Data Tables**: This function can be used to transform data for dropdown columns in data tables, where options are based on dynamic data.

This flexibility makes the `createOptionsArray` function an essential utility for working with selection-based UI components across different frameworks and libraries beyond the mentioned ones.

- If the `data` array is empty or `null`, the function returns an empty array.
- If any of the specified keys are missing from the objects in the `data` array, they will default to an empty string.

---

## `OptionsConfig`

Configuration for the `createOptionsArray` function. Defines the mapping between keys in the input objects and the keys in the output options.

### Interface Signature

```typescript
export interface OptionsConfig<T, K1, K2> {
  firstFieldKey: PrimitiveKey<T>;
  secondFieldKey: PrimitiveKey<T>;
  firstFieldName?: K1;
  secondFieldName?: K2;
}
```

### `OptionsConfig` Properties

- **`firstFieldKey`** (`PrimitiveKey<T>`): The key in the input objects to use for the first field of the option.
  - **Example**: If the input objects have an `id` field and you want to use it as the `value` field in the output, set `createOptionsArray(data, { firstFieldKey: 'id' })`.

- **`secondFieldKey`** (`PrimitiveKey<T>`): The key in the input objects to use for the second field of the option.
  - **Example**: If the input objects have a `name` field and you want to use it as the `label` field in the output, set `createOptionsArray(data, { firstFieldKey: 'id', secondFieldKey: 'name' })`.

- **`firstFieldName`** (`K1`): The name of the first field in the output object.
  - Defaults to `'value'`.
  - **Example**: If you want the output field to be named `'key'` instead of `'value'`, set `createOptionsArray(data, { firstFieldKey: 'id', secondFieldKey: 'name', firstFieldName: 'key' })`.

- **`secondFieldName`** (`K2`): The name of the second field in the output object.
  - Defaults to `'label'`.
  - **Example**: If you want the output field to be named `'title'` instead of `'label'`, set `createOptionsArray(data, { firstFieldKey: 'id', secondFieldKey: 'name', firstFieldName: 'key', secondFieldName: 'title' })`.

---

### Types

### `PrimitiveKey<T>`

```typescript
type PrimitiveKey<T> = {
 [K in keyof T]: T[K] extends Primitive ? K : never;
}[keyof T];

type Primitive = string | number | boolean | null | undefined;
```

A utility type for keys in `T` that are primitive values (e.g., `string`, `number`, `boolean`, `null`, `undefined`).

### `GenericObject`

```typescript
type GenericObject = Record<string, any>;
```

A generic type representing an object with string keys and any values.

---

### Full Example

```typescript
interface Item {
  id: number;
  name: string;
}

const data: Item[] = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' },
];

const config: OptionsConfig<Item, 'key', 'title'> = {
  firstFieldKey: 'id',
  secondFieldKey: 'name',
  firstFieldName: 'key',
  secondFieldName: 'title',
};

const options = createOptionsArray(data, config);

console.log(options);
// Output: [{ key: '1', title: 'Item A' }, { key: '2', title: 'Item B' }, { key: '3', title: 'Item C' }]
```
