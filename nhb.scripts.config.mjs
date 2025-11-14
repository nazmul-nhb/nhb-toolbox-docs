// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
    commit: {
        runFormatter: false,
        emojiBeforePrefix: true,
        wrapPrefixWith: "`",
    },
    count: {
        defaultPath: 'node_modules/nhb-toolbox/dist/esm/index.js',
        excludePaths: ['node_modules', '.docusaurus', 'build']
    }
});
