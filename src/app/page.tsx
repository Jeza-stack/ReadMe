import Link from 'next/link';
import Image from 'next/image';
import { getCourses, getBlogPosts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Lightbulb } from 'lucide-react';

export default function Home() {
  const courses = getCourses();
  const latestPosts = getBlogPosts().slice(0, 3);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      title: "In-Depth Literary Analysis",
      description: "Explore classic and contemporary works with detailed summaries, author bios, and content analysis."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-accent" />,
      title: "Interactive Learning",
      description: "Reinforce your knowledge with quizzes, an interactive glossary, and text-to-speech audio."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "Essential Soft Skills",
      description: "Grow professionally with our curated blog on communication, leadership, and emotional intelligence."
    }
  ]

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="bg-hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Unlock Your Potential with ReadMe
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your personal platform for mastering English literature, enhancing language skills, and developing the soft skills needed to excel in your career.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="font-headline">
              <Link href="#courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-headline">
              <Link href="/soft-skills">Read Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.title} className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Courses</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Dive deep into our comprehensive English courses.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.slug} className="flex flex-col overflow-hidden group">
              <div className="overflow-hidden">
                <Image src={course.image} alt={course.name} width={600} height={400} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={course.dataAiHint} />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                <Button asChild className="w-full font-headline">
                  <Link href={`/courses/${course.slug}`}>View Syllabus <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Soft Skills Blog Section */}
      <section className="bg-muted/50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Soft Skills Spotlight</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Insights and strategies for professional development from our blog.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col group">
                <CardHeader>
                  <CardTitle className="font-headline text-xl leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/soft-skills/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription>{post.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter>
                   <Button asChild variant="link" className="p-0 font-headline">
                      <Link href={`/soft-skills/${post.slug}`}>Read More <ArrowRight className="ml-2 w-4 h-4" /></Link>
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="font-headline">
              <Link href="/soft-skills">Visit The Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
