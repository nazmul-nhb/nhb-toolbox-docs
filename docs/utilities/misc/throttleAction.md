---
id: throttleAction
title: Throttle Function/Action
---

## throttleAction

Creates a throttled version of a callback that ensures it executes at most once every specified interval. Ideal for controlling calls on rapid, repeat events like scrolling or resizing.

---

### Import

```typescript
import { throttleAction } from 'nhb-toolbox';
```

---

### Function Signature

```typescript
throttleAction<T extends VoidFunction>( callback: T, delay?: number): ThrottledFn<T>
```

---

### Usage Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Basic" label="Throttle Window Resize">

```typescript
const throttledResize = throttleAction(() => {
  console.log('Resized!');
}, 300);

window.addEventListener('resize', throttledResize);
// Logs at most once every 300ms while resizing.
```

</TabItem>
<TabItem value="Scroll Handler" label="Scroll Events">

```typescript
const throttledScroll = throttleAction((e: Event) => {
  handleScroll(e);
}, 200);

window.addEventListener('scroll', throttledScroll);
```

</TabItem>
<TabItem value="Default Delay" label="Default Delay">

```typescript
const log = throttleAction(() => console.log('Ready!'));
// Uses default delay of 150ms
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
type ThrottledFn<T extends VoidFunction> = (...args: Parameters<T>) => void;
```

#### Parameters

| Name      | Type        | Description                                               |
|-----------|-------------|----------------------------------------------------------|
| callback  | VoidFunction| The function to throttle.                                |
| delay     | number      | Delay in milliseconds (default: 150).                    |

#### Returns

A throttled version of the callback, invoked at most once per interval.

---

### Key Features

1. **Generic:** Works with any callback signature.
2. **Prevents Flooding:** Ensures even spacing between calls.
3. **Custom or Default Interval:** Default 150ms interval or specify custom.

---

### Limitations

1. **No Trailing Calls:** Only leading edge execution; trailing invocation is not supported.
2. **No Cancel/Flush:** Does not support canceling or flushing scheduled calls.
3. **No Context Retention:** `this` is not bound or managed.

---

### Notes

- Use throttle for scroll, resize, or mouse-move events to protect performance.
- Use debounce for “do X after no more triggers”; throttle for “do X at regular intervals”.
- Please refer to [debounceAction](debounceAction) to debounce an action or function.

---

### Recommended Use Cases

- Window resize or scroll listeners.
- Animation frame limiting.
- Preventing button mashing event floods.

---

**Conclusion:**  
`throttleAction` is the go-to for managing high-frequency events and protecting performance in your web apps.
