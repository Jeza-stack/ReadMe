import { getLiteraryWork, getCourses } from '@/lib/data';
import { notFound } from 'next/navigation';
import LiteraryWorkClient from '@/components/LiteraryWorkClient';
import { SocialShare } from '@/components/SocialShare';

export async function generateStaticParams() {
  const params: { courseSlug: string; workSlug: string }[] = [];
  getCourses().forEach((c) => c.categories.forEach((cat) => cat.works.forEach((w) => params.push({ courseSlug: c.slug, workSlug: w.slug }))));
  return params;
}

export async function generateMetadata({ params }: any) {
  const work = getLiteraryWork(params.courseSlug, params.workSlug);
  if (!work) {
    return { title: 'Work not found' };
  }
  const url = `https://example.com/courses/${params.courseSlug}/${params.workSlug}`;
  return {
    title: `${work.title} by ${work.author} | ReadMe`,
    description: `An analysis of ${work.title}, part of the ${params.courseSlug} course.`,
    openGraph: {
      title: `${work.title} | ReadMe`,
      description: `Study ${work.title} by ${work.author}`,
      type: 'article',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.title} | ReadMe`,
      description: `Study ${work.title} by ${work.author}`,
    },
  };
}

export default function LiteraryWorkPage({ params }: any) {
  const work = getLiteraryWork(params.courseSlug, params.workSlug);

  if (!work) {
    notFound();
  }

  return (
    <div>
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-semibold font-headline">{work.category}</p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold mt-2">{work.title}</h1>
            <p className="mt-4 text-xl text-foreground/70">by {work.author}</p>
            <div className="mt-8 flex justify-center">
              <SocialShare title={`${work.title} by ${work.author}`} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <LiteraryWorkClient work={work} />
        </div>
      </div>
    </div>
  );
}
