---
id: static-methods
title: Static Methods
---

<!-- markdownlint-disable-file MD024 -->

### fromMeta()

#### Signature

```typescript
static fromMeta(meta: FromMetaOptions): Paginator
```

#### Parameters

```typescript
type FromMetaOptions = Pick<
  PaginatorMeta, 
  'totalItems' | 'itemsPerPage' | 'currentPage'
>;
```

#### Return Type

`Paginator` - New instance from meta object

#### Example

```javascript
Paginator.fromMeta({
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 3
});
```
