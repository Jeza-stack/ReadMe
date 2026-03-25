import SampleQuestions from '@/components/SampleQuestions';
import { BackNav } from '@/components/BackNav';

export default function SampleQuestionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'Assessments', href: '/assessment' }
        ]} 
        current="Sample Questions" 
      />
      <div className="flex-1">
        <SampleQuestions />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Sample Questions - English Assessment Examples | ReadMe English Learning',
  description: 'Explore sample questions from our English assessment. See examples of grammar, vocabulary, and reading comprehension questions across A1, A2, and B1 CEFR levels with interactive answers.',
  keywords: 'English sample questions, assessment examples, grammar questions, vocabulary test, reading comprehension, A1 A2 B1 examples, CEFR sample test, English practice questions'
};