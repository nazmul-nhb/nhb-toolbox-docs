---
id: definePrototypeMethod
title: Define Prototype Method
---

## definePrototypeMethod

The `definePrototypeMethod` function safely defines methods on any prototype — including built-in prototypes — in an idempotent manner. The method is non-enumerable by default and will not overwrite existing methods unless explicitly allowed.

### Function Signature

```ts
definePrototypeMethod<Proto extends object, Name extends keyof Proto>(
  proto: Proto,
  name: Name, 
  impl: (...args: unknown[]) => unknown,
  options?: ProtoMethodOptions
): void
```

### Parameters

| Parameter | Type                            | Description                                            |
| --------- | ------------------------------- | ------------------------------------------------------ |
| `proto`   | `Proto`                         | The target prototype object (e.g., `String.prototype`) |
| `name`    | `Name`                          | The method name to define on the prototype             |
| `impl`    | `Function`                      | The function implementation for the method             |
| `options` | `ProtoMethodOptions` (optional) | Property descriptor settings and overwrite rules       |

### Options

```ts
interface ProtoMethodOptions {
 /**
  * - Whether an existing method with the same name should be replaced.
  * - Defaults to `false`.
  */
 overwrite?: boolean;

 /**
  * - Whether the method should appear during property enumeration (e.g., in `for...in` or `Object.keys`).
  * - Defaults to `false`, matching native prototype method behavior.
  */
 enumerable?: boolean;

 /**
  * - Whether the method's property descriptor can be modified or deleted.
  * - Defaults to `false`.
  * - When `false`, the method cannot be removed or reconfigured, but its value may still be changed if `writable` is `true`.
  */
 configurable?: boolean;

 /**
  * - Whether the method's value may be reassigned after definition.
  * - Defaults to `true` to allow replacement of the function body unless explicitly locked down.
  */
 writable?: boolean;
}
```

### Example Usage

```ts
import { definePrototypeMethod } from 'nhb-toolbox';

// Extend TypeScript global interface
declare global {
  interface String {
    toBang(): string;
  }
}

// Define a custom method on String.prototype
definePrototypeMethod(String.prototype, 'toBang', function (this: String) {
    return this.toString().concat('!');
    // or
    // return this.concat('!');
});

"Hello".toBang(); // "Hello!"

// Safe redefinition (ignored without overwrite)
definePrototypeMethod(String.prototype, 'toBang', () => 'x'); 
"Hello".toBang(); // Still "Hello!"

// Force overwrite
definePrototypeMethod(
  String.prototype,
  'toBang', 
  function (this: String) { return this + '!!!'; },
  { overwrite: true }
);

"Hello".toBang(); // "Hello!!!"
```

### Features

- **Safe by Default**: Won't overwrite existing methods without explicit permission
- **Non-enumerable**: Methods don't appear in `for...in` loops by default
- **TypeScript Ready**: Works with global interface augmentation
- **Configurable**: Fine-grained control over property descriptor

### Use Cases

- Adding utility methods to built-in prototypes
- Polyfilling proposed JavaScript features
- Creating domain-specific language extensions
- Safe prototype augmentation in libraries

### Best Practices

- Always declare TypeScript interfaces when extending built-ins
- Use descriptive method names to avoid conflicts
- Consider namespace prefixes for library code
- Document custom methods clearly for team members
