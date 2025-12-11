// @ts-check

import { defineScriptConfig } from 'nhb-scripts';
import { syncChangelog } from './scripts/sync-changelog.mjs';

export default defineScriptConfig({
	commit: {
		runFormatter: false,
		emojiBeforePrefix: true,
		wrapPrefixWith: '`',
		runBefore: syncChangelog,
	},
	count: {
		defaultPath: 'node_modules/nhb-toolbox/dist/esm/index.js',
		excludePaths: ['node_modules', '.docusaurus', 'build'],
	},
});
