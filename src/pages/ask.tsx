import { DocSearch } from '@docsearch/react';
import type { ThemeConfig } from '@docusaurus/preset-classic';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import styles from './index.module.css';

type ThemeConfigs = ThemeConfig & {
	algolia?: { askAi?: { assistantId?: string } };
};

export default function AskAI() {
	const { siteConfig } = useDocusaurusContext();
	const { algolia } = siteConfig.themeConfig as ThemeConfigs;

	return (
		<Layout title="AskAI" description="Search docs or ask AI a question">
			<main
				// className={styles['animated-gradient']}
				style={{
					minHeight: '60vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '2rem',
					background: 'linear-gradient(180deg, #150336a8 0%, #083a86b5 100%)',
					color: '#fff',
				}}
			>
				<section style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
					<h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
						Ask AI
					</h1>
					<p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#ccc' }}>
						Instantly search our documentation or ask our AI assistant anything
						about NHB Toolbox. Answers and examples can be inaccurate sometimes.
					</p>

					<div
						style={{
							display: 'inline-block',
							maxWidth: '',
							background: '#222',
							margin: '0px auto ',
							// padding: '1rem auto',
							borderRadius: '24px',
							boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
						}}
					>
						<DocSearch
							theme="dark"
							keyboardShortcuts={{ '/': false, 'Ctrl/Cmd+K': false }}
							translations={{
								button: {
									buttonText: 'Search Docs or Ask AI',
									buttonAriaLabel: 'Search Docs or Ask AI',
								},
							}}
							appId={algolia?.appId}
							apiKey={algolia?.apiKey}
							indices={[algolia?.indexName]}
							askAi={{ assistantId: algolia?.askAi?.assistantId }}
						/>
					</div>

					<div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#aaa' }}>
						{/* <p style={{ marginBottom: '0.5rem' }}>
							Press{' '}
							<kbd
								style={{
									padding: '0.2rem 0.5rem',
									background: '#333',
									borderRadius: '4px',
								}}
							>
								/
							</kbd>{' '}
							to focus search instantly
						</p> */}
						<p>
							Powered by{' '}
							<a
								href="https://docsearch.algolia.com/"
								target="_blank"
								style={{ color: '#4ea1f3', textDecoration: 'none' }}
							>
								Algolia DocSearch
							</a>
							{' + '}
							<a
								href="https://docsearch.algolia.com/docs/v4/askai/"
								target="_blank"
								style={{ color: '#4ea1f3', textDecoration: 'none' }}
							>
								AskAI
							</a>
						</p>
					</div>
				</section>
			</main>
		</Layout>
	);
}
