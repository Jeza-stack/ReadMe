import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, CheckCircle, FileText, Headphones, MessageSquare, BookOpen, Award, Target, ArrowLeft } from 'lucide-react';
import QuickAssessment from '@/components/QuickAssessment';
import { BackNav } from '@/components/BackNav';

export default function AssessmentPage() {
  const assessmentTypes = [
    {
      type: 'Quick Assessment',
      duration: '15 minutes',
      description: 'Get a rough estimate of your current level',
      icon: <Clock className="w-8 h-8" />,
      features: ['Basic grammar questions', 'Vocabulary recognition', 'Reading comprehension', 'Immediate results']
    },
    {
      type: 'Comprehensive Test',
      duration: '90 minutes',
      description: 'Complete evaluation of all four skills',
      icon: <FileText className="w-8 h-8" />,
      features: ['Grammar & vocabulary', 'Reading comprehension', 'Listening exercises', 'Writing tasks']
    },
    {
      type: 'Skills-Based Assessment',
      duration: '45 minutes',
      description: 'Focus on specific language skills',
      icon: <Target className="w-8 h-8" />,
      features: ['Choose specific skills', 'Detailed feedback', 'Skill-level recommendations', 'Learning path suggestions']
    }
  ];

  const skillAreas = [
    {
      skill: 'Grammar & Vocabulary',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Test your knowledge of English grammar rules and vocabulary range',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 25
    },
    {
      skill: 'Reading Comprehension',
      icon: <FileText className="w-6 h-6" />,
      description: 'Evaluate your ability to understand written English texts',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 20
    },
    {
      skill: 'Listening Comprehension',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Assess your understanding of spoken English in various contexts',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 20
    },
    {
      skill: 'Speaking Assessment',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Evaluate your ability to express yourself clearly in English',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 10
    }
  ];

  const levelDescriptions = [
    { level: 'A1', name: 'Beginner', color: 'bg-green-500', description: 'Can understand and use familiar everyday expressions' },
    { level: 'A2', name: 'Elementary', color: 'bg-green-600', description: 'Can communicate in simple and routine tasks' },
    { level: 'B1', name: 'Intermediate', color: 'bg-blue-500', description: 'Can deal with most situations while travelling' },
    { level: 'B2', name: 'Upper Intermediate', color: 'bg-blue-600', description: 'Can understand complex texts and interact fluently' },
    { level: 'C1', name: 'Advanced', color: 'bg-purple-500', description: 'Can use language flexibly and effectively' },
    { level: 'C2', name: 'Proficiency', color: 'bg-purple-600', description: 'Can understand virtually everything with ease' }
  ];

  const preparationTips = [
    'Ensure you have a quiet environment for the assessment',
    'Use headphones for the listening section',
    'Take your time to read questions carefully',
    'Answer honestly to get the most accurate results',
    'Have paper and pen ready for note-taking',
    'Complete the assessment in one sitting for best results'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'CEFR English', href: '/courses/cefr-english' }
        ]} 
        current="English Proficiency Assessment" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-block">
            <Badge className="bg-[#00A2C9] text-white text-lg px-6 py-2 mb-6 rounded-full shadow-lg shadow-cyan-400/20">
              CEFR Standards
            </Badge>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Find Your English Level</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Take our comprehensive CEFR-aligned assessment to discover your current English proficiency level 
            and get personalized learning recommendations.
          </p>
        </div>

        {/* Assessment Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {assessmentTypes.map((assessment, index) => (
            <Card key={index} className="relative overflow-hidden group hover:border-[#00A2C9] transition-all duration-300 shadow-lg hover:shadow-2xl bg-white dark:bg-[#0A1330] rounded-2xl border-0">
              <div className="h-1.5 bg-slate-100 dark:bg-white/5 mx-6 mt-6 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#043370] to-[#00A2C9] w-1/3"></div>
              </div>
              <CardHeader className="text-center pt-8">
                <div className="flex justify-center mb-6 text-[#00A2C9] bg-slate-50 dark:bg-white/5 w-16 h-16 items-center rounded-2xl mx-auto group-hover:scale-110 transition-transform">
                  {assessment.icon}
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{assessment.type}</CardTitle>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mx-auto">
                   <Clock className="w-3 h-3" /> {assessment.duration}
                </div>
                <CardDescription className="mt-4 font-body leading-relaxed px-4">{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8 px-4">
                  {assessment.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-[#00A2C9]" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-4">
                  {assessment.type === 'Quick Assessment' ? (
                    <Link href="/assessment/quick">
                      <Button className="w-full bg-[#043370] hover:bg-[#00A2C9] text-white h-12 rounded-xl font-bold shadow-lg shadow-blue-900/10">
                        Start {assessment.type}
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full h-12 rounded-xl opacity-50" disabled variant="secondary">
                      Start {assessment.type}
                      <span className="ml-2 text-[10px] uppercase font-bold">(Soon)</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-12">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl max-w-2xl mx-auto">
            <TabsTrigger value="overview" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-sm">Skills Tests</TabsTrigger>
            <TabsTrigger value="levels" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-sm">CEFR Levels</TabsTrigger>
            <TabsTrigger value="preparation" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-sm">Preparation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-in fade-in duration-500 outline-none">
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="border-0 shadow-xl bg-white dark:bg-[#0A1330] rounded-3xl overflow-hidden p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold mb-6">How the Assessment Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 px-0">
                  {[
                    { n: 1, t: 'Choose Assessment Type', d: 'Select quick, comprehensive, or skills-based' },
                    { n: 2, t: 'Complete Tasks', d: 'Answer questions covering grammar and vocabulary' },
                    { n: 3, t: 'Get Results', d: 'Receive your CEFR level with detailed feedback' },
                    { n: 4, t: 'Start Learning', d: 'Begin your personalized learning journey' }
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-2xl bg-[#00A2C9]/10 text-[#00A2C9] flex items-center justify-center font-bold text-lg group-hover:bg-[#00A2C9] group-hover:text-white transition-all shrink-0">
                        {step.n}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">{step.t}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white dark:bg-[#0A1330] rounded-3xl p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold mb-6">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pt-2">
                  <ul className="space-y-4">
                    {[
                      'CEFR-aligned questions and scoring',
                      'Adaptive difficulty based on responses',
                      'Detailed skill breakdown and feedback',
                      'Personalized learning recommendations',
                      'Progress tracking and certificates',
                      'Retake assessments to track growth'
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#00A2C9] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="levels" className="outline-none animate-in fade-in duration-500">
             <div className="grid md:grid-cols-2 gap-6">
                {levelDescriptions.map((level) => (
                   <div key={level.level} className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-[#0A1330] shadow-md border border-slate-100 dark:border-white/5">
                      <div className={`${level.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0`}>
                        {level.level}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{level.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{level.description}</p>
                      </div>
                   </div>
                ))}
             </div>
          </TabsContent>
          
          <TabsContent value="skills" className="outline-none animate-in fade-in duration-500">
             <div className="grid md:grid-cols-2 gap-6">
               {skillAreas.map((skill, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white dark:bg-[#0A1330] rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#00A2C9]">
                        {skill.icon} {skill.skill}
                      </CardTitle>
                      <CardDescription>{skill.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full font-bold" variant="outline">Practice {skill.skill}</Button>
                    </CardContent>
                  </Card>
               ))}
             </div>
          </TabsContent>

          <TabsContent value="preparation" className="outline-none animate-in fade-in duration-500">
             <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg bg-white dark:bg-[#0A1330] rounded-2xl p-6">
                   <CardTitle className="mb-6">Before You Start</CardTitle>
                   <ul className="space-y-4">
                      {preparationTips.map((tip, i) => (
                         <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircle className="w-5 h-5 text-[#00A2C9] shrink-0" />
                            {tip}
                         </li>
                      ))}
                   </ul>
                </Card>
                <Card className="border-0 shadow-lg bg-white dark:bg-[#0A1330] rounded-2xl p-6">
                   <CardTitle className="mb-6">Requirements</CardTitle>
                   <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                      <p>• Stable internet connection</p>
                      <p>• Working audio/microphone</p>
                      <p>• Quiet environment</p>
                   </div>
                </Card>
             </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Back Button */}
        <div className="mt-20 text-center py-10 border-t border-slate-200 dark:border-white/10">
           <Link href="/" className="inline-flex items-center gap-3 font-bold text-slate-500 hover:text-[#043370] transition-colors group px-8 py-3 rounded-full border border-slate-200 dark:border-white/10 hover:border-[#043370]">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             Back to Learning Home
           </Link>
        </div>
      </div>
    </div>
  );
}