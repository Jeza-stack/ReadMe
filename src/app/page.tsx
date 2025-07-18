import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, BrainCircuit, Target, Users, Award, CheckCircle } from 'lucide-react';

export default function Home() {
  const cefrLevels = [
    {
      level: 'A1',
      name: 'Beginner',
      description: 'Can understand and use familiar everyday expressions and basic phrases.',
      color: 'bg-green-500',
      skills: ['Basic greetings', 'Simple questions', 'Personal information'],
      difficulty: 'Beginner'
    },
    {
      level: 'A2',
      name: 'Elementary',
      description: 'Can communicate in simple and routine tasks requiring direct exchange of information.',
      color: 'bg-green-600',
      skills: ['Shopping', 'Local geography', 'Employment'],
      difficulty: 'Elementary'
    },
    {
      level: 'B1',
      name: 'Intermediate',
      description: 'Can deal with most situations likely to arise whilst travelling in an area where the language is spoken.',
      color: 'bg-blue-500',
      skills: ['Travel situations', 'Dreams & ambitions', 'Experiences'],
      difficulty: 'Intermediate'
    },
    {
      level: 'B2',
      name: 'Upper Intermediate',
      description: 'Can understand the main ideas of complex text on both concrete and abstract topics.',
      color: 'bg-blue-600',
      skills: ['Technical discussions', 'Current affairs', 'Detailed opinions'],
      difficulty: 'Upper Intermediate'
    },
    {
      level: 'C1',
      name: 'Advanced',
      description: 'Can understand a wide range of demanding, longer texts, and recognise implicit meaning.',
      color: 'bg-purple-500',
      skills: ['Professional contexts', 'Academic texts', 'Complex ideas'],
      difficulty: 'Advanced'
    },
    {
      level: 'C2',
      name: 'Proficiency',
      description: 'Can understand with ease virtually everything heard or read.',
      color: 'bg-purple-600',
      skills: ['Native-like fluency', 'Nuanced expression', 'Cultural subtleties'],
      difficulty: 'Mastery'
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "CEFR Aligned",
      description: "All content is precisely aligned with Common European Framework standards for consistent progression."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: "Interactive Learning",
      description: "Engage with interactive exercises, quizzes, and real-world scenarios tailored to your level."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Skill-Based Approach",
      description: "Develop all four language skills: reading, writing, listening, and speaking systematically."
    }
  ];

  const skillAreas = [
    { name: 'Grammar', icon: '📝', description: 'Master English grammar structures progressively' },
    { name: 'Vocabulary', icon: '📚', description: 'Build your word bank with thematic vocabulary' },
    { name: 'Listening', icon: '🎧', description: 'Improve comprehension with authentic materials' },
    { name: 'Speaking', icon: '🗣️', description: 'Practice pronunciation and fluency' },
    { name: 'Reading', icon: '📖', description: 'Develop reading strategies and comprehension' },
    { name: 'Writing', icon: '✍️', description: 'Learn to write effectively in various contexts' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Common European Framework of Reference
            </Badge>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight text-foreground">
            Master English with <span className="text-primary">CEFR</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            Learn English systematically through the internationally recognized CEFR framework. 
            From complete beginner (A1) to native-like proficiency (C2), we guide your journey.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="font-headline font-semibold text-lg shadow-lg hover:shadow-primary/40">
              <Link href="#levels">Find Your Level</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-headline font-semibold text-lg shadow-lg hover:shadow-primary/20">
              <Link href="/assessment">Take Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Why Choose CEFR?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
              The Common European Framework is the international standard for describing language ability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(feature => (
              <div key={feature.title} className="text-center p-8 bg-card/50 rounded-lg border border-border/50 shadow-lg">
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="font-headline text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEFR Levels Section */}
      <section id="levels" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">CEFR Levels</h2>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
              Six levels of language proficiency from basic user to proficient user.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cefrLevels.map((level) => (
              <Card key={level.level} className="flex flex-col overflow-hidden group bg-card/50 border-border/50 shadow-lg hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${level.color} text-white font-bold text-lg px-3 py-1`}>
                      {level.level}
                    </Badge>
                    <Badge variant="outline">{level.difficulty}</Badge>
                  </div>
                  <CardTitle className="font-headline text-2xl">{level.name}</CardTitle>
                  <CardDescription className="text-foreground/70">{level.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground/80">Key Skills:</h4>
                    {level.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full font-headline font-semibold">
                    <Link href={`/level/${level.level.toLowerCase()}`}>
                      Start {level.level} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Areas Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Language Skills</h2>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
              Develop all aspects of English systematically through our comprehensive curriculum.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillAreas.map((skill) => (
              <Card key={skill.name} className="text-center p-6 bg-card/50 border-border/50 shadow-lg hover:border-primary/50 transition-all duration-300 group">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-foreground/70 text-sm">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Not Sure of Your Level?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Take our comprehensive CEFR assessment to find your exact level and get personalized learning recommendations.
            </p>
            <Button asChild size="lg" className="font-headline font-semibold text-lg">
              <Link href="/assessment">
                Take Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
