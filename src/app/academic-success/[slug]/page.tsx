import { PillarGuide, pillarGuides } from '@/components/PillarPages';

export function generateStaticParams() {
  return pillarGuides('academic-success').map((g) => ({ slug: g.slug }));
}

export default async function AcademicSuccessGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PillarGuide
      pillar="academic-success"
      slug={slug}
      backHref="/academic-success"
      backLabel="Academic Success"
    />
  );
}
