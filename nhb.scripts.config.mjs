// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
    commit: {
        runFormatter: false,
        emojiBeforePrefix: true,
        wrapPrefixWith: "`",
    },
    count: {
        defaultPath: '.',
        excludePaths: ['node_modules', '.docusaurus', 'build']
    }
});
