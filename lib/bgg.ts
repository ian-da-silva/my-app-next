// lib/bgg.ts
import 'server-only';
import { cache } from 'react';

async function fetchText(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } }); // revalidate daily
  if (!res.ok) throw new Error(`BGG fetch failed ${res.status}`);
  return res.text();
}

function extractThumbnail(xml: string): string | null {
  // naive parse that's safe for the simple <thumbnail> tag
  const m = xml.match(/<thumbnail>([^<]+)<\/thumbnail>/i);
  if (!m) return null;
  // BGG sometimes returns //cf.geekdo-images... → normalize to https
  const url = m[1].startsWith('//') ? `https:${m[1]}` : m[1];
  return url;
}

export const getBGGThumbnail = cache(async (bggId: number) => {
  const xml = await fetchText(`https://boardgamegeek.com/xmlapi2/thing?id=${bggId}`);
  const thumb = extractThumbnail(xml);
  if (!thumb) throw new Error('No thumbnail in response');
  return thumb;
});