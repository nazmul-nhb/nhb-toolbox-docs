---
id: page-navigation
title: Page Navigation Methods
---

<!-- markdownlint-disable-file MD024 -->

### nextPage()

#### Signature

```typescript
nextPage(): number | null
```

#### Return Type

`number | null` - Next page number or null if last page

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 5}).nextPage(); // 6
new Paginator({totalItems: 100, currentPage: 10}).nextPage(); // null
```

### prevPage()

#### Signature

```typescript
prevPage(): number | null
```

#### Return Type

`number | null` - Previous page number or null if first page

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 5}).prevPage(); // 4
new Paginator({totalItems: 100, currentPage: 1}).prevPage(); // null
```

### isFirstPage()

#### Signature

```typescript
isFirstPage(): boolean
```

#### Return Type

`boolean` - Whether current page is first

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 1}).isFirstPage(); // true
```

### isLastPage()

#### Signature

```typescript
isLastPage(): boolean
```

#### Return Type

`boolean` - Whether current page is last

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 10}).isLastPage(); // true
```

### hasPrevPage()

#### Signature

```typescript
hasPrevPage(): boolean
```

#### Return Type

`boolean` - Whether previous page exists

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 2}).hasPrevPage(); // true
```

### hasNextPage()

#### Signature

```typescript
hasNextPage(): boolean
```

#### Return Type

`boolean` - Whether next page exists

#### Example

```javascript
new Paginator({totalItems: 100, currentPage: 9}).hasNextPage(); // true
```

### firstPage()

#### Signature

```typescript
firstPage(): number
```

#### Return Type

`number` - First page number (always 1)

#### Example

```javascript
new Paginator({totalItems: 100}).firstPage(); // 1
```

### lastPage()

#### Signature

```typescript
lastPage(): number
```

#### Return Type

`number` - Last page number

#### Example

```javascript
new Paginator({totalItems: 100}).lastPage(); // 10
```

### pageList()

#### Signature

```typescript
pageList(options?: PageListOptions): number[]
```

#### Parameters

```typescript
interface PageListOptions {
  edgeCount?: number; // default: 1
  siblingCount?: number; // default: 1
}
```

#### Return Type

`number[]` - Array of page numbers for UI display

#### Behavior

- Always shows first/last `edgeCount` pages
- Shows `siblingCount` pages around current page
- Merges overlapping ranges

#### Example

```javascript
// For 10 total pages, current page 5:
new Paginator({totalItems: 100, currentPage: 5})
  .pageList({edgeCount: 1, siblingCount: 1});
// Returns [1, 4, 5, 6, 10]
```
