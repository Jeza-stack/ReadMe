import type { MetadataRoute } from 'next';
// ponytail: search-index.json is rebuilt by scripts/build-search-index.mjs on every
// build (see package.json "build") and already lists every real content page —
// reuse it rather than maintaining a second route list.
import searchIndex from '../../public/search-index.json';

const BASE_URL = 'https://read-me-self.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return searchIndex.map((entry: { href: string }) => ({
    url: `${BASE_URL}${entry.href}`,
    changeFrequency: 'weekly',
  }));
}
