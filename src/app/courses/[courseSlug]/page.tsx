import { getCourse } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookText, ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }: any) {
  const course = getCourse(params.courseSlug);
  if (!course) {
    return { title: 'Course not found' };
  }
  return {
    title: `${course.name} Syllabus | ReadMe`,
    description: course.description,
  };
}

export default function CoursePage({ params }: any) {
  const course = getCourse(params.courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-6xl font-bold">{course.name}</h1>
                <p className="mt-4 text-lg text-foreground/70">{course.description}</p>
            </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto">
            {course.categories.map((category) => (
                <div key={category.name} className="mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 border-b border-border/30 pb-4 text-center">{category.name}</h2>
                    <div className="space-y-4">
                        {category.works.map((work) => (
                            <Link href={`/courses/${course.slug}/${work.slug}`} key={work.slug}>
                                <Card className="bg-card/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 shadow-lg">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="bg-primary/20 p-4 rounded-lg">
                                                <BookText className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-headline font-semibold text-xl">{work.title}</p>
                                                <p className="text-sm text-foreground/60">{work.author}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-foreground/50" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
}
