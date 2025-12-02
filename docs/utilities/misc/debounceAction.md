---
id: debounceAction
title: Debounce Function/Action
---

## debounceAction

Creates a debounced version of a callback that delays its execution until after a specified period of inactivity. Useful for search, auto-complete, resize, and other rapid trigger scenarios.

---

### Import

```typescript
import { debounceAction } from 'nhb-toolbox';
```

---

### Function Signature

```typescript
debounceAction<T extends VoidFunction>(callback: T, delay?: number): DelayedFn<T>
```

---

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Basic Debounce">

```typescript
const debouncedSearch = debounceAction((query: string) => {
  console.log(`Searching for: ${query}`);
}, 300);

debouncedSearch('laptop');
// The callback is executed after 300ms of no new calls.
```

</TabItem>
<TabItem value="Form Input" label="Form Input Example">

```typescript
const onInputChange = debounceAction((value: string) => {
  fetchSuggestions(value);
}, 250);

<input onInput={(e) => onInputChange(e.target.value)} />
```

</TabItem>
<TabItem value="Default Delay" label="Default Delay">

```typescript
const log = debounceAction(() => console.log('Done!'));
// Uses default delay of 300ms
log();
```

</TabItem>
</Tabs>

---

### API Reference

#### Type Definitions

```ts
/** Generic function type that returns `void` */
type VoidFunction = (...args: any[]) => void;

/** Debounced function type after certain delay */
type DelayedFn<T extends VoidFunction> = (...args: Parameters<T>) => void;
```

#### Parameters

| Name      | Type        | Description                                           |
|-----------|-------------|------------------------------------------------------|
| callback  | VoidFunction| The function to debounce.                            |
| delay     | number      | Delay in milliseconds (default: 300).                |

#### Returns

A debounced version of the callback which delays invocation.

---

### Key Features

1. **Debounces Any Function:** Works with any argument signature.
2. **Customizable Delay:** Default and custom delay support.
3. **Preserves Parameters:** Arguments are passed to the debounced function.
4. **Multiple Calls:** Only the last call within the delay interval triggers the callback.

---

### Limitations

1. **No Immediate Mode:** There's no built-in "immediate" execution option.
2. **No Cancel/Flush:** Does not expose cancel or flush controls.
3. **Browser-only:** Assumes `setTimeout`/`clearTimeout` environment.

---

### Notes

- Debounce helps avoid excessive triggers (e.g., API calls per keystroke).
- Useful for typeahead, filtering, resize/listen events, and more.
- For leading edge or cancellation support, consider a more advanced debounce library.
- Please refer to [throttleAction](throttleAction) to throttle an action or function.

---

### Recommended Use Cases

- Search inputs (wait until user stops typing).
- Window resizing or scroll event handlers.
- Button click spamming protection.

---

**Conclusion:**  
`debounceAction` is a fast, minimal, and type-safe way to control callback frequency in all your interactive web projects!
