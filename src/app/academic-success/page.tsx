import { PillarIndex } from '@/components/PillarPages';

export const metadata = {
  title: 'Academic Success',
  description:
    'Essay writing, referencing, and exam preparation guides — each built around a worked example.',
};

export default function AcademicSuccessPage() {
  return <PillarIndex pillar="academic-success" />;
}
