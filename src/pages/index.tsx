import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { Fragment } from 'react';
import HomeFeatures from '../components/HomeFeatures';

import Copy from '../components/Copy';
import styles from './index.module.css';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<header
			className={clsx('hero hero--dark', styles.heroBanner, styles.heroAnimation)}
		>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>

				<div style={{ marginBottom: 16 }} className={styles.buttons}>
					<Link className="button button--info button--md" to="/docs/intro">
						📑 Explore Docs
					</Link>
					{/* <Link
						className="button button--success button--md margin-left--md"
						to="https://www.npmjs.com/package/nhb-toolbox"
						target="_blank"
					>
						NPM Registry 📦
					</Link> */}
				</div>

				<div className={styles.heroHighlights}>
					<div className={styles.heroHighlightItem}>
						<strong>200+ Utilities</strong> — for daily development
					</div>
					<div className={styles.heroHighlightItem}>
						<strong>6+ Powerful Classes</strong> — for complex scenarios
					</div>
					<div className={styles.heroHighlightItem}>
						<strong>Zero Dependencies</strong> — lightweight solution
					</div>
					<div className={styles.heroHighlightItem}>
						<strong>Framework Agnostic</strong> — works with any JS/TS setup
					</div>
					<div className={styles.heroHighlightItem}>
						<strong>Tree-Shakable</strong> — bundle only what you use
					</div>
				</div>

				<div
					style={{
						margin: '16px auto 0px',
					}}
				>
					<a
						href="https://www.npmjs.com/package/nhb-toolbox"
						aria-label="Downloads per Month"
					>
						<img
							src="https://img.shields.io/npm/dm/nhb-toolbox.svg?label=DOWNLOADS&style=flat&color=darkred&logo=npm"
							alt="Downloads per Month"
						/>
					</a>
				</div>
				<code style={{ padding: '4px 8px' }}>
					<Copy
						afterCopy="installation command copied"
						message="Copied!"
						text="npm i nhb-toolbox"
					/>
				</code>
			</div>
		</header>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Fragment>
			<Head>
				<title>{`${siteConfig.title} | TypeScript Utility Library`}</title>
				<meta
					name="description"
					content="NHB Toolbox: A comprehensive collection of 200+ type-safe utilities and 6 powerful classes for professional TypeScript/JavaScript development. Featuring string/number/color utilities, FormData and date handling, type guards, utility types and minimal DOM operations."
				/>
				<meta
					name="google-site-verification"
					content="7RAd0Tra7ew2qzq3mqoDudfooeeFNO_2L16JApkY3YI"
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
