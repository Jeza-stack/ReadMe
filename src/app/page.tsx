import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, BrainCircuit, Target, Users, Award, CheckCircle, Star, Play, Globe, TrendingUp, Zap, Shield } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';

export default function Home() {
  const cefrLevels = [
    {
      level: 'A1',
      name: 'Beginner',
      description: 'Can understand and use familiar everyday expressions and basic phrases.',
      color: 'from-emerald-400 to-emerald-600',
      borderColor: 'border-emerald-500/20',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
      skills: ['Basic greetings', 'Simple questions', 'Personal information'],
      difficulty: 'Beginner',
      users: '12K+'
    },
    {
      level: 'A2',
      name: 'Elementary',
      description: 'Can communicate in simple and routine tasks requiring direct exchange of information.',
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-500/20',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      skills: ['Shopping', 'Local geography', 'Employment'],
      difficulty: 'Elementary',
      users: '8K+'
    },
    {
      level: 'B1',
      name: 'Intermediate',
      description: 'Can deal with most situations likely to arise whilst travelling in an area where the language is spoken.',
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-500/20',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      skills: ['Travel situations', 'Dreams & ambitions', 'Experiences'],
      difficulty: 'Intermediate',
      users: '15K+'
    },
    {
      level: 'B2',
      name: 'Upper Intermediate',
      description: 'Can understand the main ideas of complex text on both concrete and abstract topics.',
      color: 'from-indigo-400 to-indigo-600',
      borderColor: 'border-indigo-500/20',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      skills: ['Technical discussions', 'Current affairs', 'Detailed opinions'],
      difficulty: 'Upper Intermediate',
      users: '10K+'
    },
    {
      level: 'C1',
      name: 'Advanced',
      description: 'Can understand a wide range of demanding, longer texts, and recognise implicit meaning.',
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-500/20',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      skills: ['Professional contexts', 'Academic texts', 'Complex ideas'],
      difficulty: 'Advanced',
      users: '6K+'
    },
    {
      level: 'C2',
      name: 'Proficiency',
      description: 'Can understand with ease virtually everything heard or read.',
      color: 'from-violet-400 to-violet-600',
      borderColor: 'border-violet-500/20',
      bgColor: 'bg-violet-50 dark:bg-violet-950/20',
      skills: ['Native-like fluency', 'Nuanced expression', 'Cultural subtleties'],
      difficulty: 'Mastery',
      users: '3K+'
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "CEFR Aligned",
      description: "All content precisely aligned with Common European Framework standards for consistent progression.",
      color: "text-blue-500"
    },
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Intelligent adaptive exercises and personalized learning paths tailored to your progress.",
      color: "text-purple-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join 50,000+ learners worldwide in our supportive English learning community.",
      color: "text-green-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certified Progress",
      description: "Earn internationally recognized certificates as you complete each CEFR level.",
      color: "text-orange-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Standards",
      description: "Learn with confidence using the world's most trusted language proficiency framework.",
      color: "text-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Results",
      description: "See measurable improvement in your English skills within the first 30 days.",
      color: "text-yellow-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Learners", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "25+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
    { number: "4.9", label: "Rating", icon: <Star className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Business Professional",
      level: "B2 → C1",
      quote: "This platform transformed my career. The structured approach helped me achieve C1 level in just 8 months!",
      avatar: "MR"
    },
    {
      name: "Ahmed Hassan",
      role: "University Student",
      level: "A1 → B1",
      quote: "Starting from zero, I now confidently communicate in English. The CEFR framework made everything clear.",
      avatar: "AH"
    },
    {
      name: "Sofia Chen",
      role: "Software Engineer",
      level: "B1 → C2",
      quote: "The technical vocabulary sections were perfect for my field. Now I present at international conferences!",
      avatar: "SC"
    }
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl opacity-70 motion-safe:animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full blur-xl opacity-70 motion-safe:animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full blur-xl opacity-70 motion-safe:animate-pulse delay-500" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <Badge variant="secondary" className="text-base px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
              🌍 Common European Framework of Reference
            </Badge>
          </div>
          
          <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Master English with 
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              CEFR Excellence
            </span>
          </h1>
          
          <p className="mt-8 max-w-4xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Transform your English journey with our internationally recognized CEFR-aligned platform. 
            From complete beginner to native-like fluency – your path to success starts here.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
              <Link href="#levels">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-800">
              <Link href="/assessment">
                <Play className="mr-2 w-5 h-5" />
                Take Free Assessment
              </Link>
            </Button>
          </div>
          
          {/* Stats Row */}
          <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center mb-2 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-2xl xs:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-xs xs:text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience the most comprehensive and effective English learning system built on proven CEFR methodology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900" />
                <CardContent className="relative p-8">
                  <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Explore our core tracks designed for structured learning and professional growth.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="English I"
              description="Foundational course in English literature and language competency."
              href="/courses/english-1"
              icon={<BookOpen className="w-8 h-8" />}
              cta="Explore English I"
            />
            <CourseCard
              title="English III"
              description="Advanced course covering complex literary works and modern communication."
              href="/courses/english-3"
              icon={<BookOpen className="w-8 h-8" />}
              cta="Explore English III"
            />
            <CourseCard
              title="Soft Skills"
              description="Articles and insights on communication, leadership, and workplace excellence."
              href="/soft-skills"
              icon={<Users className="w-8 h-8" />}
              cta="Read Soft Skills"
            />
          </div>
        </div>
      </section>

      {/* CEFR Levels Showcase */}
      <section id="levels" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Your Learning Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Six carefully structured levels from beginner to mastery. Each level builds upon the previous, ensuring steady progress toward fluency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cefrLevels.map((level, index) => (
              <Card key={level.level} className={`group relative overflow-hidden border ${level.borderColor} hover:border-opacity-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${level.bgColor}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`}} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${level.color} text-white font-bold text-lg px-4 py-2 shadow-lg`}>
                      {level.level}
                    </Badge>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{level.difficulty}</Badge>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{level.users} learners</div>
                    </div>
                  </div>
                  <CardTitle className="font-headline text-2xl mb-2">{level.name}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">Key Skills:</h4>
                    {level.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-6">
                  <Button asChild className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    <Link href={`/level/${level.level.toLowerCase()}`}>
                      Start {level.level} Level
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real results from real learners who transformed their English skills with our CEFR-aligned platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{testimonial.level}</Badge>
                    </div>
                  </div>
                  <blockquote className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Master English?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of successful learners and start your journey to English fluency today. 
              Take our free assessment and discover your perfect starting point.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="h-16 px-10 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/assessment">
                  Start Free Assessment
                  <Award className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-16 px-10 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Link href="#levels">
                  Browse All Levels
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20">
              <p className="text-blue-100 mb-8">Trusted by leading organizations worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-white font-semibold">UNESCO</div>
                <div className="text-white font-semibold">Cambridge</div>
                <div className="text-white font-semibold">IELTS</div>
                <div className="text-white font-semibold">TOEFL</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
