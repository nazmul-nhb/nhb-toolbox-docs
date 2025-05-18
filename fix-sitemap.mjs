// @ts-check

import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'build', 'sitemap.xml');

try {
    const raw = fs.readFileSync(sitemapPath, 'utf8');
    const normalized = raw.replace(/\r\n/g, '\n');
    fs.writeFileSync(sitemapPath, normalized, 'utf8');
    console.log('✅ sitemap.xml line endings normalized to LF.');
} catch (err) {
    console.error('❌ Failed to normalize sitemap.xml:', err);
}
