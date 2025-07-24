import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, BookOpen, Users, Globe, Star, Trophy, Target, MessageSquare, Play, Award, Zap, Brain, Languages, Lightbulb } from 'lucide-react';
import { cefrLevels } from '@/data/cefr-levels';

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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
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

      {/* CEFR Levels Overview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Complete CEFR Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Progress systematically through all six levels of the Common European Framework of Reference. 
              Each level builds upon the previous one, ensuring comprehensive language mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cefrLevels.map((level, index) => (
              <Card key={level.level} className={`relative overflow-hidden ${level.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-5`} />
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${level.color} text-white text-lg px-4 py-2`}>
                      {level.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(level.level === 'A1' || level.level === 'A2' ? 2 : 
                                  level.level === 'B1' || level.level === 'B2' ? 3 : 4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{level.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${level.textColor}`}>{level.grammar}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Grammar Topics</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${level.textColor}`}>{level.vocabulary}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Vocabulary</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${level.textColor}`}>{level.activities}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Activities</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Key Learning Areas:</h4>
                    <ul className="space-y-2">
                      {level.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${level.textColor}`} />
                          <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white`}>
                    <Link href={`/level/${level.level.toLowerCase()}`}>
                      Start {level.level} Level <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience the most comprehensive and interactive English learning platform designed for modern learners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white dark:bg-slate-900">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-6 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
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

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Student Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their English skills with our comprehensive CEFR program.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-slate-600 dark:text-slate-300 mb-6 italic leading-relaxed">
                    "{testimonial.message}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.level} • {testimonial.country}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Join our community of learners and start your path to English mastery today. 
            Choose your starting level or take our assessment to find your perfect beginning point.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
              <Link href="/level/a1">
                Start with A1 Beginner <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
              <Link href="/assessment">
                Take Placement Test
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-blue-100 text-center">
            <p className="text-lg">
              🌟 Join <span className="font-bold">125,000+</span> learners worldwide 
              • 📚 <span className="font-bold">60+</span> grammar topics 
              • 📖 <span className="font-bold">4,200+</span> vocabulary words
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
