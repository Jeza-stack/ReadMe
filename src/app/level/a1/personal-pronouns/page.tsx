import A1Lesson6PersonalPronouns from '@/components/A1Lesson6PersonalPronouns';
import { BackNav } from '@/components/BackNav';

export default function PersonalPronounsPage() {
  return (
    <>
      <BackNav
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]}
        current="Personal Pronouns"
      />
      <A1Lesson6PersonalPronouns />
    </>
  );
}

export const metadata = {
  title: 'A1 Grammar: Personal Pronouns - ReadMe English Learning',
  description: 'Master personal pronouns in English with comprehensive A1 grammar lesson. Learn subject and object pronouns (I, you, he, she, it, we, they) with interactive exercises for beginners.',
  keywords: 'English grammar, personal pronouns, subject pronouns, object pronouns, I you he she it we they, A1 level, beginner English, ESL, learn English, pronoun usage'
};