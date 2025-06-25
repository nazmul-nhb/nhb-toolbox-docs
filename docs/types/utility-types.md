---
id: utility-types
title: TypeScript Utility Types
sidebar_label: Utility Types
---

## Branding & Special Types

### `Branded<T, B>`

```ts
type UserID = Branded<string, "UserID">;
const id: UserID = "user_123" as UserID;
```

- Creates branded/nominal types
- `T`: Base type to brand
- `B`: Brand identifier (string/symbol)

### `FlattenPartial<T>`

```ts
type User = Partial<{ name: string; meta: { age: number } }>;
type FlatUser = FlattenPartial<User>;
// Result: { name?: string; meta?: { age: number } }

type DoublePartial = Partial<Partial<{ id: number }>>;
type Flattened = FlattenPartial<DoublePartial>; 
// Result: Partial<{ id: number }> (not Partial<Partial<{ id: number }>>)
```

**Purpose**: Prevents nested `Partial` types when composing partial objects

**Type Parameter**:

- `T`: An object type that may contain nested `Partial` wrappers

**Key Behavior**:

- Removes redundant `Partial` wrappers
- Preserves the original partial structure
- Doesn't make nested properties optional - only flattens the partial wrappers

**When to Use**:

- When working with composed partial types
- When you want to avoid `Partial<Partial<T>>` patterns
- When you need to maintain explicit partiality at just one level

## Key Extraction

### `NormalPrimitiveKey<T>`

```ts
type Config = { name: string; age: number; active: boolean | null };
type PrimKeys = NormalPrimitiveKey<Config>; // "name" | "age" | "active"
```

- Gets keys with primitive values
- `T`: Source object type

<!-- ### `OwnKeys<T>`

```ts
class Base { baseProp = 1 }
class Child extends Base { childProp = 2 }
type ChildOwnKeys = OwnKeys<Child>; // "childProp" | "baseProp"
```

- Gets only own property keys
- `T`: Object type to inspect -->

<!-- ### `NonNullishPrimitiveKey<T>`

```ts
type Data = { id: string; count: number; active?: boolean };
type Keys = NonNullishPrimitiveKey<Data>; // "id" | "count"
```

- Gets non-nullish primitive keys
- `T`: Source object type -->

### `HasMethods<T>`

```ts
type WithMethods = { name: string; greet(): void };
type WithoutMethods = { name: string; age: number };

type A = HasMethods<WithMethods>; // true
type B = HasMethods<WithoutMethods>; // false
```

- Checks if type has methods
- `T`: Type to check

## Value & Key Utilities

### `ValueOf<T>`

```ts
type User = { name: string; age: number };
type UserValues = ValueOf<User>; // string | number
```

- Gets union of all property values
- `T`: Object type

### `KeysOfUnion<T>`

```ts
type A = { a: string }; 
type B = { b: number };
type UnionKeys = KeysOfUnion<A | B>; // "a" | "b"
```

- Gets keys from union types
- `T`: Union type

## Object Transformation

### `Mutable<T>`

```ts
type ReadonlyUser = { readonly name: string };
type WritableUser = Mutable<ReadonlyUser>; // { name: string }
```

- Removes readonly modifiers
- `T`: Readonly type

### `Immutable<T>`

```ts
type User = { name: string };
type ReadonlyUser = Immutable<User>; // { readonly name: string }
```

- Adds readonly recursively
- `T`: Type to make immutable

### `Merge<T, U>`

```ts
type A = { id: number; name: string };
type B = { name: boolean; active: boolean };
type Combined = Merge<A, B>; // { id: number; name: boolean; active: boolean }
```

- Merges types with U taking precedence
- `T`: First type
- `U`: Second type

### `OmitByValue<T, ValueType>`

```ts
type Model = { id: number; name: string; hidden: boolean };
type PublicModel = OmitByValue<Model, boolean>; // { id: number; name: string }
```

- Omits properties by value type
- `T`: Source type
- `ValueType`: Type to match against

### `RequireOnly<T, K>`

```ts
type User = { id?: number; name?: string };
type UserWithId = RequireOnly<User, 'id'>; // { id: number; name?: string }
```

- Makes specific keys required
- `T`: Source type
- `K`: Keys to require

### `Prettify<T>`

```ts
type Complex = { a: string } & { b: number };
type Clean = Prettify<Complex>; // Shows as { a: string; b: number } in IDEs
```

- Flattens complex types for display
- `T`: Complex type

### `ExtractOptional<T>`, `ExtractRequired<T>`

```ts
type Props = { id: string; name?: string; age?: number };
type Optional = ExtractOptional<Props>; // { name?: string; age?: number }
type Required = ExtractRequired<Props>; // { id: string }
```

- Filters optional/required properties
- `T`: Source type

## Literal & Union Types

### `LooseLiteral<T>`

```ts
type Color = LooseLiteral<'red' | 'blue'>;
const c1: Color = 'red'; // Valid
const c2: Color = 'other'; // Other string values are also valid
```

- Allows base type while preserving literal values for autocomplete
- `T`: Literal union type

### `OneOf<T, U>`

```ts
type A = { login: string };
type B = { token: string };
type Auth = OneOf<A, B>; // Either { login } OR { token }
```

- Creates mutually exclusive type
- `T`: First option
- `U`: Second option

## Tuple & Array Utilities

### `TupleToUnion<T>`

```ts
const roles = ['admin', 'user'] as const;
type Role = TupleToUnion<typeof roles>; // "admin" | "user"
```

- Converts tuple to union
- `T`: Tuple type

### `TupleOf<T, N>`

```ts
type ThreeNumbers = TupleOf<number, 3>; // [number, number, number]
```

- Creates fixed-length tuple
- `T`: Element type
- `N`: Length

### `ValueOptional<O, K>`

```ts
type User = { name: string; age: number };
type PartialUser = ValueOptional<User, 'name'>; // { name: string | undefined; age: number }
```

- Makes values optional
- `O`: Source type
- `K`: Keys to make optional

## Numeric Ranges

### `Enumerate<N>`

```ts
type Index = Enumerate<3>; // 0 | 1 | 2
```

- Creates number union
- `N`: Max number (exclusive)

:::caution Note
This utility supports ranges up to 998 due to TypeScript recursion limits.
:::

### `NumberRange<From, To>`

```ts
type Pages = NumberRange<1, 5>; // 1 | 2 | 3 | 4 | 5
```

- Creates numeric range
- `From`: Start (inclusive)
- `To`: End (inclusive)

:::caution Note
This utility supports ranges up to 998 due to TypeScript recursion limits.
:::

## Dot Notation

### `DotNotationKey<T>`

```ts
type User = { name: string; address: { city: string } };
type Paths = DotNotationKey<User>; // "name" | "address" | "address.city"
```

- Gets nested property paths
- `T`: Object type

### `NestedKeyString<T>`

```ts
type Data = { id: string; meta: { tag: string } };
type StringPaths = NestedKeyString<Data>; // "id" | "meta.tag"
```

- Gets paths to string properties
- `T`: Object type

### `NestedPrimitiveKey<T>`

```ts
type Product = { name: string; price: number; meta: { stock: boolean } };
type PrimPaths = NestedPrimitiveKey<Product>; 
// "name" | "price" | "meta.stock"
```

- Gets paths to primitive properties
- `T`: Object type
