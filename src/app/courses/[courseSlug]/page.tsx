import { getCourse } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, ChevronRight } from 'lucide-react';

type Props = {
  params: {
    courseSlug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const course = getCourse(params.courseSlug);
  if (!course) {
    return { title: 'Course not found' };
  }
  return {
    title: `${course.name} Syllabus | ReadMe`,
    description: course.description,
  };
}

export default function CoursePage({ params }: Props) {
  const course = getCourse(params.courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">{course.name}</h1>
                <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto">
            {course.categories.map((category) => (
                <div key={category.name} className="mb-12">
                    <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6 border-b pb-3">{category.name}</h2>
                    <div className="space-y-4">
                        {category.works.map((work) => (
                            <Link href={`/courses/${course.slug}/${work.slug}`} key={work.slug}>
                                <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-300">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-accent/20 p-3 rounded-md">
                                                <BookText className="w-6 h-6 text-accent" />
                                            </div>
                                            <div>
                                                <p className="font-headline font-semibold text-lg">{work.title}</p>
                                                <p className="text-sm text-muted-foreground">{work.author}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
