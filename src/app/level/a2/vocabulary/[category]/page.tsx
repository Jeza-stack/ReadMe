import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { BackNav } from '@/components/BackNav';
import VocabularyList, { WordEntry } from '@/components/VocabularyList';
import { ArrowLeft } from 'lucide-react';

const LEVEL = 'a2';

async function getData() {
  const file = path.join(process.cwd(), 'src', 'data', 'vocabulary', 'a2.json');
  const raw = await fs.readFile(file, 'utf-8');
  return JSON.parse(raw) as { categories: { title: string; slug: string; words: WordEntry[] }[] };
}

export async function generateStaticParams() {
  const data = await getData();
  return (data.categories || []).map((c) => ({ category: encodeURIComponent(c.slug) }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await getData();
  const raw = decodeURIComponent(category);
  const matched = (data.categories || []).find((c) => c.slug === raw);
  if (!matched) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <BackNav 
          crumbs={[{ label: 'Home', href: '/' }, { label: 'CEFR English', href: '/courses/cefr-english' }, { label: 'A2 Level', href: '/level/a2' }]} 
          current="Not Found" 
        />
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 dark:text-slate-400">Category not found.</p>
            <Link href="/level/a2" className="text-[#00A2C9] hover:underline font-bold mt-4 inline-block">Back to A2 Level</Link>
          </div>
        </div>
      </div>
    );
  }

  const entry = matched;
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[{ label: 'Home', href: '/' }, { label: 'CEFR English', href: '/courses/cefr-english' }, { label: 'A2 Level', href: '/level/a2' }]} 
        current={entry.title} 
      />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-headline font-bold text-slate-900 dark:text-white">{entry.title}</h1>
            <p className="text-sm text-slate-500 font-medium">{entry.words.length} essential words</p>
          </div>

          <VocabularyList level={LEVEL} category={entry.title} words={entry.words} />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
            <Link href="/level/a2" className="flex items-center gap-2 text-slate-500 hover:text-[#043370] font-bold transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to A2 Level Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

