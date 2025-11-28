---
id: typed-case-converters
title: Typed String Case Converters
---

The typed case converters provide a collection of utility functions that convert strings into various case formats while preserving TypeScript string literal types. These utilities are ideal for use with short literal strings where you want type safety and IntelliSense support.

:::tip[Key Features]

- **Type Safety**: All functions return appropriately typed string literals
- **Custom Delimiters**: Support for additional delimiter characters beyond the default set
- **Performance Optimized**: Designed for short strings (up to 45 characters) for best TypeScript performance

:::

:::caution[Limitations]

- **TypeScript Character Limit**: For reliable literal inference, TypeScript supports up to ~45 characters
- **No Acronym Handling**: These utilities don't properly handle acronyms (use [`convertStringCase`](convertStringCase) for acronym support)
- **Short Strings Recommended**: Best performance with strings under 45 characters

:::

## Import

```ts
import {
     toCamelCase, toPascalCase, toSnakeCase, toKebabCase,
     toTrainCase, toDotCase, toPathCase, toConstantCase,
     toPascalSnakeCase, toTitleCase, toSentenceCase 
} from 'nhb-toolbox/change-case'
```

## Available Converters

### toCamelCase

Converts a string into `camelCase` format.

```typescript
toCamelCase("hello world")            // "helloWorld"
toCamelCase("my-awesome_string")      // "myAwesomeString"
toCamelCase("value*with+custom", "*+") // "valueWithCustom"
```

### toPascalCase

Converts a string into `PascalCase` format.

```typescript
toPascalCase("hello world")            // "HelloWorld"
toPascalCase("my-awesome_string")      // "MyAwesomeString"
toPascalCase("value*with+custom", "*+") // "ValueWithCustom"
```

### toSnakeCase

Converts a string into `snake_case` format.

```typescript
toSnakeCase("hello world")            // "hello_world"
toSnakeCase("my-awesome_string")      // "my_awesome_string"
toSnakeCase("value*with+custom", "*+") // "value_with_custom"
```

### toKebabCase

Converts a string into `kebab-case` format.

```typescript
toKebabCase("hello world")            // "hello-world"
toKebabCase("my-awesome_string")      // "my-awesome-string"
toKebabCase("value*with+custom", "*+") // "value-with-custom"
```

### toTrainCase

Converts a string into `Train-Case` format.

```typescript
toTrainCase("hello world")            // "Hello-World"
toTrainCase("my-awesome_string")      // "My-Awesome-String"
toTrainCase("value*with+custom", "*+") // "Value-With-Custom"
```

### toDotCase

Converts a string into `dot.case` format.

```typescript
toDotCase("hello world")            // "hello.world"
toDotCase("my-awesome_string")      // "my.awesome.string"
toDotCase("value*with+custom", "*+") // "value.with.custom"
```

### toPathCase

Converts a string into `path/case` format.

```typescript
toPathCase("hello world")            // "hello/world"
toPathCase("my-awesome_string")      // "my/awesome/string"
toPathCase("value*with+custom", "*+") // "value/with/custom"
```

### toConstantCase

Converts a string into `CONSTANT_CASE` format.

```typescript
toConstantCase("hello world")            // "HELLO_WORLD"
toConstantCase("my-awesome_string")      // "MY_AWESOME_STRING"
toConstantCase("value*with+custom", "*+") // "VALUE_WITH_CUSTOM"
```

### toPascalSnakeCase

Converts a string into `Pascal_Snake_Case` format.

```typescript
toPascalSnakeCase("hello world")            // "Hello_World"
toPascalSnakeCase("my-awesome_string")      // "My_Awesome_String"
toPascalSnakeCase("value*with+custom", "*+") // "Value_With_Custom"
```

### toTitleCase

Converts a string into `Title Case` format.

```typescript
toTitleCase("hello world")            // "Hello World"
toTitleCase("my-awesome_string")      // "My Awesome String"
toTitleCase("value*with+custom", "*+") // "Value with Custom"
```

### toSentenceCase

Converts a string into `Sentence case` format.

```typescript
toSentenceCase("hello world")            // "Hello world"
toSentenceCase("my-awesome_string")      // "My awesome string"
toSentenceCase("value*with+custom", "*+") // "Value with custom"
```

## Default Delimiters

All converters recognize these default delimiter characters:

- Space (` `)
- Hyphen (`-`)
- Underscore (`_`)
- Period (`.`)
- Forward slash (`/`)

## Custom Delimiters

You can provide additional delimiter characters as the second parameter:

```typescript
// Using custom delimiters
toCamelCase("hello*world+test", "*+") // "helloWorldTest"
```

## Type Definitions

The package includes comprehensive type definitions that power the string literal inference:

- `CamelCase<Str, Del>`
- `SnakeCase<Str, Del>`
- `KebabCase<Str, Del>`
- `PascalCase<Str, Del>`
- `TrainCase<Str, Del>`
- `DotCase<Str, Del>`
- `PathCase<Str, Del>`
- `ConstantCase<Str, Del>`
- `PascalSnakeCase<Str, Del>`
- `TitleCase<Str, Del>`
- `SentenceCase<Str, Del>`

## When to Use

**Use these typed converters when:**

- Working with short string literals (under 45 characters)
- You need TypeScript IntelliSense and type safety
- Acronym preservation isn't required

**Use `convertStringCase` when:**

- Working with longer strings
- You need acronym preservation
- You need advanced Unicode handling
- You need punctuation preservation

## See Also

- [**convertStringCase**](convertStringCase) - For general purpose case conversion with advanced features
- [**capitalizeString**](capitalizeString) - For simple capitalization needs
