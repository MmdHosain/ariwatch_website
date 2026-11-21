const https = require('node:https');

https.get('https://ariwatch.ir', { rejectUnauthorized: false }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const styleMatches = [...data.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
    const lines = styleMatches.split('\n');
    const matched = lines.filter(l => l.includes('.aw-hero') || l.includes('.aw-stage') || l.includes('position:sticky') || l.includes('position:fixed'));
    console.log('MATCHED CSS:');
    matched.slice(0, 30).forEach(l => console.log(l.trim()));
  });
});
