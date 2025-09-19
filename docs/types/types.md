---
id: types
title: Type Utilities for TypeScript
description: Comprehensive collection of TypeScript types to accelerate your development workflow.
---

<!-- markdownlint-disable-file MD024 -->
## Types Included

`nhb-toolbox` includes not only functional utilities but also a growing collection of **type-level utilities** designed to enhance type safety and developer ergonomics. These types are available through package subpaths: `'nhb-toolbox/types'` and/or `'nhb-toolbox/[some-path]/types'`. `stylog` module also exports some types: `'nhb-toolbox/stylog'`.

### Import

All types can be imported using this pattern:

```ts
import type { SomeType } from 'nhb-toolbox/types';
// Or
import type { SomeType } from 'nhb-toolbox/some-path/types';
```

### 1. [Utility Types](/docs/types/utility-types)

Type helpers for advanced type manipulation and new type creation:

- Type transformations
- Conditional types
- Create new types

### 2. [Common Types](/docs/types/common-types)

Ready-to-use types for common patterns:

- Well-named, reusable aliases for primitive
- Date/time and other types for quick use

## [Constants](/docs/types/constants)

Along with type definitions, `nhb-toolbox` exports a collection of ready-to-use constants for common development needs. These constants are available through package subpath: `nhb-toolbox/constants`.

### Import

All (20+) [constants](/docs/types/constants) can be imported using this pattern:

```ts
import { CONSTANT_NAME } from 'nhb-toolbox/constants';
```
