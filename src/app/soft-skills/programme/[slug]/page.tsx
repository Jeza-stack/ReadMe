import { PillarGuide, pillarGuides } from '@/components/PillarPages';

export function generateStaticParams() {
  return pillarGuides('soft-skills').map((g) => ({ slug: g.slug }));
}

export default async function SoftSkillsModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PillarGuide
      pillar="soft-skills"
      slug={slug}
      backHref="/soft-skills/programme"
      backLabel="Soft Skills Programme"
    />
  );
}
