---
id: utility-methods
title: Utility Methods
---

<!-- markdownlint-disable-file MD024 -->

## isPageValid()

### Signature

```typescript
isPageValid(page: number): boolean
```

### Parameters

- `page`: Page number to validate

### Return Type

`boolean` - Whether page is within valid range

### Example

```javascript
const p = new Paginator({totalItems: 100});
p.isPageValid(5); // true
p.isPageValid(15); // false
```
