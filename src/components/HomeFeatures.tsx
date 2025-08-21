import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { type JSX, type ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
	title: ReactNode;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: <Link to="/docs/classes">Class-Based Utilities</Link>,
		description: (
			<>
				Designed to simplify complex tasks, e.g:
				<ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
					<li>
						<Link to="/docs/classes/Chronos">
							<code>Chronos</code>
						</Link>{' '}
						- Advanced date/time manipulation
					</li>
					<li>
						<Link to="/docs/classes/Color">
							<code>Color</code>
						</Link>{' '}
						- Comprehensive color management
					</li>
					<li>
						<Link to="/docs/classes/Paginator">
							<code>Paginator</code>
						</Link>{' '}
						- Elegant pagination handling
					</li>
					<li>
						<Link to="/docs/classes/Pluralizer">
							<code>Pluralizer</code>
						</Link>{' '}
						- Manage word forms
					</li>
					{/* <li>
						<Link to="/docs/classes/Finder">
							<code>Finder</code>
						</Link>{' '}
						- Sophisticated array searching
					</li> */}
					{/* <li>
						<Link to="/docs/classes/Unit">
							<code>Unit</code>
						</Link>{' '}
						and{' '}
						<Link to="/docs/classes/Currency">
							<code>Currency</code>
						</Link>{' '}
						for unit and currency handling.
					</li> */}
				</ul>
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/string">String Utilities</Link>,
		description: (
			<>
				Comprehensive string manipulation including case conversion, pluralization,
				singularization, anagram generation, string masking, URL/email extraction,
				and advanced text processing with Levenshtein distance and many more.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/number">Number Utilities</Link>,
		description: (
			<>
				Mathematical operations (HCF/LCM, averages, percentage), Fibonacci
				generators, prime number utilities, number conversions (words, Roman
				numerals), currency formatting, and many more.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/object">Object Utilities</Link>,
		description: (
			<>
				Deep object operations including cloning, merging, flattening, field
				counting, selective picking/remapping, JSON parsing/serialization, and deep
				equality checks and many more.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/array">Array Utilities</Link>,
		description: (
			<>
				Array transformations (flattening, shuffling), duplicate handling, natural
				sorting, advanced element finding with Finder class, missing elements
				detection, and robust array validation.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/color">Color Utilities</Link>,
		description: (
			<>
				Advanced color manipulation with conversion between HEX, RGB, HSL formats,
				random color generation, alpha channel support, and specialized utilities
				for working with color initials.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/date">Date & Time Utilities</Link>,
		description: (
			<>
				Timezone handling, UTC conversions, greeting generation, leap year
				detection, and comprehensive date validation with strict type guards. With{' '}
				<code>
					<Link to="/docs/classes/Chronos">Chronos</Link>
				</code>{' '}
				class or its wrapper{' '}
				<code>
					<Link to="/docs/utilities/date/chronos">chronos</Link>
				</code>
				{', '}
				date and time can be manipulated with ease.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/form">Form Utilities</Link>,
		description: (
			<>
				Form data handling with type-safe FormData creation, parsing, serialization,
				and comprehensive file upload validation with multiple guard utilities.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/dom">DOM Utilities</Link>,
		description: (
			<>
				Query parameter handling, clipboard operations, smooth scrolling, fullscreen
				toggling, and Web Storage (local/session) management.
			</>
		),
	},
	{
		title: <Link to="/docs/utilities/misc">Miscellaneous Utilities</Link>,
		description: (
			<>
				Debounce/throttle functions, deep parsing, class introspection, Paginator
				class, and various helper utilities for production-grade apps.
			</>
		),
	},
	{
		title: <Link to="/docs/predicates-guards">Predicate Functions & Type Guards</Link>,
		description: (
			<>
				Comprehensive runtime type checking for primitives, non-primitives, and
				special types (Base64, Email, UUID, URLs) with perfect TypeScript type
				inference. Also has a collection of predicate functions.
			</>
		),
	},
	{
		title: <Link to="/docs/types">Types and Constants</Link>,
		description: (
			<>
				This package includes not only functional utilities but also a growing
				collection of type-level utilities, including ready-to-use constants,
				designed to enhance type safety and developer ergonomics.
			</>
		),
	},
];

function Feature({ title, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<div>{description}</div>
			</div>
		</div>
	);
}

export default function HomeFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
