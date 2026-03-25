import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function ColorsVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Colors & Basic Adjectives" 
      />
      <A1VocabularyLesson 
        theme="Colors & Basic Adjectives" 
        level="A1" 
        datasetKey="colors-basic-adjectives"
      />
    </>
  );
}