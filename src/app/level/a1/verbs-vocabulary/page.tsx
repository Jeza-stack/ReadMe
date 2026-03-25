import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function VerbsVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Common Verbs & Actions" 
      />
      <A1VocabularyLesson 
        theme="Common Verbs & Actions" 
        level="A1" 
        datasetKey="basic-verbs"
      />
    </>
  );
}