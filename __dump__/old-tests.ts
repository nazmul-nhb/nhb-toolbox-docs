import {
	calculateHCF,
	Chronos,
	cloneObject,
	Color,
	Converter,
	convertMinutesToTime,
	convertObjectValues,
	convertStringCase,
	Currency,
	extractKeys,
	factorial,
	flattenObjectDotNotation,
	flattenObjectKeyValue,
	generateRandomColor,
	generateRandomID,
	getFactors,
	getNthFibonacci,
	groupArrayByProperty,
	isDateLike,
	isDeepEqual,
	isEmptyObject,
	isObject,
	isObjectWithKeys,
	mergeAndFlattenObjects,
	mergeObjects,
	romanToInteger,
	toRomanNumeral,
	verbalizer,
	wordsToNumber,
} from 'nhb-toolbox';
import type { Enumerate } from 'nhb-toolbox/number/types';
import type { DotNotationKey, GenericObject } from 'nhb-toolbox/object/types';
import { LogStyler, Stylog } from 'nhb-toolbox/stylog';
import type { Primitive, ValidArray } from 'nhb-toolbox/types';
import type {
	DeepPartialAll,
	IsStrictObject,
	MapObjectValues,
	OneOf,
	PickByValue,
	Prettify,
	RenameKeys,
	Repeat,
	Split,
} from 'nhb-toolbox/utils/types';
import { Article } from './article';
import { customPlugin } from './chr';

Chronos.use(customPlugin);

// console.info(new Chronos('2025-06-01').lastDateOfMonth);

// console.info(chronos('2025-01-15').toArray());
// console.info(chronos().getZodiacSign({ birthDate: '04-30' }));

// console.info(getInstanceMethodNames(Chronos));
function formatWithLeadingZero(minutes: number) {
	const [h, m] = convertMinutesToTime(minutes).split(':');
	return `${h.padStart(2, '0')}:${m}`;
}
console.info(formatWithLeadingZero(32));

const result12 = mergeObjects({ a: 1, b: 2 }, { p: { c: 3 }, d: 4 }, { p: { e: 5 }, f: 6 });

// console.info(result12);

const obj3 = { a: 1, b: { x: 10 } };
const obj4 = { b: { y: 20 }, c: 3 };
const merged = mergeObjects(obj3, obj4);
// console.info(merged); // { a: 1, b: { x: 10, y: 20 }, c: 3 }

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3, e: new Date() } };
const result = mergeAndFlattenObjects(obj1, obj2);
// Returns { 'a': 1, 'b.c': 2, 'b.d': 3, 'e': 4 }
const test = result['b.e'];
// console.info(test);

const nested = {
	user: {
		details: {
			name: 'John',
			age: 30,
			color: new Color(),
			a: { b: 5, c: { date: new Chronos() } },
		},
	},
	money: 500,
	date: new Date(),
};
const flat = flattenObjectKeyValue(nested);
// Returns { name: 'John', age: 30 }
const test2 = flat.date.getMonth();

// console.info(test2, flat);

const flat2 = flattenObjectDotNotation(nested);
const test3 = flat2['user.details.a.c.date'].getDayOfYear();
const test4 = flat2['user.details.color.hsla'];
const test5 = flat2.date.getFullYear();

// console.info({ test3, test4, test5 });

const data = {
	meta: {
		version: '1.0',
		config: {
			debug: true,
			h: [{ b: 5 }],
		},
	},
	items: ['a', 'b'], // Arrays remain untouched
};

const final1 = flattenObjectKeyValue(data);
// { version: '1.0', debug: true, items: ['a', 'b'] }

const f1 = final1.h[0].b;

// console.info(f1);

const config = {
	server: {
		host: 'localhost',
		ports: { http: 80, https: 443 },
	},
};

const c1 = flattenObjectDotNotation(config);
// {
//   'server.host': 'localhost',
//   'server.ports.http': 80,
//   'server.ports.https': 443
// }

const cf1 = c1['server.ports.https'];
// console.info(cf1, c1);
const rg = groupArrayByProperty([nested], 'user.details.color.hex');
// console.log(rg);

// console.log(isNumericString('0xFF'));

console.info(
	convertStringCase('XML-HTTP_request', 'Title Case', {
		preserveAcronyms: true,
	})
);

// console.log(new Chronos('2025-01-16T18:00:00').timestamp);

// console.info(isIPAddress('2001:db8::8a2e:370:7334'));

console.log(wordsToNumber('one hundred quintillion'));
console.log(wordsToNumber('one zillion'));
console.log(isDateLike(new Date()));

new LogStyler(['bgWhitesmoke', 'yellow', 'bold']).log('Error');
Stylog.yellow.bgWhitesmoke.bold.underline.log('Error');
// const chronosInstance = new Chronos('2023-12-31');
// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];

// // Chronos instance will be spread into the resulting array
// console.info([...array1, ...array2, ...chronosInstance]);
// Result: [1, 2, 3, 4, 5, 6, year, month, date, ...date components]
Stylog.green.log(Chronos.with({ month: 4 }));

const h = Stylog.bold.toANSI('Hello');

// console.info(h);

// console.log(getLevenshteinDistance('kitten', 'sitting')); // 3
console.log(verbalizer.toPast('run'));
console.log(verbalizer.isPast('played'));

