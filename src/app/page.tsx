import Link from 'next/link';
import { LevelsGrid } from '@/components/levels-grid';
import { TestimonialsSection } from '@/components/testimonials-section';
import { AssessmentSection } from '@/components/assessment-section';
import { ContactSection } from '@/components/contact-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, BookOpen, Users, Globe, Star, Trophy, Target, MessageSquare, Play, Award, Zap, Brain, Languages, Lightbulb } from 'lucide-react';

export default function HomePage() {

  const platformFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Interactive Learning',
      description: 'Engage with dynamic lessons, exercises, and real-time feedback for effective learning.',
      color: 'text-blue-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your advancement through comprehensive progress bars and achievement systems.',
      color: 'text-green-600'
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: 'Complete CEFR Coverage',
      description: 'Master all six CEFR levels with structured progression from A1 to C2.',
      color: 'text-purple-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Gamified Experience',
      description: 'Earn points, maintain streaks, and unlock achievements as you progress.',
      color: 'text-orange-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert-Designed',
      description: 'Content created by language experts following international standards.',
      color: 'text-red-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Recognition',
      description: 'Learn with internationally recognized CEFR framework used worldwide.',
      color: 'text-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      level: 'B2 Graduate',
      country: 'Spain',
      message: 'This platform helped me advance from A2 to B2 in just 8 months. The structured approach and interactive exercises made all the difference.',
      rating: 5,
      avatar: '🇪🇸'
    },
    {
      name: 'Hiroshi Tanaka',
      level: 'C1 Student',
      country: 'Japan',
      message: 'The vocabulary system is exceptional. I\'ve mastered over 2,000 words and can now communicate confidently in professional settings.',
      rating: 5,
      avatar: '🇯🇵'
    },
    {
      name: 'Ahmed Hassan',
      level: 'B1 Achiever',
      country: 'Egypt',
      message: 'The grammar explanations are clear and the practice activities are engaging. I finally understand conditional sentences!',
      rating: 5,
      avatar: '🇪🇬'
    }
  ];

  const achievements = [
    { label: 'Active Learners', value: '125,000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Lessons Completed', value: '2.8M+', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Success Rate', value: '94%', icon: <Trophy className="w-6 h-6" /> },
    { label: 'Countries', value: '180+', icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        {/* Floating animated elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full blur-xl opacity-60 animate-pulse animation-delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full blur-xl opacity-50 animate-pulse animation-delay-2000" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-6 py-3 mb-8">
              Complete CEFR Learning Platform
            </Badge>
            
            <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
              Master English with 
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                CEFR Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
              From A1 Beginner to C2 Mastery - Your complete journey through all six CEFR levels with 
              <span className="font-semibold text-blue-600 dark:text-blue-400">4,200+ vocabulary words</span>, 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> 60+ grammar topics</span>, and 
              <span className="font-semibold text-green-600 dark:text-green-400"> 166 interactive activities</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <Link href="/level/a1">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-blue-300 dark:border-blue-700 px-8 py-4 text-lg">
                <Link href="/assessment">
                  Take Level Test
                </Link>
              </Button>
            </div>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use our new improved components */}
      <LevelsGrid />
      <TestimonialsSection />
      <AssessmentSection />
      <ContactSection />
    </div>
  );
}
