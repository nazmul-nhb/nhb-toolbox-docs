---
id: string-case-checkers  
title: String Case Checkers  
---

<!-- markdownlint-disable-file MD024 -->
## isCamelCase

Checks if a string follows the **camelCase** format.

### Function Signature

```ts
function isCamelCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in camelCase, otherwise `false`.

### Example

```ts
isCamelCase('camelCase'); // true
isCamelCase('CamelCase'); // false
```

---

## isPascalCase

Checks if a string follows the **PascalCase** format.

### Function Signature

```ts
function isPascalCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in PascalCase, otherwise `false`.

### Example

```ts
isPascalCase('PascalCase'); // true
isPascalCase('pascalCase'); // false
```

---

## isSnakeCase

Checks if a string follows the **snake_case** format.

### Function Signature

```ts
function isSnakeCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in snake_case, otherwise `false`.

### Example

```ts
isSnakeCase('snake_case'); // true
isSnakeCase('Snake_Case'); // false
```

---

## isKebabCase

Checks if a string follows the **kebab-case** format.

### Function Signature

```ts
function isKebabCase(str: string): boolean;
```

### Parameters

- **`str`**: The string to check.

### Returns

Returns `true` if the string is in kebab-case, otherwise `false`.

### Example

```ts
isKebabCase('kebab-case'); // true
isKebabCase('Kebab-Case'); // false
```
