---
id: comparison
title: Comparison Methods
---

<!-- markdownlint-disable-file MD024 -->
> Relative Comparison Methods

## compare()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.compare()`. Once registered, all Chronos instances will have access to the `.compare()` method.
:::

### Signature

```typescript
compare(unit: TimeUnit = 'minute', time?: ChronosInput): number
```

### Parameters

- `unit`: Time unit for comparison (default: 'minute')
- `time`: Optional comparison time (default: now)

### Return Type

`number` - Difference in specified units

### Notes

- Negative value indicates past time relative to comparison time
- Positive value indicates future time
- Wrapper around the various `getRelative*` methods

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const pastDate = new Chronos().subtract(2, 'days');
pastDate.compare('day'); // -2

const futureDate = new Chronos().add(3, 'hours'); 
futureDate.compare('hour'); // 3
```

---

## getRelativeYear()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeYear()`. Once registered, all Chronos instances will have access to the `.getRelativeYear()` method.
:::

### Signature

```typescript
getRelativeYear(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Full year difference

### Notes

- Counts complete years between dates
- Accounts for month/day position

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos('2020-06-15');
date.getRelativeYear('2023-05-01'); // -2 (not quite 3 years)
date.getRelativeYear('2023-07-01'); // -3
```

---

## getRelativeMonth()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeMonth()`. Once registered, all Chronos instances will have access to the `.getRelativeMonth()` method.
:::

### Signature

```typescript
getRelativeMonth(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Full month difference

### Notes

- Counts complete months between dates
- Accounts for day position

### Example

```javascript
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos('2023-01-15');
date.getRelativeMonth('2023-03-10'); // -1 (not quite 2 months)
date.getRelativeMonth('2023-03-20'); // -2
```

---

## getRelativeWeek()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeWeek()`. Once registered, all Chronos instances will have access to the `.getRelativeWeek()` method.
:::

### Signature

```typescript
getRelativeWeek(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Week difference

### Notes

- Based on 7-day periods
- Uses same calculation as `getRelativeDay()` divided by 7

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

new Chronos().getRelativeWeek('2023-01-01'); // Weeks between dates
```

---

## getRelativeDay()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeDay()`. Once registered, all Chronos instances will have access to the `.getRelativeDay()` method.
:::

### Signature

```typescript
getRelativeDay(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Day difference

### Special Values

- `-1`: Yesterday
- `0`: Today
- `1`: Tomorrow

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const today = new Chronos();
today.getRelativeDay(); // 0

const yesterday = new Chronos().subtract(1, 'day');
yesterday.getRelativeDay(); // -1

const tomorrow = new Chronos().add(1, 'day');
tomorrow.getRelativeDay(); // 1
```

---

## getRelativeHour()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeHour()`. Once registered, all Chronos instances will have access to the `.getRelativeHour()` method.
:::

### Signature

```typescript
getRelativeHour(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Hour difference

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos().add(90, 'minutes');
date.getRelativeHour(); // 1 (full hours)
```

---

## getRelativeMinute()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeMinute()`. Once registered, all Chronos instances will have access to the `.getRelativeMinute()` method.
:::

### Signature

```typescript
getRelativeMinute(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Minute difference

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos().add(150, 'seconds');
date.getRelativeMinute(); // 2 (full minutes)
```

---

## getRelativeSecond()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeSecond()`. Once registered, all Chronos instances will have access to the `.getRelativeSecond()` method.
:::

### Signature

```typescript
getRelativeSecond(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Second difference

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos().add(1500, 'milliseconds');
date.getRelativeSecond(); // 1 (full seconds)
```

---

## getRelativeMilliSecond()

:::danger[Note]
This method is provided by `relativeTimePlugin`. You must register it using `Chronos.use(relativeTimePlugin)` before calling `.getRelativeMilliSecond()`. Once registered, all Chronos instances will have access to the `.getRelativeMilliSecond()` method.
:::

### Signature

```typescript
getRelativeMilliSecond(time?: ChronosInput): number
```

### Parameters

- `time`: Optional comparison time (default: now)

### Return Type

`number` - Millisecond difference

### Notes

- Most precise relative comparison
- Returns raw millisecond delta

### Example

```ts
import { Chronos } from 'nhb-toolbox';
import { relativeTimePlugin } from 'nhb-toolbox/plugins/relativeTimePlugin';

Chronos.use(relativeTimePlugin);

const date = new Chronos().add(500, 'milliseconds');
date.getRelativeMilliSecond(); // 500
```

These relative comparison methods provide:

- Multiple granularities (years to milliseconds)
- Signed values indicating past/future
- Flexible comparison points
- Consistent immutable return types

The relative methods are particularly useful for:

- Age calculations
- Countdowns/timers
- Expiration checks
- Time-sensitive conditional logic
