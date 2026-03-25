import dynamic from 'next/dynamic';
import { BackNav } from '@/components/BackNav';

const A1Lesson3ToDo = dynamic(() => import('@/components/A1Lesson3ToDo'), {
  loading: () => <div className="p-8 text-center text-gray-500">Loading lesson...</div>,
});

export default function ToDoPage() {
  return (
    <>
      <BackNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]}
        current="The Verb 'To Do' (Auxiliary)"
      />
      <A1Lesson3ToDo />
    </>
  );
}

export const metadata = {
  title: 'A1 Grammar: The Verb To Do (Auxiliary) - ReadMe English Learning',
  description: 'Learn how to use do and does as auxiliary verbs in English. Complete grammar lesson with negative sentences, questions, and interactive exercises for A1 beginners.',
  keywords: 'English grammar, auxiliary verb, do does, Present Simple, questions, negative sentences, A1 level, beginner English, ESL, learn English'
};