---
id: createOptionsArray
title: Create Options Array
---

## createOptionsArray

Converts an array of objects into a formatted array of options.

### Function Signature

```typescript
function createOptionsArray <
 T extends GenericObject,
 K1 extends string = 'value',
 K2 extends string = 'label',
 V extends boolean = false,
>(
 data: T[],
 config: OptionsConfig<T, K1, K2, V>,
): Array<{ [P in K1 | K2]: FieldValue<P, T, K1, K2, V> }>;
```

### Parameters

- **`data`** (`T[]`): An array of objects to convert into options.
- **`config`** (`OptionsConfig<T, K1, K2>`): The configuration object to specify which keys to use for the `value` and `label` fields, and rename them as needed.
  - `firstFieldKey`: The key to use for the value field.
  - `secondFieldKey`: The key to use for the label field.
  - `firstFieldName` (optional): The name for the value field (default is `'value'`).
  - `secondFieldName` (optional): The name for the label field (default is `'label'`).
  - `retainNumberValue` (optional): When `true`, keeps numeric values as numbers instead of converting to strings (default is `false`).

### Return Value

Returns an array of options, where each option contains a `value` and `label` field. The names of these fields can be customized using the `firstFieldName` and `secondFieldName` options in the configuration.

### Example Usage

#### Example 1: Basic Usage

```typescript
import { createOptionsArray } from 'nhb-toolbox';

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
import { createOptionsArray } from 'nhb-toolbox';

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

#### Example 3: Retaining Numeric Values

```typescript
import { createOptionsArray } from 'nhb-toolbox';

const data = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
];

// With retainNumberValue: true (keeps numeric values as numbers)
const numericConfig = {
  firstFieldKey: 'id',
  secondFieldKey: 'name',
  retainNumberValue: true,
};

const numericOptions = createOptionsArray(data, numericConfig);
console.log(numericOptions);
// Output: [
//   { value: 1, label: 'Option 1' },  // Note: value remains a number
//   { value: 2, label: 'Option 2' },
// ]

// With retainNumberValue: false (default - converts all values to strings)
const stringConfig = {
  firstFieldKey: 'id',
  secondFieldKey: 'name',
  retainNumberValue: false, // optional since false is default
};

const stringOptions = createOptionsArray(data, stringConfig);
console.log(stringOptions);
// Output: [
//   { value: '1', label: 'Option 1' },  // Note: value is string
//   { value: '2', label: 'Option 2' },
// ]
```

#### Example 4: Mixed with Custom Field Names

```typescript
import { createOptionsArray } from 'nhb-toolbox';

const data = [
  { code: 100, description: 'Premium Option' },
  { code: 200, description: 'Standard Option' },
];

const config = {
  firstFieldKey: 'code',
  secondFieldKey: 'description',
  firstFieldName: 'id',
  secondFieldName: 'text',
  retainNumberValue: true,
};

const options = createOptionsArray(data, config);
console.log(options);
// Output: [
//   { id: 100, text: 'Premium Option' },  // id remains number
//   { id: 200, text: 'Standard Option' },
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
- If `retainNumberValue` is set to `true`, numeric values from the `firstFieldKey` will remain as numbers in the output. All other values (including booleans, null, and undefined) will still be converted to strings.

---

## `OptionsConfig`

Configuration for the `createOptionsArray` function. Defines the mapping between keys in the input objects and the keys in the output options.

### Interface Signature

