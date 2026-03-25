import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function PersonalVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Personal Information" 
      />
      <A1VocabularyLesson 
        theme="Personal Information" 
        level="A1" 
        datasetKey="personal-information"
      />
    </>
  );
}