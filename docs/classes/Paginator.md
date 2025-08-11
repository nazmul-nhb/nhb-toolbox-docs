---
id: Paginator
title: Paginator - Paginate with minimal efforts
---

<!-- markdownlint-disable-file MD024 -->
## `Paginator`

This documentation provides complete coverage of all methods in the `Paginator` class, organized into logical categories with detailed sections for each method.

### Table of Contents

- [Constructor](#constructor)
- [Instance Creation Methods](Paginator/instance-creation)
- [Pagination Calculation Methods](Paginator/pagination-calculation)
- [Page Navigation Methods](Paginator/page-navigation)
- [Utility Methods](Paginator/utility-methods)
- [Static Methods](Paginator/static-methods)

---

### Constructor

#### Signature

```typescript
constructor(options: PaginatorOptions)
```

#### Parameters

- `options`: Pagination configuration

```typescript
interface PaginatorOptions {
  totalItems: Numeric;
  itemsPerPage?: Numeric; // default: 10
  currentPage?: Numeric; // default: 1
}
```

#### Behavior

- Initializes paginator with provided values
- Applies safety clamping:
  - `totalItems` ≥ 0
  - `itemsPerPage` ≥ 1
  - `currentPage` ≥ 1

#### Example

```javascript
new Paginator({
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 3
});
```

---

### Type Definitions

#### Numeric

```typescript
type Numeric = number | `${number}`;
```

Union type accepting numbers or numeric strings

#### PaginatorOptions

```typescript
interface PaginatorOptions {
  totalItems: Numeric;
  itemsPerPage?: Numeric;
  currentPage?: Numeric;
}
```

Initialization options with defaults

#### PaginatorMeta

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

Complete pagination metadata

#### PageListOptions

```typescript
interface PageListOptions {
  edgeCount?: number;
  siblingCount?: number;
}
```

Page list generation options

#### FromMetaOptions

```typescript
type FromMetaOptions = Pick<PaginatorMeta, 'totalItems' | 'itemsPerPage' | 'currentPage'>;
```
