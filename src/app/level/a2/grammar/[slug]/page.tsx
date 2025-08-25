import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import A2GrammarLesson, { A2Lesson } from '@/components/A2GrammarLesson';

type LessonsFile = { lessons: A2Lesson[] };

async function getLessons(): Promise<A2Lesson[]> {
  const filePath = path.join(process.cwd(), 'public', 'grammar', 'a2', 'data', 'lessons.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const json: LessonsFile = JSON.parse(raw);
  return json.lessons;
}

export async function generateStaticParams() {
  const lessons = await getLessons();
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lessons = await getLessons();
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return {};
  return {
    title: `A2 Grammar: ${lesson.title} – ReadMe English`,
    description: lesson.canDo,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lessons = await getLessons();
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return notFound();
  return <A2GrammarLesson lesson={lesson} />;
}

