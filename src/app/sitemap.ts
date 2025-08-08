import { getCourses } from '@/lib/data';

export default async function sitemap() {
  const base = 'https://example.com';
  const items: { url: string }[] = [
    { url: `${base}/` },
    { url: `${base}/soft-skills` },
  ];
  getCourses().forEach((c) => {
    items.push({ url: `${base}/courses/${c.slug}` });
    c.categories.forEach((cat) =>
      cat.works.forEach((w) => items.push({ url: `${base}/courses/${c.slug}/${w.slug}` }))
    );
  });
  return items;
}