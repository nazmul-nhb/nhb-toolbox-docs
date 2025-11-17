---
id: get-set
title: Get & Set Methods
---

<!-- markdownlint-disable-file MD024 -->

## get()

Gets the value of a specific time unit from the date.

### Signature

```typescript
get<Unit extends TimeUnit>(unit: Unit): TimeUnitValue<Unit>
```

### Parameters

- `unit`: Time unit to get: [`TimeUnit`](#type-definitions)

### Return Type

[`TimeUnitValue<Unit>`](#type-definitions) - Component value

### Example

```javascript
new Chronos('2025-01-15').get('month'); // 1 (January)
```

:::info[Notes]

- Return value for `month` is `1` based (`1`: January, `12`: December)
- ISO weeks start on Monday, and the first week of the year is the one containing January 4th.

:::

---

## set()

Returns a new `Chronos` instance with the specified unit set to the given value.

### Signature

```typescript
set<Unit extends TimeUnit>(unit: Unit, value: TimeUnitValue<Unit>): Chronos
```

### Parameters

- `unit`: Time unit to set: [`TimeUnit`](#type-definitions)
- `value`: Value to set: [`TimeUnitValue<Unit>`](#type-definitions)

### Return Type

`Chronos` - New instance with updated value

### Example

```javascript
new Chronos('2025-01-15').set('month', 6); // June 15
```

:::info[N.B.]
Unit `month` is `1` based (`1`: January, `12`: December)
:::

:::tip[See Also]
[`with`](/docs/classes/Chronos/statics#with) static method for more options
:::

---

## getTimeStamp()

:::tip[NOTICE]

- The getter method [`timestamp`](/docs/classes/Chronos/getters#timestamp) and `getTimeStamp()` returns the same value.

- The **timestamp in seconds** (which some people considers as `timestamp`) can be accessed using [`unix`](/docs/classes/Chronos/getters#unix) getter method.

:::

### Signature

```typescript
getTimeStamp(): number
  ```

### Return Type

`number` - Milliseconds since Unix epoch (January 1, 1970 UTC)

### Behavior & Notes

- Equivalent to JavaScript [`Date.getTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
- Returns the primitive timestamp value of the `Chronos` instance
- Useful for interoperability with other date libraries or storage

### Example

```typescript
const timestamp = new Chronos('2025-01-01').getTimeStamp();
// Returns: 1735689600000 (exact timestamp for midnight Jan 1, 2025 UTC)

// Comparison with native Date
const jsDate = new Date('2025-01-01');
console.log(jsDate.getTime() === new Chronos(jsDate).getTimeStamp()); // true
```

### Use Cases

- Storing dates in databases as timestamps
- Performance-critical operations where primitive numbers are preferred
- Interfacing with systems that expect Unix timestamps

---

## startOf()

### Signature

```typescript
startOf(unit: TimeUnit, weekStartsOn?: Enumerate<7>): Chronos
```

### Parameters

- `unit`: Unit to start from
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`Chronos` - Start of period

### Example

```javascript
new Chronos('2025-01-15').startOf('month'); // Jan 1
```

---

## endOf()

### Signature

```typescript
endOf(unit: TimeUnit, weekStartsOn?: Enumerate<7>): Chronos
```

### Parameters

- `unit`: Unit to end at
- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`Chronos` - End of period

### Example

```javascript
new Chronos('2025-01-15').endOf('month'); // Jan 31 23:59:59.999
```

---

## firstDayOfMonth()

### Signature

```typescript
firstDayOfMonth(): Chronos
```

### Return Type

`Chronos` - First day of month

### Example

```javascript
new Chronos('2025-01-15').firstDayOfMonth(); // Jan 1
```

---

## lastDayOfMonth()

### Signature

```typescript
lastDayOfMonth(): Chronos
```

### Return Type

`Chronos` - Last day of month

### Example

```javascript
new Chronos('2025-01-15').lastDayOfMonth(); // Jan 31
```

---

## getWeek()

### Signature

```typescript
getWeek(): NumberRange<1, 53>
```

### Return Type

`NumberRange<1, 53>` - ISO week number (1-53)

### Example

```javascript
new Chronos('2022-01-01').getWeek(); // 52 (previous year)
```

---

## setWeek()

### Signature

```typescript
setWeek(week: NumberRange<1, 53>): Chronos
```

### Parameters

- `week`: Week number to set (from `1-53`)

### Return Type

`Chronos` - Instance at start of week

### Example

```javascript
new Chronos('2025-01-01').setWeek(1); // Jan 2 (ISO week 1)
```

---

## getWeekOfYear()

### Signature

```typescript
getWeekOfYear(weekStartsOn?: Enumerate<7>): NumberRange<1, 53>
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`NumberRange<1, 53>` - Week number (`1-53`)

### Example

```javascript
new Chronos('2025-01-01').getWeekOfYear(); // 1 (Sunday-start week)
```

---

## getWeekYear()

### Signature

```typescript
getWeekYear(weekStartsOn?: Enumerate<7>): number
```

### Parameters

- `weekStartsOn`: Week start day (from `0-6`) (default: 0)

### Return Type

`number` - ISO week-numbering year

### Example

```javascript
new Chronos('2025-01-01').getWeekYear(); // 2022 (ISO year)
```

---

## getDayOfYear()

### Signature

```typescript
getDayOfYear(): NumberRange<1, 366>
```

### Return Type

`NumberRange<1, 366>` - Day of year (1-366)

### Example

```javascript
new Chronos('2025-01-01').getDayOfYear(); // 1
```

---

## daysInMonth()

### Signature

```typescript
daysInMonth(): NumberRange<28, 31>
```

### Return Type

`NumberRange<28, 31>` - Days in month (`28 | 29 | 30 | 31`)

### Example

```javascript
new Chronos('2025-02-01').daysInMonth(); // 28
```

---

## Type Definitions

```ts
/** Name of time unit from `year` to `millisecond` */
type TimeUnit = 'year' | 'month' | 'day' | 'week' | 'hour' | 'minute' | 'second' | 'millisecond';

/** Conditional value for `TimeUnit` */
type TimeUnitValue<Unit extends TimeUnit> =
 Unit extends 'month' ? NumberRange<1, 12> // 1-12
 : Unit extends 'week' ? NumberRange<1, 53> // 1-51
 : Unit extends 'day' ? NumberRange<1, 31> // 1-31
 : Unit extends 'hour' ? Enumerate<24> // 0-23
 : Unit extends 'minute' | 'second' ? Enumerate<60> // 0-59
 : Unit extends 'millisecond' ? Milliseconds // 0-999
 : number;
```
