// @ts-check

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const sitemapPath = path.join(process.cwd(), 'build', 'sitemap.xml');

try {
    const raw = readFileSync(sitemapPath, 'utf8');
    const normalized = raw.replace(/\r\n/g, '\n');
    writeFileSync(sitemapPath, normalized, 'utf8');
    console.log('✅ sitemap.xml line endings normalized to LF.');
} catch (err) {
    console.error('❌ Failed to normalize sitemap.xml:', err);
}
