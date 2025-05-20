---
id: predicates
title: Predicate Functions
---

## Pure Boolean Validators for Runtime Checks

NHB Toolbox provides predicate functions that deliver simple, efficient truth tests without type system side effects. These functions return `boolean` and work everywhere - from array filters to conditional logic.

### Key Characteristics

- **`boolean` Return Only** - No type narrowing (use guards for that)
- **Zero Side Effects** - Won't alter TypeScript's type inference
- **Lightweight** - Optimized for performance-critical validation
- **Composable** - Easily combine with `&&`/`||` operators

### Common Use Cases

```ts
// 1. Array filtering
const validEmojis = emojiInputs.filter(isEmojiOnly);

// 2. Conditional logic
if (isEmojiOnly(value)) {
  saveToDatabase(value);
}
```

---

Browse by category or use the search to find the perfect predicate function for your task.
