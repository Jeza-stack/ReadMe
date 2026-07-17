import MindMappingLesson from '@/components/MindMappingLesson';
import { BackNav } from '@/components/BackNav';

export default function MindMappingPage() {
  return (
    <>
      <BackNav crumbs={[{ label: 'Home', href: '/' }]} current="Mind Mapping" />
      <MindMappingLesson />
    </>
  );
}

// The root layout appends "| ReadMe" via its title template — don't repeat the brand here.
export const metadata = {
  title: 'Mind Mapping',
  description:
    'Learn what mind mapping is, why it works, and build your first personality mind map in one sitting — with a worked example, guided prompts, reflection, and the GROW model.',
  keywords:
    'mind mapping, mind map, how to make a mind map, visual thinking, radiant thinking, self-awareness, strengths and weaknesses, personal values, SMART goals, GROW model, study skills, note taking, brainstorming, essay planning, goal setting',
};
