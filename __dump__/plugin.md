# Need to work on this in actual Chronos class

## 🛠️ Writing Your Own Custom Plugin

Here's the basic structure of a `Chronos` plugin with access to _protected and/or private_ internals:

```ts
import { Chronos, INTERNALS } from 'nhb-toolbox';

// Create a module augmentation to add your custom method to the Chronos interface
// This allows TypeScript to recognize the new method on Chronos instances
// This should be inside a `d.ts` file or at the top of your plugin file (must be a `.ts` file)
declare module 'nhb-toolbox/chronos' {
  interface Chronos {
    /**
    * @instance Custom `Chronos` method to greet a user with the current date.
    * @param user The name of the user to greet.
    * @returns A greeting message including the user's name and the current ISO dates.
    */
    customMethod(user: string): string;
  }
}

// The plugin function must be in a `.ts` or `.js` file
/** * Plugin to inject `customMethod` into Chronos instances. */
export const customPlugin = (ChronosClass: typeof Chronos): void => {
  ChronosClass.prototype.customMethod = function (this: Chronos, user: string): string {
    // Example of accessing internals through protected static interface
    const internalDate = ChronosClass[INTERNALS].internalDate(this);
    return `Hello ${user}, Welcome to custom plugin! Current date: { local: ${this} } { utc: ${internalDate.toISOString()} }`;
  };
};

// In the same file or another file where you want to use the plugin
import { Chronos } from 'nhb-toolbox';

// Use the plugin in your application's root file or where you initialize Chronos
Chronos.use(customPlugin);

new Chronos().customMethod('NHB');
// => "Hello NHB, Welcome to custom plugin! Current date: { local: 2025-09-22T14:47:44.132+06:00 } { utc: 2025-09-22T08:47:44.132Z }"
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
import { Chronos, INTERNALS } from 'nhb-toolbox';

declare module 'nhb-toolbox/chronos' {
  interface Chronos {
    getDetailedTime(user: string): string;
  }
}

export const timezonePlugin = (ChronosClass: typeof Chronos): void => {
  ChronosClass.prototype.getDetailedTime = function(this: Chronos) {
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

1. Always augment Chronos via module augmentation to ensure TypeScript recognizes your new methods using this subpath: `'nhb-toolbox/chronos'`
2. Import `Chronos` and `INTERNALS` from `'nhb-toolbox'` in your plugin file
3. Always use the static `[INTERNALS]` interface rather than trying to access private fields directly
4. The `withOrigin` method should be used when creating new `Chronos` instances to maintain proper origin tracking
5. For native js `Date` manipulation in your plugin, prefer using `toNewDate` from `ChronosInternals` interface rather than creating `Date` objects directly to maintain consistency with internal handling of `Chronos`

:::

---
