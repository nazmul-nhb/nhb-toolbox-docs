# Need to work on this in actual Chronos class

## 🛠️ Writing a Plugin

Here's the basic structure of a `Chronos` plugin with access to protected and/or private internals:

```ts
type ChronosConstructor = import('../Chronos').Chronos;
type MainChronos = typeof import('../Chronos').Chronos;

const INTERNALS = Symbol('Internals');

declare module '../Chronos' {
  interface Chronos {
    customMethod(): string;
  }
}

/**
 * Plugin to inject `customMethod` into Chronos instances.
 */
export const customPlugin = (ChronosClass: MainChronos): void => {
  ChronosClass.prototype.customMethod = function (
    this: ChronosConstructor
  ): string {
    // Example of accessing internals through protected static interface
    const internalDate = ChronosClass[INTERNALS].internalDate(this);
    return `Hello from plugin! Current date: ${internalDate}`;
  };
};
```

---

### 🔐 Accessing Internals

Plugins can safely access protected and/or private internals through the static `[INTERNALS]` interface:

#### Available Internal Methods & Properties

```ts
interface ChronosInternals {
  /**
   * Creates a new Chronos instance with origin tracking
   * @param instance - Chronos instance to operate on
   * @param method - Name of the method creating this instance
   * @param label - Optional UTC offset label
   */
  withOrigin(
    instance: Chronos,
    method: ChronosMethods,
    label?: UTCOffSet,
  ): Chronos;

  /**
   * Creates a new Date object from Chronos input
   * @param instance - Chronos instance to operate on
   * @param value - Input value to convert (optional, uses current date if omitted)
   */
  toNewDate(instance: Chronos, value?: ChronosInput): Date;

  /**
   * Gets the internal Date object
   * @param instance - Chronos instance to access
   */
  internalDate(instance: Chronos): Date;

  /**
   * Gets the current UTC offset
   * @param instance - Chronos instance to access
   */
  offset(instance: Chronos): UTCOffSet;
}
```

### 🚀 Usage Example

```ts
import { INTERNALS } from 'nhb-toolbox';

export const timezonePlugin = (ChronosClass: MainChronos): void => {
  ChronosClass.prototype.getDetailedTime = function(this: ChronosConstructor) {
    const internals = ChronosClass[INTERNALS];
    const date = internals.internalDate(this);
    const offset = internals.offset(this);
    
    return {
      time: date.toISOString(),
      offset,
      origin: 'timezonePlugin'
    };
  };
};
```

---

:::caution[Important Notes]

1. Always use the static `[INTERNALS]` interface rather than trying to access private fields directly
2. The `withOrigin` method should be used when creating new Chronos instances to maintain proper origin tracking
3. For date manipulation, prefer using `toNewDate` rather than creating Date objects directly to maintain consistency with Chronos' internal handling

:::

---
