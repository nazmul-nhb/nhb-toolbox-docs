---
id: pagination-calculation
title: Pagination Calculation Methods
---

<!-- markdownlint-disable-file MD024 -->

### offset() / getOffset() / skipCount()

#### Signature

```typescript
offset(): number
getOffset(): number // alias
skipCount(): number // alias
```

#### Return Type

`number` - Items to skip for current page

#### Formula

`(currentPage - 1) * itemsPerPage`

#### Example

```javascript
// For page 3 with 10 items/page:
new Paginator({totalItems: 100, currentPage: 3}).offset(); // 20
```

### totalPages()

#### Signature

```typescript
totalPages(): number
```

#### Return Type

`number` - Total page count

#### Formula

`Math.ceil(totalItems / itemsPerPage)`

#### Example

```javascript
new Paginator({totalItems: 100}).totalPages(); // 10
```

### getMeta()

#### Signature

```typescript
getMeta(): PaginatorMeta
```

#### Return Type

`PaginatorMeta` - Complete pagination metadata

```typescript
interface PaginatorMeta {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  isFirst: boolean;
  isLast: boolean;
  offset: number;
}
```

#### Example

```javascript
new Paginator({
  totalItems: 100,
  currentPage: 3
}).getMeta();
/* Returns:
{
  totalItems: 100,
  currentPage: 3,
  itemsPerPage: 10,
  totalPages: 10,
  hasPrev: true,
  hasNext: true,
  isFirst: false,
  isLast: false,
  offset: 20
}
*/
```
