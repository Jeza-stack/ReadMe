import A1Lesson4PresentSimple from '@/components/A1Lesson4PresentSimple';
import { BackNav } from '@/components/BackNav';

export default function PresentSimplePage() {
  return (
    <>
      <BackNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]}
        current="Present Simple (Regular Verbs)"
      />
      <A1Lesson4PresentSimple />
    </>
  );
}

export const metadata = {
  title: 'A1 Grammar: Present Simple (Regular Verbs) - ReadMe English Learning',
  description: 'Learn the Present Simple tense for regular verbs in English. Complete grammar lesson covering habits, routines, facts with examples and interactive exercises for A1 beginners.',
  keywords: 'English grammar, Present Simple, regular verbs, daily routines, habits, facts, A1 level, beginner English, ESL, learn English, verb conjugation'
};