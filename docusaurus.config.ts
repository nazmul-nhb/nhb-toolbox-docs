import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { themes as prismThemes } from 'prism-react-renderer';

dotenv.config({ path: resolve(__dirname, '.env') });

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'NHB Toolbox',
	tagline: 'The Ultimate Utility Library',
	favicon: 'img/logo.png',

	// Set the production url of your site here
	url: 'https://nhb-toolbox.vercel.app',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'nazmul-nhb', // Usually your GitHub org/user name.
	projectName: 'nhb-toolbox', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/nazmul-nhb/nhb-toolbox-docs',
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ['rss', 'atom'],
						xslt: true,
					},
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/nazmul-nhb/nhb-toolbox-docs',
					// Useful options to enforce blogging best practices
					onInlineTags: 'warn',
					onInlineAuthors: 'warn',
					onUntruncatedBlogPosts: 'warn',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		metadata: [
			{
				name: 'keywords',
				content:
					'JavaScript, TypeScript, Utilities, NHB, Tools, Dayjs, Moment, Chronos, Color, Finder, Currency, Class, Function, Reusable, Library, Toolbox, Utility Library, Unit, Unit Converter, Unit Conversion, Date, Time, String, Array, Object, Number, Math, Random, Generator, Currency Converter, Color Converter, Color Manipulation, Color Theory, Color Wheel, Color Contrast, FormData, SanitizeData, Sanitize, Data Validation, Data Sanitization, Data Manipulation, Data Transformation, Data Processing, Binary Search, Software Development, Web Development, Frontend Development, Backend Development',
			},
			{ name: 'author', content: 'Nazmul Hassan' },
			{ name: 'copyright', content: 'Copyright © 2025 Nazmul Hassan' },
			{ name: 'robots', content: 'index, follow' },
			{ name: 'googlebot', content: 'index, follow' },
			{ name: 'og:title', content: 'NHB Toolbox' },
			{ name: 'og:type', content: 'website' },
			{ name: 'og:url', content: 'https://nhb-toolbox.vercel.app/' },
			{ name: 'og:image', content: 'https://nhb-toolbox.vercel.app/img/logo.png' },
			{ name: 'og:description', content: 'The Ultimate Utility Library' },
			{ name: 'og:site_name', content: 'NHB Toolbox' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: 'NHB Toolbox' },
			{ name: 'twitter:description', content: 'The Ultimate Utility Library' },
			{
				name: 'twitter:image',
				content: 'https://nhb-toolbox.vercel.app/img/logo.png',
			},
			{ name: 'twitter:site', content: '@nazmul_nhb' },
			{ name: 'twitter:creator', content: '@nazmul_nhb' },
			{ name: 'twitter:domain', content: 'nhb-toolbox.vercel.app' },
			{ name: 'twitter:image:alt', content: 'NHB Toolbox Logo' },
			{ name: 'twitter:label1', content: 'Written by' },
			{ name: 'twitter:data1', content: 'Nazmul Hassan' },
			{ name: 'twitter:label2', content: 'Created in' },
			{ name: 'twitter:data2', content: '2025' },
			{ name: 'twitter:label3', content: 'License' },
			{ name: 'twitter:data3', content: 'MIT' },
			{ name: 'theme-color', content: '#0d1117' },

			{ name: 'description', content: 'The Ultimate Utility Library' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],

		announcementBar: {
			id: 'announcement',
			content:
				'🚀 Includes 180+ functions & 6 classes. Full documentation in progress...',
			backgroundColor: '#0d1117',
			textColor: '#ffffff',
			isCloseable: true,
		},

		colorMode: {
			defaultMode: 'dark',
			disableSwitch: false, // set to true if you want to force dark mode
			respectPrefersColorScheme: false, // ignore user's system preference
		},
		// Replace with your project's social card
		image: 'img/logo.png',
		navbar: {
			title: 'NHB Toolbox',
			logo: {
				alt: 'NHB Toolbox Logo',
				src: 'img/logo.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'utilitiesSidebar',
					position: 'left',
					label: 'Utilities',
				},
				{
					href: 'https://github.com/nazmul-nhb/nhb-toolbox',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Introduction',
							to: '/docs/intro',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'LeetCode',
							href: 'https://leetcode.com/u/nazmul-nhb',
						},
						{
							label: 'Linked In',
							href: 'https://linkedin.com/in/nazmul-nhb',
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
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Nazmul Hassan & NHB Toolbox.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.nightOwl,
		},
		algolia: {
			appId: process.env.ALGOLIA_APP_ID!,
			apiKey: process.env.ALGOLIA_SEARCH_API_KEY!,
			indexName: process.env.ALGOLIA_INDEX_NAME!,
			placeholder: 'Search in NHB Toolbox',
			contextualSearch: true,
			searchParameters: {},
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
