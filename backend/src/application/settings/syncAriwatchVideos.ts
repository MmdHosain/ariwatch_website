import { StoreSettingsService } from './StoreSettingsService';
import { HttpError } from '../errors';

const PAGES = [
  'https://ariwatch.ir/',
  'https://ariwatch.ir/high-copy-watches/',
  'https://ariwatch.ir/in-stock-watches/',
];

const FALLBACK_MACRO_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit- gears-of-a-pocket-watch-in-macro-shot-42817-large.mp4';
let cachedVideos: string[] | null = null;

export function extractVideoUrls(html: string, baseUrl = 'https://ariwatch.ir'): string[] {
  const found = new Set<string>();
  const normalized = html.replace(/\\\//g, '/');
  const patterns = [
    /<(?:video|source)\b[^>]*?\bsrc=["']([^"']+?)["']/gi,
    /data-(?:video|src|bg-video|mp4)=["']([^"']+?)["']/gi,
    /["'](https?:\/\/[^"'\s<>]+?\.(?:mp4|webm|mov)(?:\?[^"'\s<>]*)?)["']/gi,
    /["'](\/wp-content\/[^"'\s<>]+?\.(?:mp4|webm|mov)(?:\?[^"'\s<>]*)?)["']/gi,
    /["'](\/[^"'\s<>]+?\.(?:mp4|webm|mov)(?:\?[^"'\s<>]*)?)["']/gi,
  ];
  for (const regex of patterns) {
    for (const match of normalized.matchAll(regex)) {
      const raw = match[1]?.trim();
      if (!raw || raw.startsWith('blob:') || raw.startsWith('data:')) continue;
      try {
        const resolved = new URL(raw, baseUrl);
        if (['http:', 'https:'].includes(resolved.protocol) && /\.(mp4|webm|mov)(\?|$)/i.test(resolved.href)) {
          found.add(resolved.href);
        }
      } catch {
        // Ignore malformed URLs.
      }
    }
  }
  return Array.from(found);
}

export async function discoverAriwatchVideos(transport: typeof fetch = fetch): Promise<string[]> {
  if (cachedVideos && cachedVideos.length) return cachedVideos;
  const discovered: string[] = [];
  try {
    const wpRes = await transport('https://ariwatch.ir/wp-json/wp/v2/media?per_page=50', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AriWatchSync/1.0)' },
      signal: AbortSignal.timeout(12000),
    });
    if (wpRes.ok) {
      const items = await wpRes.json();
      if (Array.isArray(items)) {
        for (const item of items) {
          const url = typeof item?.source_url === 'string' ? item.source_url : '';
          if (/\.(mp4|webm|mov)(\?|$)/i.test(url) && !discovered.includes(url)) discovered.push(url);
        }
      }
    }
  } catch {
    // Continue to HTML scraping.
  }
  for (const pageUrl of PAGES) {
    try {
      const response = await transport(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AriWatchSync/1.0)' },
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) continue;
      const html = await response.text();
      for (const videoUrl of extractVideoUrls(html, pageUrl)) {
        if (!discovered.includes(videoUrl)) discovered.push(videoUrl);
      }
    } catch {
      // Ignore individual page timeouts.
    }
  }
  if (discovered.length) cachedVideos = discovered;
  return discovered;
}

export async function resolveSlotVideoUrl(slot: string): Promise<string> {
  const list = await discoverAriwatchVideos();
  if (!list.length) return FALLBACK_MACRO_VIDEO.replace(/\s+/g, '');
  const index = slot === 'editorial' ? 1 : slot === 'lookbook' ? 2 : slot === 'story' ? 3 : 0;
  return list[index] || list[0];
}

export async function syncAriwatchVideos(settingsService: StoreSettingsService, transport: typeof fetch = fetch) {
  const discovered = await discoverAriwatchVideos(transport);
  if (!discovered.length) {
    throw new HttpError(404, 'No direct MP4/WebM video URLs were found on ariwatch.ir; enter the video URL manually');
  }
  const updated = await settingsService.update({
    heroStyle: 'ariwatch',
    storefront: {
      hero: { showVideo: true, videoUrl: discovered[0] },
      editorial: { showVideo: true, videoUrl: discovered[1] || discovered[0] },
      lookbook: { showVideo: true, videoUrl: discovered[2] || discovered[0] },
      storyGrid: { showVideo: true, videoUrl: discovered[3] || discovered[0] },
    },
  });
  return { discovered, settings: updated };
}
