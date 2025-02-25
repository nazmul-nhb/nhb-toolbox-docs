import clsx from 'clsx';
import { type JSX, type ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'String Utilities',
		description: (
			<>
				Functions for string manipulation, including capitalization, trimming,
				truncation, case conversion, and anagram generation.
			</>
		),
	},
	{
		title: 'Number Utilities',
		description: (
			<>
				Tools for numerical operations such as calculating HCF/LCM, prime number
				identification, range generation, and number-to-words conversion.
			</>
		),
	},
	{
		title: 'Color Utilities',
		description: (
			<>
				Utilities for color code conversions between HEX, RGB, HSL formats, and
				random color generation.
			</>
		),
	},
	{
		title: 'Array Utilities',
		description: (
			<>
				Methods for array operations like filtering, flattening, shuffling, sorting,
				and removing duplicates.
			</>
		),
	},
	{
		title: 'Form Utilities',
		description: (
			<>
				Functions to handle form data transformations, including conversion to
				FormData and controlled form data creation.
			</>
		),
	},
	{
		title: 'Object Utilities',
		description: (
			<>
				Tools for object manipulation, such as cloning, field counting, query
				parameter generation, and deep equality checks.
			</>
		),
	},
	{
		title: 'Miscellaneous Utilities',
		description: (
			<>
				Additional helpers including debounce, throttle functions, and deep equality
				checks.
			</>
		),
	},
];

function Feature({ title, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
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
