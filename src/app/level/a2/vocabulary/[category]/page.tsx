import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import VocabularyList, { WordEntry } from '@/components/VocabularyList';

const LEVEL = 'a2';

async function getData() {
  const file = path.join(process.cwd(), 'src', 'data', 'vocabulary', 'a2.json');
  const raw = await fs.readFile(file, 'utf-8');
  return JSON.parse(raw) as Record<string, { words: WordEntry[] }>;
}

export async function generateStaticParams() {
  const data = await getData();
  return Object.keys(data).map((category) => ({
    category: encodeURIComponent(category.replace(/\s+/g, '-').toLowerCase()),
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await getData();
  const raw = decodeURIComponent(category);
  const norm = (s: string) => s.replace(/[-_]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
  const matchedCategory = Object.keys(data).find(
    (cat) => norm(cat) === norm(raw) || norm(cat) === raw
  );
  if (!matchedCategory) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg">Category not found.</p>
          <Link href="/level/a2" className="text-sm text-cyan-400">Back to A2</Link>
        </div>
      </div>
    );
  }

  const entry = data[matchedCategory];
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{matchedCategory}</h1>
          <p className="text-sm text-foreground/60">{entry.words.length} words</p>
        </div>

        <VocabularyList level={LEVEL} category={matchedCategory} words={entry.words} />

        <div className="mt-8">
          <Link href="/level/a2" className="text-sm">← Back to A2</Link>
        </div>
      </div>
    </div>
  );
}

