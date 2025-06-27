---
id: array-metrics
title: Array Metrics Utilities
---

<!-- markdownlint-disable-file MD024 -->

The `Array Metrics` utilities provide calculation tools for performing arithmetic operations like sum, average, or difference on arrays of objects. These functions support dot notation for accessing nested object fields and are particularly useful in transforming structured datasets.

---

## sumByField

The `sumByField` function calculates the total sum of a numeric field across all items in an array.

### Function Signature

```ts
function sumByField<T extends GenericObject>(
  data: T[] | undefined,
  field: NumericDotKey<T>,
  roundTo = 2
): number
````

### Parameters

* `data` (`T[] | undefined`): The array of objects to process.
* `field` (`NumericDotKey<T>`): The field to sum (supports dot notation for nested properties).
* `roundTo` (`number`): Number of decimal places to round to. Defaults to `2`.

### Returns

* `number`: The rounded total sum of all field values.

### Example

```ts
sumByField([{ price: 10.55 }, { price: 3.45 }], 'price');
// → 14
```

---

## averageByField

The `averageByField` function calculates the average of a numeric field across all items.

### Function Signature

```ts
function averageByField<T extends GenericObject>(
  data: T[] | undefined,
  field: NumericDotKey<T>,
  roundTo = 2
): number
```

### Parameters

* `data` (`T[] | undefined`): The array of objects to process.
* `field` (`NumericDotKey<T>`): The field to average (supports nested properties).
* `roundTo` (`number`): Number of decimal places to round to. Defaults to `2`.

### Returns

* `number`: The rounded average value.

### Example

```ts
averageByField([{ marks: 70 }, { marks: 90 }], 'marks');
// → 80
```

---

## sumFieldDifference

The `sumFieldDifference` function calculates the sum of differences between two numeric fields for each item.

### Function Signature

```ts
function sumFieldDifference<T extends GenericObject, P extends NumericDotKey<T>>(
  data: T[] | undefined,
  first: P,
  second: P,
  roundTo = 2
): number
```

### Parameters

* `data` (`T[] | undefined`): The array of objects to process.
* `first` (`P`): The field to subtract **from** (minuend).
* `second` (`P`): The field to subtract (subtrahend).
* `roundTo` (`number`): Number of decimal places to round the result. Defaults to `2`.

### Returns

* `number`: The total sum of differences between the fields.

### Example

```ts
sumFieldDifference([{ buy: 10, sell: 3 }, { buy: 8, sell: 5 }], 'buy', 'sell');
// → 10
```

---

## groupAndSumByField

The `groupAndSumByField` function groups an array of objects by a field and calculates the sum of another numeric field within each group.

> Internally uses [`splitArrayByProperty`](split-array#splitarraybyproperty)

### Function Signature

```ts
function groupAndSumByField<T extends GenericObject>(
  data: T[] | undefined,
  groupBy: NestedPrimitiveKey<T>,
  sumBy: NumericDotKey<T>,
  roundTo = 2
): Array<Record<string, number>>
```

### Parameters

* `data` (`T[] | undefined`): The array to group and process.
* `groupBy` (`NestedPrimitiveKey<T>`): The field to group by (supports nested keys).
* `sumBy` (`NumericDotKey<T>`): The field to sum for each group.
* `roundTo` (`number`): Decimal precision. Defaults to `2`.

### Returns

* `Array<Record<string, number>>`: An array of records with group key as property and sum as value.

### Example

```ts
groupAndSumByField([
  { category: 'A', val: 5 },
  { category: 'A', val: 3 },
  { category: 'B', val: 2 }
], 'category', 'val');
// → [{ A: 8 }, { B: 2 }]
```

---

## groupAndAverageByField

The `groupAndAverageByField` function groups an array of objects by a field and calculates the average of another numeric field for each group.

> Internally uses [`splitArrayByProperty`](split-array#splitarraybyproperty)

### Function Signature

```ts
function groupAndAverageByField<T extends GenericObject>(
  data: T[] | undefined,
  groupBy: NestedPrimitiveKey<T>,
  averageBy: NumericDotKey<T>,
  roundTo = 2
): Array<Record<string, number>>
```

### Parameters

* `data` (`T[] | undefined`): The array to group and process.
* `groupBy` (`NestedPrimitiveKey<T>`): The field to group by (supports dot notation).
* `averageBy` (`NumericDotKey<T>`): The field to average per group.
* `roundTo` (`number`): Decimal precision. Defaults to `2`.

### Returns

* `Array<Record<string, number>>`: An array of records with group key and averaged value.

### Example

```ts
groupAndAverageByField([
  { type: 'A', val: 10 },
  { type: 'A', val: 20 },
  { type: 'B', val: 30 }
], 'type', 'val');
// → [{ A: 15 }, { B: 30 }]
```

---

### Key Features

* **Dot Notation Support**: All utilities support nested fields using dot-notation paths like `meta.sales.total`
* **Fallback-Safe**: Handles undefined arrays and missing fields gracefully
* **Consistent Precision**: All results are optionally rounded with customizable precision
* **Composable**: Works in tandem with utilities like [`splitArrayByProperty`](split-array#splitarraybyproperty) for more complex data processing

:::info Note

These utilities are ideal for quick numeric summaries of object arrays, particularly when used with deeply nested data or grouped reporting needs.

:::

## Aliases

| Main Export              | Alias Names            |
|--------------------------|------------------------|
| `averageByField`         | `avgByField`,          |
| `sumFieldDifference`     | `totalDeltaByField`    |
| `groupAndAverageByField` | `groupAndAvgByField`   |
