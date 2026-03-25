import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function FamilyVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Family & Relationships" 
      />
      <A1VocabularyLesson 
        theme="Family & Relationships" 
        level="A1" 
        datasetKey="family-relationships"
      />
    </>
  );
}