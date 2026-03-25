import A1VocabularyLesson from '@/components/A1VocabularyLesson';
import { BackNav } from '@/components/BackNav';

export default function FoodVocabularyPage() {
  return (
    <>
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' },
          { label: 'A1 Level', href: '/level/a1' }
        ]} 
        current="Food & Drinks" 
      />
      <A1VocabularyLesson 
        theme="Food & Drinks" 
        level="A1" 
        datasetKey="food-drinks"
      />
    </>
  );
}