```typescript
/**
 * * Configuration for `createOptionsArray`.
 * - Defines the mapping between keys in the input objects and the keys in the output options.
 *
 * @typeParam T - The type of the objects in the input array.
 * @typeParam K1 - The name of the key for the first field in the output (default: `'value'`).
 * @typeParam K2 - The name of the key for the second field in the output (default: `'label'`).
 * @typeParam V - Whether to keep the `value` field as number if it is a number. Defaults to `false`.
 */
interface OptionsConfig<T, K1, K2, V extends boolean = false> {
 /**
  * - The key in the input objects to use for the first field of the option. Only primitive values (`string | number | boolean | null | undefined`) are accepted.
  * @example
  * // If the input objects have an `id` field and you want to use it as the `value` field in the output:
  * createOptionsArray(data, {firstFieldKey: 'id'}).
  */
 firstFieldKey: NormalPrimitiveKey<T>;

 /**
  * - The key in the input objects to use for the second field of the option. Only primitive values (`string | number | boolean | null | undefined`) are accepted.
  * @example
  * // If the input objects have a `name` field and you want to use it as the `label` field in the output:
  * createOptionsArray(data, {firstFieldKey: 'id', secondFieldKey: 'name'}).
  */
 secondFieldKey: NormalPrimitiveKey<T>;

 /**
  * - The name of the first field in the output object.
  * - Defaults to `'value'`.
  * @example
  * // If you want the output field to be named `'key'` instead of `'value'`:
  * createOptionsArray(data, {firstFieldKey: 'id', secondFieldKey: 'name', firstFieldName: 'key'}).
  */
 firstFieldName?: K1;

 /**
  * - The name of the second field in the output object.
  * - Defaults to `'label'`.
  * @example
  * // If you want the output field to be named `'title'` instead of `'label'`:
  * createOptionsArray(data, {firstFieldKey: 'id', secondFieldKey: 'name', firstFieldName: 'key', secondFieldName: 'title'}).
  */
 secondFieldName?: K2;

 /**
  * - If `true`, numeric values from `firstFieldKey` will remain as numbers.
  * - All other values (including booleans, null, undefined) will be converted to strings.
  * - When `false` (default), all values are converted to strings.
  * - Defaults to `false`.
  * @example
  * // Numeric IDs remain as numbers
  * createOptionsArray(data, {
  *   firstFieldKey: 'id',
  *   secondFieldKey: 'name',
  *   retainNumberValue: true
  * });
  *
  * // All values become strings (default behavior)
  * createOptionsArray(data, {
  *   firstFieldKey: 'id',
  *   secondFieldKey: 'name'
  * });
  */
 retainNumberValue?: V;
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

- **`retainNumberValue`** (`V`): Whether to keep numeric values from `firstFieldKey` as numbers instead of converting to strings.
  - Defaults to `false` (all values converted to strings).
  - When `true`, only numeric values remain as numbers - other types (boolean, null, undefined) are still converted to strings.
  - **Example**: To keep numeric IDs as numbers:

    ```typescript
    createOptionsArray(data, {
      firstFieldKey: 'id',
      secondFieldKey: 'name',
      retainNumberValue: true
    });
    ```

---

## Type Definitions

### `NormalPrimitiveKey<T>`

```typescript
type NormalPrimitiveKey<T> = {
 [K in keyof T]: T[K] extends NormalPrimitive ? K : never;
}[keyof T];

/** Union of Normal Primitive Types (i.e. `string | number | boolean | null | undefined`) */
type NormalPrimitive = string | number | boolean | null | undefined;
```

A utility type for keys in `T` that are primitive values (e.g., `string`, `number`, `boolean`, `null`, `undefined`).

### `GenericObject`

```typescript
type GenericObject = Record<string, any>;
```

A generic type representing an object with string keys and any values.

### `FirstFieldKey`

```ts
/** Type for first field key */
export type FirstFieldKey<
 T extends GenericObject,
 K1 extends string = 'value',
 K2 extends string = 'label',
 V extends boolean = false,
> = T[OptionsConfig<T, K1, K2, V>['firstFieldKey']];
```

### `FirstFieldValue`

```ts
/** Type for firs field value */
export type FirstFieldValue<
 T extends GenericObject,
 K1 extends string = 'value',
 K2 extends string = 'label',
 V extends boolean = false,
> =
 V extends true ?
  FirstFieldKey<T, K1, K2, V> extends (
   Exclude<FirstFieldKey<T, K1, K2, V>, number>
  ) ?
   string
  : number
 : string;
```

### `FieldValue`

```ts
/** Type of values for the option fields */
export type FieldValue<
 P extends K1 | K2,
 T extends GenericObject,
 K1 extends string = 'value',
 K2 extends string = 'label',
 V extends boolean = false,
> = P extends K1 ? FirstFieldValue<T, K1, K2, V> : string;
```

### `Option`

```ts
/** Type of an option in `OptionsArray` */
export type Option<
 T extends GenericObject,
 K1 extends string = 'value',
 K2 extends string = 'label',
 V extends boolean = false,
> = { [P in K1 | K2]: FieldValue<P, T, K1, K2, V> };
```
