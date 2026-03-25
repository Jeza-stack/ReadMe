import dynamic from 'next/dynamic';
import { BackNav } from '@/components/BackNav';

const A1Lesson2ToHave = dynamic(() => import('@/components/A1Lesson2ToHave'), {
  loading: () => <div className="p-8 text-center text-gray-500">Loading lesson...</div>,
});

export default function ToHavePage() {
  return (
    <>
      <BackNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]}
        current="The Verb 'To Have'"
      />
      <A1Lesson2ToHave />
    </>
  );
}

export const metadata = {
  title: 'A1 Grammar: The Verb To Have - ReadMe English Learning',
  description: 'Learn how to use have and has in English. Complete grammar lesson with examples, rules, and interactive exercises for A1 beginners.',
  keywords: 'English grammar, verb to have, have has, possession, family, A1 level, beginner English, ESL, learn English'
};