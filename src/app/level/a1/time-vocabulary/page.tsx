import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function TimeVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Days, Months, Time" 
      />
      <A1VocabularyLesson 
        theme="Days, Months, Time" 
        level="A1" 
        datasetKey="days-months-time"
      />
    </>
  );
}