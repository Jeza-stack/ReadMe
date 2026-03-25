import A1ToBeLesson from '@/components/A1ToBeLesson';
import { BackNav } from '@/components/BackNav';

export default function VerbToBePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Verb 'To Be'" 
      />
      <A1ToBeLesson />
    </div>
  );
}

export const metadata = {
  title: 'A1 Grammar: The Verb To Be - ReadMe English Learning',
  description: 'Learn how to use am, is, and are in English. Complete grammar lesson with examples, tables, and interactive exercises for A1 beginners.',
  keywords: 'English grammar, verb to be, am is are, A1 level, beginner English, ESL, learn English'
};