import { PillarIndex } from '@/components/PillarPages';

export const metadata = {
  title: 'Soft Skills Programme',
  description:
    'A structured programme map for professional capabilities: communication, teamwork, and deliberate practice.',
};

export default function SoftSkillsProgrammePage() {
  return <PillarIndex pillar="soft-skills" heading="Soft Skills Programme" />;
}
