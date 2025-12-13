// @ts-check

import { Stylog } from 'nhb-toolbox/stylog';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/** Fetch the latest `CHANGELOG.md` from GitHub raw URL and write it to `docs/CHANGELOG.md` (for Docusaurus to render). */
export async function syncChangelog() {
	const rawUrl = 'https://raw.githubusercontent.com/nazmul-nhb/nhb-toolbox/main/CHANGELOG.md';

	const response = await fetch(rawUrl);

	if (!response.ok) {
		throw new Error(`❌ Failed to fetch CHANGELOG.md: ${response.statusText}`);
	}

	const content = await response.text();

	// Prepend required Docusaurus front-matter
	const frontMatter = ['---', 'id: changelog', 'slug: changelog', '---', ''].join('\n');

	// Fix unresolved relative links (README.md) → full GitHub URL
	const contents = content.replace(
		/\]\((?:\.\/)?README\.md\)/g,
		'](https://github.com/nazmul-nhb/nhb-toolbox/blob/main/README.md)'
	);

	const updatedContent = `${frontMatter}\n${contents}`;

	const outputPath = resolve('./docs/CHANGELOG.md');

	const targetContent = readFileSync(outputPath, { encoding: 'utf-8' });

	if (targetContent === updatedContent) return;

	mkdirSync(dirname(outputPath), { recursive: true });
	writeFileSync(outputPath, updatedContent, 'utf-8');

	console.log(
		Stylog.ansi16('green').toANSI(
			'✅ Synced latest CHANGELOG.md from GitHub → docs/CHANGELOG.md'
		)
	);
}

syncChangelog().catch(console.dir);
