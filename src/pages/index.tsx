import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { Fragment } from 'react';
import HomeFeatures from '../components/HomeFeatures';

import styles from './index.module.css';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link className="button button--secondary button--lg" to="/docs/intro">
						Get Started 🚀
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Fragment>
			<Head>
				<title>{siteConfig.title}</title>
				<meta
					name="description"
					content="A powerful collection of utility functions for JavaScript and TypeScript."
				/>
			</Head>
			<Layout>
				<HomepageHeader />
				<main>
					<HomeFeatures />
				</main>
			</Layout>
		</Fragment>
	);
}
