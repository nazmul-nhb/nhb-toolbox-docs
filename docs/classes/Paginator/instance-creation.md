---
id: instance-creation
title: Instance Creation Methods
---

<!-- markdownlint-disable-file MD024 -->

## withPage()

### Signature

```typescript
withPage(page: number): Paginator
```

### Parameters

- `page`: New current page number

### Return Type

`Paginator` - New instance with updated page

### Notes

- Clamps page between 1 and last page
- Original instance remains unchanged

### Example

```javascript
const paginator = new Paginator({totalItems: 100});
paginator.withPage(5); // New instance on page 5
```

## withPerPage()

### Signature

```typescript
withPerPage(perPage: number): Paginator
```

### Parameters

- `perPage`: New items per page value

### Return Type

`Paginator` - New instance with updated items per page

### Notes

- Clamps value to minimum 1
- Automatically adjusts current page if needed

### Example

```javascript
paginator.withPerPage(20); // New instance with 20 items/page
```

## withTotalItems()

### Signature

```typescript
withTotalItems(totalItems: number): Paginator
```

### Parameters

- `totalItems`: New total items count

### Return Type

`Paginator` - New instance with updated total

### Notes

- Clamps value to minimum 0
- Automatically adjusts current page if needed

### Example

```javascript
paginator.withTotalItems(200); // New instance with 200 total items
```

## withOptions()

### Signature

```typescript
withOptions(options: Partial<PaginatorOptions>): Paginator
```

### Parameters

- `options`: Partial options to override

### Return Type

`Paginator` - New instance with merged options

### Notes

- Applies same clamping rules as constructor
- Only provided values are updated

### Example

```javascript
paginator.withOptions({
  itemsPerPage: 25,
  currentPage: 2
});
```
