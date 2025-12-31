import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import dotenv from 'dotenv';
import { Stylog } from 'nhb-toolbox/stylog';
import { resolve } from 'node:path';
import { themes } from 'prism-react-renderer';
import { syncChangelog } from './scripts/sync-changelog.mjs';
import { Chronos } from 'nhb-toolbox';
import { timeZonePlugin } from 'nhb-toolbox/plugins/timeZonePlugin';

dotenv.config({ path: resolve(__dirname, '.env'), quiet: true });

Chronos.register(timeZonePlugin);

const nowDhaka = new Chronos().timeZone('Asia/Dhaka');

async function getNpmVersion(pkg: string): Promise<string> {
	const url = `https://registry.npmjs.org/${pkg}/latest`;

	const response = await fetch(url);

	if (!response.ok) return 'latest';

	const data = await response.json();

	return data.version;
}

// ! This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

export default async function config(): Promise<Config> {
	const npmVersion = await getNpmVersion('nhb-toolbox');

	console.log(Stylog.ansi16('green').toANSI(`📦 nhb-toolbox@${npmVersion}`));

	await syncChangelog();

	return {
		title: 'NHB Toolbox',
		tagline: 'The Ultimate Utility Library',
		favicon: 'img/logo.png',

		// Set the production url of your site here
		url: 'https://toolbox.nazmul-nhb.dev',
		// Set the /<baseUrl>/ pathname under which your site is served
		// For GitHub pages deployment, it is often '/<projectName>/'
		baseUrl: '/',

		// GitHub pages deployment config.
		// If you aren't using GitHub pages, you don't need these.
		organizationName: 'nazmul-nhb', // Usually your GitHub org/user name.
		projectName: 'nhb-toolbox', // Usually your repo name.

		onBrokenLinks: 'throw',
		markdown: {
			hooks: {
				onBrokenMarkdownLinks: 'warn',
			},
		},

		// Even if you don't use internationalization, you can use this field to set
		// useful metadata like html lang. For example, if your site is Chinese, you
		// may want to replace "en" with "zh-Hans".
		i18n: {
			defaultLocale: 'en',
			locales: ['en'],
		},

		future: {
			v4: { removeLegacyPostBuildHeadAttribute: true },
			experimental_faster: true,
		},

		plugins: [
			[
				'vercel-analytics',
				{
					debug: true,
					mode: 'auto',
				},
			],
			// require.resolve('./src/plugins/playground'),
		],

		presets: [
			[
				'classic',
				{
					docs: {
						sidebarPath: './sidebars.ts',
						editUrl: 'https://github.com/nazmul-nhb/nhb-toolbox-docs/blob/main',
						showLastUpdateAuthor: true,
						showLastUpdateTime: true,
					},
					blog: {
						showReadingTime: true,
						feedOptions: {
							type: ['rss', 'atom'],
							xslt: true,
						},
						onInlineTags: 'warn',
						onInlineAuthors: 'warn',
						onUntruncatedBlogPosts: 'warn',
					},
					theme: {
						customCss: './src/css/custom.css',
					},
					sitemap: {
						changefreq: 'weekly',
						priority: 0.5,
						filename: 'sitemap.xml',
					},
					// gtag: {
					// 	trackingID: 'G-X2Z2YZ8LWZ',
					// 	anonymizeIP: true,
					// },
					googleTagManager: {
						containerId: 'GTM-PDNKZ4VF',
					},
				} satisfies Preset.Options,
			],
		],

		themeConfig: {
			metadata: [
				{
					name: 'keywords',
					content:
						'JavaScript, TypeScript, Utilities, NHB, Tools, Dayjs, Moment, Chronos, Color, Finder, Paginator, Currency, Class, Function, Reusable, Library, Toolbox, Utility Library, Unit, Unit Converter, Unit Conversion, Date, Time, String, Array, Object, Number, Math, Random, Generator, Currency Converter, Color Converter, Color Manipulation, Color Theory, Color Wheel, Color Contrast, FormData, SanitizeData, Sanitize, Data Validation, Data Sanitization, Data Manipulation, Data Transformation, Data Processing, Binary Search, Software Development, Web Development, Frontend Development, Backend Development, Pluralizer, Pluralize, Singularize, Validation, Type Guards, Utility Types, Chalk, Style Console, Stylog, LogStyler, HTTP Status Codes, Bangla Calendar, BanglaCalendar, Bongabdo, Bangla Date, Bengali Calendar, Bengali Date, Token, Signet, Cipher, Codec, Hash, MD5, SHA-1, SHA-256',
				},
				{ name: 'author', content: 'Nazmul Hassan' },
				{
					name: 'copyright',
					content: `Copyright © ${nowDhaka.year} Nazmul Hassan`,
				},
				{ name: 'canonical', content: 'https://toolbox.nazmul-nhb.dev' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'googlebot', content: 'index, follow' },
				{ name: 'og:title', content: 'NHB Toolbox' },
				{ name: 'og:type', content: 'website' },
				{ name: 'og:url', content: 'https://toolbox.nazmul-nhb.dev/' },
				{
					name: 'og:image',
					content: 'https://toolbox.nazmul-nhb.dev/img/logo.png',
				},
				{ name: 'og:description', content: 'The Ultimate Utility Library' },
				{ name: 'og:site_name', content: 'NHB Toolbox' },
				{ name: 'og:image:width', content: '1200' },
				{ name: 'og:image:height', content: '630' },
				{ name: 'og:image:type', content: 'image/png' },
				{ name: 'og:locale', content: 'en_US' },
				{ name: 'og:updated_time', content: new Date().toISOString() },
				{ name: 'twitter:image:width', content: '1200' },
				{ name: 'twitter:image:height', content: '630' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'NHB Toolbox' },
				{ name: 'twitter:description', content: 'The Ultimate Utility Library' },
				{
					name: 'twitter:image',
					content: 'https://toolbox.nazmul-nhb.dev/img/logo.png',
				},
				{ name: 'twitter:site', content: '@nhb42' },
				{ name: 'twitter:creator', content: '@nhb42' },
				{ name: 'twitter:domain', content: 'toolbox.nazmul-nhb.dev' },
				{ name: 'twitter:image:alt', content: 'NHB Toolbox Logo' },
				{ name: 'twitter:label1', content: 'Written by' },
				{ name: 'twitter:data1', content: 'Nazmul Hassan' },
				{ name: 'twitter:label2', content: 'Created in' },
				{ name: 'twitter:data2', content: '2025' },
				{ name: 'twitter:label3', content: 'License' },
				{ name: 'twitter:data3', content: 'Apache 2.0' },
				{ name: 'theme-color', content: '#0d1117' },

				{ name: 'description', content: 'The Ultimate Utility Library' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],

			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 6 },

			announcementBar: {
				id: 'announcement',
				content: '🚀 Includes 250+ Functions & 10+ Powerful Classes.',
				backgroundColor: '#0d1117',
				textColor: '#ffffff',
				isCloseable: true,
			},

			colorMode: {
				defaultMode: 'dark',
				disableSwitch: false,
				respectPrefersColorScheme: false,
			},

			image: 'img/logo.png',

			docs: {
				sidebar: { hideable: true },
			},

			navbar: {
				// hideOnScroll: true,
				title: 'NHB Toolbox',
				logo: {
					alt: 'NHB Toolbox Logo',
					src: 'img/logo.png',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'overviewSidebar',
						position: 'left',
						label: 'Getting Started',
					},
					{
						type: 'docSidebar',
						sidebarId: 'utilitiesSidebar',
						position: 'left',
						label: 'Utilities',
					},
					{
						type: 'docSidebar',
						sidebarId: 'classesSidebar',
						position: 'left',
						label: 'Classes',
					},
					{
						type: 'docSidebar',
						sidebarId: 'predicatesSidebar',
						position: 'left',
						label: 'Predicates & Guards',
					},
					{
						type: 'docSidebar',
						sidebarId: 'typesSidebar',
						position: 'left',
						label: 'Types & Constants',
					},
					{
						href: 'https://github.com/nazmul-nhb/nhb-toolbox',
						label: 'GitHub',
						position: 'right',
					},
					{
						// label: `v${npmVersion}`,
						html: /* html */ `
							<span style="display:flex;align-items:center;gap:4px;">
								<img src="/img/npm.svg" 
									style="width:20px; height:20px;" />
								${npmVersion}
							</span>
						`,
						position: 'right',
						href: 'https://www.npmjs.com/package/nhb-toolbox',
					},
					{
						type: 'doc',
						docId: 'changelog',
						position: 'right',
						label: 'Changelog',
					},
				],
			},
			footer: {
				logo: {
					alt: 'NHB Toolbox Logo',
					src: 'img/logo.png',
				},
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Overview',
								to: '/docs',
							},
							{
								label: 'Utilities',
								to: '/docs/utilities',
							},
							{
								label: 'Classes',
								to: '/docs/classes',
							},
							{
								label: 'Predicates',
								to: '/docs/predicates-guards',
							},
							{
								label: 'Types',
								to: '/docs/types',
							},
						],
					},
					{
						title: 'Get in Touch',
						items: [
							{
								label: 'Personal Website',
								href: 'https://nazmul-nhb.dev',
							},
							{
								label: 'LinkedIn',
								href: 'https://linkedin.com/in/nazmul-nhb',
							},
							{
								label: 'WhatsApp',
								href: 'https://wa.me/8801623732187?text=Hi%20Nazmul%2C%20I%20saw%20your%20site!',
							},
							{
								label: 'Facebook',
								href: 'https://fb.com/nazmul.batchu',
							},
							{
								label: 'Discord',
								href: 'https://discord.com/users/831030314528538664',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/nazmul-nhb',
							},
							{
								label: 'NPM Profile',
								href: 'https://www.npmjs.com/~nazmul-nhb',
							},
							{
								label: 'NHB Hooks',
								href: 'https://www.npmjs.com/package/nhb-hooks',
							},
							{
								label: 'NHB Scripts',
								href: 'https://www.npmjs.com/package/nhb-scripts',
							},
							{
								label: 'LeetCode',
								href: 'https://leetcode.com/u/nazmul-nhb',
							},
						],
					},
				],
				copyright: `Copyright © ${nowDhaka.year} Nazmul Hassan`,
			},
			prism: {
				theme: themes.github,
				darkTheme: themes.nightOwl,
			},
			algolia: {
				appId: process.env.ALGOLIA_APP_ID!,
				apiKey: process.env.ALGOLIA_SEARCH_API_KEY!,
				indexName: process.env.ALGOLIA_INDEX_NAME!,
				askAi: process.env.ALGOLIA_AI_ASSISTANT_ID!,
				placeholder: 'Ask AI or Search in NHB Toolbox',
				contextualSearch: true,
			},
		} satisfies Preset.ThemeConfig,
	};
}