// console.info(pckg.version);
type A = { a: string };
type B = { b: number };
type Exclusive = ValidArray<OneOf<A, B> | Enumerate<3>>;

type Product = { name: string; price: number; meta: { stock: boolean } };
type PrimPaths = PickByValue<Product, Primitive>;
type BooleanMapped = Prettify<
	MapObjectValues<
		RenameKeys<Product, { price: 'cost'; meta: 'details'; name: 'title' }>,
		Product
	> & { hello: number }
>;

function Product(name: string, price: number) {
	this.name = name;
	this.price = price;
}

function Food(name: string, price: number) {
	Product.call(this, name, price);
	this.category = 'food';
}

// console.log(getColorForInitial([[5]]));
// generateRandomColorInHexRGB();
// getNumbersInRange();
// getLastArrayElement([]);
// parseObjectValues(data, true);

// const seasonFinder = new Finder([{ a: 'avada' }, { a: 'kedavra' }]);

// const s = seasonFinder.findOne('ava', 'a', { fuzzy: true });

// console.log(s);

eval(`
	// const crypto = require("crypto");
	// console.log(crypto.randomBytes(16));

	console.log("Hello World!");
`);

// const x = new Uint8Array([21, 31]);

// console.log(x);

// console.log(
// 	isDeepEqual([{ foo: [1, 2, { bar: 'baz' }] }], [{ foo: [1, 2, { bar: 'baz' }] }])
// );

console.info(generateRandomID({ length: 8, timeStamp: true, caseOption: 'upper' }));

const str = '1758392465232 O4VUN4G5';

type Str = Split<typeof nested.user.details.color.hsl, `(` | ', '>[number];

const usd = new Currency('100', 'USD');

console.log(usd);

// async function convert() {
// 	const inr = await usd.convert('INR');
// 	const gbp = await usd.convert('GBP');
// 	const aud = await usd.convert('AUD');
// 	const eur = await usd.convert('EUR');

// 	console.log(inr, gbp, eur, aud);
// }

// convert();

console.log(new Chronos().customMethod('NHB'));

const order = {
	id: '1001',
	total: '199.99',
	items: [
		{ id: '1', price: '49.99' },
		{ id: '2', price: '59.99' },
	],
	customer: {
		id: 5001,
		loyaltyPoints: '1000',
	},
};

// Convert numbers throughout structure
const cvtd = convertObjectValues(order, {
	keys: ['total', 'customer.loyaltyPoints'],
	convertTo: 'number',
});

// console.log(cvtd);

type Obj = IsStrictObject<null>;

// console.log(extractKeys(order));

if (isObjectWithKeys(order, ['hello'])) {
	order;
}

/**
 * Recursively resolves a dot-notation key into its value type.
 */
type DotPathValue<
	T extends GenericObject,
	P extends string
> = P extends `${infer Key}.${infer Rest}`
	? Key extends keyof T
		? DotPathValue<T[Key], Rest>
		: never
	: P extends keyof T
	? T[P]
	: never;

/**
 * Access a property of an object via dot-notation.
 *
 * @param obj - The object to access.
 * @param key - The dot-notation key path.
 * @returns The resolved value.
 */
function accessObjectProperty<Object extends GenericObject, Key extends DotNotationKey<Object>>(
	obj: Object,
	key: Key
): DotPathValue<Object, Key> {
	if (isEmptyObject(obj)) {
		return obj as DotPathValue<Object, Key>;
	}

	return key.split('.').reduce<unknown>((acc, part) => {
		if (isObject(acc) && part in acc) {
			return acc[part];
		}
	}, obj) as DotPathValue<Object, Key>;
}

type Data = DeepPartialAll<{
	meta: {
		version: string;
		config: {
			debug: boolean;
			h: {
				b: number;
			}[];
		};
	};
	items: string[];
}>;

const obj: Data = {
	meta: {
		version: '1.1',
	},
};

const value = accessObjectProperty(obj, 'meta.config.debug'); // Type is number

console.log({ value });

interface Person {
	name: string;
	age: number;
}

const original = {
	name: 'John',
	address: {
		city: 'New York',
	},
};

const cloned = cloneObject(original);
console.log(isDeepEqual(cloned, { original })); // false
console.log(cloned.address === original.address); // false

console.log(extractKeys(original, true));

const e = new Chronos().isWeekend([0, 1, 2, 3]);
console.log(e);
console.log(factorial(5.5));
console.log(toRomanNumeral(77));
console.log(getNthFibonacci(3));
console.log(calculateHCF(200));

console.log(getFactors(6));
console.log(
	toRomanNumeral(29), // "XXIX"
	toRomanNumeral('1987'), // "MCMLXXXVII"
	toRomanNumeral(3999) // "MMMCMXCIX"
	// toRomanNumeral(0) // throws RangeError
);

console.log(new Chronos());

console.log(Article.getArticle('hour'));
console.log(Article.withArticle('Mother'));

console.log(romanToInteger('CCC'));

type R = Repeat<'Sky', 3>;

type SplitTest = Split<'one,two,three', ','>;

console.log(result);

console.log(Converter(1024, 'kelvin').formatTo('fahrenheit'));

const rc = generateRandomColor({ maxColors: 56 });

console.log(rc);
