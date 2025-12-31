import { Chronos, INTERNALS } from 'nhb-toolbox/chronos';
import type { $Chronos } from 'nhb-toolbox/date/types';

// Create a module augmentation to add your custom method to the `Chronos` interface
// This allows TypeScript to recognize the new method on `Chronos` instances
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
export const customPlugin = ($Chronos: $Chronos): void => {
	$Chronos.prototype.customMethod = function (this: Chronos, user) {
		// Example of accessing internals through protected static interface
		const internalDate = $Chronos[INTERNALS].internalDate(this);
		return `Hello ${user}, Welcome to custom plugin! Current date: { local: ${this} } { utc: ${internalDate.toISOString()} }`;
	};
};

Chronos.use(customPlugin);

new Chronos().customMethod('NHB');
