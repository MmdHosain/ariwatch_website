const fs = require('node:fs/promises');
const path = require('node:path');

const PAGES = [
  'https://ariwatch.ir/',
  'https://ariwatch.ir/high-copy-watches/',
  'https://ariwatch.ir/in-stock-watches/',
];
const TARGET_DIR = path.resolve(__dirname, '../frontend/public/resourses');
const FILENAMES = ['ariwatch-hero.mp4', 'ariwatch-editorial.mp4', 'ariwatch-lookbook.mp4', 'ariwatch-story.mp4'];

function extractVideos(html, base) {
  const urls = new Set();
  const patterns = [
    /<(?:video|source)\b[^>]*?\bsrc=["']([^"']+?)["']/gi,
    /data-(?:video|src|bg-video)=["']([^"']+?\.(?:mp4|webm|mov)(?:\?[^"']*)?)["']/gi,
    /["'](https?:\/\/[^"'\s<>]+?\.(?:mp4|webm|mov)(?:\?[^"'\s<>]*)?)["']/gi,
    /["'](\/[^"'\s<>]+?\.(?:mp4|webm|mov)(?:\?[^"'\s<>]*)?)["']/gi,
  ];
  for (const regex of patterns) {
    for (const match of html.matchAll(regex)) {
      try {
        const u = new URL(match[1].trim(), base);
        if (['http:', 'https:'].includes(u.protocol)) urls.add(u.href);
      } catch {}
    }
  }
  return Array.from(urls);
}

(async () => {
  await fs.mkdir(TARGET_DIR, { recursive: true });
  const found = [];
  for (const url of PAGES) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) continue;
      const html = await res.text();
      for (const v of extractVideos(html, url)) if (!found.includes(v)) found.push(v);
    } catch (err) {
      console.warn(`Could not fetch ${url}: ${err.message}`);
    }
  }
  if (!found.length) {
    console.log('No direct video files found on ariwatch.ir pages.');
    return;
  }
  console.log('Discovered videos on ariwatch.ir:', found);
  for (let i = 0; i < FILENAMES.length; i++) {
    const sourceUrl = found[i] || found[0];
    const dest = path.join(TARGET_DIR, FILENAMES[i]);
    console.log(`Downloading ${sourceUrl} -> ${dest}`);
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${sourceUrl}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(dest, bytes);
    console.log(`Saved ${FILENAMES[i]} (${bytes.length} bytes)`);
  }
})().catch(err => {
  console.error('Video sync failed:', err.message);
  process.exitCode = 1;
});
