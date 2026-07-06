import { PillarGuide, pillarGuides } from '@/components/PillarPages';

export function generateStaticParams() {
  return pillarGuides('ai-for-students').map((g) => ({ slug: g.slug }));
}

export default async function AiGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PillarGuide
      pillar="ai-for-students"
      slug={slug}
      backHref="/ai-for-students"
      backLabel="AI for Students"
    />
  );
}
