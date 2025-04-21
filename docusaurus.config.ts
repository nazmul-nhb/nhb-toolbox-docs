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
			copyright: `Copyright © ${new Date().getFullYear()} Nazmul Hassan & NHB Toolbox. Built with Docusaurus.`,
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
