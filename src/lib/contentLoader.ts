export async function loadPages() {
  const res = await fetch('/src/data/pages.json');
  if (!res.ok) {
    throw new Error('Failed to load pages');
  }
  return res.json();
}
