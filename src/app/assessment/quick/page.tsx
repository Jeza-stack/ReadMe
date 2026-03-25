import QuickAssessment from '@/components/QuickAssessment';
import { BackNav } from '@/components/BackNav';

export default function QuickAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'Assessments', href: '/assessment' }
        ]} 
        current="Quick Assessment" 
      />
      <div className="flex-1 py-8">
        <QuickAssessment />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Quick Assessment - Find Your English Level | ReadMe English Learning',
  description: 'Take our 15-minute Quick Assessment to discover your CEFR English level (A1-C2). Get instant results with personalized learning recommendations based on grammar, vocabulary, and reading comprehension.',
  keywords: 'English level test, CEFR assessment, quick English test, grammar test, vocabulary test, reading comprehension, A1 A2 B1 B2 C1 C2, English proficiency test'
};