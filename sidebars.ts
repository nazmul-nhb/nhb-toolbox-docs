import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	utilitiesSidebar: [{ type: 'autogenerated', dirName: '.' }],

	tutorialSidebar: [
		'intro',
		{
			type: 'category',
			label: 'Array Utilities',
			items: [
				'array/flattenArray',
				'array/filterArrayOfObjects',
				'array/isValidEmptyArray',
				'array/shuffleArray',
				'array/sortAnArray',
				'array/optionsArray',
				'array/removeDuplicates',
			],
		},
		{
			type: 'category',
			label: 'String Utilities',
			items: [
				'string/capitalizeString',
				'string/truncateString',
				'string/generateRandomID',
				'string/trimString',
				'string/convertStringCase',
				'string/replaceAllInString',
				'string/generateAnagrams',
			],
		},
	],

	// But you can create a sidebar manually
	/*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
